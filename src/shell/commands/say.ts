import type { Command } from "../../kernel/types";

const say: Command = {
  name: "say", //name

  describe: "Speak text using your computer's voice", //description

  run({ args, print }) {
    if (args.length === 0) {
      print("Usage: say <text>");
      return;
    }

    const text = args.join(" ");

    //stop
    speechSynthesis.cancel();

    //create speech
    const utterance = new SpeechSynthesisUtterance(text);

    //speak
    speechSynthesis.speak(utterance);
  },
};

export default say;