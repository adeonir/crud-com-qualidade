import fs from "fs";

const DB_PATH = "./data/db.json";

function create(content: string): string {
  const todo = {
    content,
    date: new Date().toISOString(),
  }

  const todos = [
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
