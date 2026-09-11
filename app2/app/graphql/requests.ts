export const GET_QUOTES = `
 query quotes{
     id
     message
     user {
        id
        name
        email
        role
     }
     favorites
     createdAt
    }
 
`;