import fs from "fs";

const DB_PATH = "./data/db.json";

type Todo = {
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): string {
  const todo: Todo = {
    date: new Date().toISOString(),
    content,
    done: false
  }

  const todos: Todo[] = [
    todo
  ]

  fs.writeFileSync(DB_PATH, JSON.stringify({todos}, null, 2));
  return content;
}

function read(): string {
  return fs.readFileSync(DB_PATH).toString();
}

// Simulation
console.log(create("Hello World"));
console.log(read());
