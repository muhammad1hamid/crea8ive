import type { BlogPostRecord, PublishReadiness } from "@/lib/admin/types";
import { scoreBlog } from "@/lib/admin/scoring";

const DEFAULT_LOGO_RE = /crea8iv-white-3d-logo|crea8iv-media-vector|logo/i;

function words(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`[\]()-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function hasAny(value: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(value));
}

function pass(condition: boolean, label: string, fix: string, readiness: PublishReadiness) {
  if (condition) readiness.passed.push(label);
  else readiness.blockers.push(fix);
}

function warn(condition: boolean, label: string, fix: string, readiness: PublishReadiness) {
  if (condition) readiness.passed.push(label);
  else readiness.warnings.push(fix);
}

export function getBlogWordCount(markdown: string) {
  return words(markdown);
}

export function evaluatePublishReadiness(post: BlogPostRecord | Omit<BlogPostRecord, "score">): PublishReadiness {
  const markdown = post.markdown || "";
  const wordCount = words(markdown);
  const score = "score" in post ? post.score : scoreBlog(post);
  const readiness: PublishReadiness = {
    ready: false,
    score: score.overall,
    passed: [],
    warnings: [],
    blockers: [],
  };

  for (const item of score.checks) {
    if (item.status === "fail") readiness.blockers.push(item.fix);
    else if (item.status === "warning") readiness.warnings.push(item.fix);
    else readiness.passed.push(item.label);
  }

  pass(wordCount >= 2500, "Strategic depth", "Reach at least 2,500 words before publishing a strategic blog.", readiness);
  warn(wordCount >= 3000, "Ideal depth", "Consider expanding to 3,000-4,000 words for strategic pillar posts.", readiness);
  pass(
    hasAny(markdown.slice(0, 1200), [/quick answer/i, /direct answer/i, /short answer/i, /in short/i]),
    "Answer-first intro",
    "Add a direct answer or short answer block within the first 100-150 words.",
    readiness
  );
  pass(
    hasAny(markdown, [/^\|.+\|$/m, /<table\b/i]),
    "Comparison or data table",
    "Add at least one useful table or comparison block.",
    readiness
  );
  pass(
    hasAny(markdown, [/checklist/i, /^\s*-\s+\[[ x]\]/m, /step-by-step/i, /workflow/i]),
    "Workflow/checklist block",
    "Add a checklist, workflow, or numbered practical process.",
    readiness
  );
  pass(
    post.internalLinks.some((link) => /consultation|contact/i.test(link)),
    "Conversion path",
    "Add an internal link to /consultation/ or /contact/.",
    readiness
  );
  pass(
    post.internalLinks.some((link) => /tools\//i.test(link)),
    "Tool link",
    "Add one relevant internal link to a free tool page.",
    readiness
  );
  warn(
    post.internalLinks.some((link) => /syed-qamar-abbas|founder|about/i.test(link)),
    "Entity trust link",
    "Add a founder/entity trust link where contextually relevant.",
    readiness
  );
  pass(
    Boolean(post.thumbnailUrl && /\.webp(?:$|\?)/i.test(post.thumbnailUrl) && !DEFAULT_LOGO_RE.test(post.thumbnailUrl)),
    "WebP custom thumbnail",
    "Use a custom 1280x720 WebP thumbnail, not a default logo or generic asset.",
    readiness
  );
  pass(
    Boolean(post.ogImage || post.thumbnailUrl) && Boolean(post.twitterImage || post.thumbnailUrl),
    "Social preview images",
    "Set OG and Twitter image fields, or reuse the custom thumbnail.",
    readiness
  );

  readiness.blockers = Array.from(new Set(readiness.blockers));
  readiness.warnings = Array.from(new Set(readiness.warnings));
  readiness.passed = Array.from(new Set(readiness.passed));
  readiness.ready = readiness.blockers.length === 0;
  return readiness;
}

export function getPublishBlockers(post: BlogPostRecord) {
  return evaluatePublishReadiness(post).blockers;
}
