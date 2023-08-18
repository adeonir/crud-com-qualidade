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

type FilterParams<T> = {
  todos: T[]
  search: string
}

const findAll = async ({ page }: FindAllParams) => {
  return todosRepository.findAll({ page: page, limit: 2 })
}

const createNew = async ({ content, onSuccess, onError }: CreateNewParams) => {
  const parsed = z.string().nonempty().safeParse(content)
  if (!parsed.success) {
    return onError?.()
  }

  todosRepository
    .createNew({ content: parsed.data })
    .then((todo) => {
      onSuccess?.(todo)
    })
    .catch(() => {
      onError?.()
    })
}

const toggleDone = async ({ id }: ToggleDoneParams) => {
  return todosRepository.toggleDone({ id })
}

const filterByContent = <T extends { content: string }>({ todos, search }: FilterParams<T>): T[] => {
  return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
}

export const todosController = {
  findAll,
  createNew,
  toggleDone,
  filterByContent,
}
