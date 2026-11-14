import { Movie } from "@/lib/types"
import { Card, TextField, Container, Text, Flex, Table } from "@radix-ui/themes"
import MovieCard from "./movie-card";

type MovieListProps = {
    list: Array<Movie & { rating: number | null, reviews: number }>
}

export default function MovieList({ list }: MovieListProps) {
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
                    <Table.Body>
                        {
                            list.map((movie, i) => (<MovieCard key={i} {...movie} />))
                        }

                    </Table.Body>

                </Table.Root>

            </Card>
        </Container>
    )
}