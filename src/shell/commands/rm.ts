import type { Command } from "../../kernel/types";

const rm: Command = {
  name: "rm",
  describe: "Delete a file or folder. Usage: rm <name>",
  run({ args, print, fs }) {
    if (!args[0]) {
      print("rm: usage: rm <name>");
      return;
    }
    const ok = fs.remove(args[0]);
    print(ok ? `removed ${args[0]}` : `rm: no such file or folder: ${args[0]}`);
  },
};

export default rm;
