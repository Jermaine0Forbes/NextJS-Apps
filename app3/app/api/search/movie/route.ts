import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Example URL: /api/search/movie?title=nextjs&year=10&rating=highest&genre=horror
  const searchParams = request.nextUrl.searchParams;
  
  const title = searchParams.get('title') ?? null; // 
  const year = searchParams.get('year') ??  null; // "10"
  const rating = searchParams.get('rating') ??  null; // "10"
  const genre = searchParams.get('genre') ??  null; // "10"

  return NextResponse.json({ title, year, rating, genre });
}
