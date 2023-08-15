type GetParams = {
  page: number
  limit: number
}

type GetResponse = {
  todos: Todo[]
  total: number
  pages: number
}

type Todo = {
  id: string
  date: Date
  content: string
  done: boolean
}

const get = async ({ page, limit }: GetParams): Promise<GetResponse> => {
  return fetch('/api/todos').then(async (res) => {
    const result: GetResponse = await res.json()

    const start = (page - 1) * limit
    const end = page * limit

    return {
      todos: result.todos.slice(start, end),
      total: result.todos.length,
      pages: Math.ceil(result.todos.length / limit),
    }
  })
}

export const todosRepository = {
  get,
}
