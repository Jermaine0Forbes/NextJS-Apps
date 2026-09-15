
import { GET_QUOTES, GET_USER_QUOTES } from "@/graphql/requests";
import { gqj, configRequest } from "@/graphql/utils";

const content = {
    "Content-Type": "application/json"
}

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


    return await fetch("/api/graphql", {
        method: "POST",
        headers: content,
        body: data
    });
}


export async function getUserQuotes()
{  const init = configRequest(GET_USER_QUOTES);
    return await fetch("/api/graphql", init)
}
