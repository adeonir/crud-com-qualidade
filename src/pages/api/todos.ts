import type { NextApiRequest, NextApiResponse } from 'next'

import { todosController } from '~/controllers/server/todos'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    todosController.get(req, res)
    return
  }

  res.status(405).json({ message: 'Method not allowed' })
}
