import fs from "fs";

const DB_PATH = "./data/db";

function create(content: string): string {
  fs.writeFileSync(DB_PATH, content);
  return content;
}

// Simulation
console.log(create("Hello World"));
