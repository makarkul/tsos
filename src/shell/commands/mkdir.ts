import type { Command } from "../../kernel/types";

const mkdir: Command = {
  name: "mkdir",
  describe: "Make a new folder. Usage: mkdir <name>",
  run({ args, print, fs }) {
    if (!args[0]) {
      print("mkdir: usage: mkdir <name>");
      return;
    }
    const ok = fs.makeDir(args[0]);
    print(ok ? `made folder ${args[0]}` : `mkdir: can't make ${args[0]}`);
  },
};

export default mkdir;
