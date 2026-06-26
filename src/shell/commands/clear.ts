import type { Command } from "../../kernel/types";

const clear: Command = {
  name: "clear",
  describe: "Wipe the terminal screen.",
  run({ clear }) {
    clear();
  },
};

export default clear;
