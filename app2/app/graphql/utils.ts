
export function graphQLJson(query: string, variables: object | null = null): string
{
    if(variables != null && Object.keys(variables).length > 0 )
    {
        return JSON.stringify({
            query: query,
            variables: variables
        })
    }

        return JSON.stringify({
            query: query,
        })


}

export const gqj = graphQLJson;