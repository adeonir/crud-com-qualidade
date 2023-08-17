import { z } from 'zod'
import { todosRepository } from '~/frontend/repository/todos'
import type { Todo } from '~/schema/todo'

type GetParams = {
  page: number
}

type PostParams = {
  content: string
  onSuccess?: (todo: Todo) => void
  onError?: () => void
}

type FilterParams<T> = {
  todos: T[]
  search: string
}

const get = async ({ page }: GetParams) => {
  return todosRepository.get({ page: page, limit: 2 })
}

const post = async ({ content, onSuccess, onError }: PostParams) => {
  const parsed = z.string().nonempty().safeParse(content)
  if (!parsed.success) {
    return onError?.()
  }

  todosRepository
    .post({ content: parsed.data })
    .then((todo) => {
      onSuccess?.(todo)
    })
    .catch(() => {
      onError?.()
    })
}

const filterByContent = <T extends { content: string }>({ todos, search }: FilterParams<T>): T[] => {
  return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
}

export const todosController = {
  get,
  post,
  filterByContent,
}
