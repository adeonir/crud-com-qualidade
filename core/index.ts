import fs from "fs";

const DB_PATH = "./data/db";

function create(content: string): string {
  fs.writeFileSync(DB_PATH, content);
  return content;
}

function read(): string {
  return fs.readFileSync(DB_PATH).toString();
}

// Simulation
console.log(create("Hello World"));
console.log(read());
