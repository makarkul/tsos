import type { ProgramModule } from "../kernel/types";
const view: ProgramModule = {
  name: "view",
  describe: "edit a file with a simple full-screen editore",

  run: function* (sys, args) {
    //file path argument after veiw
    const path = args[0];
    if (!path) {
      yield sys.print("Usage: run view <file>");
      return;
    }
    //load file through kernel
    const contents = yield sys.readFile(path);
    const lines = contents.split("\n");
    //cursor position
    let row = 0;
    let col = 0;
    //track if the file has been changed
    let modified = false;
    //track if ctrl+q was pressed once with unsaved changes
    let quitWarning = false;
    //show a short message at the bottom of the screen
    let message = "";
    //sitch to raw keyboard mode
    yield sys.setRawMode(true);

    try {
      while (true) {
        //make sure there is always at least one line
        if (lines.length === 0) {
          lines.push("");
        }
        //make sure the cursor is still inside the text
        if (row < 0) {
          row = 0;
        }
        if (row >= lines.length) {
          row = lines.length - 1;
        }
        //make sure col is not past the current line
        if (col < 0) {
          col = 0;
        }
        if (col > lines[row].length) {
          col = lines[row].length;
        }
        //clear and redraw the whole screen
        yield sys.clearScreen();

        //draw the file
        for (let i = 0; i < lines.length; i++) {
          //show the cursor line with a marker
          if (i === row) {
            const line = lines[i];
            const before = line.slice(0, col);
            const after = line.slice(col);

            yield sys.print(before + "|" + after);
          } else {
            yield sys.print(lines[i]);
          }
        }
        //show a blank line before the status area
        yield sys.print("");
        //show a message such as saved or the quit warning
        if (message) {
          yield sys.print(message);
        } else if (quitWarning) {
          yield sys.print("Unsaved changes! Press Ctrl+Q again to quit.");
        } else {
          yield sys.print("");
        }
        //show the status bar
        const modifiedMark = modified ? " *" : "";
        yield sys.print(
          `${path}    row ${row + 1}, col ${col + 1}${modifiedMark}`,
        );
        //show the controls
        yield sys.print("Ctrl+S = save    Ctrl+Q = quit");
        //message only lasts until the next redraw
        message = "";
        //wait for a keyboard input
        const key = yield sys.readKey();

        //ctrl+s saves the file
        if (key === "Ctrl+S") {
          const newContents = lines.join("\n");
          yield sys.writeFile(path, newContents);
          modified = false;
          quitWarning = false;
          message = "saved";
          continue;
        }
        //ctrl+q quits the editor
        if (key === "Ctrl+Q") {
          //if there are no changes, quit right away
          if (!modified) {
            break;
          }
          if (quitWarning) {
            break;
          }
          quitWarning = true;
          continue;
        }
        quitWarning = false;
        //move cursor left
        if (key === "ArrowLeft") {
          if (col > 0) {
            col--;
          } else if (row > 0) {
            //move to the end of the previous line
            row--;
            col = lines[row].length;
          }
          continue;
        }
        //move cursor right
        if (key === "ArrowRight") {
          if (col < lines[row].length) {
            col++;
          } else if (row < lines.length - 1) {
            //move to the start of the next line
            row++;
            col = 0;
          }
          continue;
        }
        //move cursor up
        if (key === "ArrowUp") {
          if (row > 0) {
            row--;
            col = Math.min(col, lines[row].length);
          }

          continue;
        }

        //move cursor down
        if (key === "ArrowDown") {
          if (row < lines.length - 1) {
            row++;
            col = Math.min(col, lines[row].length);
          }
          continue;
        }
        //backspace deletes the character before the curso
        if (key === "Backspace") {
          if (col > 0) {
            lines[row] = lines[row].slice(0, col - 1) + lines[row].slice(col);
            col--;
            modified = true;
          } else if (row > 0) {
            //join this line with the previous line
            const previousLength = lines[row - 1].length;
            lines[row - 1] += lines[row];
            lines.splice(row, 1);

            row--;
            col = previousLength;

            modified = true;
          }

          continue;
        }

        //enter splits the curent line into two lines
        if (key === "Enter") {
          const currentLine = lines[row];
          const before = currentLine.slice(0, col);
          const after = currentLine.slice(col);
          lines[row] = before;
          lines.splice(row + 1, 0, after);
          row++;
          col = 0;
          modified = true;
          continue;
        }
        if (key.length === 1 && key.charCodeAt(0) >= 32) {
          lines[row] = lines[row].slice(0, col) + key + lines[row].slice(col);
          col++;
          modified = true;
          continue;
        }
      }
    } finally {
      //always turn raw mode off before leaving the editor
      yield sys.setRawMode(false);
    }
  },
};

export default view;
