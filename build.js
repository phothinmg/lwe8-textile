#!/usr/bin/env node
import { compile } from "lwe8-build";
import fs from "node:fs";
import path from "node:path";
// --
/**
 * Cleans a directory by removing all files and subdirectories.
 *
 * @param {string} dirPath - Path to the directory to clean.
 */
function cleanDir(dirPath) {
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true });
    } else {
      fs.unlinkSync(filePath);
    }
  });
}

// ---
const out = "dist";
if (fs.existsSync(out)) {
  cleanDir(out);
}

setTimeout(async () => {
  await compile({
    entry: "./src/index.ts",
    format: "esm",
    outDir: "dist",
    declaration: true,
    sourceMap: true,
  });
}, 10000);
