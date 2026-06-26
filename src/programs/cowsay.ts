import type { ProgramModule } from "../kernel/types";

// A friendly cow repeats your message. Shows off using `args` — the words
// you type after the program name. Try: run cowsay TypeScript is cool
const cowsay: ProgramModule = {
  name: "cowsay",
  describe: "A cow says your message. Usage: run cowsay <message>",
  run: function* (sys, args) {
    const message = args.length > 0 ? args.join(" ") : "moo";
    const bar = " " + "-".repeat(message.length + 2);

    yield sys.print(bar);
    yield sys.print(`< ${message} >`);
    yield sys.print(bar);
    yield sys.print("        \\   ^__^");
    yield sys.print("         \\  (oo)\\_______");
    yield sys.print("            (__)\\       )\\/\\");
    yield sys.print("                ||----w |");
    yield sys.print("                ||     ||");
  },
};

export default cowsay;
