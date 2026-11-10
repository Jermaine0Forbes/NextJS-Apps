import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };
import { createCritic } from './seeder';

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: process.env['DATABASE_URL']!,
});


const user = createCritic();

export async function main () {
  await db.orm.public.Critic.create(user)
 console.log(user)
}


// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await db.close()
//   })
