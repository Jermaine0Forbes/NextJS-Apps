"use client"
import { getQuotes } from "@/actions/quote"
import {useEffect, useState} from "react";
import {Box, Card, Quote, Text} from "@radix-ui/themes";
import { QuoteResponse } from "@/lib/definitions";


export default function QuoteList()
{
    const [ quotes, setQuotes] = useState<QuoteResponse | Array<object>>([]);
    useEffect(() => {
        const initQuotes = async () => {
            const result = await getQuotes();
            console.log(result)
            if(result.ok){
                
                setQuotes(await result.json())
            }
        }

        initQuotes();
    },[])

    return(
        <section>
            <Box>
                {
                    Array.isArray(quotes) && quotes.length === 0 ?
                    <p>There are no quotes at this time</p>
                    :
                    quotes?.data.map((e: object , i: number) => (
                        <Card key={i}>
                            {i}
                        </Card>

                    ) )
                }

            </Box>
           
        </section>
    )
}