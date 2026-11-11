import { faker } from "@faker-js/faker";
import { Critic, Movie, MovieReview } from "@/lib/types";
const { internet, helpers, lorem, date, number: num } = faker;

export function createCritics(amount: number = 1) {

    let i: number;
    let name: string;

    return Array.from({ length: amount }, (v, k) => {

        i = num.int(amount * 100);
        name = internet.username();

        return {
            username: name + i,
            name: name + i,
            email: name + i + "@gmail.com",
            createdAt: date.between({
                from: new Date(2020, 0, 1),
                to: new Date(2020, 11, 31)
            }),

        }

    }

    )
}

export function createMovies(json: Array<Movie>) {
    return json.map((movie) => ({
        title: movie.title,
        year: movie.year,
        genre: movie?.genre,
        createdAt: new Date(movie.year, 0, 1)
    }));
}

export async function findUniqueId(Ids: Array<number>) {
    const id = num.int({ min: 1, max: 100 });
    if (Ids.includes(id)) {
        console.log('recursive')
        return findUniqueId(Ids)
    }

    return id;

}

export async function getUniqueArr(arrLength:number) {
    const arr: number[] = [];
        Array.from({ length: arrLength }, (v, i) => i).forEach(  async () => {
        arr.push(await findUniqueId(arr))
    });
    return arr;
}

export async function x(userCount: number = 5) {
    let movieIds: number[] = [];
    let movieReviews: MovieReview[] = []
    
    console.log(movieIds.sort())
    for (let i = 0; i < userCount; i++) {
        let id = i + 1;
        let len = num.int({ min: 1, max: 10 });
        console.log(`array amount: ${len}`);
        movieIds = await getUniqueArr(len);
        let reviews = await createMovieReviews(movieIds, id)
        movieReviews = [...movieReviews, ...reviews]
    }
    console.log('movie reviews')
    console.log(movieReviews)

}

export async function createMovieReviews(movies: Array<number>, criticId: number) {
    return movies.map((v) => ({
        rating: num.int({ min: 1, max: 5 }),
        comment: lorem.paragraph({ min: 2, max: 10 }),
        movieId: v,
        criticId: criticId,
        createdAt: date.between({
            from: new Date(2021, 0, 1),
            to: new Date(), 
        }),
    }))
}