import { PrismaClient} from '../prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL})});

export async function checkPermissions() {
  // 1. Check current connection user and database name
  const sessionInfo = await prisma.$queryRaw`
    SELECT current_user, current_database();
  `;
  console.log('Session Info:', sessionInfo);

  // 2. Check if the current user has superuser or creation privileges
  const userAttributes = await prisma.$queryRaw`
    SELECT rolname, rolsuper, rolcreaterole, rolcreatedb, rolcanlogin 
    FROM pg_roles 
    WHERE rolname = current_user;
  `;
  console.log('User Attributes:', userAttributes);

  // 3. Check schema usage and table privileges for the current user
  const tablePrivileges = await prisma.$queryRaw`
    SELECT table_schema, table_name, privilege_type 
    FROM information_schema.table_privileges 
    WHERE grantee = current_user;
  `;
  console.log('Table Privileges:', tablePrivileges);
}

checkPermissions()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());