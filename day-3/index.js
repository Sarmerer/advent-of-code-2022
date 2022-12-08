import { Solution } from "../solution.js";

export default class S extends Solution {
  solve() {
    function calculatePriority(rucksack) {
      for (const item of rucksack.split("")) {
        const weight = item.charCodeAt(0);
      }
      console.log(rucksack.length);
    }

    const answer = this.input.reduce((acc, rucksack) => {
      return (acc += calculatePriority(rucksack));
    }, 0);

    console.log(answer);
  }
}
