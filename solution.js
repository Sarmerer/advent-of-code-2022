import { readFileSync } from "fs";

export class Solution {
  constructor(moduleName) {
    this.name = moduleName;
    this.inputs = "";
    this.readInput();
    this.parseInput();
  }

  readInput() {
    try {
      this.input = readFileSync(`./${this.name}/input.txt`, "utf8");
    } catch {
      console.log("there is no input for that problem");
    }
  }

  parseInput() {
    this.input = this.input.split("\n").map((l) => l.trim());
  }

  solve() {
    console.log("this is a base solution class");
  }

  run() {
    this.readInput()
    this.parseInput()
    this.solve()
  }
}
