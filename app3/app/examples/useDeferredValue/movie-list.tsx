import { Movie, MovieCardProps } from "@/lib/types"
import { Card, TextField, Container, Text, Flex, Table, Spinner } from "@radix-ui/themes"
import MovieCard from "./movie-card";
import { useContext, useDeferredValue, useRef, useEffect, use, Suspense } from "react";
import { SearchContext, consumeContext, SearchContextType } from "./movie-search";

type MovieListProps = {
    list: Array<Movie & { rating: number | null, reviews: number }>
}



export default function MovieList() {

    const { list, searchQuery, fetching } = consumeContext<SearchContextType>(SearchContext);
    const defer = useDeferredValue(searchQuery);
    const isStale = defer != searchQuery;
    const startTime = useRef(0);


    useEffect(() => {
        if (isStale && startTime.current === null) {
            startTime.current = performance.now();
        }

        // Detect when deferred value catches up
        if (!isStale && startTime.current !== null) {
            const elapsed = performance.now() - startTime.current;
            console.log(`stale time: ${(elapsed / 100000000).toFixed(2)} seconds `)

            startTime.current = 0;
        }

    }, [isStale, startTime])




    return (
        <Container>
            <Card>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Movie</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Genre</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Year</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Rating</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell> Reviews</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body className={isStale || fetching ? "animate-pulse blur-md" : "foo  "}>
                        
                            {
                                list.map((movie: MovieCardProps, i: number) => (<MovieCard key={i} {...movie} />))
                            }

                    </Table.Body>
                </Table.Root>
            </Card>
        </Container>
    )
}