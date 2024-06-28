import {z} from 'zod'

export const MessageSchema = z.object({
   content:z.string()
   .min(10,{message:"message must be in 10 charracter"})
   .max(300,{message:"Message is not exceeded from 300"})
})