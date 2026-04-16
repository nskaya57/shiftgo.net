#!/usr/bin/env node
// Usage:
//   node scripts/build-licenses.mjs <path/to/ShiftGo-app>
// Writes public/licenses.json aggregated from the given project's
// production npm dependencies. Install license-checker first:
//   npm -g i license-checker
//
// Output shape:
// { generatedAt: ISO, packages: [{ name, version, license, repository, publisher }] }

import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const appPath = process.argv[2];
if (!appPath) {
  console.error("Usage: node scripts/build-licenses.mjs <path/to/mobile-app>");
  process.exit(1);
}

const abs = resolve(appPath);
if (!existsSync(abs)) {
  console.error(`Path does not exist: ${abs}`);
  process.exit(1);
}

console.log(`Reading licenses from ${abs} …`);

let raw;
try {
  raw = execFileSync(
    "npx",
    ["--yes", "license-checker", "--production", "--json", "--direct"],
    { cwd: abs, encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
  );
} catch (err) {
  console.error("Failed to run license-checker:", err.message);
  process.exit(1);
}

const parsed = JSON.parse(raw);
const packages = Object.entries(parsed)
  .map(([id, data]) => {
    const atIndex = id.lastIndexOf("@");
    const name = id.substring(0, atIndex);
    const version = id.substring(atIndex + 1);
    return {
      name,
      version,
      license: data.licenses ?? "UNKNOWN",
      repository: data.repository ?? null,
      publisher: data.publisher ?? null,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const output = {
  generatedAt: new Date().toISOString(),
  packageCount: packages.length,
  packages,
};

const outPath = resolve("public/licenses.json");
writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`Wrote ${packages.length} packages to ${outPath}`);
