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

const parseResponse = (response: unknown): { todos: Todo[] } => {
  if (response !== null && typeof response === 'object' && 'todos' in response && Array.isArray(response.todos)) {
    return {
      todos: response.todos.map((todo: unknown) => {
        if (todo === null && typeof todo !== 'object') {
          throw new Error('Invalid response from api')
        }

        const { id, content, data, done } = todo as {
          id: string
          content: string
          data: string
          done: string
        }

        return {
          id,
          content,
          date: new Date(data),
          done: String(done).toLowerCase() === 'true',
        }
      }),
    }
  }

  return { todos: [] }
}

const get = async ({ page, limit }: GetParams): Promise<GetResponse> => {
  return fetch('/api/todos').then(async (res) => {
    const todos = parseResponse(await res.json()).todos

    const start = (page - 1) * limit
    const end = page * limit

    return {
      todos: todos.slice(start, end),
      total: todos.length,
      pages: Math.ceil(todos.length / limit),
    }
  })
}

export const todosRepository = {
  get,
}
