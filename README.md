# TSOS 🖥️

**A tiny operating system you can _watch_ — built by 8th graders, in TypeScript.**

TSOS is a pretend operating system that runs in your web browser. It has a real
terminal, a filesystem, programs, and a little "kernel" that runs everything.
The cool part: a **live dashboard** shows you what the OS is doing on the inside
— you can watch programs start, run, wait, and finish in real time.

You build TSOS by writing small programs and commands. Along the way, you learn
real TypeScript — not from a lecture, but by making things that actually run.

![TSOS: a terminal on the left, a live process table on the right](docs/screenshot.png)

---

## Quick start (5 minutes)

You need [Node.js](https://nodejs.org) installed (the "LTS" version is perfect).

```bash
npm install     # download the tools TSOS needs (do this once)
npm run dev     # start TSOS — it opens in your browser
```

Your browser opens to TSOS. Try typing these, pressing Enter after each:

```
help
run clock
run guess
run cowsay hello world
ls
cat readme.txt
ps
```

When you change a file and save it, the page **reloads by itself** — so you see
your change instantly. That fast loop is the whole point. ✨

> Stuck on setup? See **[CONTRIBUTING.md](CONTRIBUTING.md)** for step-by-step help.

---

## What can I make?

Two kinds of things, and **you only ever edit your own file** so you never
collide with a teammate:

| You write a…  | …by adding a file in    | …and you can then type | Example                 |
| ------------- | ----------------------- | ---------------------- | ----------------------- |
| **Program**   | `src/programs/`         | `run yourname`         | a game, a clock, a quiz |
| **Command**   | `src/shell/commands/`   | `yourname`             | `echo`, `ls`, a joke    |

Each folder has a `_template.ts` file. **Copy it, rename it, fill in the
blanks.** That's your first contribution.

👉 **New here? Open [docs/FIRST_TASKS.md](docs/FIRST_TASKS.md) and pick a task.**

---

## How TSOS is organized

```
src/
  kernel/      ← the engine. The "hard parts." You don't need to touch this.
  shell/
    commands/  ← YOUR TERRITORY: one file per command
  programs/    ← YOUR TERRITORY: one file per program
  ui/          ← the terminal + dashboard on screen
```

- **`kernel/`** is the engine your mentor maintains. It's heavily commented, so
  peek inside when you're curious — but you never _have_ to.
- **`programs/`** and **`commands/`** are yours. Small, self-contained files.

There's a deeper tour of how it all fits together in
**[docs/EMULATOR.md](docs/EMULATOR.md)**.

---

## The docs

| Doc                                          | What's in it                                                       |
| -------------------------------------------- | ----------------------------------------------------------------- |
| **[CONTRIBUTING.md](CONTRIBUTING.md)**       | How to set up, the golden rules, and how to share your work (git) |
| **[docs/FIRST_TASKS.md](docs/FIRST_TASKS.md)** | A menu of starter tasks, easiest first. **Start here.**         |
| **[docs/CURRICULUM.md](docs/CURRICULUM.md)** | The learning ladder: what TypeScript you pick up at each step      |
| **[docs/EMULATOR.md](docs/EMULATOR.md)**     | How the "OS" actually works (the fun internals)                   |
| **[docs/FOR_MENTORS.md](docs/FOR_MENTORS.md)** | For teachers/parents: how to run this with a group              |

---

## What this is (and isn't)

TSOS **simulates** an operating system to make its hidden parts _visible_. It is
**not** a real OS that boots a computer — TypeScript runs inside the browser, on
top of a lot of software already. And that's on purpose: the goal is to **see**
how an OS thinks (how it picks what runs next, how a program waits for input),
not to replace Windows. 🙂

---

_Built with TypeScript, Vite, and xterm.js. Have fun tinkering._
