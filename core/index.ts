import fs from "fs";
import crypto from "crypto";

const DB_PATH = "./data/db.json";

type Todo = {
  id: string
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    content,
    done: false
  }

  const todos: Todo[] = [
    ...read(),
    todo
  ]

  fs.writeFileSync(DB_PATH, JSON.stringify({todos}, null, 2));
  return todo;
}

function read(): Todo[] {
  const string = fs.readFileSync(DB_PATH).toString();
  const todos = JSON.parse(string || "{}").todos as Todo[];

  if (!todos) return [];
  return todos;
}

function update(id: string, partial: Partial<Todo>): Todo {
  let updated

  const todos = read();
  todos.forEach(current => {
    if (current.id === id) {
      updated = Object.assign(current, partial);
    }
  })

  if (!updated) {
    throw new Error("Todo not found");
  }

  fs.writeFileSync(DB_PATH, JSON.stringify({todos}, null, 2));
  return updated;
}

function cleanDb(): void {
  fs.writeFileSync(DB_PATH, '');
}

// Simulation
cleanDb()
console.log(create("Hello World"));
console.log(create("Hello World Again"));
const todo = create("Hello World Once More");
update(todo.id, { done: true });
console.log(read());
