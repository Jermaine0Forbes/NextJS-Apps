
import { GET_QUOTES } from "@/graphql/requests";
import { gqj, get } from "@/graphql/utils";

export async function getQuotes()
{
    // const api =  get(GET_QUOTES);
    // const api = "/api/graphql?query={quotes}";
    const quotes = GET_QUOTES.replace(/\s/g,"");
    const q = `query{ quotes {id message user{id name email role } createdAt}}`;
    console.log(quotes)
    const api = `/api/graphql?query=${q}`;
    const accept = {
            "Accept": "application/json"
            // "Accept": "application/graphql-response+json"
    }

    const accept2 = {
            "Accept": "application/graphql-response+json"
    }

    const content = {
        "Content-Type": "application/json"
    }
    console.log(api)
    return await fetch("/api/graphql", {
        method: "POST",
        headers: content,
        body: JSON.stringify({
            query:GET_QUOTES
        })
    });
}
