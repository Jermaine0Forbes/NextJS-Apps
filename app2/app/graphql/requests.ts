export const GET_QUOTES = `
 query{
    quotes{
     id
     message
     user {
        id
        name
     }
     favorites
     createdAt
    }
 }
`;