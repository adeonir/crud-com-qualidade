import type { Todo } from '~/schema/todo'

type GetParams = {
  page: number
  limit: number
}

type GetResponse = {
  todos: Todo[]
  total: number
  pages: number
}

const parseResponse = (response: unknown): { total: number; pages: number; todos: Todo[] } => {
  if (
    response !== null &&
    typeof response === 'object' &&
    'todos' in response &&
    'total' in response &&
    'pages' in response &&
    Array.isArray(response.todos)
  ) {
    return {
      total: Number(response.total),
      pages: Number(response.pages),
      todos: response.todos.map((todo: unknown) => {
        if (todo === null && typeof todo !== 'object') {
          throw new Error('Invalid response from api')
        }

        const { id, content, date, done } = todo as {
          id: string
          content: string
          date: string
          done: string
        }

        return {
          id,
          content,
          date,
          done: String(done).toLowerCase() === 'true',
        }
      }),
    }
  }

  return { total: 0, pages: 1, todos: [] }
}

const get = async ({ page, limit }: GetParams): Promise<GetResponse> => {
  return fetch(`/api/todos?page=${page}&limit=${limit}`).then(async (res) => {
    const response = parseResponse(await res.json())

    return {
      total: response.total,
      pages: response.pages,
      todos: response.todos,
    }
  })
}

export const todosRepository = {
  get,
}
