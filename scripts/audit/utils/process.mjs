import { spawn } from "node:child_process";

const resolveCommand = (command) => {
  if (process.platform === "win32" && !command.endsWith(".cmd") && ["npm", "npx"].includes(command)) {
    return `${command}.cmd`;
  }

  return command;
};

export const runCommand = (command, args = [], options = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(resolveCommand(command), args, {
      stdio: "inherit",
      shell: false,
      ...options
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code}`));
    });
  });
