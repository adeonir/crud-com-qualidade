import { todosController } from '~/backend/controllers/todos'

type DeleteParams = {
  id: string
}

export async function DELETE(request: Request, { params }: { params: DeleteParams }) {
  return await todosController.deleteById(request, params)
}
