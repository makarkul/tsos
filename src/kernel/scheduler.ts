import type { Process } from "./process";

/**
 * The scheduler decides who runs next.
 *
 * Ours is the simplest *real* algorithm: round-robin. Whenever a process is
 * ready to run, it goes to the back of a line (the "ready queue"). The kernel
 * always runs whoever is at the front. Everybody gets a fair, equal turn.
 *
 * Swapping this out for a smarter policy (priorities? shortest-job-first?)
 * is a great advanced project — and because it all lives here, you only
 * have to change this one file.
 */
export class Scheduler {
  private readyQueue: Process[] = [];

  /** Put a process at the BACK of the line. */
  enqueue(proc: Process): void {
    this.readyQueue.push(proc);
  }

  /** Take the process at the FRONT of the line (or undefined if empty). */
  next(): Process | undefined {
    return this.readyQueue.shift();
  }

  /** Yank a process out of the line (used when it's killed). */
  remove(proc: Process): void {
    this.readyQueue = this.readyQueue.filter((p) => p !== proc);
  }

  /** The pids waiting in line — handy for the dashboard. */
  pids(): number[] {
    return this.readyQueue.map((p) => p.pid);
  }
}
