import type { Program, ProcessState, Syscall } from "./types";

/**
 * A Process is everything the kernel needs to remember about one running
 * program. In a real OS this bundle of bookkeeping is called a
 * "process control block." Ours is small enough to read in one sitting.
 */
export interface Process {
  /** Unique id number. Every process gets the next one. */
  pid: number;
  /** The program's name, e.g. "clock" (for the dashboard and `ps`). */
  name: string;
  /** Where it is in its life: new / ready / running / blocked / terminated. */
  state: ProcessState;
  /**
   * The paused generator. Calling `gen.next(value)` resumes the program,
   * handing `value` back as the result of whatever it last `yield`ed.
   */
  gen: Generator<Syscall, void, any>;
  /** Which syscall it's blocked on (for the dashboard), or null. */
  waitingOn: Syscall["type"] | null;
  /** For `sleep`: the Date.now() time when it should wake up. */
  wakeAt: number;
  /** The value passed into gen.next() the next time we resume it. */
  resumeValue: unknown;
}

/** Make a fresh process from a program. */
export function createProcess(
  pid: number,
  name: string,
  run: Program,
  args: string[],
  sys: Parameters<Program>[0],
): Process {
  return {
    pid,
    name,
    state: "new",
    gen: run(sys, args),
    waitingOn: null,
    wakeAt: 0,
    resumeValue: undefined,
  };
}
