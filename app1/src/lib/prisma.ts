import { PrismaClient } from "@/generated/prisma/client"; 
import { PrismaPg } from "@prisma/adapter-pg"; 
import dotenv from  "dotenv";
const globalForPrisma = global as unknown as {
  prisma: PrismaClient; 
}; 

const ENV = "dev";
if(ENV != "dev")
{
dotenv.config( {path: ".env.local"})
}else{
  dotenv.config( {path: ".env"})
}

console.log('database url')
console.log(process.env.DATABASE_URL)
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL, 
}); 
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, 
  }); 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 
export default prisma; 