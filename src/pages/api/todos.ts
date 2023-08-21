import type { NextApiRequest, NextApiResponse } from 'next'

import { todosController } from '~/backend/controllers/todos'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return await todosController.findAll(req, res)
  }

  if (req.method === 'POST') {
    return await todosController.createNew(req, res)
  }

  res.status(405).json({ error: { message: 'Method not allowed' } })
}
