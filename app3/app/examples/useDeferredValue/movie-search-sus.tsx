"use client"
import SearchSus from "@/examples/useDeferredValue/search-sus";
import MovieListSus from "@/examples/useDeferredValue/movie-list-sus";
import { useContext, createContext, useState} from "react";

type MovieSearchProps = {
    genreList: any,
    movieList: any,
}

export type SearchContextType = {
    list: any,
    setList: any,
    searchQuery: string, 
    setSearchQuery: any,
    fetching: any,
    setFetching: any,
}

export function consumeContext<T>(contextType: any):  T{
    const context: T = useContext(contextType);
    if(!context) throw new Error('No context provided');
    
    return context;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default function MovieSearchSus({ genreList, movieList }: MovieSearchProps) {
    const [list, setList] = useState(movieList);
     const [ searchQuery, setSearchQuery] = useState<string>('');
     const [fetching, setFetching] = useState(null)
    return (
        <section>
            <SearchContext.Provider value={{ list, setList, searchQuery, setSearchQuery, fetching, setFetching }}>
                <SearchSus genres={genreList} />
                <MovieListSus  />
            </SearchContext.Provider>
        </section>
    )
}