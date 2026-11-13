import { Movie } from "@/lib/types"
import { Card, TextField, Container, Text,  Flex } from "@radix-ui/themes"
import MovieCard from "./movie-card";

type MovieListProps = {
    list: Array<Movie & {rating: number | null, reviews: number, genre: string|null}>
}

export default function MovieList({list}:MovieListProps) {
  return (
    <Container>
        {
            list.map((movie, i) => (<MovieCard key={i} {...movie}/>) )
        }
    </Container>
  )
}