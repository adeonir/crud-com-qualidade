import { read, create } from '~/crud'

type Todo = {
  id: string
  content: string
  date: string
  done: boolean
}

type GetParams = {
  page?: number
  limit?: number
}

type GetResponse = {
  todos: Todo[]
  total: number
  pages: number
}

type PostParams = {
  content: string
}

const get = ({ page, limit }: GetParams = {}): GetResponse => {
  const todos = read().reverse()
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

const post = async ({ content }: PostParams): Promise<Todo> => {
  const todo = create(content)
  return todo
}

export const todosRepository = {
  get,
  post,
}
