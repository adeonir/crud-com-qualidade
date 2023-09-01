import { z } from 'zod'

import { supabase } from '~/backend/infra/database'
import { HttpNotFoundError } from '~/backend/infra/errors'
import type { Todo } from '~/backend/schema/todo'
import { todoSchema } from '~/backend/schema/todo'

type FindAllParams = {
  page?: number
  limit?: number
}

type FindOneByIdParams = {
  id: string
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

const findOneById = async ({ id }: FindOneByIdParams): Promise<Todo> => {
  const { data, error } = await supabase.from('todos').select('*').eq('id', id).single()

  if (error) {
    throw new Error('Failed to fetch data')
  }

  const parsed = todoSchema.parse(data)

  if (!parsed) {
    throw new Error('Failed to fetch data')
  }

  return parsed
}

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

  const parsed = z.array(todoSchema).safeParse(data)

  if (!parsed.success) {
    throw parsed.error
  }

  const todos = parsed.data
  const total = count || todos.length
  const pages = Math.ceil(total / currentLimit)

  return { todos, total, pages }
}

const createNew = async ({ content }: CreateNewParams): Promise<Todo> => {
  const { data, error } = await supabase.from('todos').insert([{ content }]).select().single()

  if (error) {
    throw new Error('Failed to create todo')
  }

  const parsed = todoSchema.parse(data)

  if (!parsed) {
    throw new Error('Failed to create todo')
  }

  return parsed
}

const toggleDone = async ({ id }: ToggleDoneParams): Promise<Todo> => {
  const todo = await findOneById({ id })
  const { data, error } = await supabase.from('todos').update({ done: !todo.done }).eq('id', id).select().single()

  if (error) {
    throw new Error('Failed to update todo')
  }

  const parsed = todoSchema.parse(data)

  if (!parsed) {
    throw new Error('Failed to update todo')
  }

  return parsed
}

const deleteById = async ({ id }: DeleteByIdParams): Promise<void> => {
  const { error } = await supabase.from('todos').delete().match({ id })

  if (error) {
    throw new HttpNotFoundError('Todo not found')
  }
}

export const todosRepository = {
  findAll,
  createNew,
  toggleDone,
  deleteById,
}
