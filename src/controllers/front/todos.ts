const get = async () => {
  return fetch('/api/todos').then(async (res) => {
    return await res.json()
  })
}

export const todosController = {
  get,
}
