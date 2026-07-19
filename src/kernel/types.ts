// ===========================================================================
// TSOS core types — the vocabulary the whole engine speaks.
//
// This is engine code (Phase 3). You don't need it to write commands and
// programs — but it's commented carefully so that when you're ready to work on
// the kernel itself, it reads clearly and you can build on it.
// ===========================================================================

import type { FileSystem } from "./filesystem";
import type { Kernel } from "./kernel";

/**
 * The five states a process can be in. This is a classic operating-system
 * state machine — the same idea real OSes use.
 *
 *   new        -> just created, not started yet
 *   ready      -> waiting in line for its turn on the CPU
 *   running    -> currently executing (only one at a time in TSOS!)
 *   blocked    -> waiting for something (a timer, or user input)
 *   terminated -> finished
 */
export type ProcessState =
  | "new"
  | "ready"
  | "running"
  | "blocked"
  | "terminated";

/**
 * A Syscall ("system call") is a *request* a program makes to the kernel.
 *
 * Programs in TSOS never do I/O themselves. They `yield` one of these little
 * request objects and hand control back to the kernel. The kernel does the
 * real work, then resumes the program with the result.
 *
 * This is a "discriminated union": every member has a `type` field, and the
 * kernel uses a `switch` on that field to know what to do. TypeScript makes
 * sure we handle every single case (see the kernel's exhaustiveness check).
 *
 * You never write these objects by hand — you call the `sys.*` helpers,
 * which build them. So this union is an engine-internal secret.
 */
export type Syscall =
  | { type: "print"; text: string }
  | { type: "read" }
  | { type: "sleep"; ms: number }
  | { type: "spawn"; program: string; args: string[] }
  | { type: "exit" }
  | { type: "getPid" }
  | { type: "random"; max: number };

/**
 * The `sys` toolbox handed to every program. These helpers just *build*
 * Syscall requests — the kernel is what actually carries them out.
 *
 * Keep this list TINY. It is the entire world a program can see.
 */
export interface Sys {
  /** Write one line to the terminal. */
  print(text: string): Syscall;
  /** Pause until the user types a line; resumes with that line (a string). */
  read(): Syscall;
  /** Pause this program for `ms` milliseconds. */
  sleep(ms: number): Syscall;
  /** Start another program; resumes with its process id (a number). */
  spawn(program: string, args?: string[]): Syscall;
  /** Stop this program right now. */
  exit(): Syscall;
  /** Resumes with this program's own process id (a number). */
  getPid(): Syscall;
  //get randomnumber from 0 up to 1
  random(max: number): Syscall;
}

/**
 * A Program is a generator function. It receives the `sys` toolbox and `args`
 * (the words typed after the program name). Every time it `yield`s a syscall,
 * it pauses and hands control back to the kernel; the kernel resumes it with
 * the syscall's result.
 *
 * The third generator type parameter is `any` on purpose: different syscalls
 * resume with different kinds of value (read -> string, getPid -> number),
 * and we don't want to make you juggle that on day one.
 */
export type Program = (
  sys: Sys,
  args: string[],
) => Generator<Syscall, void, any>;

/** What a PROGRAM file exports (with `export default`). */
export interface ProgramModule {
  /** The name you type after `run`. e.g. "clock" so you can `run clock`. */
  name: string;
  /** One short line describing what it does (shown by `help`). */
  describe: string;
  /** The generator function that does the work. */
  run: Program;
}

/** The tools a shell COMMAND can use while it runs. */
export interface CommandContext {
  /** The words typed after the command name. `mkdir docs` -> ["docs"]. */
  args: string[];
  /** Print one line to the terminal. */
  print(text: string): void;
  /** Wipe the terminal screen. */
  clear(): void;
  /** The in-memory filesystem (for ls, cat, write, ...). */
  fs: FileSystem;
  /** The kernel (used by `run` and `ps`). */
  kernel: Kernel;
}

/** What a COMMAND file exports (with `export default`). */
export interface Command {
  /** The word you type to run it, e.g. "echo". */
  name: string;
  /** One short line describing what it does (shown by `help`). */
  describe: string;
  /** Runs when someone types this command. */
  run(ctx: CommandContext): void;
}

/** A read-only snapshot of one process, for the dashboard to draw. */
export interface ProcessInfo {
  pid: number;
  name: string;
  state: ProcessState;
  /** Which syscall it's blocked on right now, or null if it isn't. */
  waitingOn: Syscall["type"] | null;
}

/** A read-only snapshot of the whole kernel, for the dashboard to draw. */
export interface KernelSnapshot {
  tick: number;
  processes: ProcessInfo[];
  /** The pids currently waiting in the ready queue. */
  readyQueue: number[];
}
