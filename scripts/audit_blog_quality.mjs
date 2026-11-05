#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRAFTS_DIR = path.join(ROOT, "project", "documentation", "blog-drafts");
const REPORT_DATE = "2026-10-09";
const REPORT_MD = path.join(ROOT, "project", "documentation", `blog-quality-audit-${REPORT_DATE}.md`);
const REPORT_JSON = path.join(ROOT, "project", "documentation", `blog-quality-audit-${REPORT_DATE}.json`);

const clusterRules = [
  {
    id: "seo-ai-visibility",
    label: "SEO and AI Visibility",
    pillar: "SEO + AI Visibility",
    terms: ["ai", "aeo", "geo", "llmo", "chatgpt", "citation", "overview", "semantic", "knowledge graph", "search optimization"],
  },
  {
    id: "website-development",
    label: "Website Development",
    pillar: "Website Development",
    terms: ["website", "web design", "wordpress", "nextjs", "next.js", "laravel", "core web vitals", "speed", "ui", "ux", "security", "redesign"],
  },
  {
    id: "local-seo-gbp",
    label: "Local SEO and Google Business Profile",
    pillar: "SEO + AI Visibility",
    terms: ["google business profile", "google maps", "local seo", "google reviews", "near me", "restaurants", "dentists", "salons", "clinics"],
  },
  {
    id: "ads-acquisition",
    label: "Paid Ads and Acquisition",
    pillar: "Google Ads + Customer Acquisition",
    terms: ["google ads", "facebook ads", "instagram ads", "meta ads", "ppc", "boosted", "lead generation", "digital advertising"],
  },
  {
    id: "automation-funnels",
    label: "Automation and Funnels",
    pillar: "Google Ads + Customer Acquisition",
    terms: ["automation", "whatsapp", "crm", "follow-up", "booking"],
  },
  {
    id: "founder-entity",
    label: "Founder and Entity Authority",
    pillar: "SEO + AI Visibility",
    terms: ["founder", "syed qamar abbas", "entity", "business trust"],
  },
  {
    id: "brand-social",
    label: "Brand, Social and Creative",
    pillar: "Supporting Expertise",
    terms: ["instagram", "social media", "influencer", "creative marketing", "brand"],
  },
];

const mergeGroups = [
  {
    id: "local-seo-restaurants-reviews",
    targetSlug: "google-business-profile-for-restaurants-in-islamabad-full-setup-guide",
    reason: "Restaurant GBP setup, optimization checklist, and review-growth posts overlap and should support one stronger restaurant local SEO guide.",
    slugs: [
      "google-business-profile-for-restaurants-in-islamabad-full-setup-guide",
      "google-business-profile-optimization-checklist-for-restaurants-in-islamabad",
      "how-restaurants-in-islamabad-can-get-more-google-reviews",
    ],
  },
  {
    id: "google-reviews-local-seo",
    targetSlug: "google-business-profile-optimization-checklist",
    reason: "Generic review and GBP checklist content should become one stronger evergreen local SEO checklist.",
    slugs: [
      "google-business-profile-optimization-checklist",
      "how-to-get-more-google-reviews",
    ],
  },
  {
    id: "founder-entity-trust",
    targetSlug: "who-founded-crea8iv-media-syed-qamar-abbas",
    reason: "Founder profile, founder story, and entity trust posts should reinforce one canonical founder/entity authority asset.",
    slugs: [
      "who-founded-crea8iv-media-syed-qamar-abbas",
      "founder-pages-ai-search-entity-seo-business-trust",
      "what-syed-qamar-abbas-builds-at-crea8iv-media",
      "crea8iv-media-founder-story-syed-qamar-abbas",
    ],
  },
  {
    id: "ai-search-foundations",
    targetSlug: "what-is-ai-search-optimization",
    reason: "AI SEO definitions are useful, but many short definition posts compete. Keep one hub and use the rest as supporting sections or redirects.",
    slugs: [
      "future-of-ai-search-2026",
      "what-is-ai-search-optimization",
      "geo-vs-seo",
      "aeo-vs-seo",
      "llmo-explained",
      "ai-visibility-strategy",
      "how-businesses-get-mentioned-by-chatgpt",
      "ai-citation-optimization-guide",
      "knowledge-graph-for-local-businesses",
      "semantic-search-in-2026",
      "ai-overviews-complete-guide",
      "why-websites-lose-ai-visibility",
      "top-ai-search-ranking-factors",
      "building-ai-authority",
    ],
  },
  {
    id: "website-development-buying-guide",
    targetSlug: "modern-business-website-checklist",
    reason: "Website buying, redesign, platform, speed, maintenance, and security articles should become a hub-and-spoke cluster instead of isolated posts.",
    slugs: [
      "best-website-design-company-in-islamabad-what-to-look-for",
      "website-vs-landing-page",
      "custom-website-vs-wordpress",
      "nextjs-vs-wordpress",
      "laravel-vs-wordpress",
      "why-cheap-websites-fail",
      "website-mistakes-that-kill-sales",
      "modern-business-website-checklist",
      "core-web-vitals-guide",
      "mobile-first-website-design",
      "website-speed-optimization",
      "ux-vs-ui",
      "website-security-checklist",
      "website-maintenance-guide",
      "why-businesses-need-custom-websites",
      "website-redesign-checklist",
    ],
  },
  {
    id: "meta-ads-pakistan",
    targetSlug: "facebook-instagram-ads-pakistan-guide",
    reason: "Meta Ads, boosted posts, real estate lead generation, and budget posts should link into one stronger paid social guide.",
    slugs: [
      "facebook-instagram-ads-pakistan-guide",
      "how-real-estate-businesses-in-pakistan-get-leads-from-facebook-ads",
      "how-much-should-a-business-spend-on-meta-ads-in-pakistan",
      "boosted-posts-vs-facebook-ads-pakistan",
    ],
  },
];

