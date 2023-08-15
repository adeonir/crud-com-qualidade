import { todosRepository } from '~/repository/front/todos'

type GetParams = {
  page?: number
}

const get = async ({ page }: GetParams = {}) => {
  return todosRepository.get({ page: page || 1, limit: 10 })
}

export const todosController = {
  get,
}
