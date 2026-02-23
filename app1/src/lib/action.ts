'use server'
import { validateRegister } from "./validation"

export async function registerUser(formData: FormData): Promise<any>{

    return await validateRegister(formData);




    // return await fetch("url",  {
    //     headers :{
    //         method: "POST"
    //     },
    //     body:formData
    // })

}