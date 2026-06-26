# How the TSOS "Emulator" Works ⚙️

This page answers two questions:

1. **Where does TSOS run, and how do I see results instantly?**
2. **How does the fake "operating system" actually work inside?**

You don't need to read this to contribute. But it's the fun part, so here it is.

---

## 1. It runs in your browser — and that's a feature

**TSOS runs entirely in the web browser.** There's no server, no install of an
OS, nothing to flash onto hardware. You open a web page and you're using TSOS.

We chose the browser on purpose, because it gives kids the fastest possible
**feedback loop**, which is the single most important thing for learning:

```
edit a file  →  save  →  the page reloads itself  →  you SEE your change
        (this whole loop takes about one second)
```

That instant reload is powered by **Vite** (our dev server). When you run
`npm run dev` and then save a file, Vite swaps in your new code right away. No
"compile and wait." You change a number, you watch the behavior change.

### How you "see results" — three ways, all instant

1. **The terminal (left side).** A real terminal, built with **xterm.js**. Your
   programs print to it with `sys.print(...)`. It looks and feels like a real
   computer's command line, which makes it exciting (and familiar).
2. **The live dashboard (right side).** A table that shows every process and its
   state, updating in real time. Type `run clock` and **watch a row appear and
   flip between Running and Blocked**. This is the "make the invisible visible"
   magic — you literally see the scheduler working.
3. **Your editor.** TypeScript underlines mistakes in red _as you type_, before
   you even run anything. That's feedback before you hit save.

So: logs in the terminal, a live state view in the dashboard, and red squiggles
in your editor. You're never guessing whether something worked.

---

## 2. What's actually happening inside

Here's the honest truth and the mental model.

### TSOS is a _simulator_, not a real kernel

A real operating system runs directly on the computer's hardware and manages the
actual CPU and memory. TSOS can't do that — it's TypeScript, which becomes
JavaScript, which runs inside the browser, which runs on top of the real OS
already. So TSOS doesn't replace your OS; it **pretends** to be one, and shows
you the _ideas_ a real OS uses. That's the whole point: making those ideas
visible.

### The big idea: programs are generators that `yield`

Every TSOS program is a **generator function** (the `function*` with a star).
When a program wants the OS to do something, it writes:

```ts
yield sys.print("hello");
```

That `yield` **pauses the program** and hands control back to the **kernel**. The
kernel does the work (prints "hello"), then **resumes** the program right where
it left off. The program never touches the screen, the keyboard, or other
programs directly — it just politely asks, via `yield`.

This is called **cooperative multitasking**: each program runs until it _chooses_
to give up control (by yielding). It's exactly how some early real operating
systems worked, and it's wonderfully easy to see, because the `yield` _is_ the
moment of cooperation.

### The kernel loop (the heartbeat)

The kernel keeps a **ready queue** — a line of processes waiting for a turn.
Many times a second, it does this (`src/kernel/kernel.ts`):

1. **Wake** anyone whose wait is over (a `sleep` timer ran out, or input arrived).
2. **Pick** the next process from the front of the ready queue.
3. **Run** it (resume its generator) until its next `yield`.
4. Look at what it yielded:
   - `print`, `getPid`, `spawn` → do it, send the process back to the ready queue.
   - `sleep`, `read` → **block** the process (it leaves the queue and waits).
   - the program **finished** → mark it terminated and forget it.
5. **Announce** "something changed" so the dashboard redraws.
6. Repeat.

Because it runs one step at a time and announces every change, you can _watch_
the whole thing on the dashboard.

### The pieces (a quick map of `src/kernel/`)

| File            | What it does                                                |
| --------------- | ---------------------------------------------------------- |
| `types.ts`      | The shared vocabulary: `Syscall`, `Program`, states, etc.  |
| `syscalls.ts`   | Builds the `sys` toolbox programs use (`print`, `read`, …). |
| `process.ts`    | What we remember about one running program.                 |
| `scheduler.ts`  | The ready queue — decides who runs next (round-robin).      |
| `kernel.ts`     | The loop that ties it all together. The heartbeat.          |
| `filesystem.ts` | A tree of folders and text files, in memory.                |
| `events.ts`     | A tiny "tell the dashboard to redraw" notifier.             |

### Why no React or other framework?

On purpose. A framework would hide the very mechanics we're trying to show. The
kernel is the single source of truth; when it changes, it fires an event; the
dashboard updates the page directly. That's the entire "state management" story,
and it's small enough to read in one sitting.

---

## A demo to try right now

1. `run clock` — watch its row flip **Running → Blocked (sleep) → Running** once
   a second. That's the scheduler parking it while it sleeps.
2. `run guess` — watch it sit on **Blocked (read)** until you type a number.
   That's blocking I/O, made visible.
3. `ps` — print the same process table as text, any time.
4. **(Advanced, with a mentor):** write a program that does `while (true) {}`
   with **no** `yield`, and `run` it. The whole OS freezes, because that program
   never cooperates. That frozen screen is the best possible explanation of why
   real operating systems eventually invented **preemption**.

That's TSOS: a real, instant feedback loop on the outside, and a small, readable,
visible operating system on the inside.