const lowValueSignals = [
  "get-the-most-out-of-the-creativity",
  "influencer-marketing-trends-2023-what-you-need-to-know",
  "social-media-marketing-strategies-for-small-business",
  "seo-which-digital-advertising-strategy-is-right-for-you",
];

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const meta = {};
  let currentList = null;

  for (const line of match[1].split(/\r?\n/)) {
    const listItem = line.match(/^\s*-\s+(.+)$/);
    if (listItem && currentList) {
      meta[currentList].push(listItem[1].trim().replace(/^["']|["']$/g, ""));
      continue;
    }

    const field = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!field) {
      currentList = null;
      continue;
    }

    const [, key, raw] = field;
    if (!raw.trim()) {
      meta[key] = [];
      currentList = key;
      continue;
    }

    currentList = null;
    meta[key] = raw.trim().replace(/^["']|["']$/g, "");
  }

  return { meta, body: match[2].trim() };
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`|:-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(markdown) {
  const words = stripMarkdown(markdown).match(/\b[\w'-]+\b/g);
  return words ? words.length : 0;
}

function countMatches(markdown, pattern) {
  return (markdown.match(pattern) || []).length;
}

function findCluster(post) {
  const haystack = `${post.title} ${post.slug} ${post.category}`.toLowerCase();
  let best = clusterRules.at(-1);
  let bestScore = 0;
  for (const rule of clusterRules) {
    const score = rule.terms.reduce((total, term) => {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = term.length <= 3
        ? new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`)
        : new RegExp(escaped);
      return total + (pattern.test(haystack) ? 1 : 0);
    }, 0);
    if (score > bestScore) {
      best = rule;
      bestScore = score;
    }
  }
  return best;
}

function findMergeGroup(slug) {
  return mergeGroups.find((group) => group.slugs.includes(slug)) || null;
}

function classify(post) {
  const reasons = [];
  const mergeGroup = findMergeGroup(post.slug);
  const monthsSinceUpdate = monthsBetween(post.updatedDate || post.publishDate, REPORT_DATE);
  const hasFaq = post.faqCount > 0;
  const hasEnoughDepth = post.wordCount >= 1800;
  const hasInternalLinks = post.internalLinkCount >= 3 || post.frontmatterInternalLinks > 0;

  if (lowValueSignals.includes(post.slug)) {
    return {
      status: "REDIRECT_CANDIDATE",
      priority: "High",
      target: "/blog/",
      reasons: ["Generic/supporting topic with weak authority value compared with service-led or research-led assets."],
    };
  }

  if (mergeGroup && post.slug !== mergeGroup.targetSlug) {
    if (post.wordCount >= 1800) {
      return {
        status: "IMPROVE_AS_SPOKE",
        priority: mergeGroup.id === "ai-search-foundations" || mergeGroup.id === "website-development-buying-guide" ? "High" : "Medium",
        target: `/blog/${mergeGroup.targetSlug}/`,
        reasons: [`Keep as a supporting spoke, but strengthen internal links and make its relationship to the ${mergeGroup.id} hub explicit.`],
      };
    }

    return {
      status: "MERGE",
      priority: mergeGroup.id === "ai-search-foundations" || mergeGroup.id === "website-development-buying-guide" ? "High" : "Medium",
      target: `/blog/${mergeGroup.targetSlug}/`,
      reasons: [mergeGroup.reason],
    };
  }

  if (mergeGroup && post.slug === mergeGroup.targetSlug) {
    reasons.push(`Canonical hub for merge group: ${mergeGroup.id}.`);
  }

  if (!hasEnoughDepth) reasons.push("Needs more depth, original examples, screenshots, data, or clearer methodology.");
  if (!hasFaq) reasons.push("Needs visible FAQ/AEO section.");
  if (!hasInternalLinks) reasons.push("Needs stronger internal links to service pages, case studies, consultation, and research.");
  if (monthsSinceUpdate >= 3) reasons.push("Needs freshness review and current-year validation.");
  if (post.externalLinkCount < 1 && /(statistics|cost|ai|google|benchmark|ranking|guide)/i.test(post.title)) {
    reasons.push("Needs at least one authoritative supporting citation for factual claims.");
  }

  if (reasons.length) {
    return {
      status: "IMPROVE",
      priority: ["seo-ai-visibility", "website-development", "local-seo-gbp"].includes(post.cluster.id) ? "High" : "Medium",
      target: `/blog/${post.slug}/`,
      reasons,
    };
  }

  return {
    status: "KEEP",
    priority: "Low",
    target: `/blog/${post.slug}/`,
    reasons: ["Keep as an active asset; review again after Search Console performance data."],
  };
}

