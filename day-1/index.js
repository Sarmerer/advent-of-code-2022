import { Solution } from "../solution.js";

export default class S extends Solution {
  solve() {
    let elves = [];
    let elf = 0;
    for (const calories of this.input) {
      if (calories != "") {
        elf += Number(calories);
        continue;
      }
      elves.push(elf);
      elf = 0;
    }
    elves.sort((a, b) => b - a);
    const topOne = elves[0];
    const topThree = elves[0] + elves[1] + elves[2];
    console.log(`top one: ${topOne} | top three total: ${topThree}`);
  }
}
