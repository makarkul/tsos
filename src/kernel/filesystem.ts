// ===========================================================================
// A tiny in-memory filesystem: a tree of folders and text files.
//
// It lives entirely in memory, so it disappears when you reload the page.
// (Saving it to the browser's localStorage is a fun stretch goal!)
// ===========================================================================

/** A text file: just a name and some content. */
export interface FileNode {
  type: "file";
  name: string;
  content: string;
}

/** A folder: a name and the things inside it, keyed by name. */
export interface DirNode {
  type: "dir";
  name: string;
  children: Map<string, FsNode>;
}

/** Anything in the filesystem is either a file or a folder. */
export type FsNode = FileNode | DirNode;

export class FileSystem {
  // The top folder. Everything lives under here. Its name is "" (the root).
  private root: DirNode = { type: "dir", name: "", children: new Map() };

  /**
   * List the contents of a folder.
   * Returns the child nodes sorted by name, or null if `path` isn't a folder.
   * Pass "" (empty) for the root.
   */
  list(path: string): FsNode[] | null {
    const node = path === "" ? this.root : this.nodeAt(path);
    if (!node || node.type !== "dir") return null;
    return [...node.children.values()].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  /** Read a file's text, or null if it isn't a file. */
  read(path: string): string | null {
    const node = this.nodeAt(path);
    if (!node || node.type !== "file") return null;
    return node.content;
  }

  /** Create or overwrite a file. Returns false if the folder doesn't exist. */
  writeFile(path: string, content: string): boolean {
    const loc = this.locate(path);
    if (!loc) return false;
    loc.parent.children.set(loc.name, {
      type: "file",
      name: loc.name,
      content,
    });
    return true;
  }

  /** Make a new folder. Returns false if the name is taken or path is bad. */
  makeDir(path: string): boolean {
    const loc = this.locate(path);
    if (!loc) return false;
    if (loc.parent.children.has(loc.name)) return false;
    loc.parent.children.set(loc.name, {
      type: "dir",
      name: loc.name,
      children: new Map(),
    });
    return true;
  }

  /** Delete a file or folder. Returns false if it wasn't there. */
  remove(path: string): boolean {
    const loc = this.locate(path);
    if (!loc) return false;
    return loc.parent.children.delete(loc.name);
  }

  // ---- helpers (the path-walking machinery) ----

  /** Split "docs/notes.txt" into ["docs", "notes.txt"], ignoring blanks. */
  private parts(path: string): string[] {
    return path.split("/").filter((p) => p.length > 0 && p !== ".");
  }

  /** Walk to the node at `path`, or undefined if any step is missing. */
  private nodeAt(path: string): FsNode | undefined {
    let node: FsNode = this.root;
    for (const part of this.parts(path)) {
      if (node.type !== "dir") return undefined;
      const child = node.children.get(part);
      if (!child) return undefined;
      node = child;
    }
    return node;
  }

  /**
   * Find the FOLDER that should contain the last name in `path`, plus that
   * name. e.g. "docs/notes.txt" -> { parent: <docs folder>, name: "notes.txt" }.
   * Returns undefined if the folders along the way don't exist.
   */
  private locate(path: string): { parent: DirNode; name: string } | undefined {
    const segments = this.parts(path);
    if (segments.length === 0) return undefined;
    const name = segments.pop()!;
    let dir: DirNode = this.root;
    for (const part of segments) {
      const child = dir.children.get(part);
      if (!child || child.type !== "dir") return undefined;
      dir = child;
    }
    return { parent: dir, name };
  }
}
