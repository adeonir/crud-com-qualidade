import { z } from 'zod'
import { todosRepository } from '~/frontend/repository/todos'
import type { Todo } from '~/schema/todo'

type FindAllParams = {
  page: number
}

type CreateNewParams = {
  content: string
  onSuccess?: (todo: Todo) => void
  onError?: () => void
}

type ToggleDoneParams = {
  id: string
}

type DeleteByIdParams = {
  id: string
}

type FilterParams<T> = {
  todos: T[]
  search: string
}

const findAll = async ({ page }: FindAllParams) => {
  return todosRepository.findAll({ page: page, limit: 2 })
}

const createNew = async ({ content }: CreateNewParams) => {
  const parsed = z.string().nonempty().safeParse(content)
  if (!parsed.success) {
    return parsed.error
  }

  return todosRepository.createNew({ content: parsed.data })
}

const toggleDone = async ({ id }: ToggleDoneParams): Promise<Todo> => {
  return todosRepository.toggleDone({ id })
}

const deleteById = async ({ id }: DeleteByIdParams) => {
  return todosRepository.deleteById({ id })
}

const filterByContent = <T extends { content: string }>({ todos, search }: FilterParams<T>): T[] => {
  return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
}

export const todosController = {
  findAll,
  createNew,
  toggleDone,
  deleteById,
  filterByContent,
}
