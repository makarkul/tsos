import type { Kernel } from "../kernel/kernel";
import type { KernelSnapshot, ProcessState } from "../kernel/types";

// The "wow" feature: a live process table that updates as the kernel runs.
// It just listens for the kernel's "changed" event and redraws. No framework.

const STATE_COLOR: Record<ProcessState, string> = {
  new: "#8a93b2",
  ready: "#5ad1ff",
  running: "#4ade80",
  blocked: "#fbbf24",
  terminated: "#6b7280",
};

export class Dashboard {
  constructor(
    private root: HTMLElement,
    kernel: Kernel,
  ) {
    // Redraw every time the kernel says something changed.
    kernel.changed.on((snap) => this.render(snap));
    this.render(kernel.snapshot()); // draw once right away
  }

  private render(snap: KernelSnapshot): void {
    const rows = snap.processes
      .map(
        (p) => `
        <tr>
          <td>${p.pid}</td>
          <td>${escapeHtml(p.name)}</td>
          <td><span class="badge" style="background:${STATE_COLOR[p.state]}">${
            p.state
          }</span></td>
          <td>${p.waitingOn ?? "—"}</td>
        </tr>`,
      )
      .join("");

    const emptyRow = `<tr><td colspan="4" class="empty">No processes yet. Try <code>run clock</code>.</td></tr>`;

    this.root.innerHTML = `
      <div class="dash-head">
        <h2>Live Process Table</h2>
        <span class="tick">tick ${snap.tick}</span>
      </div>
      <table class="ptable">
        <thead>
          <tr><th>PID</th><th>Name</th><th>State</th><th>Waiting on</th></tr>
        </thead>
        <tbody>${rows || emptyRow}</tbody>
      </table>
      <div class="readyq">
        <strong>Ready queue:</strong> ${
          snap.readyQueue.join(" → ") || "—"
        }
      </div>
      <div class="legend">
        ${(Object.keys(STATE_COLOR) as ProcessState[])
          .map(
            (s) =>
              `<span><i style="background:${STATE_COLOR[s]}"></i>${s}</span>`,
          )
          .join("")}
      </div>
    `;
  }
}

// Keep program names from breaking the HTML if they contain < > & etc.
function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!,
  );
}
