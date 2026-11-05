import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import ts from "typescript";
import { z } from "zod";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

function reportSchema(name, schema, value) {
  const result = schema.safeParse(value);
  if (!result.success) {
    failures.push(`${name}: ${z.prettifyError(result.error)}`);
  }
  return result.success;
}

function readLiteral(node) {
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) {
    return readLiteral(node.expression);
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(readLiteral);
  if (ts.isObjectLiteralExpression(node)) {
    return Object.fromEntries(node.properties.flatMap((property) => {
      if (!ts.isPropertyAssignment(property)) return [];
      const key = property.name && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
        ? property.name.text
        : null;
      return key ? [[key, readLiteral(property.initializer)]] : [];
    }));
  }
  throw new Error(`Unsupported literal expression at ${node.getSourceFile().fileName}:${node.getStart()}.`);
}

function findVariableObject(sourceFile, variableName) {
  let found;
  const unwrap = (node) => {
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) {
      return unwrap(node.expression);
    }
    if (ts.isCallExpression(node) && node.arguments.length === 1) return unwrap(node.arguments[0]);
    return node;
  };
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === variableName && node.initializer) {
      found = readLiteral(unwrap(node.initializer));
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (!found) throw new Error(`Could not read ${variableName} object literal.`);
  return found;
}

const portfolioGridAssetSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  label: z.string().trim().min(1),
  category: z.string().trim().min(1),
  folder: z.array(z.string().trim().min(1)),
  kind: z.literal("image"),
  extension: z.enum(["jpg", "jpeg", "png", "webp"]),
  src: z.string().startsWith("/"),
  optimizedSrc: z.string().startsWith("/"),
  optimizedWidth: z.number().int().positive(),
  optimizedHeight: z.number().int().positive(),
});

const localAssetSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  label: z.string().trim().min(1),
  category: z.string().trim().min(1),
  folder: z.array(z.string().trim().min(1)),
  kind: z.enum(["image", "pdf", "video"]),
  extension: z.enum(["jpg", "jpeg", "png", "webp", "pdf", "mov", "mp4"]),
  src: z.string().startsWith("/"),
});

const localPortfolioSchema = z.object({
  generatedAt: z.string().datetime({ offset: true }),
  assets: z.array(localAssetSchema).min(1),
});

const redirectMapSchema = z.record(z.string().startsWith("/"), z.string().startsWith("/"));
const seoMetadataSchema = z.record(z.string().min(1), z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  summary: z.string().trim().min(1),
}));
const localCaseStudySchema = z.record(z.string().min(1), z.object({
  category: z.string().trim().min(1),
  title: z.string().trim().min(1),
  eyebrow: z.string().trim().min(1),
  intro: z.string().trim().min(1),
  story: z.string().trim().min(1),
  services: z.array(z.string().trim().min(1)).min(1),
}));

const portfolioGrid = await readJson("src/data/portfolio-grid-assets.json");
const localPortfolio = await readJson("src/data/local-portfolio.json");
const redirects = await readJson("src/data/qatar-redirects.json");
reportSchema("portfolio-grid-assets.json", z.array(portfolioGridAssetSchema).min(1), portfolioGrid);
reportSchema("local-portfolio.json", localPortfolioSchema, localPortfolio);
reportSchema("qatar-redirects.json", redirectMapSchema, redirects);

for (const [label, items, field] of [
  ["portfolio grid", portfolioGrid, "id"],
  ["local portfolio", localPortfolio.assets, "id"],
]) {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item[field])) failures.push(`${label}: duplicate ${field} "${item[field]}".`);
    seen.add(item[field]);
  }
}

for (const [from, to] of Object.entries(redirects)) {
  if (from === to) failures.push(`qatar-redirects.json: self redirect at ${from}.`);
}

const metadataSource = ts.createSourceFile(
  "seo-metadata.ts",
  await readFile(path.join(root, "src/lib/seo-metadata.ts"), "utf8"),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const localStudySource = ts.createSourceFile(
  "local-case-studies.ts",
  await readFile(path.join(root, "src/lib/local-case-studies.ts"), "utf8"),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
try {
  reportSchema("PAGE_METADATA", seoMetadataSchema, findVariableObject(metadataSource, "PAGE_METADATA"));
  reportSchema("localCaseStudies", localCaseStudySchema, findVariableObject(localStudySource, "localCaseStudies"));
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
}

const summary = {
  portfolioGridItems: portfolioGrid.length,
  localPortfolioAssets: localPortfolio.assets.length,
  redirectMappings: Object.keys(redirects).length,
  seoMetadataEntries: Object.keys(findVariableObject(metadataSource, "PAGE_METADATA")).length,
  localCaseStudyCategories: Object.keys(findVariableObject(localStudySource, "localCaseStudies")).length,
  failures,
};

process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
if (failures.length) process.exitCode = 1;
