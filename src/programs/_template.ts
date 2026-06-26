// ===========================================================================
// 🚀 PROGRAM TEMPLATE — copy this file, rename it, and make it your own!
//
//   1. Copy this file to a new name, e.g. programs/countdown.ts
//   2. Change `name` below to the word you'll type after `run`.
//   3. Write your program inside run(). Use `yield` to ask the OS for things.
//   4. Save. The page reloads. Type `run yourname`. Watch it in the dashboard!
//
//   THE GOLDEN RULE: you only ever edit YOUR OWN file.
//
//   Your toolbox (the ONLY things a program can do) — always start with yield:
//     yield sys.print("hi")             write a line to the terminal
//     const line = yield sys.read()     wait for the user to type a line
//     yield sys.sleep(1000)             pause for 1000 ms (1 second)
//     const id = yield sys.getPid()     your own process id number
//     yield sys.spawn("clock")          start another program
//     yield sys.exit()                  stop right now
//
//   Why `yield`? Each `yield` is the moment your program politely hands the
//   computer back to the OS so other programs get a turn. No yield = no turn!
// ===========================================================================

import type { ProgramModule } from "../kernel/types";

const myProgram: ProgramModule = {
  name: "CHANGE_ME",
  describe: "Says what this program does.",

  // The `function*` (with a star) means this is a generator — that's what
  // lets you use `yield`. Don't remove the star!
  run: function* (sys) {
    yield sys.print("Hello! I am a brand new program.");
    yield sys.sleep(1000);
    yield sys.print("...one second later...");

    // Want to ask a question? Uncomment these three lines:
    // yield sys.print("What's your name?");
    // const name = yield sys.read();
    // yield sys.print("Nice to meet you, " + name + "!");
  },
};

export default myProgram;
