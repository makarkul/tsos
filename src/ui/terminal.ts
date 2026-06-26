import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

// xterm.js gives us a REAL terminal in the browser — blinking cursor and all.
// Feeling like a real computer matters a lot for getting kids excited.

const PROMPT = "tsos> ";

/**
 * Wraps xterm.js with a tiny "line editor": it collects the characters you
 * type, handles Backspace and Enter, and hands finished lines to a callback.
 */
export class TerminalUI {
  private term: Terminal;
  private fit = new FitAddon();
  private buffer = ""; // what the user has typed so far on this line
  private onLineCb: (line: string) => void = () => {};

  constructor(container: HTMLElement) {
    this.term = new Terminal({
      cursorBlink: true,
      fontFamily: 'Menlo, Consolas, "DejaVu Sans Mono", monospace',
      fontSize: 14,
      convertEol: true,
      theme: { background: "#0b1020", foreground: "#d7e0ff", cursor: "#5ad1ff" },
    });
    this.term.loadAddon(this.fit);
    this.term.open(container);
    this.fit.fit();
    window.addEventListener("resize", () => this.fit.fit());

    this.term.onData((data) => this.handleInput(data));
  }

  /** Register the function to call when the user finishes a line (Enter). */
  onLine(cb: (line: string) => void): void {
    this.onLineCb = cb;
  }

  /** Write a plain line (no prompt juggling). Used for the boot banner. */
  println(text: string): void {
    this.term.write(text + "\r\n");
  }

  /** Show the shell prompt. */
  showPrompt(): void {
    this.term.write(PROMPT);
  }

  /**
   * Print a line of OUTPUT (e.g. from a running program) without clobbering
   * what the user is mid-way through typing. We erase the current prompt line,
   * print the message, then redraw the prompt plus their in-progress text.
   * This is the same trick real shells use.
   */
  print(text: string): void {
    this.term.write("\r\x1b[K"); // go to line start, clear to end of line
    this.term.write(text + "\r\n");
    this.term.write(PROMPT + this.buffer);
  }

  /** Clear the whole screen and redraw the prompt. */
  clear(): void {
    this.term.clear();
    this.term.write("\r\x1b[K" + PROMPT + this.buffer);
  }

  // Handle raw keystrokes from xterm, one chunk at a time.
  private handleInput(data: string): void {
    for (const ch of data) {
      const code = ch.charCodeAt(0);
      if (ch === "\r" || ch === "\n") {
        // Enter: finish the line and hand it off.
        this.term.write("\r\n");
        const line = this.buffer;
        this.buffer = "";
        this.onLineCb(line);
        this.term.write(PROMPT);
      } else if (code === 127 || code === 8) {
        // Backspace (DEL=127 or BS=8): erase one character if there is one.
        if (this.buffer.length > 0) {
          this.buffer = this.buffer.slice(0, -1);
          this.term.write("\b \b");
        }
      } else if (code >= 32) {
        // A normal, printable character: add it and echo it.
        this.buffer += ch;
        this.term.write(ch);
      }
    }
  }
}
