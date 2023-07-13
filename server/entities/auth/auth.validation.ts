import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    email: z.string(),
    password: z.string(),
    username: z.string()
})

export const authValidation = {
    login: z.object({ 
        email: z.string(), 
        password: z.string()
    }),
    register: z.object({
        email: z.string().nonempty('Email is required'),
        password: z.string().nonempty('Password is required'),
        username: z.string(),
    })
}