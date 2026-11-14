"use server"
import { db } from "@/prisma/db";
import { pluck, replaceNull } from "@/lib/helpers";
import { Critic, Movie, MovieJson } from "@/lib/types";

export async function searchMovies(params:string) {
   return await fetch('http:localhost:3000/api/search/movie?'+params)
        .then(resp => resp.json())
        .then(resp => resp)
        .catch(e => console.error(e))
}

export async function getUserNames() {
    const rows = replaceNull(
        await db.orm.public.
            Critic.select('name')
            .where((c) => c.name.isNotNull())
            .all(),
        'name',
        'missing'
    );

    return pluck('name', rows);
}

export async function getGenres(): Promise<Array<string>> {
    const rows = replaceNull(
        await db.orm.public.Movie
        .select('genre')
        .distinct('genre')
        .where((m) => m.genre.isNotNull())
        .all(),
        'genre',
        'missing'
    );

    return  pluck('genre', rows);
}

export async function getMovieNames() {
    return pluck('title', await db.orm.public.Movie.select('title').all());
}

export async function queryMovies() {
    return await db.query(
        db.sql.public.Movie.as('m')
            .innerJoin(db.sql.public.MovieReview.as('mr'), (f, fns) => fns.eq(f.m.id, f.mr.movieId))
            .select((f, fns) => ({ id: f.m.id, title: f.m.title, year: f.m.year, genre: f.m.genre, rating: fns.avg(f.mr.rating), reviews: fns.count(f.mr.id) }))
            .groupBy((f) => f.m.id)
            .orderBy("title")
            .build()
    );
}