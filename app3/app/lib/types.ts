export type Critic = {
    email: string,
    username: string,
    name: string,
    createdAt: string 

}

export type Movie = {
    title: string,
    genre: string,
    year: number,
    createdAt?: string
}


export type MovieReview =  {
    rating: number,
    comment?: string,
    criticId: number, 
    movieId: number,
    createdAt: Date |string
}