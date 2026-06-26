import type { Command } from "../../kernel/types";

const cat: Command = {
  name: "cat",
  describe: "Show what's inside a file. Usage: cat <file>",
  run({ args, print, fs }) {
    if (!args[0]) {
      print("cat: usage: cat <file>");
      return;
    }
    const content = fs.read(args[0]);
    if (content === null) {
      print(`cat: no such file: ${args[0]}`);
      return;
    }
    for (const line of content.split("\n")) print(line);
  },
};

export default cat;
