import { NextRequest, NextResponse } from 'next/server';
import { or, and } from "@prisma/orm-postgres/orm-client";
import { db } from '@/prisma/db';

export async function GET(request: NextRequest) {
  // Example URL: /api/search/movie?title=nextjs&genre=horror
  const searchParams = request.nextUrl.searchParams;

  const title = searchParams.get('title') ?? null;
  const genre = searchParams.get('genre') ?? null;

  const whereArgs = (f: any, fns: any) => fns.and(...[
    ...(title ? [fns.ilike(f.title, `${title}%`)] : []),
    ...(genre ? [fns.eq(f.genre, genre)] : []),
  ]);
  // const whereArgs = (f:any, fns: any) => fns.and(
  //   title && fns.ilike(f.title,`%${title}%`) ,
  //   year && fns.eq(f.year, year) ,
  //   genre && fns.eq(f.genre, genre) ,
  // );

  const queryMovies = db.sql.public.Movie.as('m')
    .innerJoin(db.sql.public.MovieReview.as('mr'), (f, fns) => fns.eq(f.m.id, f.mr.movieId))
    .select((f, fns) =>
      ({ id: f.m.id, title: f.m.title, year: f.m.year, genre: f.m.genre, rating: fns.avg(f.mr.rating), reviews: fns.count(f.mr.id) }))
    .where(whereArgs)
    .groupBy((f) => f.m.id)
    .orderBy((f) => f.title, { direction: 'asc' })
    .build()

  const result = await db.query(queryMovies);

  return NextResponse.json(result);
}
