export async function pluck<T> (column: string, data: Array<T>)
{
return data.map((item  ) => ( ( item as Record<string, unknown>)[column]))
    
}