import type { Command } from "../../kernel/types";

const myCommand: Command = {
  //the command name 
 name: "hello",

  //this makes it so that when someone prints the help menu it will show the defenition below
  describe: "Says hello to you! Will also include your name (if you inputted one before)",

  run({ args, print }) {
    //if user typed name then it will combine with the hello here
    if (args.length > 0) {
      print("Hello, " + args[0] + "!");
    } else {
      // says hello eeven if teh user didnt type their name.
      // i
      print("Hello!");
    }
  },
}; export default myCommand;
