import { PrismaClient, Prisma } from "@/app/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { createMultiUsers, createRole } from "@/app/lib/faker";

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


// const userData: Prisma.UserCreateInput[] = generateMultiUsers(1);
// console.log('user data')
// console.log(userData)

const userData: Prisma.UserUncheckedCreateInput[] = createMultiUsers(30);
const roleData: Prisma.RoleCreateInput = createRole("USER");

export async function main() {
  for (const user of userData) {
    await prisma.user.create({ data: user });
  }
}

main();