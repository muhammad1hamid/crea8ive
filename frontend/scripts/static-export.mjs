import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const backupRoot = path.join(root, ".static-export-hidden");

const runtimeOnlyPaths = [
  ".next-dev",
  "src/app/(global)/admin",
  "src/app/api",
  "src/app/(global)/app",
  "src/app/(global)/node-health",
  "src/app/(global)/portfolio-assets",
];

const moved = [];

function moveOut(relativePath) {
  const source = path.join(root, relativePath);
  if (!existsSync(source)) return;

  const backup = path.join(backupRoot, relativePath);
  mkdirSync(path.dirname(backup), { recursive: true });
  renameSync(source, backup);
  moved.push({ source, backup });
}

function restoreAll() {
  for (let index = moved.length - 1; index >= 0; index -= 1) {
    const { source, backup } = moved[index];
    if (existsSync(backup)) {
      renameSync(backup, source);
    }
  }
  if (existsSync(backupRoot)) {
    rmSync(backupRoot, { recursive: true, force: true });
  }
}

async function runBuild() {
  for (const relativePath of runtimeOnlyPaths) {
    moveOut(relativePath);
  }

  try {
    await new Promise((resolve, reject) => {
      const child = spawn("npx", ["next", "build", "--webpack"], {
        cwd: root,
        env: process.env,
        stdio: "inherit",
        shell: process.platform === "win32",
      });

      child.on("exit", (code) => {
        if (code === 0) {
          resolve();
          return;
        }
        reject(new Error(`next build exited with code ${code ?? "unknown"}`));
      });

      child.on("error", reject);
    });
  } finally {
    restoreAll();
  }
}

// Keep React-owned preload markup in its rendered position. Moving it after
// export makes hydration expect a missing body node and rebuild the homepage.
runBuild().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
