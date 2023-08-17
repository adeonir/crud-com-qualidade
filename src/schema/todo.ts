import { z } from 'zod'

export const TodoSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  date: z.string().datetime(),
  done: z.boolean(),
})

export type Todo = z.infer<typeof TodoSchema>
