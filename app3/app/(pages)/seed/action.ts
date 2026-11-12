'use server'

import { seedData } from "@/prisma/db";

export async function seedIt()
{
    await seedData();
}