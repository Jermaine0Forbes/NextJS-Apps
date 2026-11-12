import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };
import { createCritics, createMovies, createCriticReviews } from './seeder';
import movieJson from '@/lib/movies.json' with {type: 'json'}
import { pluck } from '@/lib/helpers';

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: process.env['DATABASE_URL']!,
});


const user = createCritics();

export async function main() {
  await db.orm.public.Critic.createAll(user)
  console.log(user)
}

export function output() {

  let movies = movieJson;
  movies.forEach((e, i) => {
    console.log(` movie ${i + 1}: ${e.name}`)
  })

}

export async function seedData() {
  let result = await db.transaction(async (tx) => {
    try {
      const { total } = await tx.orm.public.Movie.aggregate((a) => ({ total: a.count() }));
      const r = await pluck("id", await tx.orm.public.Critic.select('id').all());
      console.log(r)
      console.log(`movie count: ${total}`)

      if (total > 0) {
        throw new Error('Movies have already been inserted')
      }

      const critics = createCritics(500);
      const criticCount = await tx.orm.public.Critic.createAndCount(critics);

      if (criticCount == 0) {
        throw new Error('Critics have not been inserted')
      }
      const movies = createMovies(movieJson);
     const movieCount = await tx.orm.public.Movie.createAndCount(movies)
     
       console.log(`movie count: ${movieCount}`)
       if (movieCount == 0) {
         throw new Error('Movies have not been inserted')
       }
 
 



    } catch (e) {
      console.log(e)
    }

  });
  console.log('the results')
  console.log(result)

  result =  await db.transaction(async (tx) => { 
    try{
      const { movies } = await tx.orm.public.Movie.aggregate((a) => ({ movies: a.count() }));
      const { critics } = await tx.orm.public.Critic.aggregate((a) => ({ critics: a.count() }));
      let { reviews } = await tx.orm.public.MovieReview.aggregate((a) => ({ reviews: a.count() }));

      if(movies == 0 || critics == 0 || reviews > 0){
        throw new Error("Movie reviews cannot be created")
      }

      const r = await createCriticReviews(critics);
       const reviewCount = await tx.orm.public.MovieReview.createAndCount(r);
 
 
       if (reviewCount == 0) {
         throw new Error('Movie reviews have not been inserted')
       }


    } catch(e) {
      console.error(e)
    }



  })

  console.log('movie review results')
  console.log(result)

}


// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await db.close()
//   })
