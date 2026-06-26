# Contributing to TSOS 🛠️

Welcome! This page shows you how to set up TSOS, the few rules that keep everyone
from stepping on each other, and how to share your work. Take your time — it's
totally normal for your **first** commit to take a couple of weeks. After that,
it gets fast.

---

## 1. One-time setup

1. **Install Node.js.** Get the "LTS" version from <https://nodejs.org>. This is
   the engine that runs TypeScript on your computer.
2. **Get the code.** Your mentor will tell you how to download (clone) it.
3. **Open a terminal** in the project folder and run:

   ```bash
   npm install
   ```

   This downloads the tools TSOS needs. You only do it once.

4. **Start TSOS:**

   ```bash
   npm run dev
   ```

   Your browser opens to TSOS. Leave this running while you work — every time
   you save a file, the page updates by itself.

> 💡 Use an editor that understands TypeScript. [VS Code](https://code.visualstudio.com)
> is free and great: it autocompletes for you and underlines mistakes in red
> _before_ you even run anything. That red underline is your friend — it's
> TypeScript teaching you.

---

## 2. The Golden Rules

1. **In Phase 1 and 2, work in your OWN new file.** Make a new file in
   `src/shell/commands/` or `src/programs/` by copying the `_template.ts`, and
   don't edit other people's files. This is what lets the whole class work at the
   same time without conflicts. (Phase 3 is different — see the next rule.)
2. **The kernel is the destination, not a no-go zone.** Once you're comfortable
   with commands and programs, you'll change `src/kernel/` itself — that's where
   the real operating-system learning happens. Because lots of people can touch
   the same engine files, Phase 3 work is done **together with your mentor**, one
   focused change at a time, on its own branch. See
   [docs/CURRICULUM.md](docs/CURRICULUM.md) Rung 8.
3. **Start from the template.** Don't start from a blank file. Copy
   `_template.ts`, rename it, and change what's inside.
4. **Small is good.** A program that prints one funny message is a perfect first
   contribution. You can always make it fancier later.
5. **If it's red, read it.** When TypeScript underlines something in red, hover
   over it. The message is usually telling you exactly what's wrong.

---

## 3. Make your first thing

1. Copy a template — for example, in `src/programs/`, copy `_template.ts` to a
   new file like `myname.ts`.
2. Change the `name` inside (this is what you'll type after `run`).
3. Write what it does. Save.
4. Switch to the browser. Type `run myname`. See it work!

There's a whole menu of beginner-friendly ideas in
**[docs/FIRST_TASKS.md](docs/FIRST_TASKS.md)** — go pick one.

---

## 4. Check your work before you share

Before you share your change, run this once:

```bash
npm run build
```

If it says `built in ...` with no red errors, you're good. If you see errors,
read the file + line number it mentions and fix it (or ask your mentor). This is
the same check that runs for everyone, so passing it means your file is healthy.

---

## 5. Share your work with git

git is how we collect everyone's files into one project. Here's the simple
routine. (Your mentor can help the first few times — this part feels weird at
first and then becomes second nature.)

```bash
# 1. Make a branch named after what you're doing:
git checkout -b add-myname-program

# 2. Stage and save (commit) YOUR file with a short message:
git add src/programs/myname.ts
git commit -m "Add myname program that does X"

# 3. Send it up so others can see it:
git push -u origin add-myname-program
```

Then open a **Pull Request** on GitHub (your mentor will show you the button).
A pull request is just you saying "here's my file, please add it to the
project." Someone will look, maybe leave a friendly comment, and merge it. 🎉

> **Tip:** commit _only your own file(s)_. If `git status` shows files you
> didn't mean to change, ask before committing them.

---

## 6. When you're stuck

Everybody gets stuck — it's part of coding, not a sign you're doing it wrong.

- **Read the red underline / the build error.** It usually names the problem.
- **Compare with a working example.** Look at `programs/clock.ts` or
  `programs/guess.ts` and see how they did it.
- **Re-read the template comments.** They list everything your program can do.
- **Ask a teammate or your mentor.** Bring the exact error message with you.

Happy tinkering!
