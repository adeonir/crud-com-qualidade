import * as crud from '~/crud'
import type { Todo } from '~/schema/todo'

type FindAllParams = {
  page?: number
  limit?: number
}

type FindAllResponse = {
  todos: Todo[]
  total: number
  pages: number
}

type CreateNewParams = {
  content: string
}

type ToggleDoneParams = {
  id: string
}

const findAll = ({ page, limit }: FindAllParams = {}): FindAllResponse => {
  const todos = crud.findAll().reverse()
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

const createNew = async ({ content }: CreateNewParams): Promise<Todo> => {
  const todo = crud.createNew(content)
  return todo
}

const toggleDone = async ({ id }: ToggleDoneParams): Promise<Todo> => {
  const todo = crud.findAll().find((todo) => todo.id === id)

  if (!todo) {
    throw new Error('Todo not found')
  }

  return crud.updateById(todo.id, { done: !todo.done })
}

export const todosRepository = {
  findAll,
  createNew,
  toggleDone,
}
