import type { Command } from "../../kernel/types";

const kill: Command = {
  name: "kill", //name
  describe: "kill processes. run with kill <pid|name>", //description
  //run
  run({ args, print, kernel }) {
    if (args.length === 0) {
      print("Usage: kill <pid|name>");
      return;
    }
    const target = args[0];
    const killed = kernel.killProcess(target);
    if (!killed) {
      print(`kill: no process found: ${target}`);
      return;
    }
    print(`Killed process: ${target}`);
  },
};
export default kill;
