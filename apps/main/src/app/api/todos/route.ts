import { todosController } from '~/backend/controller/todos'

export async function GET(request: Request) {
  return await todosController.findAll(request)
}

export async function POST(request: Request) {
  return await todosController.createNew(request)
}
