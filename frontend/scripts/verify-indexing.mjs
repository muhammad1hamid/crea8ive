import { readFile } from "node:fs/promises";
import path from "node:path";
import { auditIndexing } from "./lib/indexing-audit.mjs";

const root = path.resolve(import.meta.dirname, "..");
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), "utf8"));
const result = await auditIndexing(path.join(root, "out"), await readJson("src/data/legacy-redirects.json"), await readJson("src/data/qatar-redirects.json"));
console.log(JSON.stringify(result, null, 2));
if (result.errors.length) process.exitCode = 1;
