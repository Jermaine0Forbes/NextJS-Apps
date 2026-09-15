export const GET_QUOTES = `
 query { quotes{
     id
     message
     user {
        id
        name
        email
        role{
         name
        }
     }
     createdAt
    }
}
`;


export const GET_USER_QUOTES = `
 query { userQuotes{
     id
     message
     user {
        id
        name
     }
     createdAt
    }
}
`;