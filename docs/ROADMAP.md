# TSOS Roadmap

Where TSOS is headed. Finished phases up top, backlog below. Each phase is
broken into small, in-order issues when it's time to start it.

---

## ✅ Phase 1 — Line editor (`edit`)
A file-backed line editor: buffer, `:list`, `:del`, `:<n>` replace, `:w`/`:wq`,
unsaved-changes guard, `:?` help. Also added the `readFile`/`writeFile` syscalls
so programs can touch the filesystem. _(epic #25; issues #20–#24)_

## 🚧 Phase 2 — Full-screen editor (`nano`-style)
In progress. Arrow keys, a live cursor, save. Teaches raw per-key input and
screen ownership. _(epic #34; issues #29–#33)_

- #29 — raw key input: `sys.setRawMode()` + `sys.readKey()`
- #30 — screen drawing: `sys.clearScreen()` + clean full-screen output
- #31 — `view`: full-screen file viewer (scroll)
- #32 — editing: moving cursor, insert & delete
- #33 — save + status bar + Ctrl+S / Ctrl+Q

---

## 📋 Phase 3 — Devices & device drivers  _(BACKLOG — open issues after Phase 2 is done)_

**Goal:** teach how an OS talks to hardware by writing **device drivers**, using
the browser's real device APIs. This completes the classic OS picture:
`program → syscall → kernel → driver → hardware` (TSOS already has the first
three).

**Design sketch:**
- Add a **device model** to the kernel: a `Device`/driver interface
  (`open` / `read` / `write` / `close`) and a device **registry** — basically a
  `/dev`.
- Add device syscalls: `openDevice(name)`, `deviceRead(handle)`,
  `deviceWrite(handle, data)`, plus a `devices` command to list them.
- **The key lesson:** hardware data arrives *asynchronously*, but a program calls
  `deviceRead()` *synchronously and blocks*. The driver buffers incoming data and
  wakes the blocked process when data arrives — which is exactly how the kernel
  already handles keyboard `read` (`readers` / `inputQueue` / `wakeBlocked`) and
  will handle `readKey`. That async-hardware → buffer → wake-blocked-reader bridge
  **is** interrupt-driven / buffered I/O. Reuse the pattern he already knows.

**Staged arc (easy → real hardware):**
1. Kernel **device model** + `/dev` registry + a `devices` command.
2. A **virtual device** (e.g. `/dev/random`, or a fake sensor that emits numbers)
   — learn the driver shape with **zero hardware**.
3. A **zero-friction real device** — `/dev/battery` (Battery API: real charge
   level, no permission, no hardware) or a **Gamepad**. First "it's reading real
   hardware!" moment with nothing to buy.
4. **Web Serial** (`navigator.serial`) — a real serial port (Arduino / micro:bit /
   USB-serial). The capstone: the OS talking to physical hardware.

**Constraints to remember when we write these up:**
- Browser sandbox: no bare-metal / MMIO / IRQs. The browser is our
  hardware-abstraction layer; we write the driver on top. Frame this honestly.
- Serial / USB / Bluetooth / HID need a **user-gesture permission click**, are
  **Chromium-only**, and need a **secure context** (localhost `npm run dev` is
  fine; deployed needs HTTPS).
- Real serial needs **physical hardware** — the virtual device (step 2) teaches
  the pattern without any.
- Nice hook: the existing `say` command (SpeechSynthesis) is *already* a
  driver-ish thing (a program → the speaker device). He's closer than he thinks.

**Trigger:** open the Phase 3 epic + sub-issues once the Phase 2 full-screen
editor (#34) is complete.
