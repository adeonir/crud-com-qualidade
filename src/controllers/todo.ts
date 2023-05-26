import type { NextApiRequest, NextApiResponse } from 'next'
import { read } from '~/crud'

const get = (_req: NextApiRequest, res: NextApiResponse) => {
  const todos = read()
  res.status(200).json({ todos })
}

export const todoController = {
  get,
}
