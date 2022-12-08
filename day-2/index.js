import { Solution } from "../solution.js";

export default class S extends Solution {
  solve() {
    const actions = {
      ROCK: 1,
      PAPER: 2,
      SCISSORS: 3,
    };

    const outcomes = {
      WIN: 6,
      LOSE: 0,
      DRAW: 3,
    };

    const winningAction = {
      [actions.ROCK]: actions.PAPER,
      [actions.PAPER]: actions.SCISSORS,
      [actions.SCISSORS]: actions.ROCK,
    };

    const losingAction = {
      [actions.ROCK]: actions.SCISSORS,
      [actions.PAPER]: actions.ROCK,
      [actions.SCISSORS]: actions.PAPER,
    };

    const codedActions = {
      A: actions.ROCK,
      B: actions.PAPER,
      C: actions.SCISSORS,
      X: actions.ROCK,
      Y: actions.PAPER,
      Z: actions.SCISSORS,
    };

    const codedOutcomes = {
      X: outcomes.LOSE,
      Y: outcomes.DRAW,
      Z: outcomes.WIN,
    };

    function outcomeScore(you, opponent) {
      if (you == opponent) return outcomes.DRAW;
      if (winningAction[you] != opponent) return outcomes.WIN;
      return outcomes.LOSE;
    }

    function deductAction(opponent, outcome) {
      switch (outcome) {
        case outcomes.LOSE:
          return losingAction[opponent];
        case outcomes.WIN:
          return winningAction[opponent];
        default:
          return opponent;
      }
    }

    let guidedScore = 0;
    let deductedScore = 0;
    for (const game of this.input) {
      const strategy = game.split(" ").map((s) => s.trim());
      const you = codedActions[strategy[1]];
      const opponent = codedActions[strategy[0]];
      const expectedOutcome = codedOutcomes[strategy[1]];
      const expectedAction = deductAction(opponent, expectedOutcome);

      guidedScore += you + outcomeScore(you, opponent);
      deductedScore += expectedAction + outcomeScore(expectedAction, opponent);
    }

    console.log(
      `you scored: ${guidedScore} following the guide | ${deductedScore} with deduction`
    );
  }
}
