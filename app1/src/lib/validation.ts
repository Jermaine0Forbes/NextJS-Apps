'use server'


import * as z from "zod";



export const registerSchema = z.object({
    email: z.email().trim(),
    username:z.string().min(3).trim(),
    password: z.string().min(3).trim(),
})