"use server"
import { db } from "@/prisma/db";
import { pluck, replaceNull } from "@/lib/helpers";
import { Critic, Movie } from "@/lib/types";

export async function searchMovies() {
   return await fetch('http:localhost:3000/api/search/movie?title=t&year=2014&genre=Drama')
        .then(resp => resp.json())
        .then(resp => console.log(resp))
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

    return await pluck<Pick<Critic, "name">>('name', rows);
}

export async function getGenres() {
    const rows = replaceNull(
        await db.orm.public.Movie
        .select('genre')
        .distinct('genre')
        .where((m) => m.genre.isNotNull())
        .all(),
        'genre',
        'missing'
    );

    return await pluck<Pick<Movie, 'genre'>>('genre', rows);
}

export async function getMovieNames() {
    return await pluck('title', await db.orm.public.Movie.select('title').all());
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