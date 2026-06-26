# First Tasks — pick one and go! 🎯

A menu of small, real tasks, **easiest first**. Each one is sized to finish in a
single sitting once you're set up. Every task tells you which file to copy, what
to build, how you'll know you're done, and a 📚 link or two if you want to read up.

> **Reminder:** copy the template, rename it, and **only edit your own file**.
> Don't worry about doing it the "best" way — done and working beats perfect.

These map onto the [Learning Ladder](CURRICULUM.md), so each task also quietly
teaches you a bit of TypeScript. New to a concept? The
[resources hub](CURRICULUM.md#-your-go-to-resources) lists the best places to learn.

---

## ⭐ Starter commands (copy `src/shell/commands/_template.ts`)

### `hello` — say hi
Print a friendly greeting. If the user typed their name (`hello Sam`), greet them
by name using `args`.
**Done when:** `hello` and `hello Sam` both work.
📚 [Template strings (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) · [Ladder: Rung 1](CURRICULUM.md#-rung-1--your-first-command)

### `roll` — roll a dice
Print a random number from 1 to 6.
_Hint:_ `Math.floor(Math.random() * 6) + 1`.
**Done when:** typing `roll` a few times gives different numbers.
📚 [`Math.random()` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) · [Ladder: Rung 1](CURRICULUM.md#-rung-1--your-first-command)

### `joke` — tell a joke
Print a question, then the punchline on the next line (two `print` calls).
**Done when:** it makes someone groan.
📚 [Strings (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) · [Ladder: Rung 1](CURRICULUM.md#-rung-1--your-first-command)

### `coin` — flip a coin
Print "Heads" or "Tails" at random.
_Hint:_ `Math.random() < 0.5`.
📚 [`Math.random()` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) · [`if...else` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

### `add` — add numbers
`add 3 4` should print `7`. Read the numbers from `args`, turn them into numbers,
add them.
_Hint:_ `Number(args[0]) + Number(args[1])`.
**Done when:** `add 10 5` prints `15`.
📚 [`Number()` — text to number (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number) · [Ladder: Rung 3](CURRICULUM.md#-rung-3--talk-back-reading-input)

---

## ⭐⭐ Starter programs (copy `src/programs/_template.ts`)

### `countdown` — 10 to liftoff
Count down from 10 to 1 with a `sys.sleep(1000)` between each, then print
"🚀 Liftoff!".
_Hint:_ a `for` loop, or a `while` loop with a number that goes down.
**Done when:** you watch it count down one number per second.
📚 [Loops (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) · [Generators (javascript.info)](https://javascript.info/generators) · [Ladder: Rung 2](CURRICULUM.md#-rung-2--your-first-program)

### `marquee` — scrolling message
Print a message, wait, print it shifted over by a space, wait, repeat a few
times. Watch it "move."
📚 [Loops (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) · [String methods (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods) · [Ladder: Rung 2](CURRICULUM.md#-rung-2--your-first-program)

### `greeter` — ask my name
Ask "What's your name?", `yield sys.read()` to get the answer, then say hello to
them by name. **Watch your process turn Blocked** in the dashboard while it waits!
📚 [Template strings (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) · [Ladder: Rung 3](CURRICULUM.md#-rung-3--talk-back-reading-input)

### `quiz` — one trivia question
Ask a question, read the answer, say "Correct!" or "Nope!". Use `if`/`else`.
📚 [`if...else` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) · [Comparisons (javascript.info)](https://javascript.info/comparison) · [Ladder: Rung 3](CURRICULUM.md#-rung-3--talk-back-reading-input)

### `madlib` — silly story
Ask for a noun, a verb, and an adjective (three `read`s), then print a short
story using all three. Great use of template strings.
📚 [Template strings (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) · [Ladder: Rung 3](CURRICULUM.md#-rung-3--talk-back-reading-input)

---

## ⭐⭐⭐ Bigger projects

### `fortune` — random wisdom
Keep a list (array) of sayings. Print a random one each time.
_Teaches:_ arrays, random indexing.
📚 [Arrays (javascript.info)](https://javascript.info/array) · [`Array` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) · [Ladder: Rung 4](CURRICULUM.md#-rung-4--lists-of-things-arrays)

### `rps` — rock paper scissors
Player types their move, computer picks randomly, you decide who won.
_Teaches:_ union types (`"rock" | "paper" | "scissors"`), `if`/`else` logic.
📚 [Union types (TS Handbook)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) · [Ladder: Rung 6](CURRICULUM.md#-rung-6--functions-and-your-own-types)

### `wc` — word counter (command)
`wc readme.txt` prints how many lines and words a file has.
_Teaches:_ reading files, handling a missing file (`null`), `.split()`.
📚 [`null` in TypeScript (Handbook)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined) · [`String.split()` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) · [Ladder: Rung 5](CURRICULUM.md#-rung-5--use-the-filesystem)

### `cat-game` / `adventure` — tiny text adventure
A few rooms; the player types `north`, `south`, etc. Use objects to describe
rooms.
_Teaches:_ objects, custom types, a game loop.
📚 [Object types (TS Handbook)](https://www.typescriptlang.org/docs/handbook/2/objects.html) · [Ladder: Rung 6](CURRICULUM.md#-rung-6--functions-and-your-own-types)

### `stopwatch` — count up
Print 1, 2, 3, … once per second until the user… well, you decide how it stops.
📚 [Loops (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) · [Ladder: Rung 2](CURRICULUM.md#-rung-2--your-first-program)

---

## ⭐⭐⭐⭐ Stretch goals (Phase 3 — do these with a mentor)

These touch the engine (`src/kernel/`) or the UI. Pair up with your mentor — they
unlock the "real OS" teaching moments.

- **Add a `cd` command** so the filesystem can have a "current folder."
- **Add a `sys.random()` syscall** to the engine (a guided tour of how syscalls
  work end-to-end).
- **Show the ready queue more visually** in the dashboard.
- **The runaway process demo:** write a program with `while (true) {}` and _no_
  `yield`. Watch it freeze the whole OS. Then talk about _why_ — this is the
  doorway to "preemption."
- **Preemption (big one):** make the kernel force a program to yield after N
  steps, even if it didn't ask to. This is how real OSes share the CPU.
- **Save the filesystem** to the browser's `localStorage` so files survive a
  reload.
- **A pipe:** let one program's output become another's input.

📚 [How the kernel works (EMULATOR.md)](EMULATOR.md) · [Discriminated unions & `never` (TS Handbook)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking) · [Ladder: Rung 8](CURRICULUM.md#-rung-8--into-the-engine-phase-3-with-your-mentor)

---

## How to turn a task into a contribution

1. Copy the right template, rename it, build your thing.
2. Test it in the browser (`npm run dev`).
3. Run `npm run build` to make sure there are no errors.
4. Commit just your file and open a pull request (see
   [CONTRIBUTING.md](../CONTRIBUTING.md) §5).

That's a real contribution to a real project. Nice work. 🙌
