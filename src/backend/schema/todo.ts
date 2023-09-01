import { z } from 'zod'

export const postSchema = z.object({
  content: z.string(),
})

export const todoSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  date: z.string().transform((date) => new Date(date).toISOString()),
  done: z.boolean(),
})

export type Todo = z.infer<typeof todoSchema>
