import { encode } from "punycode";

export function graphQLJson(query: string, variables: object | null = null, getRequest: boolean = true): string | Record<string,string> {
    if (getRequest) {
        if (variables != null && Object.keys(variables).length > 0) {
            return {
                query: query,
                variables: JSON.stringify(variables),
            }
        }

        return {
            query: query,
        };

    }
    if (variables != null && Object.keys(variables).length > 0) {
        return JSON.stringify({
            query: query,
            variables: variables
        })
    }

    return JSON.stringify({
        query: query,
    })


}

export function get(query: string, variables: object | null = null) {
    // const data = graphQLJson(query, variables);
    // const params = new URLSearchParams(data);
    // return `/api/graphql/?${params.toString()}`;

        // const data = graphQLJson(query, variables);
    const params =  encodeURIComponent(query);
    return `/api/graphql/?query=${params}`;
}

export const gqj = graphQLJson;