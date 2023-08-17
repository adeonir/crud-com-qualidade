import { read, create, updateById } from '~/crud'
import type { Todo } from '~/schema/todo'

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

type ToggleDoneParams = {
  id: string
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

const toggleDone = async ({ id }: ToggleDoneParams): Promise<Todo> => {
  const todo = read().find((todo) => todo.id === id)

  if (!todo) {
    throw new Error('Todo not found')
  }

  return updateById(todo.id, { done: !todo.done })
}

export const todosRepository = {
  get,
  post,
  toggleDone,
}
