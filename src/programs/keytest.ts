import type { ProgramModule } from "../kernel/types";

const myProgram: ProgramModule = {
  //name
  name: "keytest",

  //description
  describe: "tests raw keyboard input Press q to quit",

  //run
  run: function* (sys) {
    yield sys.print("raw keyboard mode enabled");
    yield sys.print("press any key to see its name");
    yield sys.print("press q to quit");
    //tturn on raw mode
    yield sys.setRawMode(true);

    while (true) {
      //wait for a key pres
      const key: string = yield sys.readKey();
      yield sys.print("you pressed: " + key);
      //quit
      if (key === "q") {
        yield sys.setRawMode(false);
        yield sys.print("raw keyboard mode disabled ");
        return;
      }
    }
  },
};
export default myProgram;
