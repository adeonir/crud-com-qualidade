import * as crud from '~/crud'
import { TodoSchema, type Todo } from '~/schema/todo'
import { HttpNotFoundError } from '../infra/errors'

import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

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

const findAll = async ({ page, limit }: FindAllParams = {}): Promise<FindAllResponse> => {
  const currentPage = page || 1
  const currentLimit = limit || 10

  const start = (currentPage - 1) * currentLimit
  const end = currentPage * currentLimit - 1

  const { data, error, count } = await supabase
    .from('todos')
    .select('*', { count: 'exact' })
    .order('date', { ascending: false })
    .range(start, end)

  if (error) {
    throw new Error('Failed to fetch data')
  }

  const parsed = z.array(TodoSchema).safeParse(data)

  if (!parsed.success) {
    throw parsed.error
  }

  const todos = parsed.data
  const total = count || todos.length
  const pages = Math.ceil(total / currentLimit)

  return { todos, total, pages }
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
