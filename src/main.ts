// ===========================================================================
// main.ts — boots TSOS: builds the engine, wires it to the screen, starts up.
// This is the "ignition." Read it top to bottom to see how the pieces connect.
// ===========================================================================

import "./ui/layout.css";

import { FileSystem } from "./kernel/filesystem";
import { Kernel } from "./kernel/kernel";
import { Shell } from "./shell/shell";
import { TerminalUI } from "./ui/terminal";
import { Dashboard } from "./ui/dashboard";
import { programs } from "./programs";

const BANNER = [
  "",
  "  _____ ____   ___  ____",
  " |_   _/ ___| / _ \\/ ___|",
  "   | | \\___ \\| | | \\___ \\",
  "   | |  ___) | |_| |___) |",
  "   |_| |____/ \\___/|____/",
  "",
  " TSOS — a tiny operating system you can watch.",
  ' Type "help" and press Enter to begin.',
  "",
];

function boot(): void {
  const termEl = document.getElementById("terminal")!;
  const dashEl = document.getElementById("dashboard")!;

  // 1. Build the engine.
  const fs = new FileSystem();
  seedFiles(fs);

  const kernel = new Kernel();
  kernel.setPrograms(programs);
  kernel.setFileSystem(fs);

  // 2. Build the UI.
  const ui = new TerminalUI(termEl);
  new Dashboard(dashEl, kernel);

  // 3. Connect them: when a program prints, show it in the terminal.
  kernel.onPrint = (text) => ui.print(text);
  kernel.onClear = () => ui.clear();
  kernel.onWrite = (text) => ui.write(text);

  const shell = new Shell(
    fs,
    kernel,
    (text) => ui.print(text),
    () => ui.clear(),
  );

  // 4. Route each typed line. A program waiting on input gets first dibs;
  //    otherwise the shell treats the line as a command.
  ui.onLine((line) => {
    if (!kernel.deliverInput(line)) shell.run(line);
  });
  ui.onKey((key) => {
    kernel.deliverKey(key);
  });
  kernel.changed.on(() => {
    ui.setRawMode(kernel.isRawMode());
  });

  // 5. Lift off.
  for (const line of BANNER) ui.println(line);
  ui.showPrompt();
  kernel.start();
}

// Put a couple of files in the filesystem so `ls`/`cat` have something to show.
function seedFiles(fs: FileSystem): void {
  fs.writeFile(
    "readme.txt",
    "Welcome to TSOS!\nTry these: ls / cat readme.txt / run clock / run guess",
  );
  fs.makeDir("docs");
  fs.writeFile("docs/hello.txt", "You found a file inside a folder. Nice.");
}

boot();
