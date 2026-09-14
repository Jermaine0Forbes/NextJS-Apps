
import { GET_QUOTES } from "@/graphql/requests";
import { gqj, get } from "@/graphql/utils";

export async function getQuotes()
{
    const data =   gqj(GET_QUOTES);
    if(typeof data != "string") throw new Error("query data for getting quotes is not  astring");

    // const accept = {
    //         "Accept": "application/json"
    //         // "Accept": "application/graphql-response+json"
    // }

    // const accept2 = {
    //         "Accept": "application/graphql-response+json"
    // }

    const content = {
        "Content-Type": "application/json"
    }
    return await fetch("/api/graphql", {
        method: "POST",
        headers: content,
        body: data
    });
}
