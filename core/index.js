const fs = require("fs");

const DB_PATH = "./data/db";

function create(content) {
  fs.writeFileSync(DB_PATH, content);
  return content;
}

// Simulation
console.log(create("Hello World"));
