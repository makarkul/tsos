import type { Command } from "../../kernel/types";

const myCommand: Command = {
  //name
  name: "roll",

  //descrition
  describe: "Rolls a six sided dice and picks a number 1-6, different every time",

  //when user inputs roll into the console, it runs.
  run({ print }) {
    const number = Math.floor(Math.random() * 6) + 1;

    //print number
    print("You rolled a " + number + "!");
  },
};

export default myCommand;