# For Mentors & Teachers 👩‍🏫👨‍🏫

This page is for the adult(s) running TSOS with a group of 8th graders. It covers
how the project is designed to be taught, a suggested pace, and how to keep a
roomful of mixed-ability kids all productive at once.

TSOS is built around one belief: **kids learn TypeScript best by building things
that run, not by being lectured about types.** The whole project is arranged so
that the language shows up exactly when a kid needs it.

---

## Your role: the "anchor"

The codebase splits cleanly into two zones:

- **Engine (`src/kernel/`, `src/ui/`) — yours.** This is the hard part: the
  scheduler, the generator-based syscall loop, the event system. It's written and
  commented for _you_ to maintain and to explain. Kids never have to open it (but
  the comments are there for the curious one who does).
- **Kid territory (`src/programs/`, `src/shell/commands/`) — theirs.** Tiny,
  self-contained files, one per kid, each copied from a `_template.ts`.

This division is what makes a 25-kid classroom workable. Because of the
auto-discovery setup (Vite's `import.meta.glob`), **adding a file is all it takes
to register a program or command** — there is no shared registry file for
everyone to fight over, so merge conflicts basically vanish.

---

## The feedback loop is the lesson

Make sure every kid can run `npm run dev` and see the page reload when they save.
That one-second loop — edit, save, see it — does most of the teaching. Protect
it. A kid who can _see_ their change is a kid who will keep going.

The three feedback channels, in order of immediacy:

1. **Red squiggles** in the editor (use VS Code) — before they even run.
2. **The terminal** — their program's output.
3. **The dashboard** — the OS's internal state, live.

---

## Suggested pace

Expect the **first commit to take a couple of weeks**, and that's fine — most of
that time is environment setup, git nerves, and "wait, how does this work."
After the first one lands, contributions speed up a lot.

A rough term plan (adapt freely):

| Weeks | Focus                                                                 |
| ----- | --------------------------------------------------------------------- |
| 1–2   | Setup. Get everyone to a running TSOS and a first tiny **command**.   |
| 3–4   | First **program** (Rung 2). The git/PR routine becomes normal.        |
| 5–6   | **Input** (Rung 3) — the "Blocked state" aha moment on the dashboard. |
| 7–8   | **Arrays & files** (Rungs 4–5). Kids make real little apps.           |
| 9–10  | **Own types & functions** (Rung 6). Pair stronger kids on `rps`, games.|
| 11+   | **Stretch / engine** (Rungs 7–8) with you. The runaway-process demo, preemption. |

See [CURRICULUM.md](CURRICULUM.md) for the full ladder and
[FIRST_TASKS.md](FIRST_TASKS.md) for a ready-made task menu.

---

## Running it with a group

- **Assign files, not features.** "You own `programs/joke.ts`." Ownership removes
  collisions and gives each kid something that's clearly _theirs_.
- **A wall of tasks.** Print [FIRST_TASKS.md](FIRST_TASKS.md) or turn each item
  into a sticky note / GitHub issue kids can claim.
- **Pair the nervous ones.** Two kids per first PR is great for the git steps.
- **Celebrate merges.** When a kid's PR merges and their program shows up for
  everyone, make a thing of it. That moment is the hook.
- **Let the compiler do the nagging.** You don't have to catch every type
  mistake — strict mode already underlines them. Your job is the _why_, not the
  syntax police.

---

## The payoff demos (worth staging live)

These are the moments that make OS concepts click. The architecture is built to
make them easy:

- **The clock** (`run clock`): cooperative scheduling, made literal — a process
  voluntarily giving up the CPU at each `yield sys.sleep`.
- **The guessing game** (`run guess`): blocking I/O — the row sits on **Blocked
  (read)** until input arrives.
- **The runaway process:** a `while (true) {}` with no `yield` freezes
  everything. Stage it on purpose, watch the OS lock up, then ask "why?" → this
  is the natural lead-in to **preemption**.
- **Preemption (stretch):** add a step-budget to the kernel so it can force a
  yield. This is the honest cooperative-vs-preemptive lesson, and it's a real
  engine change you do together.

---

## Setting up the repo for a class

- Each kid needs Node.js (LTS) and an editor (VS Code recommended).
- Decide your git flow. The simplest: each kid works on their own branch and
  opens a PR; you review and merge. [CONTRIBUTING.md](../CONTRIBUTING.md) §5 walks
  them through it in kid-friendly language.
- `npm run build` is the single health check — it runs the TypeScript compiler in
  strict mode and the bundler. If it's green, the contribution is safe to merge.
- Consider a CI check that runs `npm run build` on every PR, so green/red is
  automatic and you're not the bottleneck.

---

## Extending the engine

When you're ready to go under the hood with advanced kids, good first engine
changes (each is a guided tour of a real OS concept):

- **A new syscall** (e.g. `sys.random()`): touch `types.ts` (add to the union),
  `syscalls.ts` (add the helper), and `kernel.ts` (handle the new case — the
  `never` exhaustiveness check will _make_ you handle it). End-to-end syscall
  flow in one sitting.
- **A new dashboard panel** (FS tree, tick chart): pure `ui/` work, no kernel
  risk.
- **A smarter scheduler** (priorities): all isolated in `scheduler.ts`.
- **Preemption**: a step budget in the kernel loop. The big one.

Have fun. You're not just teaching TypeScript — you're showing kids that the
magical box on their desk is made of understandable ideas.
