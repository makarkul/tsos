import type { Command } from "../../kernel/types";

const echo: Command = {
  name: "echo",
  describe: "Print back whatever you type after it.",
  run({ args, print }) {
    print(args.join(" "));
  },
};

export default echo;
