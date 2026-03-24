import { PrismaClient, Prisma } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { generateMultiUsers } from "@/lib/faker";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: "John",
//     email: "john@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "a",
//           content: "https://pris.ly/discord",
//           published: true,
//         },
//         {
//           title: "b",
//           content: "https://pris.ly/youtube",
//         },
//       ],
//     },
//   },
//   {
//     name: "Jacob",
//     email: "jacob@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "c",
//           content: "https://www.twitter.com/prisma",
//           published: true,
//         },
//       ],
//     },
//   },
// ];


const userData: Prisma.UserCreateInput[] = generateMultiUsers(1);
console.log('user data')
console.log(userData)

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();