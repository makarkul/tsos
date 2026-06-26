import type { ProgramModule } from "../kernel/types";

// -- Auto-discover every program file in this folder -------------------------
//
// Same Vite trick as the commands: drop a new file in programs/ and it shows
// up automatically. No central list to edit, so no merge conflicts.
//
// Each program file does `export default { name, describe, run }`.
const modules = import.meta.glob<{ default: ProgramModule }>("./*.ts", {
  eager: true,
});

export const programs = new Map<string, ProgramModule>();
for (const path in modules) {
  if (path.includes("_template") || path.includes("/index")) continue;
  const mod = modules[path].default;
  if (!mod || !mod.name) continue; // skip files that aren't real programs
  programs.set(mod.name, mod);
}
