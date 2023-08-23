import { z } from 'zod'

import { HttpNotFoundError } from '~/backend/infra/errors'
import { todosRepository } from '~/backend/repository/todos'
import { postSchema } from '~/schema/todo'

type ToggleDoneParams = {
  id: string
}

type DeleteByIdParams = {
  id: string
}

const findAll = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const params = {
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
  }
  const page = Number(params.page)
  const limit = Number(params.limit)

  if (params.page && isNaN(page)) {
    return new Response(JSON.stringify({ error: { message: 'Page is not a number' } }), { status: 400 })
  }

  if (params.limit && isNaN(limit)) {
    return new Response(JSON.stringify({ error: { message: 'Limit is not a number' } }), { status: 400 })
  }

  const response = await todosRepository.findAll({ page, limit })

  return new Response(
    JSON.stringify({
      total: response.total,
      pages: response.pages,
      todos: response.todos,
    }),
    { status: 200 },
  )
}

const createNew = async (request: Request) => {
  const parsed = postSchema.safeParse(await request.json())

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: { message: 'Missing content', description: parsed.error.issues } }), {
      status: 400,
    })
  }

  try {
    const todo = await todosRepository.createNew({ content: parsed.data.content })
    return new Response(JSON.stringify(todo), { status: 201 })
  } catch {
    return new Response(JSON.stringify({ error: { message: 'Failed to create todo' } }), { status: 400 })
  }
}

const toggleDone = async (_request: Request, params: ToggleDoneParams) => {
  const { id } = params
  const parsed = z.string().uuid().nonempty().safeParse(id)

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: { message: `This id ${id} is not valid` } }), { status: 400 })
  }

  try {
    const todo = await todosRepository.toggleDone({ id: parsed.data })
    return new Response(JSON.stringify(todo), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: { message: `Todo with id ${id} not found` } }), {
      status: 404,
    })
  }
}

const deleteById = async (_request: Request, params: DeleteByIdParams) => {
  const { id } = params
  const parsed = z.string().uuid().nonempty().safeParse(id)

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: { message: `This id ${id} is not valid` } }), { status: 400 })
  }

  try {
    await todosRepository.deleteById({ id: parsed.data })
    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof HttpNotFoundError) {
      return new Response(JSON.stringify({ error: { message: error.message } }), { status: error.status })
    }

    return new Response(JSON.stringify({ error: { message: `Internal server error` } }), { status: 500 })
  }
}

export const todosController = {
  findAll,
  createNew,
  toggleDone,
  deleteById,
}
