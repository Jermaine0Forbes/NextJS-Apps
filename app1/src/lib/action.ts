'use server'
import { validateRegister } from "./validation"

export async function registerUser( prevState: FormData|null , formData: FormData): Promise<any>{

    console.log('form data')
    console.log(formData)
    const result =  await validateRegister(formData);

    if(!result.success) {

        return { values: Object.fromEntries(formData.entries()),  errors: result.error.flatten().fieldErrors};
    }




    // return await fetch("url",  {
    //     headers :{
    //         method: "POST"
    //     },
    //     body:formData
    // })

}