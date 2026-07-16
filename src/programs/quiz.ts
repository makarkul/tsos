import type { ProgramModule } from "../kernel/types";

const myProgram: ProgramModule = {
  //name
  name: "quiz",

  //description
  describe: "Asks you a trivia question.",

  //run the command
  run: function* (sys) {
    //ask a question
    yield sys.print("What is the capital of France?");
    const answer = yield sys.read();

    //check if answer is right or not?
    if (answer.toLowerCase() === "paris") {
      yield sys.print("Correct!");
    } else {
      yield sys.print("Nope!");
    }
  },
};
export default myProgram;