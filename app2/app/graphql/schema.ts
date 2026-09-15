// graphql/schema.ts
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema, GraphQLError } from "graphql";
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";

const typeDefs = `
  directive @auth(requires: RoleName = USER) on FIELD_DEFINITION
   ${DateTimeTypeDefinition} # Declares 'scalar DateTime'

  enum RoleName {
    USER
    MODERATOR
    ADMIN
    SUPER_ADMIN
  }

  type Favorite {
   quote: Quote!
   user: User!
  }

  type Role {
   name: RoleName!
  }

  type User {
    id: ID!
    name: String!
    email: String
    role: Role
  }

  type Quote {
    id: ID!
    message: String!
    user: User!
    createdAt: DateTime
  }

  type Query {
    me: User @auth(requires: USER)
    quotes: [Quote!]! @auth(requires: USER)
    allUsers: [User!]! @auth(requires: ADMIN)
    userQuotes: [Quote]  @auth(requires: USER)
  }

  type Mutation {
    createQuote(message: String!): Quote @auth(requires: USER)
    deleteQuote(id: ID!): Boolean @auth(requires: ADMIN)
   favQuote(quoteId:ID!, userId: ID!): Boolean @auth(requires: USER)
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
                if (roleOrder[user.role.name] < roleOrder[requiredRole]) {
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
    DateTime: DateTimeResolver,
    Query: {
        me: (parent: unknown, args: unknown, ctx: any) => ctx.user,
        quotes: (parent: unknown, args: unknown, ctx: any) => {
            // MODERATOR/ADMIN see everything, USER only sees published quotes
            // const where = ctx.user.role?.name === "USER" ? { published: true } : {};
            return ctx.prisma.quote.findMany({ include: { user: { include:{role: true} }} });
        },
        allUsers: (parent: unknown, args: unknown, ctx: any) => ctx.prisma.user.findMany(),
        userQuotes: (parent: unknown, args: unknown, ctx: any) => ( ctx.prisma.quote.findMany({where: {userId: ctx.user.id}}))
    },
    Mutation: {
        createQuote: (parent: unknown, args: any, ctx: any) =>
            ctx.prisma.quote.create({
                data: { ...args, userId: ctx.user.id },
                include: { user: true },
            }),
        deleteQuote: async (parent: unknown, { id }: any, ctx: any) => {
            await ctx.prisma.quote.delete({ where: { id } });
            return true;
        },
        favQuote: async (parent: unknown, { quoteId, userId }: any, ctx: any) => {
            await ctx.prisma.favorite.create({ data: { quoteId, userId } });
            return true;
        },

    },
};

let schema = makeExecutableSchema({ typeDefs, resolvers });
schema = authDirectiveTransformer(schema);

export { schema };