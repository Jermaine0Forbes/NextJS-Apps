'use server'
import * as z from "zod";


const registerSchema = z.object({
    email: z.email().trim(),
    username:z.string().min(3).trim(),
    password: z.string().min(3).trim(),
})

export async function validateRegister(formdata: FormData) {

    return await registerSchema.safeParseAsync({
        username: formdata.get('username'),
        email: formdata.get('email'),
        password: formdata.get('password')
    });
}