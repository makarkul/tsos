import type { ProgramModule } from "../kernel/types";

const myProgram: ProgramModule = {
  //name
  name: "edit",

  //description
  describe: "text editor. type :list to view lines or :q to quit.",

  //run
  run: function* (sys, args) {
    //check file name
    if (args.length === 0) {
      yield sys.print("usage: run edit <filename>");
      return;
    }

    const filename = args[0];

    //store lines
    const lines: string[] = [];

    //track changes
    let modified = false;

    //load file if it exists
    const existing: string | null = yield sys.readFile(filename);

    if (existing !== null) {
      for (const line of existing.split("\n")) {
        lines.push(line);
      }
    }

    yield sys.print("Tiny text Editor");
    yield sys.print("editing: " + filename);
    yield sys.print("type text to add a line");
    yield sys.print("commands:");
    yield sys.print("  :list      - show all lnes");
    yield sys.print("  :del <n>   - delete line");
    yield sys.print("  :<n> text  - replace line");
    yield sys.print("  :w         - save file");
    yield sys.print("  :wq        - save and quit");
    yield sys.print("  :q         - quit");
    yield sys.print("  :q!        - quit without saving");
    yield sys.print("  :?         - show help");

    //keep running untilthe user quits
    while (true) {
      const input: string = yield sys.read();

      //help
      if (input === ":?") {
        yield sys.print("commands:");
        yield sys.print("  :list      - show all lnes");
        yield sys.print("  :del <n>   - delete line");
        yield sys.print("  :<n> text  - replace line");
        yield sys.print("  :w         - save file");
        yield sys.print("  :wq        - save and quit");
        yield sys.print("  :q         - quit");
        yield sys.print("  :q!        - quit without saving");
        continue;
      }

      //save and quit
      if (input === ":wq") {
        const text = lines.join("\n");
        yield sys.writeFile(filename, text);
        modified = false;
        yield sys.print("saved " + filename);
        yield sys.print("bye!");
        return;
      }

      //quit
      if (input === ":q") {
        if (modified) {
          yield sys.print(
            "Unsaved changes! Use :q! to quit anyway or :w to save",
          );
          continue;
        }

        yield sys.print("bye!");
        return;
      }

      //force quit
      if (input === ":q!") {
        yield sys.print("bye!");
        return;
      }

      //write file
      if (input === ":w") {
        const text = lines.join("\n");
        yield sys.writeFile(filename, text);
        modified = false;
        yield sys.print("saved " + filename);
        continue;
      }

      //list lnes
      if (input === ":list") {
        if (lines.length === 0) {
          yield sys.print("no lines yet");
          continue;
        }

        for (let i = 0; i < lines.length; i++) {
          yield sys.print(`${i + 1}: ${lines[i]}`);
        }

        continue;
      }

      //delete line
      if (input.startsWith(":del ")) {
        const lineNumber = Number(input.slice(5));
        const index = lineNumber - 1;

        if (Number.isNaN(lineNumber) || index < 0 || index >= lines.length) {
          yield sys.print("that line does not exist");
          continue;
        }

        lines.splice(index, 1);
        modified = true;
        yield sys.print(`deleted line ${lineNumber}.`);
        continue;
      }

      //replace line
      if (input.startsWith(":")) {
        const parts = input.slice(1).split(" ");
        const lineNumber = Number(parts[0]);
        const newText = parts.slice(1).join(" ");
        const index = lineNumber - 1;

        if (!Number.isNaN(lineNumber) && newText.length > 0) {
          if (index < 0 || index >= lines.length) {
            yield sys.print("that line does not exist");
            continue;
          }

          lines[index] = newText;
          modified = true;
          yield sys.print(`replaced line ${lineNumber}.`);
          continue;
        }
      }

      //save line
      lines.push(input);
      modified = true;
    }
  },
};

export default myProgram;