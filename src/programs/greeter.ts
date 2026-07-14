import type { ProgramModule } from "../kernel/types";

const myProgram: ProgramModule = {
  //name
  name: "greeter",

  //description
  describe: "asks for your name and greets you",

  // run greeter
  run: function* (sys) {
    // ask user for name
    yield sys.print("What's your name?");

    const name = yield sys.read();

    //says hi
    yield sys.print(`Hi, ${name}!`);
  },
};

export default myProgram;