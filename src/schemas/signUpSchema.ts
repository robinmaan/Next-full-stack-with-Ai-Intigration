import {z} from 'zod'

export const usernameValidation = z
   .string()
   .min(2,"username must be in 2 charracter")
   .max(20,"username is max in length")

export const signUpSchema = z.object({
    username: usernameValidation,
    email:z.string().email({message:"invalid email address"}),
    password: z.string().min(8)
})