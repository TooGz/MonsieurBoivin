import { createRequire } from "node:module";
import path from "node:path";
import { publicDir } from "./utils/site-data.mjs";
import { runCommand } from "./utils/process.mjs";

const require = createRequire(import.meta.url);

const resolveJar = () => {
  const packageJsonPath = require.resolve("vnu-jar/package.json");
  return path.join(path.dirname(packageJsonPath), "build", "dist", "vnu.jar");
};

const main = async () => {
  let jarPath = "";

  try {
    jarPath = resolveJar();
  } catch {
    throw new Error("vnu-jar not found. Run `npm install` before `npm run audit:html`.");
  }

  await runCommand("java", ["-jar", jarPath, "--skip-non-html", "--errors-only", publicDir]);
  console.log("Nu Html Checker completed without blocking errors.");
};

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
