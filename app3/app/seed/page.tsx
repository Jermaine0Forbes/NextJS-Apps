import { Heading, Em } from "@radix-ui/themes";
import { output } from "@/prisma/db";
import {x} from '@/prisma/seeder';

export default async function Seed()
{
    await x();
    // output();
    return (
        <main>
            seeding data
        </main>
    )
}