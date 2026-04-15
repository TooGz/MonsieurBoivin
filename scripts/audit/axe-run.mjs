import { runCommand } from "./utils/process.mjs";

const main = async () => {
  await runCommand("npx", ["playwright", "test", "tests/a11y.spec.mjs", "--reporter=list"]);
};

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
