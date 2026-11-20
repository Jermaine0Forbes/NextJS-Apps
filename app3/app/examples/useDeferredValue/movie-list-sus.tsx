import { Movie, MovieCardProps } from "@/lib/types"
import { Card, TextField, Container, Text, Flex, Table, Spinner, Grid, Box, Heading, Button, ScrollArea, Separator } from "@radix-ui/themes"
import MovieCard from "./movie-card";
import { useContext, useDeferredValue, useRef, useEffect, Suspense, use, useState } from "react";
import { SearchContext, consumeContext, SearchContextType } from "./movie-search-sus";
import { faker } from "@faker-js/faker";

const { internet, helpers, lorem, date, number: num } = faker;
// type MovieListProps = {
//     list: Array<Movie & { rating: number | null, reviews: number }>
// }

function ChatRoom() {

    const createChat = (amount: number = 100) => Array.from({ length: amount }, (val, i) => ({
        user: internet.displayName(),
        message: lorem.lines({ min: 1, max: 2 }),
        time: date.recent(),
    }));
    const [messages, setMessages] = useState(createChat());
    const counter: any = useRef(0);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (counter.current == 0) {
            const id = setInterval(() => {
                const m = createChat();
                setMessages([...m, ...messages])
            }, 5000)
            counter.current = id;
            
        }

        // return () => clearInterval(counter.current);
    }, [counter, setMessages, createChat])

    const stopChat = () => {
        console.log('foo')
        clearInterval(counter.current);
       setDisabled(true)
    }


    return (
        <Box>
            <Flex direction="column" align="center" gap="2">
                <Heading>ChatRoom</Heading>

            </Flex>
            <ScrollArea scrollbars="vertical" style={{ height: 180 }}>
                {
                    messages.map((msg, i) => (
                        <Box key={i} className="mb-2">
                            <Text weight="medium">{msg.user}</Text>
                            <Text className="italic text-sm block pb-2" weight="light">{msg.message}</Text>
                            <Separator className="w-full" size="4"/>
                        </Box>
                    ))
                }
            </ScrollArea>
            <Flex align="center" justify={"center"} className="my-2">
                <Button onClick={stopChat} disabled={disabled}>Stop Chat</Button>

            </Flex>
        </Box>
    )
}



export default function MovieListSus() {

    const { list, searchQuery, fetching } = consumeContext<SearchContextType>(SearchContext);
    const defer = useDeferredValue(searchQuery);
    const isStale = defer != searchQuery;
    const startTime = useRef(0);


    useEffect(() => {
        if (isStale && startTime.current === 0) {
            startTime.current = performance.now();
        }

        // Detect when deferred value catches up
        if (!isStale && startTime.current !== null) {
            const elapsed = performance.now() - startTime.current;
            console.log(`stale time: ${(elapsed / 10000).toFixed(2)} seconds `)
            //   console.log(`stale time: ${(elapsed /100000000).toFixed(2)} seconds `)

            startTime.current = 0;
        }

    }, [isStale, startTime])


    // const movies: Array<MovieCardProps> | null = fetching ? use(fetching) : null;

    const Loading = () => (

        <Flex align="center">
            <Spinner size="2" />
        </Flex>
    );

    const List = () => {
        const movies: Array<MovieCardProps> | null = fetching ? use(fetching) : null;
        return (
            movies != null && movies.map((movie: MovieCardProps, i: number) => (<MovieCard key={i} {...movie} />))
        )
    }

    return (
        <Container>
            <Grid columns={{ initial: "1fr", md: "3fr 1fr" }} className="" gap="4">
                <Card>
                    <Suspense fallback={<Loading />}>
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
                            <Table.Body className={isStale ? "animate-pulse blur-md" : "foo  "}>
                                <List />
                                {/* {
                                                movies != null && movies.map((movie: MovieCardProps, i: number) => (<MovieCard key={i} {...movie} />))

                                } */}
                            </Table.Body>
                        </Table.Root>
                    </Suspense>
                </Card>
                <Card>
                    <ChatRoom />
                </Card>
            </Grid>
        </Container>
    )
}