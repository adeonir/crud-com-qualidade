import type { NextApiRequest, NextApiResponse } from 'next'
import { todosRepository } from '~/backend/repository/todos'

const get = (req: NextApiRequest, res: NextApiResponse) => {
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

export const todosController = {
  get,
}
