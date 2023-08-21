import type { NextApiRequest, NextApiResponse } from 'next'
import { todosController } from '~/backend/controllers/todos'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    return await todosController.toggleDone(req, res)
  }

  res.status(405).json({ error: { message: 'Method not allowed' } })
}
