/* eslint-disable no-console */
import fs from 'fs'
import crypto from 'crypto'

const DB_PATH = './data/db.json'

type UUID = string

type Todo = {
  id: UUID
  date: string
  content: string
  done: boolean
}

function create(content: string): Todo {
  const todo: Todo = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    content,
    done: false,
  }

  const todos: Todo[] = [...read(), todo]

  fs.writeFileSync(DB_PATH, JSON.stringify({ todos }, null, 2))
  return todo
}

function read(): Todo[] {
  const string = fs.readFileSync(DB_PATH).toString()
  const todos = JSON.parse(string || '{}').todos as Todo[]

  if (!todos) return []
  return todos
}

function updateById(id: UUID, partial: Partial<Todo>): Todo {
  const todos = read()
  const toUpdate = todos.find((todo) => todo.id === id)

  if (!toUpdate) {
    throw new Error('Todo not found')
  }

  const updated = { ...toUpdate, ...partial }
  const updatedTodos = todos.map((todo) => (todo.id === id ? updated : todo))

  fs.writeFileSync(DB_PATH, JSON.stringify({ todos: updatedTodos }, null, 2))
  return updated
}

function deleteById(id: UUID) {
  const todos = read()
  const filtered = todos.filter((todo) => todo.id !== id)
  fs.writeFileSync(DB_PATH, JSON.stringify({ todos: filtered }, null, 2))
}

function cleanDb(): void {
  fs.writeFileSync(DB_PATH, '')
}

// Simulation
cleanDb()
const first = create('Hello World')
const second = create('Hello World Again')
updateById(first.id, { done: true })
deleteById(second.id)
console.log(read())
