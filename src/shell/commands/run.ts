import type { Command } from "../../kernel/types";

const run: Command = {
  name: "run",
  describe: "Start a program. Usage: run <program> [args]",
  run({ args, print, kernel }) {
    if (!args[0]) {
      print("run: usage: run <program> [args]");
      return;
    }
    const [name, ...rest] = args;
    const pid = kernel.spawn(name, rest);
    if (pid !== -1) print(`started ${name} (pid ${pid})`);
  },
};

export default run;
