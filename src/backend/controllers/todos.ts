import type { NextApiRequest, NextApiResponse } from 'next'
import { todosRepository } from '~/backend/repository/todos'
import { z } from 'zod'
import { HttpNotFoundError } from '../infra/errors'

const findAll = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query
  const page = Number(query.page)
  const limit = Number(query.limit)

  if (query.page && isNaN(page)) {
    return res.status(400).json({ error: { message: 'Page is not a number' } })
  }

  if (query.limit && isNaN(limit)) {
    return res.status(400).json({ error: { message: 'Limit is not a number' } })
  }

  const response = await todosRepository.findAll({ page, limit })

  res.status(200).json({
    total: response.total,
    pages: response.pages,
    todos: response.todos,
  })
}

const postSchema = z.object({
  content: z.string(),
})

const createNew = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = postSchema.safeParse(req.body)

  if (!body.success) {
    return res.status(400).json({ error: { message: 'Missing content', description: body.error.issues } })
  }

  const todo = await todosRepository.createNew({ content: body.data.content })

  res.status(201).json({
    todo,
  })
}

const toggleDone = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const parsed = z.string().uuid().safeParse(id)

  if (!parsed.success) {
    return res.status(400).json({ error: { message: `This id ${id} is not valid` } })
  }

  await todosRepository
    .toggleDone({ id: parsed.data })
    .then((todo) => {
      return res.status(200).json({
        todo,
      })
    })
    .catch((error) => {
      if (error instanceof HttpNotFoundError) {
        return res.status(error.status).json({ error: { message: `Todo with id ${id} not found` } })
      }

      return res.status(500).json({ error: { message: 'Internal server error' } })
    })
}

const deleteById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const parsed = z.string().uuid().nonempty().safeParse(id)

  if (!parsed.success) {
    return res.status(400).json({ error: { message: `This id ${id} is not valid` } })
  }

  await todosRepository
    .deleteById({ id: parsed.data })
    .then(() => {
      return res.status(204).end()
    })
    .catch((error) => {
      if (error instanceof HttpNotFoundError) {
        return res.status(error.status).json({ error: { message: `Todo with id ${id} not found` } })
      }

      return res.status(500).json({ error: { message: 'Internal server error' } })
    })
}

export const todosController = {
  findAll,
  createNew,
  toggleDone,
  deleteById,
}
