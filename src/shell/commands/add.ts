import type { Command } from "../../kernel/types";

const myCommand: Command = {
  //name
  name: "add",

  //descritpion
  describe: "Adds two numbers together",
  run({ args, print }) {
    //make sure user typed only 2 numbers
    if (args.length < 2) {
      print("Type two numbers to be added: ");
      return;
    }

    //make text turn into numbers so no text addition problems
    const firstNumber = Number(args[0]);
    const secondNumber = Number(args[1]);

    //check if they are numbers
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      print("Type actual numbers.");
      return;
    }

    const answer = firstNumber + secondNumber;

    print("The answer is " + answer + ".");
  },
};

export default myCommand;
