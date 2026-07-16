import type { Command } from "../../kernel/types";

const myCommand: Command = {
  //nam
  name: "wc",

  //description
  describe: "counts the lines and words in a file",

  run({ args, print, fs }) {
    //check file name
    if (args.length === 0) {
      print("please type a file name Example: wc readme.txt");
      return;
    }

    //read file
    const text = fs.read(args[0]);

    // no file
    if (text === null) {
      print("could not find file");
      return;
    }

    //count line
    const lines = text.split("\n").length;

    //word count
    const words = text.split(/\s+/).filter(Boolean).length;

    //print
    print("lines: " + lines);
    print("words: " + words);
  },
};

export default myCommand;