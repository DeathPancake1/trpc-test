import { z } from "zod";

export const todoSchema = z.object({
    id: z.number(),
    title: z.string(),
    finished: z.boolean()
})

export const todoValidation = {
    addTodo: z.object({ 
        authorId: z.number(), 
        title: z.string().nonempty('Title should not be empty') 
    }),
    getTodos: z.object({
        authorId: z.number()
    })
}