/**
 * A dead-simple event emitter. The kernel uses one to announce
 * "something changed — please redraw" and the dashboard listens.
 *
 * This is all the "state management" TSOS needs. No React, no Redux,
 * no library. The kernel is the source of truth; the UI just reacts.
 */
export type Listener<T> = (data: T) => void;

export class Emitter<T> {
  private listeners = new Set<Listener<T>>();

  /** Start listening. Returns a function you can call to stop listening. */
  on(fn: Listener<T>): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /** Tell every listener that `data` just happened. */
  emit(data: T): void {
    for (const fn of this.listeners) fn(data);
  }
}
