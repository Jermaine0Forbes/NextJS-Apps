"use client"
import { getUserQuotes } from "@/actions/quote"
import { useEffect, useState } from "react";
import { Box, Card, Quote, Text, Flex, Spinner } from "@radix-ui/themes";
import { QuoteResponse, Quote as IQuote, Quotes } from "@/lib/definitions";


export default function UserQuoteList() {
    const [quotes, setQuotes] = useState<Quotes | null>(null);
    useEffect(() => {
        const initQuotes = async () => {
            const result = await getUserQuotes();
            console.log(result)
            if (result.ok) {
                const {data:{userQuotes}} : QuoteResponse = await result.json()
                setQuotes(userQuotes)
            }
        }

        initQuotes();
    }, [])

    return (
        <section>
            <Box>
                {
                    Array.isArray(quotes) && quotes.length > 0 &&
                       ( quotes?.map((e: IQuote, i: number) => (
                            <Card key={i} className="mb-3">
                                <Quote>{e.message}</Quote>
                                <Flex>
                                <Text size="2" weight={'bold'} className="mr-3">{e.user.name}</Text>

                                </Flex>
                                <Text size="2">{(new Intl.DateTimeFormat('en-US', {dateStyle: "short"})).format( new Date(e.createdAt))}</Text>
                            </Card>

                        )))
                        
                }

                {
                    Array.isArray(quotes) && quotes.length == 0 && (

                        <p>There are no quotes at this time</p>

                    )

                }

                {
                    quotes === null && (
                        <Spinner/>
                    )
                }

            </Box>

        </section>
    )
}