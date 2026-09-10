"use client"
import { getQuotes } from "@/actions/quote"
import {useEffect, useState} from "react";


export default function QuoteList()
{
    useEffect(() => {
        const initQuotes = async () => {
            const result = await getQuotes();
            console.log(result)
        }

        initQuotes();
    },[])

    return(
        <section>
            lists
        </section>
    )
}