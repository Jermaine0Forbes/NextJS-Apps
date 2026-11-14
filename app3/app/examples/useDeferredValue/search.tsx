"use client"
import { Card, TextField, Container, Select } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import "@radix-ui/themes/styles.css";
import { useState, useEffect } from "react";
import { searchMovies} from "@/actions";
import { SearchContext, consumeContext, SearchContextType } from "./movie-search";

type SearchProps = {
    genres: Array<string>
}
export default function Search(children: SearchProps) {
    const { genres } = children;
    const [movie, setMovie] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [ searchQuery, setSearchQuery] = useState<string>('');
    const params = new URLSearchParams({
        title: movie,
        genre: genre
    });

    const {setList} = consumeContext<SearchContextType>(SearchContext);

    useEffect(() => {

        if(searchQuery){
        const fetch = async () => {
          const result = await searchMovies(searchQuery)
          setList([...result])
            console.log(result)
        };
            fetch();
        }

    }, [searchQuery, setList])

    const handleSearchParams = (value: string, type: string = "movie") => {
        if (type == "movie") {
            setMovie(value)
            params.set('title', value)
            if (value == "") params.delete('title')
        } else {
            setGenre(value);
            console.log("genre = " + genre)
            params.set('genre', value)
            if (value == "") params.delete('genre')
        }
        const query = params.toString();
        setSearchQuery(query)
        console.log(query)

    }
    return (
        <Card>
            <Container >
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                        <TextField.Root placeholder="Search for movies..." value={movie} onChange={(e) => handleSearchParams(e.target.value)}>
                            <TextField.Slot><MagnifyingGlassIcon /></TextField.Slot>
                        </TextField.Root>
                    </div>
                    <div className="col">
                        <Select.Root onValueChange={(e) => handleSearchParams(e, "genre")} >
                            <Select.Trigger placeholder="Genres" className="w-full" style={{ width: '100%' }} />
                            <Select.Content>
                                <Select.Group>
                                    <Select.Item value="">No Genre</Select.Item>
                                    {
                                        genres.length > 0 ?
                                            genres.map((genre: string, i: number) => (<Select.Item value={genre} key={i}>{genre}</Select.Item>))
                                            :
                                            (
                                                <Select.Item value="">No genres at the moment</Select.Item>
                                            )
                                    }

                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </div>

                </div>
            </Container>
        </Card>
    )
}