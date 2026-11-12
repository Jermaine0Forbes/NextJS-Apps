"use server"
// import { Heading, Em , Button} from "@radix-ui/themes";
// import { output, seedData } from "@/prisma/db";
// import { createCriticReviews} from '@/prisma/seeder';
// import {use} from "react"
import SeedBtn from "@/seed/seed-btn";

export default async function Seed()
{
    // await createCriticReviews();
    // const handleSeeding = async () =>  await seedData();
    // output();
    return (
        <main>
           <SeedBtn /> 
        </main>
    )
}