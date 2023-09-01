import { z } from 'zod'

import type { Todo } from '~/frontend/schema/todo'

import { todosRepository } from '~/frontend/repository/todos'

type FindAllParams = {
  page: number
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

type FilterParams = {
  search: string
  todos: Todo[]
}

const findAll = async ({ page }: FindAllParams) => {
  return todosRepository.findAll({ page: page, limit: 2 })
}

const createNew = async ({ content }: CreateNewParams) => {
  const parsed = z.string().nonempty().safeParse(content)

  if (!parsed.success) {
    return parsed.error
  }

  return await todosRepository.createNew({ content: parsed.data })
}

const toggleDone = async ({ id }: ToggleDoneParams): Promise<Todo> => {
  return await todosRepository.toggleDone({ id })
}

const deleteById = async ({ id }: DeleteByIdParams) => {
  return await todosRepository.deleteById({ id })
}

const filterByContent = ({ search, todos }: FilterParams): Todo[] => {
  return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
}

export const todosController = {
  findAll,
  createNew,
  toggleDone,
  deleteById,
  filterByContent,
}
