import { Card, TextField, Container, Text, Flex } from "@radix-ui/themes"

type MovieCardProps = {
    title: string, 
    year: number,
    genre: string | null,
    rating: number | null, 
    reviews: number,

}

export default function MovieCard({title, year, genre, rating, reviews}: MovieCardProps) {
    return (
        <Card>
            <Flex justify="between">
                {/* <div><Text weight="bold">Movie</Text></div>
                <div><Text weight="bold">Genre</Text></div>
                <div><Text weight="bold">Year</Text></div>
                <div><Text weight="bold">Rating</Text></div>
                <div><Text weight="bold">Reviews</Text></div> */}
                <div><Text weight="bold">{title}</Text></div>
                <div><Text weight="bold">{genre}</Text></div>
                <div><Text weight="bold">{year}</Text></div>
                <div><Text weight="bold">{rating}</Text></div>
                <div><Text weight="bold">{reviews}</Text></div>
            </Flex>
        </Card>
    )
}