#!/usr/bin/env node
import { compile } from "lwe8-build";

await compile({
  entry: "./src/index.ts",
  format: "esm",
  outDir: "dist",
  declaration: true,
  sourceMap: true,
});


