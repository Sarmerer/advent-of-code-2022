import fs from "fs";
import process from "process";

async function run(day) {
  const solutions = fs.readdirSync("./").filter((s) => s.startsWith("day-"));

  const moduleName = day.startsWith("day-") ? day : `day-${day}`;
  if (!solutions.includes(moduleName)) {
    console.error(`there is no solution for the ${moduleName}`);
    return;
  }

  try {
    const module = await import(`./${moduleName}/index.js`);
    const solution = new module.default(moduleName);
    solution.run();
  } catch (error) {
    console.error(`failed to run a solution for the ${moduleName}`);
    console.error(error);
  }
}

if (process.argv.length < 3) {
  console.error("please provide a day that you want to see the solution for");
  process.exit(0);
}

run(process.argv[2]);
