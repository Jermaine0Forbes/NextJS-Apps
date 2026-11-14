import { NonNullProp } from "./types"

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