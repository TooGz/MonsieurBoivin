import path from "node:path";
import { repoRoot } from "./utils/site-data.mjs";
import { runCommand } from "./utils/process.mjs";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const steps = [
  ["audit:inventory", ["run", "audit:inventory"]],
  ["build:site:ci", ["run", "build:site:ci"]],
  ["audit:links", ["run", "audit:links"]],
  ["audit:seo", ["run", "audit:seo"]],
  ["audit:html", ["run", "audit:html"]],
  ["audit:lighthouse", ["run", "audit:lighthouse"]],
  ["audit:axe", ["run", "audit:axe"]]
];

const main = async () => {
  for (const [label, args] of steps) {
    console.log(`\n>>> ${label}`);
    await runCommand(npmCommand, args, { cwd: repoRoot });
  }
};

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
