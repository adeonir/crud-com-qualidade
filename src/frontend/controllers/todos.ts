import { todosRepository } from '~/frontend/repository/todos'

type GetParams = {
  page: number
}

type PostParams<T> = {
  content: string
  onSuccess?: (todo: T) => void
  onError?: () => void
}

type FilterParams<T> = {
  todos: T[]
  search: string
}

const get = async ({ page }: GetParams) => {
  return todosRepository.get({ page: page, limit: 2 })
}

const post = async <T>({ content, onSuccess, onError }: PostParams<T>) => {
  if (!content) {
    return onError?.()
  }

  const todo = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    content,
    done: false,
  }
  onSuccess?.(todo as T)
}

const filterByContent = <T extends { content: string }>({ todos, search }: FilterParams<T>): T[] => {
  return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
}

export const todosController = {
  get,
  post,
  filterByContent,
}
