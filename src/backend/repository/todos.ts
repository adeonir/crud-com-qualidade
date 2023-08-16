import { read } from '~/crud'

type GetParams = {
  page?: number
  limit?: number
}

type GetResponse = {
  todos: Todo[]
  total: number
  pages: number
}

type Todo = {
  id: string
  content: string
  date: string
  done: boolean
}

const get = ({ page, limit }: GetParams = {}): GetResponse => {
  const todos = read()
  const currentPage = page || 1
  const currentLimit = limit || 10

  const start = (currentPage - 1) * currentLimit
  const end = currentPage * currentLimit

  return {
    todos: todos.slice(start, end),
    total: todos.length,
    pages: Math.ceil(todos.length / currentLimit),
  }
}
export const todosRepository = {
  get,
}
