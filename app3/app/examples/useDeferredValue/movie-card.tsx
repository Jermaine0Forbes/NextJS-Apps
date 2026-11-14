import { Card, TextField, Container, Text, Flex, Table } from "@radix-ui/themes"

type MovieCardProps = {
    title: string, 
    year: number,
    genre: string | null,
    rating: number | null, 
    reviews: number,

}

export default function MovieCard({title, year, genre, rating, reviews}: MovieCardProps) {
    const avgRating = typeof rating == "number" ? rating.toFixed(1) : 0;
    return (
        <Table.Row>
            <Table.RowHeaderCell > <Text weight="bold">{title}</Text></Table.RowHeaderCell>
            <Table.Cell><Text >{genre}</Text></Table.Cell>
            <Table.Cell><Text>{year}</Text></Table.Cell>
            <Table.Cell><Text >{avgRating}/5</Text></Table.Cell>
            <Table.Cell><Text >{reviews}</Text></Table.Cell>
        </Table.Row>

    )
}