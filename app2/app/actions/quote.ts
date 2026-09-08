
import { GET_QUOTES } from "@/graphql/requests";

export async function getQuotes()
{
    const data = JSON.stringify({
        query: GET_QUOTES
    })
    return await fetch("/api/graphql", {
        method: "GET",
        body: data
    });
}
