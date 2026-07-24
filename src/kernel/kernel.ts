// ===========================================================================
// The TSOS kernel: the loop + scheduler that makes everything run.
//
// This is the heart of the project. Read it slowly. Every program in TSOS is
// a generator, and the BIG IDEA is this:
//
//     when a program writes `yield sys.something()`, it PAUSES and hands
//     control back to the kernel. The kernel does the work, then resumes
//     the program by calling gen.next(result).
//
// That `yield` is the moment a program "cooperates" — it's the exact point
// where it voluntarily gives up the CPU. This is "cooperative multitasking,"
// and making it visible is the whole reason TSOS exists.
// ===========================================================================

import { Emitter } from "./events";
import type { FileSystem } from "./filesystem";
import { createProcess, type Process } from "./process";
import { Scheduler } from "./scheduler";
import { makeSys } from "./syscalls";
import type { KernelSnapshot, ProgramModule, Sys, Syscall } from "./types";

/**
 * How long the kernel waits between steps, in milliseconds. We run ONE
 * process step per tick on purpose — slow enough that a human can watch the
 * dashboard light up as states change. Lower this to speed the OS up.
 */
const STEP_MS = 60;

export class Kernel {
  private scheduler = new Scheduler();
  /** The process table: every living process, keyed by pid. */
  private table = new Map<number, Process>();
  /** Processes blocked on `sleep`, waiting for their timer. */
  private sleeping: Process[] = [];
  /** Processes blocked on `read`, waiting in line for a typed line. */
  private readers: Process[] = [];
  /** Lines the user typed that are waiting to be handed to a reader. */
  private inputQueue: string[] = [];
  //blocked readKey processes
  private keyReaders: Process[] = [];
  private keyQueue: string[] = [];
  private rawMode = false;

  private nextPid = 1;
  private tick = 0;
  private timer: number | null = null;

  /** One shared, stateless `sys` toolbox for all programs. */
  private sys: Sys = makeSys();
  /** All the programs `run`/`spawn` can start, keyed by name. */
  private programs = new Map<string, ProgramModule>();
  private fs!: FileSystem;

  /** Wired to the terminal in main.ts; called whenever a program prints. */
  onPrint: (text: string) => void = () => {};

  /** Fires after every change so the dashboard can redraw. */
  readonly changed = new Emitter<KernelSnapshot>();

  /** Tell the kernel which programs exist (called once at boot). */
  setPrograms(programs: Map<string, ProgramModule>): void {
    this.programs = programs;
  }
  setFileSystem(fs: FileSystem): void {
    this.fs = fs;
  }
  isRawMode(): boolean {
    return this.rawMode;
  }

