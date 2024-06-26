import type { Todo } from '~/frontend/schema/todo'

import { todoSchema } from '~/frontend/schema/todo'

type FindAllParams = {
  page: number
  limit: number
}

type FindAllResponse = {
  todos: Todo[]
  total: number
  pages: number
}

type CreateNewParams = {
  content: string
}

type ToggleDoneParams = {
  id: string
}

type DeleteByIdParams = {
  id: string
}

const findAll = async ({ page, limit }: FindAllParams): Promise<FindAllResponse> => {
  return fetch(`/api/todos?page=${page}&limit=${limit}`).then(async (res) => {
    const response = parseResponse(await res.json())

    return {
      total: response.total,
      pages: response.pages,
      todos: response.todos,
    }
  })
}

const createNew = async ({ content }: CreateNewParams): Promise<Todo> => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('Failed to create todo')
  }

  const data = await response.json()
  const parsed = todoSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error('Failed to create todo')
  }

  return parsed.data
}

const toggleDone = async ({ id }: ToggleDoneParams): Promise<Todo> => {
  const response = await fetch(`/api/todos/${id}/toggle-done`, {
    method: 'PUT',
  })

  if (!response.ok) {
    throw new Error('Failed to update todo')
  }

  const todo = await response.json()
  const parsed = todoSchema.safeParse(todo)

  if (!parsed.success) {
    throw new Error('Failed to update todo')
  }

  return parsed.data
}

const deleteById = async ({ id }: DeleteByIdParams): Promise<void> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete todo')
  }
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

export const todosRepository = {
  findAll,
  createNew,
  toggleDone,
  deleteById,
  parseResponse,
}
