import type { ProgramModule } from "../kernel/types";

//3 moves
type Move = "rock" | "paper" | "scissors";

const myProgram: ProgramModule = {
  //name
  name: "rps",

  describe: "Play a game of Rock, paper, Scissors.",

  //run
  run: function* (sys) {
    yield sys.print("type rock, paper, or Scissors:");

    const playerMove = (yield sys.read()).toLowerCase() as Move;

    //pick random move
    const moves: Move[] = ["rock", "paper", "scissors"];
    const randomNumber = Math.floor(Math.random() * moves.length);
    const computerMove = moves[randomNumber];

    yield sys.print("The computer picked " + computerMove + ".");

      //tie
    if (playerMove === computerMove) {
      yield sys.print("It's a tie");
    }
    //player win
    else if (
      (playerMove === "rock" && computerMove === "scissors") ||
      (playerMove === "paper" && computerMove === "rock") ||
      (playerMove === "scissors" && computerMove === "paper")
    ) {
      yield sys.print("You win!");
    }
      //computer win
    else {
      yield sys.print("The computer wins!");
    }
  },
};

export default myProgram;