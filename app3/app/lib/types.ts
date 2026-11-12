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
    createdAt?: string,
}

export type MovieJson = {
    name: string,
    genre: string,
    year: number,
}

export type MovieReview = {
    rating: number,
    comment?: string,
    criticId: number,
    movieId: number,
    createdAt: Date 
}

export type NonNullProp<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: NonNullable<T[P]>;
};