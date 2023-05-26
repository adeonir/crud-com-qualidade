import type { NextApiRequest, NextApiResponse } from 'next'
import { read } from '~/crud'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const todos = read()
    res.status(200).json({ todos })
    return
  }

  res.status(405).json({ message: 'Method not allowed' })
}
