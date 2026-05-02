import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fs, path } from "./utils.js";

const targets = [path(".build"), path("_site")];
const preservedDirNames = new Set([".image-cache", "node_modules"]);

const cleanEntry = (dirPath, entry) => {
  const entryPath = join(dirPath, entry.name);

  if (!entry.isDirectory()) {
    fs.rm(entryPath);
    return;
  }

  if (preservedDirNames.has(entry.name)) return;
  cleanDirectory(entryPath);
  if (readdirSync(entryPath).length === 0) fs.rm(entryPath);
};

const cleanDirectory = (dirPath) => {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    cleanEntry(dirPath, entry);
  }
};

const run = () => {
  for (const target of targets) {
    if (!fs.exists(target)) continue;
    cleanDirectory(target);
  }
};

run();
