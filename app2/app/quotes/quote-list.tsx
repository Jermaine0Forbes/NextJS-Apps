"use client"
import { getQuotes } from "@/actions/quote"
import { useEffect, useState } from "react";
import { Box, Card, Quote, Text, Flex } from "@radix-ui/themes";
import { QuoteResponse, Quote as IQuote, Quotes } from "@/lib/definitions";


export default function QuoteList() {
    const [quotes, setQuotes] = useState<Quotes | null>(null);
    useEffect(() => {
        const initQuotes = async () => {
            const result = await getQuotes();
            console.log(result)
            if (result.ok) {
                const {data:{quotes}} : QuoteResponse = await result.json()
                setQuotes(quotes)
            }
        }

        initQuotes();
    }, [])

    return (
        <section>
            <Box>
                {
                    Array.isArray(quotes) && quotes.length > 0 ?
                        quotes?.map((e: IQuote, i: number) => (
                            <Card key={i} className="mb-3">
                                <Quote>{e.message}</Quote>
                                <Flex>
                                <Text size="2" weight={'bold'} className="mr-3">{e.user.name}</Text>

                                </Flex>
                                <Text size="2">{(new Intl.DateTimeFormat('en-US', {dateStyle: "short"})).format( new Date(e.createdAt))}</Text>
                            </Card>

                        ))
                        :
                        <p>There are no quotes at this time</p>
                }

            </Box>

        </section>
    )
}