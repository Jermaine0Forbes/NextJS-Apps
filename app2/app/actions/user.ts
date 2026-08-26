

export async function registerUser(e:FormData)
{
    // const data = new FormData(e);
    const data = JSON.stringify(Object.fromEntries(e));

    console.log(data)

    await fetch("/api/register", {
        method: "POST",
        body: data
    })
    .then(res => res.json())
    .catch(res => console.error(res.message))
}