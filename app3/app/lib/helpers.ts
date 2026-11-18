import { NonNullProp } from "./types"
import { setTimeout as sleep } from 'node:timers/promises';

export function pluck<T, K> (column: string, data: Array<T>): Array<K>
{
return data.map((item  ) => ( ( item as Record<string, K>)[column] ))
    
}

export function replaceNull<T extends object, K extends keyof T>(
  rows: T[],
  key: K,
  fallback: NonNullable<T[K]>
): NonNullProp<T, K>[] {
  return rows.map((row) => ({
    ...row,
    [key]: row[key] ?? fallback,
  })) as NonNullProp<T, K>[];
}

export async function wait()
{
  const randomInt = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  await sleep(randomInt); 
  console.log('wait over');
}