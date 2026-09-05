import { redirect } from 'next/navigation';

export async function registerUser(prevstate: object, e: FormData) {
    // const data = new FormData(e);
    const data = JSON.stringify(Object.fromEntries(e));

    console.log(data)

    return await fetch("/api/register", {
        method: "POST",
        body: data
    })
        .then(res => res.json())
        .catch(res => console.error(res.message))
}

export async function loginUser(prevState: object, e: FormData) {

    const data = JSON.stringify(Object.fromEntries(e));

    console.log(data)

    const resp = await fetch("/api/login", {
        method: "POST",
        body: data
    })
        .then(res => res.json())
        .catch(res => console.error(res))

    if (!resp?.ok) return resp;

    console.log("fetch returned")
    console.log(resp)

    if (["ADMIN", "SUPER_ADMIN"].includes(resp.user.role.name)) {
        redirect("/admin");
    }

    redirect("/dashboard");
}

export async function logoutUser() {
    await fetch("api/logout", {
        method: "POST"
    });

}