function monthsBetween(from, to) {
  if (!from) return 99;
  const start = new Date(from.replace(" ", "T"));
  const end = new Date(to);
  if (Number.isNaN(start.getTime())) return 99;
  return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
}

function readPosts() {
  if (!fs.existsSync(DRAFTS_DIR)) {
    throw new Error(`Draft directory not found: ${DRAFTS_DIR}`);
  }

  return fs
    .readdirSync(DRAFTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const source = fs.readFileSync(path.join(DRAFTS_DIR, file), "utf8");
      const parsed = parseFrontmatter(source);
      if (!parsed?.meta?.slug) return null;
      const post = {
        file,
        slug: parsed.meta.slug,
        title: parsed.meta.title || parsed.meta.slug,
        category: parsed.meta.category || "Uncategorized",
        status: parsed.meta.status || "publish",
        publishDate: parsed.meta.publish_date || "",
        updatedDate: parsed.meta.updated_date || "",
        wordCount: wordCount(parsed.body),
        h2Count: countMatches(parsed.body, /^##\s+/gm),
        h3Count: countMatches(parsed.body, /^###\s+/gm),
        faqCount: countMatches(parsed.body, /^###\s+.+\?$/gm),
        internalLinkCount: countMatches(parsed.body, /\]\(\/(?!\/)/g),
        externalLinkCount: countMatches(parsed.body, /\]\(https?:\/\//g),
        frontmatterInternalLinks: Array.isArray(parsed.meta.internal_links) ? parsed.meta.internal_links.length : 0,
        body: parsed.body,
      };
      post.cluster = findCluster(post);
      post.action = classify(post);
      return post;
    })
    .filter(Boolean);
}

function summarize(posts) {
  const byStatus = {};
  const byCluster = {};
  for (const post of posts) {
    byStatus[post.action.status] = (byStatus[post.action.status] || 0) + 1;
    byCluster[post.cluster.label] = (byCluster[post.cluster.label] || 0) + 1;
  }
  return { total: posts.length, byStatus, byCluster };
}

function escapeCell(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function makeMarkdown(posts, summary) {
  const highPriority = posts
    .filter((post) => post.action.priority === "High")
    .sort((a, b) => a.action.status.localeCompare(b.action.status) || b.wordCount - a.wordCount);

  const mergeTables = mergeGroups
    .map((group) => {
      const present = posts.filter((post) => group.slugs.includes(post.slug));
      if (!present.length) return "";
      return [
        `### ${group.id}`,
        ``,
        `Target: \`/blog/${group.targetSlug}/\``,
        ``,
        group.reason,
        ``,
        `| Slug | Action | Words |`,
        `|---|---|---:|`,
        ...present.map((post) => {
          let action = "Merge into hub";
          if (post.slug === group.targetSlug) action = "Canonical hub";
          if (post.action.status === "IMPROVE_AS_SPOKE") action = "Improve as supporting spoke";
          if (post.action.status === "IMPROVE") action = "Improve hub";
          return `| \`${post.slug}\` | ${action} | ${post.wordCount} |`;
        }),
      ].join("\n");
    })
    .filter(Boolean)
    .join("\n\n");

  const rows = posts
    .sort((a, b) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return (
        priorityOrder[a.action.priority] - priorityOrder[b.action.priority] ||
        a.cluster.label.localeCompare(b.cluster.label) ||
        a.publishDate.localeCompare(b.publishDate)
      );
    })
    .map((post) => {
      return `| ${escapeCell(post.title)} | \`${post.slug}\` | ${post.cluster.label} | ${post.action.status} | ${post.action.priority} | ${post.wordCount} | ${escapeCell(post.action.target)} | ${escapeCell(post.action.reasons[0])} |`;
    });

  return `# Crea8iv Media Blog Quality Audit

Generated: ${REPORT_DATE} PKT

## Strategy Decision

Do not publish more volume just to increase DR/DA. For the next phase, Crea8iv Media should treat the blog library as an authority asset base:

- Publish only 1-2 new blogs per month.
- Upgrade 4-8 existing posts per month.
- Merge overlapping posts into stronger hubs.
- Redirect weak/duplicate URLs only after choosing the most relevant destination.
- Prioritize service-led, case-study-led, research-led, and entity-led content.

DR/DA should be treated as a scoreboard. The actual system is: authority -> rankings -> AI citations -> branded demand -> qualified leads -> revenue.

## Current Inventory

- Total draft-backed posts audited: ${summary.total}
- Keep: ${summary.byStatus.KEEP || 0}
- Improve: ${summary.byStatus.IMPROVE || 0}
- Improve as spokes: ${summary.byStatus.IMPROVE_AS_SPOKE || 0}
- Merge: ${summary.byStatus.MERGE || 0}
- Redirect candidates: ${summary.byStatus.REDIRECT_CANDIDATE || 0}

## Cluster Distribution

| Cluster | Posts |
|---|---:|
${Object.entries(summary.byCluster)
  .sort((a, b) => b[1] - a[1])
  .map(([cluster, count]) => `| ${cluster} | ${count} |`)
  .join("\n")}

## 30-Day Codex Implementation Backlog

1. Upgrade the canonical AI search hub: \`/blog/what-is-ai-search-optimization/\`.
2. Merge overlapping AI search definition posts into the hub or convert them into strong spokes with clear internal links.
3. Upgrade the website development buying hub: \`/blog/modern-business-website-checklist/\`.
4. Improve the highest-value local SEO posts for restaurants, clinics, salons, and Google Maps.
5. Add clear FAQ/AEO blocks and source-supported claims to every high-priority post.
6. Strengthen internal links from blogs to \`/website-development/\`, \`/ai-search-optimization/\`, \`/google-ads/\`, \`/google-business-profile-growth/\`, \`/research/\`, \`/case-studies/\`, and \`/contact/\`.
7. Create redirect recommendations only after the merged hub pages are updated and verified.
8. Publish at most one new blog this month unless it is research-led or directly supports a commercial service page.

## High-Priority Queue

| Title | Slug | Cluster | Action | Target | Main Reason |
|---|---|---|---|---|---|
${highPriority
  .map((post) => `| ${escapeCell(post.title)} | \`${post.slug}\` | ${post.cluster.label} | ${post.action.status} | ${escapeCell(post.action.target)} | ${escapeCell(post.action.reasons[0])} |`)
  .join("\n")}

## Merge Groups

${mergeTables}

## Full Inventory

| Title | Slug | Cluster | Action | Priority | Words | Target | Main Reason |
|---|---|---|---|---|---:|---|---|
${rows.join("\n")}

## Upgrade Standard For Each Existing Blog

Every upgraded post should include:

- Direct answer in the first 80-120 words.
- Clear H2/H3 structure based on real search questions.
- Useful FAQ section with visible answers.
- Internal links to at least one service page, one proof/case-study page, one consultation path, and one related resource.
- Current-year review of outdated facts.
- Original examples, screenshots, methodology, or client-backed learnings where possible.
- Author/entity clarity and no invented claims.
- Schema only where the visible page content supports it.

## Monthly Cadence

| Workstream | Monthly Target |
|---|---:|
| Existing blog upgrades | 4-8 |
| Merge/redirect batches | 1-2 |
| New blogs | 1-2 maximum |
| Case study upgrades | 1 |
| Technical/internal-linking pass | 1 |
| Research/authority asset | 1 every 6-8 weeks |

## Redirect Rule

No URL should be redirected just because it is weak. Redirect only when:

1. The target page is live and stronger.
2. The search intent matches.
3. Internal links have been updated.
4. The old URL has no unique purpose after the merge.
5. The redirect does not create a chain.
`;
}

const posts = readPosts();
const summary = summarize(posts);
const report = {
  generatedAt: `${REPORT_DATE}T00:00:00+05:00`,
  summary,
  mergeGroups,
  posts: posts.map(({ body, ...post }) => post),
};

fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(REPORT_MD, makeMarkdown(posts, summary));

console.log(`Audited ${posts.length} posts.`);
console.log(`Wrote ${path.relative(ROOT, REPORT_MD)}`);
console.log(`Wrote ${path.relative(ROOT, REPORT_JSON)}`);
