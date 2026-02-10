'use server'

export async function registerUser(formData: FormData) {
    return await fetch("url",  {
        headers :{
            method: "POST"
        },
        body:formData
    })

}