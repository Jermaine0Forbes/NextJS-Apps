"use server"
import { db } from "@/prisma/db";
import { pluck, replaceNull } from "@/lib/helpers";
import { Critic } from "@/lib/types";



export async function getUserNames() {
    const rows = replaceNull(
         await db.orm.public.
            Critic.select('name')
            .where((c) => c.name.isNotNull())
            .all() , 
            'name', 
            'missing'
        );

    return await pluck<Pick<Critic, "name">>('name',rows);
}

export async function getMovieNames() {
    return await pluck('title', await db.orm.public.Movie.select('title').all());
}