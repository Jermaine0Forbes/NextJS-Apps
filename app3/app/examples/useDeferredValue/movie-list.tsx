import { Movie, MovieCardProps } from "@/lib/types"
import { Card, TextField, Container, Text, Flex, Table } from "@radix-ui/themes"
import MovieCard from "./movie-card";
import { useContext, useDeferredValue } from "react";
import { SearchContext, consumeContext, SearchContextType } from "./movie-search";

// type MovieListProps = {
//     list: Array<Movie & { rating: number | null, reviews: number }>
// }



export default function MovieList() {

    const {list, searchQuery, fetching} = consumeContext<SearchContextType>(SearchContext);
    const defer = useDeferredValue(searchQuery);
    const isStale = defer != searchQuery;

    // console.log('defer ')
    // console.log(defer)
    // console.log('search')
    // console.log(searchQuery)

    console.log('is stale: '+isStale)


    
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
                    <Table.Body className={isStale || fetching? "animate-pulse blur-md": "foo  "}>
                        {
                            list.map((movie:MovieCardProps, i: number) => (<MovieCard key={i} {...movie} />))
                        }
                    </Table.Body>
                </Table.Root>
            </Card>
        </Container>
    )
}