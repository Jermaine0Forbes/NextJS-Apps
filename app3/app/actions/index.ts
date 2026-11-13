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

export async function queryMovies() {
    return await db.query(
        db.sql.public.Movie.as('m')
    .innerJoin(db.sql.public.MovieReview.as('mr'), (f, fns) => fns.eq(f.m.id, f.mr.movieId))
    .select((f, fns) => ({ id: f.m.id,  title: f.m.title, year: f.m.year, genre: f.m.genre, rating: fns.avg(f.mr.rating), reviews: fns.count(f.mr.id)}))
    .groupBy((f) => f.m.id)
    .build()
);
}