import type { Command } from "../../kernel/types";

const ps: Command = {
  name: "ps",
  describe: "Show the live process table (what's running right now).",
  run({ print, kernel }) {
    const snap = kernel.snapshot();
    if (snap.processes.length === 0) {
      print("No processes running. Try: run clock");
      return;
    }
    print("PID  NAME        STATE      WAITING");
    for (const p of snap.processes) {
      print(
        `${String(p.pid).padEnd(4)} ${p.name.padEnd(11)} ${p.state.padEnd(
          10,
        )} ${p.waitingOn ?? "-"}`,
      );
    }
  },
};

export default ps;
