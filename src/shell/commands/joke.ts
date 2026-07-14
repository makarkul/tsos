import type { Command } from "../../kernel/types";

const myCommand: Command = {
  //name
  name: "joke",

  //description
  describe: "Tells a funny joke.",

  run({ print }) {
    //prints joke
    print("Why don’t skeletons fight each other?"); //joke i found on google
    print("Because they don’t have the guts!");
  },
};

export default myCommand;