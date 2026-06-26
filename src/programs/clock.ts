import type { ProgramModule } from "../kernel/types";

// The classic first demo. Watch its row in the dashboard flip between
// Running and Blocked (on sleep) over and over, once per second.
const clock: ProgramModule = {
  name: "clock",
  describe: "Prints the time every second (watch it block on sleep!).",
  run: function* (sys) {
    while (true) {
      yield sys.print("🕐 " + new Date().toLocaleTimeString());
      yield sys.sleep(1000);
    }
  },
};

export default clock;
