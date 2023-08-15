import { todosRepository } from '~/frontend/repositories/todos'

type GetParams = {
  page: number
}

const get = async ({ page }: GetParams) => {
  return todosRepository.get({ page: page, limit: 2 })
}

export const todosController = {
  get,
}
