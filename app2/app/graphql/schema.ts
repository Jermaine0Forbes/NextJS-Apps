// graphql/schema.ts
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema, GraphQLError } from "graphql";

const typeDefs = /* GraphQL */ `
  directive @auth(requires: Role = USER) on FIELD_DEFINITION

  enum Role {
    USER
    MODERATOR
    ADMIN
    SUPER_ADMIN
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
  }

  type Query {
    me: User @auth(requires: USER)
    posts: [Post!]! @auth(requires: USER)
    allUsers: [User!]! @auth(requires: ADMIN)
  }

  type Mutation {
    createPost(title: String!, content: String!): Post @auth(requires: USER)
    deletePost(id: ID!): Boolean @auth(requires: ADMIN)
    publishPost(id: ID!): Post @auth(requires: EDITOR)
  }
`;

const roleOrder: Record<string, number> = { USER: 0, MODERATOR: 1, ADMIN: 2, SUPER_ADMIN: 4 };

function authDirectiveTransformer(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];
      if (!authDirective) return fieldConfig;

      const requiredRole = authDirective.requires as keyof typeof roleOrder;
      const { resolve = defaultFieldResolver } = fieldConfig;

      fieldConfig.resolve = async (source, args, context, info) => {
        const user = context.user;
        if (!user) {
          throw new GraphQLError("Not authenticated", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
        if (roleOrder[user.role] < roleOrder[requiredRole]) {
          throw new GraphQLError("Not authorized", {
            extensions: { code: "FORBIDDEN" },
          });
        }
        return resolve(source, args, context, info);
      };
      return fieldConfig;
    },
  });
}

const resolvers = {
  Query: {
    me: (_: unknown, __: unknown, ctx: any) => ctx.user,
    posts: (_: unknown, __: unknown, ctx: any) => {
      // EDITOR/ADMIN see everything, USER only sees published posts
      const where = ctx.user.role === "USER" ? { published: true } : {};
      return ctx.prisma.post.findMany({ where, include: { author: true } });
    },
    allUsers: (_: unknown, __: unknown, ctx: any) => ctx.prisma.user.findMany(),
  },
  Mutation: {
    createPost: (_: unknown, args: any, ctx: any) =>
      ctx.prisma.post.create({
        data: { ...args, authorId: ctx.user.id },
        include: { author: true },
      }),
    deletePost: async (_: unknown, { id }: any, ctx: any) => {
      await ctx.prisma.post.delete({ where: { id } });
      return true;
    },
    publishPost: (_: unknown, { id }: any, ctx: any) =>
      ctx.prisma.post.update({
        where: { id },
        data: { published: true },
        include: { author: true },
      }),
  },
};

let schema = makeExecutableSchema({ typeDefs, resolvers });
schema = authDirectiveTransformer(schema);

export { schema };