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

    return await fetch("/api/login", {
        method: "POST",
        body: data
    })
        .then(res => res.json())
        .then(res => {
            if (!res?.ok) return res;

            console.log("fetch returned")
            console.log(res)

            if (["ADMIN", "SUPER_ADMIN"].includes(res.user.role.name)) {
                redirect("/admin");
            }

            redirect("/dashboard");
        })
        .catch(res => console.error(res))
}

export async function logoutUser() {
    await fetch("api/logout", {
        method: "POST"
    });

}