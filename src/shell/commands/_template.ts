// ===========================================================================
// 📋 COMMAND TEMPLATE — copy this file, rename it, and make it your own!
//
//   1. Copy this file to a new name, e.g. commands/joke.ts
//   2. Change `name` below to the word you'll type in the terminal.
//   3. Write what it does inside run().
//   4. Save. The page reloads by itself. Type your command. Done! 🎉
//
//   THE GOLDEN RULE: you only ever edit YOUR OWN file. That way you and your
//   friends can all work at the same time without bumping into each other.
// ===========================================================================

import type { Command } from "../../kernel/types";

const myCommand: Command = {
  // The word you type to run this. Keep it short and lowercase, no spaces.
  name: "CHANGE_ME",

  // One line shown when someone types `help`.
  describe: "Says what this command does.",

  // This function runs when someone types your command.
  // `args`  = the list of words typed after your command name.
  // `print` = writes one line to the terminal.
  run({ args, print }) {
    print("Hello from my command!");
    print("You typed these extra words: " + args.join(", "));
  },
};

export default myCommand;
