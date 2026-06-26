import type { Command } from "../../kernel/types";

const ls: Command = {
  name: "ls",
  describe: "List files in a folder. Usage: ls [folder]",
  run({ args, print, fs }) {
    const path = args[0] ?? ""; // no path given -> list the top folder
    const entries = fs.list(path);
    if (entries === null) {
      print(`ls: not a folder: ${args[0] ?? "/"}`);
      return;
    }
    if (entries.length === 0) {
      print("(empty)");
      return;
    }
    for (const node of entries) {
      // Folders get a trailing slash so they're easy to spot.
      print(node.type === "dir" ? `${node.name}/` : node.name);
    }
  },
};

export default ls;
