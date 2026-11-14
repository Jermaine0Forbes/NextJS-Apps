"use client"
import Search from "@/examples/useDeferredValue/search";
import MovieList from "@/examples/useDeferredValue/movie-list";
import { useContext, createContext, useState } from "react";

type MovieSearchProps = {
    genreList: any,
    movieList: any,
}

export type SearchContextType = {
    list: any,
    setList: any,
}

export function consumeContext<T>(contextType: any):  T{
    const context: T = useContext(contextType);
    if(!context) throw new Error('No context provided');
    
    return context;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default function MovieSearch({ genreList, movieList }: MovieSearchProps) {
    const [list, setList] = useState(movieList);
    return (
        <section>
            <SearchContext.Provider value={{ list, setList }}>
                <Search genres={genreList} />
                <MovieList  />
            </SearchContext.Provider>
        </section>
    )
}