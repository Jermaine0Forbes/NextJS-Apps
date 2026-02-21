'use server'

export async function registerUser(formData: FormData): Promise<any>{
    return await fetch("url",  {
        headers :{
            method: "POST"
        },
        body:formData
    })

}