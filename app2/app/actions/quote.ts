
import { GET_QUOTES } from "@/graphql/requests";
import { gqj } from "@/graphql/utils";

export async function getQuotes()
{
    const data =  gqj(GET_QUOTES);

    return await fetch("/api/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    });
}
