import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath), constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

function major(versionRange) {
  const match = String(versionRange ?? "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function collectDuplicateValues(items, getValue) {
  const seen = new Map();
  for (const item of items) {
    const value = getValue(item);
    if (!value) continue;
    seen.set(value, [...(seen.get(value) ?? []), item]);
  }
  return [...seen.entries()].filter(([, matches]) => matches.length > 1);
}

const failures = [];
const warnings = [];

const packageJson = await readJson("package.json");
const frontendLock = await readJson("package-lock.json");
const rootPackageJson = await readJson("../package.json");
const rootLock = await readJson("../package-lock.json");
const dependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

if (await exists("src/middleware.ts")) {
  failures.push("Next 16 proxy migration incomplete: src/middleware.ts still exists.");
}

if (!(await exists("src/proxy.ts"))) {
  failures.push("Missing src/proxy.ts. Request routing guards should use the Next 16 proxy convention.");
} else {
  const proxySource = await readFile(path.join(root, "src/proxy.ts"), "utf8");
  if (!/export\s+function\s+proxy\s*\(/.test(proxySource) && !/export\s+default\s+function\s+proxy\s*\(/.test(proxySource)) {
    failures.push("src/proxy.ts must export a proxy function.");
  }
}

if (major(dependencies.next) >= 16 && major(dependencies.react) < 19) {
  failures.push("Next 16 app dependencies should use React 19 and matching React DOM/types.");
}

if (major(dependencies.react) !== major(dependencies["react-dom"])) {
  failures.push("react and react-dom must use the same major version.");
}

if (major(dependencies.react) !== major(dependencies["@types/react"]) || major(dependencies["react-dom"]) !== major(dependencies["@types/react-dom"])) {
  failures.push("React runtime packages and TypeScript definitions must use matching major versions.");
}

if (major(dependencies.next) !== major(dependencies["eslint-config-next"])) {
  failures.push("eslint-config-next major version should match Next.js.");
}

if (major(dependencies["eslint-config-next"]) >= 16 && major(dependencies.eslint) < 9) {
  failures.push("eslint-config-next 16 requires ESLint 9 or newer.");
}

for (const [name, manifest, lock] of [
  ["frontend", packageJson, frontendLock],
  ["root tooling", rootPackageJson, rootLock],
]) {
  const lockRoot = lock.packages?.[""];
  if (!lockRoot || lockRoot.name !== manifest.name) {
    failures.push(`${name} package-lock root does not match its package.json.`);
    continue;
  }
  if (lockRoot.engines?.node !== manifest.engines?.node) {
    failures.push(`${name} package-lock Node.js engine does not match its package.json.`);
  }
  for (const section of ["dependencies", "devDependencies"]) {
    const manifestEntries = manifest[section] ?? {};
    const lockEntries = lockRoot[section] ?? {};
    for (const [dependency, version] of Object.entries(manifestEntries)) {
      if (lockEntries[dependency] !== version) {
        failures.push(`${name} lockfile is out of sync for ${dependency}: expected ${version}.`);
      }
    }
    for (const dependency of Object.keys(lockEntries)) {
      if (!(dependency in manifestEntries)) {
        failures.push(`${name} lockfile has an undeclared root dependency: ${dependency}.`);
      }
    }
  }
}

const nextConfig = await readFile(path.join(root, "next.config.js"), "utf8");
if (!nextConfig.includes("outputFileTracingRoot")) {
  failures.push("next.config.js should set outputFileTracingRoot to avoid ambiguous workspace-root builds.");
}

const portfolioAssets = await readJson("src/data/portfolio-grid-assets.json");
const duplicatePortfolioIds = collectDuplicateValues(portfolioAssets, (item) => item.id);
const duplicatePortfolioSrcs = collectDuplicateValues(portfolioAssets, (item) => item.optimizedSrc || item.src);
if (duplicatePortfolioIds.length) {
  failures.push(`Duplicate portfolio grid ids: ${duplicatePortfolioIds.map(([id]) => id).join(", ")}`);
}
if (duplicatePortfolioSrcs.length) {
  failures.push(`Duplicate portfolio grid image paths: ${duplicatePortfolioSrcs.map(([src]) => src).join(", ")}`);
}

for (const item of portfolioAssets) {
  if (!item.label || !item.category) {
    failures.push(`Portfolio item ${item.id ?? "(missing id)"} needs label and category.`);
  }
  if (!Number.isFinite(item.optimizedWidth) || !Number.isFinite(item.optimizedHeight)) {
    failures.push(`Portfolio item ${item.id ?? item.label} needs optimizedWidth and optimizedHeight.`);
  }
  const imagePath = item.optimizedSrc || item.src;
  if (!imagePath || !imagePath.startsWith("/")) {
    failures.push(`Portfolio item ${item.id ?? item.label} needs a root-relative image path.`);
    continue;
  }
  if (!(await exists(path.join("public", decodeURIComponent(imagePath))))) {
    failures.push(`Portfolio asset missing from public folder: ${imagePath}`);
  }
}

const summary = {
  checkedAt: new Date().toISOString(),
  next: dependencies.next,
  react: dependencies.react,
  reactDom: dependencies["react-dom"],
  eslint: dependencies.eslint,
  eslintConfigNext: dependencies["eslint-config-next"],
  packageLockBoundary: "Separate root tooling and frontend app manifests",
  portfolioItems: portfolioAssets.length,
  warnings,
  failures,
};

process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);

if (failures.length) {
  process.exitCode = 1;
}
