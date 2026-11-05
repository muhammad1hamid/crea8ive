import type { BlogPostRecord, BlogScore, SeoCheck, SeoCheckSeverity } from "@/lib/admin/types";

const DEFAULT_LOGO_RE = /crea8iv-white-3d-logo|crea8iv-media-vector|logo/i;

function check(id: string, label: string, status: SeoCheckSeverity, fix: string): SeoCheck {
  return { id, label, status, fix };
}

function hasUsefulLength(value: string, min: number, max: number) {
  const length = value.trim().length;
  return length >= min && length <= max;
}

function wordCount(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function sectionScore(checks: SeoCheck[], ids: string[]) {
  const relevant = checks.filter((item) => ids.includes(item.id));
  if (!relevant.length) return 100;
  const earned = relevant.reduce((total, item) => {
    if (item.status === "pass") return total + 1;
    if (item.status === "warning") return total + 0.55;
    return total;
  }, 0);
  return Math.round((earned / relevant.length) * 100);
}

export function scoreBlog(post: Omit<BlogPostRecord, "score"> | BlogPostRecord): BlogScore {
  const words = wordCount(post.markdown);
  const checks: SeoCheck[] = [
    check(
      "slug",
      "Clean URL slug",
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) ? "pass" : "fail",
      "Use a lowercase hyphenated slug with no spaces, punctuation, or duplicate route."
    ),
    check(
      "seo_title",
      "SEO title length",
      hasUsefulLength(post.seoTitle, 45, 68) ? "pass" : "warning",
      "Write a search title around 45-68 characters with the focus keyword near the front."
    ),
    check(
      "meta_description",
      "Meta description length",
      hasUsefulLength(post.metaDescription, 135, 165) ? "pass" : "warning",
      "Write a benefit-led 135-165 character meta description."
    ),
    check(
      "focus_keyword",
      "Focus keyword",
      post.focusKeyword.trim().length >= 3 ? "pass" : "fail",
      "Add one primary focus keyword before publishing."
    ),
    check(
      "secondary_keywords",
      "Secondary keywords",
      post.secondaryKeywords.filter(Boolean).length >= 2 ? "pass" : "warning",
      "Add at least two secondary keywords for topical coverage."
    ),
    check(
      "search_intent",
      "Search intent",
      post.searchIntent.trim().length >= 12 ? "pass" : "fail",
      "Define whether the page targets informational, commercial, local, or transactional intent."
    ),
    check(
      "ai_intent",
      "AI search intent",
      post.aiSearchIntent.trim().length >= 12 ? "pass" : "warning",
      "State the concise answer angle this post should be cited for by AI search engines."
    ),
    check(
      "audience",
      "Target audience",
      post.targetAudience.trim().length >= 8 ? "pass" : "warning",
      "Describe the buyer persona clearly."
    ),
    check(
      "thumbnail",
      "Custom thumbnail",
      post.thumbnailUrl && !DEFAULT_LOGO_RE.test(post.thumbnailUrl) ? "pass" : "fail",
      "Attach a custom 1280x720 WebP thumbnail. The default brand logo is not allowed."
    ),
    check(
      "thumbnail_alt",
      "Thumbnail alt text",
      post.thumbnailAlt.trim().length >= 12 ? "pass" : "fail",
      "Add descriptive image alt text with the topic and brand context."
    ),
    check(
      "schema",
      "Schema coverage",
      post.schemaTypes.includes("BlogPosting") && post.schemaTypes.includes("FAQPage") ? "pass" : "fail",
      "Include BlogPosting and FAQPage schema before publishing."
    ),
    check(
      "faqs",
      "FAQ block",
      post.faqs.filter((faq) => faq.question && faq.answer).length >= 3 ? "pass" : "warning",
      "Add at least three useful FAQ answers for AEO and rich answer readiness."
    ),
    check(
      "internal_links",
      "Internal links",
      post.internalLinks.filter(Boolean).length >= 3 ? "pass" : "fail",
      "Add at least three relevant internal links to services, tools, or related blogs."
    ),
    check(
      "external_references",
      "External references",
      post.externalReferences.filter(Boolean).length >= 1 ? "pass" : "warning",
      "Add at least one authoritative external reference where facts or data are used."
    ),
    check(
      "content_depth",
      "Content depth",
      words >= 900 ? "pass" : words >= 600 ? "warning" : "fail",
      "Expand the article with examples, steps, and buyer decision context."
    ),
    check(
      "headings",
      "Semantic headings",
      /^##\s+/m.test(post.markdown) && /^###\s+/m.test(post.markdown) ? "pass" : "warning",
      "Use H2 and H3 sections so readers, crawlers, and LLMs can understand structure."
    ),
    check(
      "cta",
      "Conversion CTA",
      post.ctas.some((cta) => cta.label && cta.href) ? "pass" : "fail",
      "Add a relevant CTA to consultation, audit, or service enquiry."
    ),
    check(
      "canonical",
      "Canonical URL",
      post.canonicalUrl.includes(`/blog/${post.slug}`) ? "pass" : "warning",
      "Set the canonical URL to the final public blog URL."
    ),
  ];

  const technical = sectionScore(checks, ["slug", "canonical"]);
  const contentQuality = sectionScore(checks, ["content_depth", "headings", "audience"]);
  const aiVisibility = sectionScore(checks, ["ai_intent", "faqs", "schema", "external_references"]);
  const eeat = sectionScore(checks, ["external_references", "audience", "content_depth"]);
  const internalLinking = sectionScore(checks, ["internal_links", "related_posts"]);
  const schema = sectionScore(checks, ["schema", "faqs"]);
  const media = sectionScore(checks, ["thumbnail", "thumbnail_alt"]);
  const readability = sectionScore(checks, ["headings", "content_depth", "meta_description"]);
  const cro = sectionScore(checks, ["cta", "search_intent"]);
  const overall = Math.round(
    (technical + contentQuality + aiVisibility + eeat + internalLinking + schema + media + readability + cro) / 9
  );

  return {
    overall,
    technical,
    contentQuality,
    aiVisibility,
    eeat,
    internalLinking,
    schema,
    media,
    readability,
    cro,
    checks,
  };
}

export function getPublishBlockers(post: BlogPostRecord) {
  return scoreBlog(post).checks
    .filter((item) => item.status === "fail")
    .map((item) => item.fix);
}
