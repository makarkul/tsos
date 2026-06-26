# The TSOS Learning Ladder 🪜

**How you learn TypeScript here:** you don't sit through TypeScript lessons. You
build small things, and each thing quietly introduces one or two new TypeScript
ideas. The editor and the build are your tutors — they point at mistakes and you
fix them. By the time you've climbed a few rungs, you _know_ TypeScript without
anyone having "taught" it to you.

This page is the **map**. Each rung lists:

- **Build:** what you make.
- **You'll meet:** the new TypeScript / programming ideas that show up naturally.
- **📚 Learn more:** a couple of short, friendly links if you want to read up.
- **Done when:** how you know you finished.

> Go in order if you like, or jump to whatever sounds fun. Rungs 1–2 are the
> foundation everyone should do. After that, follow your curiosity.

Concrete, copy-paste-ready versions of many of these are in
**[FIRST_TASKS.md](FIRST_TASKS.md)**.

---

## 📚 Your go-to resources

You don't need to read these before starting — reach for them when you're curious
or stuck. All three are free, friendly, and trustworthy:

- **[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** —
  the encyclopedia for JavaScript (which TypeScript is built on). Great for "how
  does `Array` work?" lookups.
- **[The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)**
  — the official guide to the _types_ part. Start with
  [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).
- **[javascript.info](https://javascript.info/)** — a from-scratch tutorial with
  clear examples and exercises.

🧪 Want to try an idea without touching the project? Paste it into the
**[TypeScript Playground](https://www.typescriptlang.org/play)** — it runs in
your browser and shows you the types live.

---

## 🟢 Rung 0 — Boot it and poke it (no coding yet)

**Build:** nothing — just run TSOS and play.

**You'll meet:**

- the terminal, the dashboard, and the idea of a "process"
- the dev loop: edit → save → the page reloads → you see it

**📚 Learn more:**

- [How TSOS works, in plain language](EMULATOR.md) — our own tour of the OS.
- [What is a process? (MDN, "process" idea via Web Workers intro)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
  — optional background on things running "at the same time."

**Done when:** you've run `clock`, `guess`, and `cowsay`, and watched the process
table change colors as they run.

---

## 🟢 Rung 1 — Your first command

**Build:** a new command (copy `commands/_template.ts`). Make `joke`, or `hello`,
or `roll` (prints a random dice roll).

**You'll meet:**

- **variables** (`const`) and **strings** (`"text"`)
- **calling a function** — `print("hi")`
- **template strings** — `` `You rolled ${n}` `` (backticks, with `${}` holes)
- **importing a type** — `import type { Command } from ...`
- the idea that a file **exports** something for the rest of the app to use

**📚 Learn more:**

- [`const` — declaring a variable (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [Template strings (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [import / export modules (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [TypeScript: the basic types (Handbook)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

**Done when:** you type your command in the terminal and it prints something.

---

## 🟢 Rung 2 — Your first program

**Build:** a program (copy `programs/_template.ts`) that prints a few lines with
pauses. Try a `countdown` (10, 9, 8 … liftoff) or an animation.

**You'll meet:**

- **generators** and the magic word **`yield`** — the heart of TSOS
- **loops** — `while` and `for`
- **numbers** and simple math
- why `yield sys.sleep(1000)` pauses your program for a second

**📚 Learn more:**

- [Generators, explained simply (javascript.info)](https://javascript.info/generators)
- [`function*` — generator functions (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- [Loops and iteration (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

**Done when:** `run yourprogram` plays your sequence with pauses you can see.

---

## 🟡 Rung 3 — Talk back: reading input

**Build:** a program that asks a question and reacts. A `quiz` question, a
`madlib` story, or a `greeter` that asks your name.

**You'll meet:**

- `const answer = yield sys.read()` — pausing until the user types (this is what
  makes your process turn **Blocked** in the dashboard!)
- **`if` / `else if` / `else`** — making decisions
- comparing things — `===`, `<`, `>`
- turning a typed string into a number — `Number(answer)`

**📚 Learn more:**

- [`if...else` — making decisions (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- [Comparisons and `===` (javascript.info)](https://javascript.info/comparison)
- [Turning text into a number with `Number()` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number)

**Done when:** your program changes what it does based on what the user typed.

---

## 🟡 Rung 4 — Lists of things (arrays)

**Build:** a program or command that works with a **list**. A `fortune` that
picks a random saying from a list. A `countdown` that reads from an array. A
`menu`.

**You'll meet:**

- **arrays** — `const sayings = ["a", "b", "c"]`
- reading items — `sayings[0]`, `sayings.length`
- **typed arrays** — `const nums: number[] = [...]` (TypeScript checks every
  item is a number!)
- picking a random item

**📚 Learn more:**

- [Arrays, from the start (javascript.info)](https://javascript.info/array)
- [`Array` reference (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Typed arrays in TypeScript (Handbook → "Arrays")](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)
- [`Math.random()` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

**Done when:** your thing uses a list and does something different each run.

---

## 🟡 Rung 5 — Use the filesystem

**Build:** a command that reads or writes files. A `wc` (counts words/lines in a
file), a `find` (lists files matching a word), a `today` that writes the date to
a file.

**You'll meet:**

- using objects you didn't make — `fs.read(path)`, `fs.writeFile(path, text)`
- **handling "not found"** — these can return `null`, and TypeScript makes you
  check before using the result (this is the famous "no more null crashes" thing)
- **string methods** — `.split()`, `.trim()`, `.includes()`

**📚 Learn more:**

- [`null` and `undefined` in TypeScript (Handbook)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)
- [`String.prototype.split()` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [All the string methods (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods)

**Done when:** your command reads or changes a file and handles a missing file
nicely instead of crashing.

---

## 🟠 Rung 6 — Functions and your own types

**Build:** something a little bigger — a `calc` (calculator), a `rps`
(rock-paper-scissors), a small `adventure` with rooms.

**You'll meet:**

- writing your **own helper functions** with typed parameters:
  `function add(a: number, b: number): number`
- making your **own type** — `type Move = "rock" | "paper" | "scissors"` (a
  "union type": only those three words are allowed, and the editor autocompletes
  them!)
- **objects** — `{ name: "...", hp: 10 }` and typing them

**📚 Learn more:**

- [Functions with types (TS Handbook)](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [Union types (TS Handbook)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [Object types (TS Handbook)](https://www.typescriptlang.org/docs/handbook/2/objects.html)

**Done when:** you've written at least one helper function and one custom type,
and TypeScript stops you when you misuse them.

---

## 🟠 Rung 7 — Programs that talk to the OS more

**Build:** a program that uses `sys.spawn` (start another program) or
`sys.getPid`, or a `launcher` that starts several programs.

**You'll meet:**

- getting results back from a `yield` — `const pid = yield sys.spawn("clock")`
- thinking about **processes** as separate things with their own ids
- reading args — `run greet Alice` gives your program `args = ["Alice"]`

**📚 Learn more:**

- [The `yield` operator, in depth (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)
- [How TSOS runs processes (our EMULATOR doc)](EMULATOR.md)

**Done when:** your program starts or coordinates other programs.

---

## 🔴 Rung 8 — Into the engine (Phase 3, with your mentor)

**Build:** a real change to `src/kernel/` — _with your mentor_. Add a new syscall
(like `sys.random()`), or a new column to the dashboard, or a smarter scheduler.

**You'll meet:**

- **discriminated unions** and **exhaustive `switch`** (the `Syscall` type)
- the **`never` type** trick that makes the compiler force you to handle every
  case
- how events drive the UI without any framework
- reading and changing code you didn't write — a huge real-world skill

**📚 Learn more:**

- [Discriminated unions (TS Handbook → Narrowing)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [Exhaustiveness checking & the `never` type (TS Handbook)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking)
- [Scheduling, the OS concept (Wikipedia)](https://en.wikipedia.org/wiki/Scheduling_%28computing%29)
- [How TSOS's kernel loop works (our EMULATOR doc)](EMULATOR.md)

**Done when:** you changed the engine and the whole OS still works.

---

## How the TypeScript ideas stack up

| You can already…          | New idea that rung adds                 |
| ------------------------- | --------------------------------------- |
| Rung 1: strings, printing | variables, template strings, imports    |
| Rung 2: generators        | `yield`, loops, numbers                 |
| Rung 3: input             | `if/else`, comparisons, `Number()`      |
| Rung 4: arrays            | typed arrays, indexing, `.length`       |
| Rung 5: files             | `null` handling, string methods         |
| Rung 6: your own types    | functions with types, union types, objects |
| Rung 7: more syscalls     | return values from yields, args         |
| Rung 8: the engine        | discriminated unions, `never`, events   |

**Still want more?** The [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
covers everything in order. But you honestly don't have to read it cover to cover
— you'll pick most of it up just by building and reading the red underlines.
