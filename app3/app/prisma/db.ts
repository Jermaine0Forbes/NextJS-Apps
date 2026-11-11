import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };
import { createCritics } from './seeder';
import movieJson from '@/lib/movies.json' with {type: 'json'}

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: process.env['DATABASE_URL']!,
});


const user = createCritics();

export async function main () {
  await db.orm.public.Critic.createAll(user)
 console.log(user)
}

export function output()
{

  let movies = movieJson;
  movies.forEach((e, i) => {
    console.log(` movie ${i+1}: ${e.name}`)
  })
  
}


// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await db.close()
//   })
