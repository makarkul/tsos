import type { FileSystem } from "../kernel/filesystem";
import type { Kernel } from "../kernel/kernel";
import type { Command, CommandContext } from "../kernel/types";

// -- Auto-discover every command file in commands/ ---------------------------
//
// `import.meta.glob` is a Vite superpower: it finds every matching file for us.
// So when you drop a new file into commands/, it just shows up — there is
// NO central list to edit, which means NO merge conflicts between teammates.
//
// Each command file does `export default { name, describe, run }`.
const modules = import.meta.glob<{ default: Command }>("./commands/*.ts", {
  eager: true,
});

const commands = new Map<string, Command>();
for (const path in modules) {
  if (path.includes("_template")) continue; // the template isn't a real command
  const cmd = modules[path].default;
  if (!cmd || !cmd.name) continue; // skip files that aren't real commands
  commands.set(cmd.name, cmd);
}

/** Every registered command, sorted by name. Used by `help`. */
export function listCommands(): Command[] {
  return [...commands.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * The shell reads a typed line, splits it into a command + arguments, and
 * runs the matching command. One command per file in commands/.
 */
export class Shell {
  constructor(
    private fs: FileSystem,
    private kernel: Kernel,
    private print: (text: string) => void,
    private clear: () => void,
  ) {}

  /** Parse and run one line the user typed. */
  run(line: string): void {
    const words = line.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return; // empty line: do nothing

    const [name, ...args] = words;
    const cmd = commands.get(name);
    if (!cmd) {
      this.print(`tsos: command not found: ${name}  (try "help")`);
      return;
    }

    const ctx: CommandContext = {
      args,
      print: this.print,
      clear: this.clear,
      fs: this.fs,
      kernel: this.kernel,
    };

    // If a command throws, show the error instead of crashing the page.
    try {
      cmd.run(ctx);
    } catch (err) {
      this.print(`${name}: ${String(err)}`);
    }
  }
}
