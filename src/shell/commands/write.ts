import type { Command } from "../../kernel/types";

const write: Command = {
  name: "write",
  describe: "Put text into a file. Usage: write <file> <text...>",
  run({ args, print, fs }) {
    if (args.length < 1) {
      print("write: usage: write <file> <text>");
      return;
    }
    const [file, ...rest] = args;
    const ok = fs.writeFile(file, rest.join(" "));
    print(
      ok
        ? `wrote ${file}`
        : `write: can't write ${file} (does the folder exist?)`,
    );
  },
};

export default write;
