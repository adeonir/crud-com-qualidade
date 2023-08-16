import { todosRepository } from '~/frontend/repository/todos'

type GetParams = {
  page: number
}

type FilterParams<T> = {
  todos: T[]
  search: string
}

const get = async ({ page }: GetParams) => {
  return todosRepository.get({ page: page, limit: 2 })
}

const filterByContent = <T extends { content: string }>({ todos, search }: FilterParams<T>): T[] => {
  return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
}

export const todosController = {
  get,
  filterByContent,
}
