import fs from "node:fs";
import path from "node:path";

const root = path.resolve("project/assets");
const output = path.resolve("frontend/src/data/local-portfolio.json");
const publicPrefix = "/portfolio-assets/";

const media = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".mov", ".webm", ".pdf"]);
const video = new Set([".mp4", ".mov", ".webm"]);
const document = new Set([".pdf"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".DS_Store") return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function titleCase(value) {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const assets = walk(root)
  .map((absolute) => {
    const relative = path.relative(root, absolute);
    const parts = relative.split(path.sep);
    const extension = path.extname(absolute).toLowerCase();
    if (!media.has(extension)) return null;
    const category = parts[0] === "Resturants"
      ? "Restaurants"
      : parts[0] === "Brand Guidlines"
        ? "Brand Guidelines"
        : titleCase(parts[0]);
    const pathName = relative.split(path.sep).map(encodeURIComponent).join("/");
    return {
      id: relative,
      name: path.basename(absolute, extension),
      label: titleCase(path.basename(absolute, extension)),
      category,
      folder: parts.slice(1, -1).map(titleCase),
      kind: video.has(extension) ? "video" : document.has(extension) ? "pdf" : "image",
      extension: extension.slice(1),
      src: `${publicPrefix}${pathName}`,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify({ generatedAt: new Date().toISOString(), assets }, null, 2)}\n`);
console.log(`Wrote ${assets.length} assets to ${output}`);
