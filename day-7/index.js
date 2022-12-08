import { Solution } from "../solution.js";

const ENTRY_TYPE = {
  DIR: 0,
  FILE: 1,
};

class Entry {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }
}

class Dir extends Entry {
  constructor(name, parent) {
    super(name, parent);

    this.name = name;
    this.entries = [];
    this.parent = parent;
  }

  add(entry) {
    this.entries.push(entry);
  }

  has(name) {
    return this.entries.find((e) => e.name == name);
  }

  get(name) {
    return this.entries.find((e) => e.name == name);
  }

  get size() {
    return this.entries.reduce((total, e) => (total += e.size), 0);
  }

  get path() {
    let fullPath = [this.name];
    let parent = this.parent;
    while (parent) {
      fullPath.push(parent.name);
      parent = parent.parent;
    }

    return fullPath.reverse().join("/");
  }
}

class File extends Entry {
  constructor(name, parent, size) {
    super(name, parent);
    this.size = size;
  }
}

class Filesystem {
  constructor() {
    this.indexes = {};
    this.tree = new Dir("/", null);
    this.index(this.tree);
    this.layer = this.tree;
  }

  mkdir(name) {
    const dir = new Dir(name, this.layer);
    this.layer.add(dir);
    this.index(dir);
  }

  touch(name, size) {
    this.layer.add(new File(name, this.layer.parent, size));
  }

  cd(dir) {
    let newLayer = null;
    if (dir == "..") {
      newLayer = this.layer.parent;
    } else {
      newLayer = this.layer.get(dir);
    }

    if (newLayer instanceof Dir) {
      this.layer = newLayer;
    }
  }

  ls(entries, indentation) {
    if (!indentation) indentation = 0;

    if (!entries) {
      entries = this.tree.entries;
      console.log("- / (dir)");
      indentation += 2;
    }

    function meta(entry) {
      if (entry instanceof Dir) {
        return "(dir)";
      }

      return `(file, size: ${entry.size})`;
    }

    function indent(size) {
      return Array(size).fill(" ").join("");
    }

    for (const entry of entries) {
      console.log(`${indent(indentation)}- ${entry.name} ${meta(entry)}`);
      if (entry instanceof Dir) {
        indentation += 2;
        this.ls(entry.entries, indentation);
        indentation -= 2;
      }
    }
  }

  index(dir) {
    this.indexes[dir.path] = dir;
  }

  /* ---------------------------- reverse engineer ---------------------------- */

  reverseEngineer(history) {
    for (const line of history) {
      this.reverseEngineerLine(line);
    }
  }

  reverseEngineerLine(line) {
    if (line.startsWith("$")) {
      this.reverseEngineerCommand(line.slice(2).split(" "));
      return;
    }

    this.reverseEngineerEntry(line.split(" "));
  }

  reverseEngineerCommand(args) {
    if (args[0] == "cd") {
      this.cd(args[1]);
    }
  }

  reverseEngineerEntry(args) {
    if (args[0] == "dir") {
      this.mkdir(args[1], null);
      return;
    }

    this.touch(args[1], parseInt(args[0]));
  }
}

export default class S extends Solution {
  solve() {
    const fs = new Filesystem();
    fs.reverseEngineer(this.input);

    const totalSizeOfDirsUnderHT = Object.values(fs.indexes)
      .filter((d) => d.size <= 100000)
      .reduce((total, d) => (total += d.size), 0);

    const sizes = Object.values(fs.indexes)
      .map((e) => e.size)
      .sort((a, b) => a - b);
    const requiredSpace = 30000000;
    const usedSpace = fs.tree.size;
    let sizeOfDirToDelete = 0;
    for (const size of sizes) {
      if (70000000 - usedSpace + size >= requiredSpace) {
        sizeOfDirToDelete = size;
        break;
      }
    }

    console.log(
      `the total size of dirs under 100000 is ${totalSizeOfDirsUnderHT}`
    );

    console.log(
      `size of a dir with the least size to delete is: ${sizeOfDirToDelete}`
    );
  }
}
