import type { ProgramModule } from "../kernel/types";

const myProgram: ProgramModule = {
  //name
  name: "fortune",

  //description
  describe: "Prints a random fortune",

  //run program
  run: function* (sys) {
    // list of fortunes
    const sayings: string[] = [
      "You will get a new pet!",
      "You will eat pizza for dinner",
      "You will have a good day",
      "You will find money in an old pocket",
      "You will step on a piece of Lego",
      "You will adopt a very fluffy cat",
      "You will forget why you walked into the room",
      "You will burn your tongue on hot coffee",
      "A rubber duck has the answer"
    ];

    //picks random fortune
    const randomNumber = Math.floor(Math.random() * sayings.length);

    yield sys.print(sayings[randomNumber]);
  },
};

export default myProgram;