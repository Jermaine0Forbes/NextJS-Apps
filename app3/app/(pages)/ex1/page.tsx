"use server";
import MovieSearch from "@/examples/useDeferredValue/movie-search";
import "@radix-ui/themes/styles.css";
import { queryMovies,  getGenres } from "@/actions";

export default async function Example1() {
    const movieList = await queryMovies();
    const genreList = await getGenres();

    return (
        <main className="bg-gray-300 min-h-screen">
            <h1 className="font-bold text-xl bg-white">useDeferredValue</h1>
            <MovieSearch movieList={movieList} genreList={genreList} />
        </main>
    )
}