  /** All known programs, sorted — used by the `help` command. */
  listPrograms(): ProgramModule[] {
    return [...this.programs.values()].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  /** Start the kernel's heartbeat. Call once at boot. */
  start(): void {
    if (this.timer !== null) return;
    this.timer = window.setInterval(() => this.step(), STEP_MS);
  }

  /**
   * Create a process from a program name and put it in the ready queue.
   * Returns the new pid, or -1 if there's no such program.
   */
  spawn(name: string, args: string[] = []): number {
    const mod = this.programs.get(name);
    if (!mod) {
      this.onPrint(`kernel: no program named "${name}"`);
      return -1;
    }
    const pid = this.nextPid++;
    const proc = createProcess(pid, mod.name, mod.run, args, this.sys);
    this.table.set(pid, proc);
    this.makeReady(proc);
    this.emit();
    return pid;
  }

  /**
   * Hand a typed line to a program that's waiting on `read`.
   * Returns true if a program took it (so the shell should ignore the line),
   * or false if nobody was waiting (so the shell should treat it as a command).
   */
  deliverInput(line: string): boolean {
    if (this.readers.length === 0) return false;
    this.inputQueue.push(line);
    return true;
  }
  deliverKey(key: string): boolean {
    if (this.keyReaders.length === 0) return false;
    this.keyQueue.push(key);
    return true;
  }

  /** A read-only snapshot of kernel state, for the dashboard and `ps`. */
  snapshot(): KernelSnapshot {
    return {
      tick: this.tick,
      processes: [...this.table.values()].map((p) => ({
        pid: p.pid,
        name: p.name,
        state: p.state,
        waitingOn: p.waitingOn,
      })),
      readyQueue: this.scheduler.pids(),
    };
  }

  // ---- the engine room ----

  private emit(): void {
    this.changed.emit(this.snapshot());
  }

  /**
   * One step of the kernel. This runs on every heartbeat tick:
   *
   *   1. Wake up anyone whose wait is over (timer elapsed, input arrived).
   *   2. Pick the next ready process and mark it Running.
   *   3. Resume it until its next `yield` (a syscall) or until it finishes.
   *   4. Handle the syscall — some send it back to Ready, some Block it.
   *   5. Tell the dashboard to redraw.
   */
  private step(): void {
    this.tick++;
    this.wakeBlocked();

    const proc = this.scheduler.next();
    if (!proc) {
      // Nobody is ready to run right now. Still redraw so the tick counter
      // updates and any just-woken rows appear.
      this.emit();
      return;
    }

    proc.state = "running";
    proc.waitingOn = null;
    this.emit(); // <- the moment a row flips to "running" in the dashboard

    let result: IteratorResult<Syscall, void>;
    try {
      // Resume the program, passing back the result of its last syscall.
      result = proc.gen.next(proc.resumeValue);
      proc.resumeValue = undefined;
    } catch (err) {
      // A program crashed (threw an error). Don't take the whole OS down —
      // just print the error and kill that one process.
      this.onPrint(`[pid ${proc.pid}] crashed: ${String(err)}`);
      this.kill(proc);
      this.emit();
      return;
    }

    if (result.done) {
      // The generator returned — the program is finished.
      this.kill(proc);
      this.emit();
      return;
    }

    // The program yielded a syscall. Carry it out.
    this.handleSyscall(proc, result.value);
    this.emit();
  }

  /** Do what a syscall asks, then decide what happens to the process. */
  private handleSyscall(proc: Process, call: Syscall): void {
    switch (call.type) {
      case "print":
        // Non-blocking: print and go straight back to the ready queue.
        this.onPrint(call.text);
        this.makeReady(proc);
        break;

      case "getPid":
        // Non-blocking: resume the program with its own pid.
        proc.resumeValue = proc.pid;
        this.makeReady(proc);
        break;

      case "readFile":
        proc.resumeValue = this.fs.read(call.path);
        this.makeReady(proc);
        break;

      case "writeFile":
        proc.resumeValue = this.fs.writeFile(call.path, call.contents);
        this.makeReady(proc);
        break;

      case "spawn":
        // Non-blocking: start the other program, resume with its new pid.
        proc.resumeValue = this.spawn(call.program, call.args);
        this.makeReady(proc);
        break;

      case "sleep":
        // BLOCKING: park the process until its timer runs out.
        proc.state = "blocked";
        proc.waitingOn = "sleep";
        proc.wakeAt = Date.now() + call.ms;
        this.sleeping.push(proc);
        break;

      case "read":
        // BLOCKING: park the process until the user types a line.
        proc.state = "blocked";
        proc.waitingOn = "read";
        this.readers.push(proc);
        break;
      case "readKey":
        proc.state = "blocked";
        proc.waitingOn = "readKey";
        this.keyReaders.push(proc);
        break;
      case "setRawMode":
        this.rawMode = call.on;
        this.makeReady(proc);
        break;

      case "random":
        proc.resumeValue = Math.floor(Math.random() * call.max);
        this.makeReady(proc);
        break;

      case "exit":
        this.kill(proc);
        break;

      default: {
        // Exhaustiveness check. If someone adds a new kind of Syscall to the
        // union and forgets to handle it here, this line FAILS TO COMPILE —
        // `call` would no longer be `never`. TypeScript guarding our backs.
        const unreachable: never = call;
        throw new Error(`Unhandled syscall: ${JSON.stringify(unreachable)}`);
      }
    }
  }

  /** Put a process into the ready queue. */
  private makeReady(proc: Process): void {
    proc.state = "ready";
    proc.waitingOn = null;
    this.scheduler.enqueue(proc);
  }
  //kill process
  killProcess(target: string): boolean {
    const pid = Number(target);
    if (!Number.isNaN(pid)) {
      const proc = this.table.get(pid);
      if (!proc) {
        return false;
      }
      this.kill(proc);
      this.emit();
      return true;
    }
    // kill all processes with same name
    const matches = [...this.table.values()].filter((p) => p.name === target);
    if (matches.length === 0) {
      return false;
    }
    for (const proc of matches) {
      this.kill(proc);
    }
    this.emit();
    return true;
  }
  /** End a process and forget about it everywhere. */
  private kill(proc: Process): void {
    proc.state = "terminated";
    this.table.delete(proc.pid);
    this.scheduler.remove(proc);
    this.sleeping = this.sleeping.filter((p) => p !== proc);
    this.readers = this.readers.filter((p) => p !== proc);
  }

  /** Move finished sleepers and fed readers back into the ready queue. */
  private wakeBlocked(): void {
    const now = Date.now();

    // Sleepers whose timer has elapsed wake up.
    const stillSleeping: Process[] = [];
    for (const proc of this.sleeping) {
      if (now >= proc.wakeAt) this.makeReady(proc);
      else stillSleeping.push(proc);
    }
    this.sleeping = stillSleeping;

    // Match typed lines to waiting readers, first-come first-served.
    while (this.readers.length > 0 && this.inputQueue.length > 0) {
      const proc = this.readers.shift()!;
      proc.resumeValue = this.inputQueue.shift();
      this.makeReady(proc);
    }
    while (this.keyReaders.length > 0 && this.keyQueue.length > 0) {
      const proc = this.keyReaders.shift()!;
      proc.resumeValue = this.keyQueue.shift();
      this.makeReady(proc);
    }
  }
}
