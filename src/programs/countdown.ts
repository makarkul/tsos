import type { ProgramModule } from "../kernel/types";

const myProgram: ProgramModule = {
  //name
  name: "countdown",

  //description
  describe: "Counts down from 10 to 1, then says Liftoff",

  //program run
  run: function* (sys) {
    //countdown part
    for (let number = 10; number >= 1; number--) {
      yield sys.print("" + number);
      yield sys.sleep(1000);
    }

    yield sys.print("Liftoff!");
  },
};

export default myProgram;
