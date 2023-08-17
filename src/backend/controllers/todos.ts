import type { NextApiRequest, NextApiResponse } from 'next'
import { todosRepository } from '~/backend/repository/todos'
import { z } from 'zod'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query
  const page = Number(query.page)
  const limit = Number(query.limit)

  if (query.page && isNaN(page)) {
    return res.status(400).json({ error: { message: 'Page is not a number' } })
  }

  if (query.limit && isNaN(limit)) {
    return res.status(400).json({ error: { message: 'Limit is not a number' } })
  }

  const response = todosRepository.get({ page, limit })

  res.status(200).json({
    total: response.total,
    pages: response.pages,
    todos: response.todos,
  })
}

const postSchema = z.object({
  content: z.string(),
})

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = postSchema.safeParse(req.body)

  if (!body.success) {
    return res.status(400).json({ error: { message: 'Missing content', description: body.error.issues } })
  }

  const todo = await todosRepository.post({ content: body.data.content })

  res.status(201).json({
    todo,
  })
}

export const todosController = {
  get,
  post,
}
