import type { ProgramModule } from "../kernel/types";

// A number-guessing game. The star of the show: when it calls sys.read(),
// its row in the dashboard turns Blocked and sits there until you type a
// number. That's blocking I/O, made visible.
const guess: ProgramModule = {
  name: "guess",
  describe: "Guess my number, 1–100. Shows the Blocked state clearly.",
  run: function* (sys) {
    const secret = (yield sys.random(100)) + 1;
    yield sys.print("I'm thinking of a number between 1 and 100.");

    while (true) {
      yield sys.print("Your guess? (type a number, then press Enter)");
      const answer: string = yield sys.read();
      const n = Number(answer);

      if (Number.isNaN(n)) {
        yield sys.print(`"${answer}" isn't a number — try again!`);
      } else if (n < secret) {
        yield sys.print("Too low!  ⬆️");
      } else if (n > secret) {
        yield sys.print("Too high! ⬇️");
      } else {
        yield sys.print(`🎉 You got it! The number was ${secret}.`);
        return; // returning ends the program -> the process terminates
      }
    }
  },
};

export default guess;
