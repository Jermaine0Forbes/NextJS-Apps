
import { GET_QUOTES } from "@/graphql/requests";
import { gqj, get } from "@/graphql/utils";

export async function getQuotes()
{
    const api =  get(GET_QUOTES);
    console.log(api)
    return await fetch(api, {
        method: "GET",
        headers: {
            "Accept": "application/graphql-response+json"
        },
    });
}
