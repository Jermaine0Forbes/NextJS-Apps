"use server";
import Search from "@/examples/useDeferredValue/search";
import MovieList from "@/examples/useDeferredValue/movie-list";
import "@radix-ui/themes/styles.css";
import { getUserNames, queryMovies } from "@/actions";
import { Heading } from "@radix-ui/themes";

export default async function Example1()
{


        const movieList = await queryMovies();
        console.log(movieList);



    return(
        <main className="bg-gray-300 h-screen">
          <h1 className="font-bold text-xl bg-white">useDeferredValue</h1>
           <Search/>
           <MovieList list={movieList}/>
        </main>
    )
}