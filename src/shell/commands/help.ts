import type { Command } from "../../kernel/types";
import { listCommands } from "../shell";

const help: Command = {
  name: "help",
  describe: "List everything you can do.",
  run({ print, kernel }) {
    print("Commands you can type:");
    for (const cmd of listCommands()) {
      print(`  ${cmd.name.padEnd(10)} ${cmd.describe}`);
    }
    print("");
    print("Programs you can run (type: run <name>):");
    for (const p of kernel.listPrograms()) {
      print(`  ${p.name.padEnd(10)} ${p.describe}`);
    }
  },
};

export default help;
