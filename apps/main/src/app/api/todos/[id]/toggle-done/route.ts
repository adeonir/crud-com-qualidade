import { todosController } from '~/backend/controller/todos'

type PutParams = {
  id: string
}

export async function PUT(request: Request, { params }: { params: PutParams }) {
  return await todosController.toggleDone(request, params)
}
