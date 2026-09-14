import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { schema } from "@/graphql/schema";
import { prisma } from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const token = req.cookies.get("token")?.value;
    const user = await getUserFromToken(token);
    return { prisma, user };
  },
});


export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}