import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fs, path } from "./utils.js";

const targets = [path(".build"), path("_site")];
const preservedDirNames = new Set([".image-cache", "node_modules"]);

const cleanDirectory = (dirPath) => {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (preservedDirNames.has(entry.name)) continue;
      cleanDirectory(entryPath);
      const remainingEntries = readdirSync(entryPath);
      if (remainingEntries.length === 0) fs.rm(entryPath);
      continue;
    }

    fs.rm(entryPath);
  }
};

const run = () => {
  for (const target of targets) {
    if (!fs.exists(target)) continue;
    cleanDirectory(target);
  }
};

run();
