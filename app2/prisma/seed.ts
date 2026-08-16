import { PrismaClient, Prisma } from "@/app/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { createMultiUsers, createMultiRole } from "@/app/lib/faker";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = createMultiUsers();
const roleData: Prisma.RoleCreateInput[] = createMultiRole(["USER", "MODERATOR", "ADMIN", "SUPER_ADMIN"]);

export async function main() {

   await prisma.role.createMany({data: roleData});
  //  await prisma.user.createMany({data:userData});
  for (const user of userData) {
    await prisma.user.create({ data: user });
  }
}

main()
.then(async() => {
await prisma.$disconnect();
}) 
.catch(async (e) => {
      console.error('❌ Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
});