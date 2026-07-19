import type { Sys } from "./types";

/**
 * Builds the `sys` toolbox that every program gets.
 *
 * Notice each method does almost nothing — it just packages up a request
 * object describing what the program WANTS. The kernel is what actually
 * does the work when the program `yield`s that request.
 *
 * Because these helpers hold no state, one shared `sys` works for every
 * process in the system.
 */
export function makeSys(): Sys {
  return {
    print: (text) => ({ type: "print", text }),
    read: () => ({ type: "read" }),
    sleep: (ms) => ({ type: "sleep", ms }),
    spawn: (program, args = []) => ({ type: "spawn", program, args }),
    exit: () => ({ type: "exit" }),
    getPid: () => ({ type: "getPid" }),
    random: (max) => ({ type: "random", max }),
  };
}
