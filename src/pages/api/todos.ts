import type { NextApiRequest, NextApiResponse } from 'next'

import { todosController } from '~/backend/controllers/todos'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return todosController.get(req, res)
  }

  if (req.method === 'POST') {
    return todosController.post(req, res)
  }

  res.status(405).json({ message: 'Method not allowed' })
}
