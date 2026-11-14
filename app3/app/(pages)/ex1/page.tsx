"use server";
import Search from "@/examples/useDeferredValue/search";
import MovieList from "@/examples/useDeferredValue/movie-list";
import "@radix-ui/themes/styles.css";
import { getUserNames, queryMovies, searchMovies, getGenres } from "@/actions";
import { Heading } from "@radix-ui/themes";

export default async function Example1()
{
    await searchMovies();

        const movieList = await queryMovies();
        const genreList = await getGenres();

    console.log('genres');
        console.log(genreList);
        // console.log(movieList);



    return(
        <main className="bg-gray-300 min-h-screen">
          <h1 className="font-bold text-xl bg-white">useDeferredValue</h1>
           <Search/>
           <MovieList list={movieList}/>
        </main>
    )
}