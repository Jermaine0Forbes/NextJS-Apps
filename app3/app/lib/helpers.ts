import { NonNullProp } from "./types"

export async function pluck<T> (column: string, data: Array<T>)
{
return data.map((item  ) => ( ( item as Record<string, unknown>)[column] !== null && ( item as Record<string, unknown>)[column] ))
    
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