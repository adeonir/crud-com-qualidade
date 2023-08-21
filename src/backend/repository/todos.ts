import * as crud from '~/crud'
import type { Todo } from '~/schema/todo'
import { HttpNotFoundError } from '../infra/errors'

import { createClient } from '@supabase/supabase-js'

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

type DeleteByIdParams = {
  id: string
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const findAll = async ({ page, limit }: FindAllParams = {}): Promise<FindAllResponse> => {
  const { data, error, count } = await supabase.from('todos').select('*', { count: 'exact' })

  if (error) {
    throw new Error('Failed to fetch data')
  }

  const todos = data as Todo[]

  return {
    todos: todos,
    total: count || todos.length,
    pages: 1,
  }

  // const todos = crud.findAll().reverse()
  // const currentPage = page || 1
  // const currentLimit = limit || 10

  // const start = (currentPage - 1) * currentLimit
  // const end = currentPage * currentLimit

  // return {
  //   todos: todos.slice(start, end),
  //   total: todos.length,
  //   pages: Math.ceil(todos.length / currentLimit),
  // }
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

const deleteById = async ({ id }: DeleteByIdParams): Promise<void> => {
  const todo = crud.findAll().find((todo) => todo.id === id)

  if (!todo) {
    throw new HttpNotFoundError('Todo not found')
  }

  return crud.deleteById(todo.id)
}

export const todosRepository = {
  findAll,
  createNew,
  toggleDone,
  deleteById,
}
