import fs from 'fs'

const DB_PATH = './core/db'

type UUID = string

type Todo = {
  id: UUID
  content: string
  date: string
  done: boolean
}

export function createNew(content: string): Todo {
  const todo: Todo = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    content,
    done: false,
  }

  const todos: Todo[] = [...readAll(), todo]

  fs.writeFileSync(DB_PATH, JSON.stringify({ todos }, null, 2))
  return todo
}

export function readAll(): Todo[] {
  const db = fs.readFileSync(DB_PATH).toString()
  const todos = JSON.parse(db || '{}').todos as Todo[]

  if (!todos) return []
  return todos
}

export function updateById(id: UUID, partial: Partial<Todo>): Todo {
  const todos = readAll()
  const toUpdate = todos.find((todo) => todo.id === id)

  if (!toUpdate) {
    throw new Error('Todo not found')
  }

  const updated = { ...toUpdate, ...partial }
  const updatedTodos = todos.map((todo) => (todo.id === id ? updated : todo))

  fs.writeFileSync(DB_PATH, JSON.stringify({ todos: updatedTodos }, null, 2))
  return updated
}

export function deleteById(id: UUID) {
  const todos = readAll()
  const filtered = todos.filter((todo) => todo.id !== id)
  fs.writeFileSync(DB_PATH, JSON.stringify({ todos: filtered }, null, 2))
}

export function cleanDb(): void {
  fs.writeFileSync(DB_PATH, '')
}

// Simulation
// cleanDb()
// const first = create('Hello World')
// const second = create('Hello World Again')
// console.log(read())
// updateById(first.id, { done: true })
// deleteById(second.id)
// console.log(read())
