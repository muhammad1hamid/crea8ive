"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Copy, Download, RotateCcw, Share2 } from "lucide-react";
import type { ToolMode, ToolPage } from "@/lib/tools";
import { trackEvent } from "@/lib/analytics-events";
import styles from "./tool-interface.module.css";
import { getServiceTone } from "@/lib/service-tones";

type Metric = { label: string; value: string };
type Result = {
  label: string;
  score: string;
  title: string;
  summary: string;
  metrics: Metric[];
  working: string[];
  problems: string[];
  actions: string[];
  json?: string;
};

const auditProfiles: Record<string, [string, string, string, number][]> = {
  "ai-visibility": [
    ["entity", "Entity Clarity", "Brand name, industry, location, and services are stated clearly.", 12],
    ["entity", "Entity Clarity", "About/contact pages identify the organization with consistent facts.", 10],
    ["schema", "Structured Data", "Relevant Organization, LocalBusiness, Service, Article, or FAQ schema is present.", 13],
    ["content", "Content Readiness", "Service pages answer buyer questions in clear sections.", 11],
    ["content", "Content Readiness", "FAQ/question content exists and matches real customer questions.", 9],
    ["technical", "Technical Accessibility", "Important content is readable HTML, not hidden only in images or scripts.", 10],
    ["technical", "Technical Accessibility", "Robots and sitemap do not block important pages.", 9],
    ["authority", "Citation Readiness", "Official profiles and third-party references use consistent names and URLs.", 10],
    ["authority", "Authority Signals", "Case studies, authors, credentials, or proof are visible.", 8],
    ["entity", "Entity Clarity", "Category and competitor context are understandable from page copy.", 8],
  ],
  "local-seo": [
    ["website", "Website", "Business name, address, and phone are easy to find.", 12],
    ["local", "Local Relevance", "Target city/location appears naturally in title, headings, or body copy.", 12],
    ["entity", "Entity Signals", "LocalBusiness schema or structured business data is present.", 12],
    ["trust", "Trust", "Reviews, testimonials, photos, or case examples support trust.", 10],
    ["website", "Website", "Contact, WhatsApp, directions, or booking actions are visible on mobile.", 11],
    ["local", "Local Relevance", "Services have clear pages or sections connected to the target location.", 11],
    ["technical", "Technical SEO", "The site uses HTTPS and has no obvious indexability blockers.", 10],
    ["conversion", "Conversion Readiness", "Calls, forms, or WhatsApp actions are trackable conversion paths.", 9],
    ["trust", "Trust", "Map, service area, hours, or local proof are visible.", 7],
    ["entity", "Entity Signals", "External profiles use consistent NAP and website URL.", 6],
  ],
  "seo-audit": [
    ["technical", "Technical SEO", "The page uses HTTPS and a clean canonical URL.", 11],
    ["onpage", "On-Page SEO", "Title tag is specific, unique, and within a sensible length.", 11],
    ["onpage", "On-Page SEO", "Meta description explains the page and encourages a useful click.", 9],
    ["onpage", "On-Page SEO", "There is one clear H1 and a logical heading hierarchy.", 10],
    ["schema", "Schema", "Relevant structured data is present and matches visible content.", 10],
    ["content", "Content", "The page has useful depth, examples, and clear answers.", 12],
    ["links", "Internal Linking", "Important related pages are linked with natural anchors.", 9],
    ["performance", "Performance", "Images are compressed and the mobile viewport is configured.", 9],
    ["technical", "Technical SEO", "Robots, sitemap, and indexability look correct.", 10],
    ["ai", "AI Search Readiness", "Entity facts, FAQs, and structured sections are easy to extract.", 9],
  ],
  "website-performance": [
    ["mobile", "Mobile", "The page is comfortable to scan and use on mobile.", 14],
    ["conversion", "Conversion", "Primary CTA is visible without hunting.", 12],
    ["conversion", "Conversion", "Contact paths are low-friction: WhatsApp, call, form, or booking.", 12],
    ["ux", "UX", "Navigation is simple and does not overwhelm the visitor.", 9],
    ["trust", "Trust", "Proof, case studies, testimonials, credentials, or portfolio are visible.", 11],
    ["performance", "Performance", "Images, video, and scripts are not obviously slowing first interaction.", 10],
    ["accessibility", "Accessibility", "Text contrast, labels, focus states, and tap targets are usable.", 10],
    ["ux", "UX", "The page hierarchy makes the offer, audience, and next step obvious.", 10],
    ["trust", "Trust", "Pricing, process, or expectation-setting reduces doubt.", 6],
    ["mobile", "Mobile", "No popups or overlays block basic mobile interaction.", 6],
  ],
};

const actionMap: Record<string, string> = {
  entity: "Clarify brand, service, location, and official profile facts on core pages.",
  schema: "Add valid JSON-LD that matches visible page content.",
  content: "Expand thin sections with direct answers, FAQs, examples, and buyer-specific context.",
  technical: "Review crawlability, canonical, robots, sitemap, mobile viewport, and indexability basics.",
  authority: "Add proof, case studies, author/company details, and consistent third-party citations.",
  website: "Make NAP, contact actions, and important local landing-page content easier to find.",
  local: "Strengthen service plus city copy and internal links to relevant local pages.",
  trust: "Add credible proof such as reviews, portfolio work, photos, process, and real contact details.",
  conversion: "Reduce contact friction and make the next step obvious above the fold.",
  onpage: "Rewrite metadata and headings around the real page intent.",
  links: "Add contextual links to services, tools, case studies, and helpful resources.",
  performance: "Compress media, lazy-load non-critical assets, and reduce heavy scripts.",
  ai: "Use semantic headings, concise answer blocks, and structured data for machine readability.",
  mobile: "Test common phone widths and fix layout, tap target, and blocked-scroll issues.",
  ux: "Simplify the journey from problem recognition to action.",
  accessibility: "Label inputs, preserve keyboard focus, and improve contrast/tap targets.",
};

const numberFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const currency = (value: number) => `PKR ${numberFormat.format(Math.round(value || 0))}`;
const pct = (value: number) => `${Number(value).toFixed(value % 1 ? 1 : 0)}%`;
const toolEvent = (action: string, tool: ToolPage, details: Record<string, string> = {}) => {
  trackEvent(`free_tool_${action}`, { tool_name: tool.name, tool_slug: tool.slug, ...details });
};

const calculatorFields: Record<ToolMode, { name: string; label: string; value: string; suffix?: string }[]> = {
  "marketing-roi": [
    { name: "spend", label: "Marketing spend", value: "100000" },
    { name: "leads", label: "Leads generated", value: "120" },
    { name: "closeRate", label: "Lead-to-customer rate", value: "12", suffix: "%" },
    { name: "saleValue", label: "Average sale value", value: "25000" },
    { name: "margin", label: "Gross margin", value: "55", suffix: "%" },
  ],
  "meta-ads": [
    { name: "budget", label: "Monthly budget", value: "150000" },
    { name: "cpl", label: "Average cost per lead", value: "1200" },
    { name: "closeRate", label: "Lead-to-customer rate", value: "10", suffix: "%" },
    { name: "customerValue", label: "Average customer value", value: "30000" },
  ],
  "google-ads": [
    { name: "budget", label: "Monthly budget", value: "200000" },
    { name: "cpc", label: "Average CPC", value: "180" },
    { name: "landingRate", label: "Landing-page conversion rate", value: "6", suffix: "%" },
    { name: "closeRate", label: "Lead-to-sale rate", value: "18", suffix: "%" },
    { name: "saleValue", label: "Average sale value", value: "35000" },
  ],
  "patient-retention": [
    { name: "inactivePatients", label: "Inactive patients", value: "1000" },
    { name: "treatmentValue", label: "Average treatment value", value: "12000" },
    { name: "bookingRate", label: "Expected booking rate", value: "4", suffix: "%" },
    { name: "monthlyCost", label: "Monthly system/campaign cost", value: "65000" },
  ],
  "website-roi": [
    { name: "visitors", label: "Monthly visitors", value: "3000" },
    { name: "currentRate", label: "Current conversion rate", value: "1", suffix: "%" },
    { name: "targetRate", label: "Target conversion rate", value: "2.5", suffix: "%" },
    { name: "closeRate", label: "Lead-to-sale rate", value: "15", suffix: "%" },
    { name: "customerValue", label: "Average customer value", value: "30000" },
  ],
  "ai-visibility": [],
  "local-seo": [],
  "seo-audit": [],
  "website-performance": [],
  "schema-generator": [],
};

function formNumber(data: FormData, key: string) {
  return Math.max(0, Number(data.get(key) || 0));
}

function grade(score: number) {
  if (score >= 85) return "Strong foundation";
  if (score >= 70) return "Good, with clear gaps";
  if (score >= 50) return "Needs focused improvement";
  return "Major fixes needed";
}

function calculateAudit(data: FormData, checks: [string, string, string, number][], toolName: string): Result {
  let total = 0;
  let earned = 0;
  const categoryTotals: Record<string, number> = {};
  const categoryEarned: Record<string, number> = {};
  const working: string[] = [];
  const problems: { category: string; text: string }[] = [];

  checks.forEach(([category, label, text, weight], index) => {
    total += weight;
    categoryTotals[label] = (categoryTotals[label] || 0) + weight;
    if (data.get(`check-${index}`) === "on") {
      earned += weight;
      categoryEarned[label] = (categoryEarned[label] || 0) + weight;
      working.push(text);
    } else {
      problems.push({ category, text });
    }
  });

  const urlBonus = String(data.get("website") || "").startsWith("https://") ? 4 : 0;
  const detailBonus = ["brand", "industry", "location", "services"].filter((key) => String(data.get(key) || "").trim().length > 2).length;
  const score = Math.min(100, Math.round(((earned + urlBonus + detailBonus) / (total + 8)) * 100));
  const metrics = Object.keys(categoryTotals).map((label) => ({
    label,
    value: `${Math.round(((categoryEarned[label] || 0) / categoryTotals[label]) * 100)}/100`,
  }));

  return {
    label: "Score",
    score: `${score}/100`,
    title: `${toolName}: ${grade(score)}`,
    summary: `${data.get("brand") || "This website"} scored ${score}/100 based on the visible signals you selected.`,
    metrics,
    working: working.slice(0, 5),
    problems: problems.slice(0, 5).map((item) => item.text),
    actions: [...new Set(problems.map((item) => actionMap[item.category] || item.text))].slice(0, 5),
  };
}

function hasChecked(data: FormData, index: number) {
  return data.get(`check-${index}`) === "on";
}

function textValue(data: FormData, key: string) {
  return String(data.get(key) || "").trim();
}

function wordCount(value: string) {
  return value.split(/\s+/).filter(Boolean).length;
}

function calculateAiVisibility(data: FormData, checks: [string, string, string, number][]): Result {
  const brand = textValue(data, "brand") || "This brand";
  const website = textValue(data, "website");
  const industry = textValue(data, "industry");
  const location = textValue(data, "location");
  const services = textValue(data, "services");
  const competitors = textValue(data, "competitors");
  const profiles = textValue(data, "profiles");

  const selectedScore = checks.reduce((sum, [, , , weight], index) => sum + (hasChecked(data, index) ? weight : 0), 0);
  const selectedTotal = checks.reduce((sum, [, , , weight]) => sum + weight, 0);

  const entityScore =
    (brand.length > 2 ? 12 : 0) +
    (industry.length > 2 ? 8 : 0) +
    (location.length > 2 ? 8 : 0) +
    (wordCount(services) >= 5 ? 10 : services.length ? 5 : 0) +
    (hasChecked(data, 0) ? 8 : 0) +
    (hasChecked(data, 1) ? 8 : 0) +
    (hasChecked(data, 9) ? 6 : 0);

  const structureScore =
    (hasChecked(data, 2) ? 22 : 0) +
    (hasChecked(data, 3) ? 13 : 0) +
    (hasChecked(data, 4) ? 10 : 0) +
    (wordCount(services) >= 15 ? 5 : 0);

  const accessScore =
    (website.startsWith("https://") ? 16 : 0) +
    (hasChecked(data, 5) ? 16 : 0) +
    (hasChecked(data, 6) ? 14 : 0);

  const authorityScore =
    (hasChecked(data, 7) ? 16 : 0) +
    (hasChecked(data, 8) ? 14 : 0) +
    (profiles.length > 20 ? 8 : profiles.length ? 4 : 0) +
    (competitors.length > 2 ? 4 : 0);

  const weightedReadiness = Math.round(
    (entityScore / 60) * 28 +
    (structureScore / 50) * 27 +
    (accessScore / 46) * 20 +
    (authorityScore / 42) * 25
  );
  const checklistReadiness = Math.round((selectedScore / selectedTotal) * 100);
  const score = Math.max(0, Math.min(100, Math.round((weightedReadiness * 0.72) + (checklistReadiness * 0.28))));

  const confidencePoints =
    (website ? 12 : 0) +
    (brand ? 12 : 0) +
    (industry ? 10 : 0) +
    (location ? 10 : 0) +
    (wordCount(services) >= 8 ? 14 : services ? 7 : 0) +
    (competitors ? 8 : 0) +
    (profiles ? 8 : 0) +
    (checks.filter((_, index) => hasChecked(data, index)).length >= 6 ? 16 : 8);
  const confidence = confidencePoints >= 78 ? "High" : confidencePoints >= 55 ? "Medium" : "Low";
  const citationRisk = score >= 78 ? "Lower" : score >= 55 ? "Medium" : "High";

  const working: string[] = [];
  const problems: string[] = [];
  const actions: string[] = [];

  if (entityScore >= 42) working.push("Entity facts are clear enough for AI systems to understand brand, category, location, and services.");
  else {
    problems.push("Entity clarity is weak: brand, category, location, services, or competitor context is incomplete.");
    actions.push("Add a concise entity block on About, homepage, and service pages: who you are, who you serve, where you operate, and what you do.");
  }

  if (structureScore >= 35) working.push("Answer-ready content and structured sections are present or planned.");
  else {
    problems.push("AI systems may struggle to extract direct answers because schema, FAQs, or answer blocks are missing.");
    actions.push("Add FAQPage/Service/Organization schema and 40-60 word answer blocks for the top buyer questions.");
  }

  if (accessScore >= 34) working.push("Technical access signals look healthy for crawlers and AI search systems.");
  else {
    problems.push("Technical access has risk: HTTPS, readable HTML, robots, or sitemap signals need review.");
    actions.push("Confirm important content is crawlable HTML, the sitemap is clean, and robots.txt allows major search/AI bots.");
  }

  if (authorityScore >= 30) working.push("Citation readiness is supported by proof, profiles, or third-party consistency.");
  else {
    problems.push("Citation readiness is thin: AI systems prefer brands with proof, authorship, and corroborating third-party references.");
    actions.push("Strengthen citations with consistent LinkedIn, GBP, Clutch/GoodFirms, case studies, founder profile, and externally referenced proof.");
  }

  if (!profiles) actions.push("Add official profile URLs to the audit so the score can evaluate off-site corroboration more accurately.");
  if (!competitors) actions.push("List 2-3 competitors so prompt testing can compare share of AI voice.");

  const serviceSeed = services.split(/[,|\n]/).map((item) => item.trim()).filter(Boolean)[0] || "your main service";
  const locationSeed = location || "your target city";
  const promptActions = [
    `Monthly test prompt: "best ${serviceSeed} in ${locationSeed}".`,
    `Monthly test prompt: "who is ${brand} and what do they offer?".`,
    `Monthly test prompt: "${brand} vs ${competitors.split(/[,|\n]/)[0]?.trim() || "main competitor"}".`,
  ];

  return {
    label: "AI Readiness",
    score: `${score}/100`,
    title: `AI Visibility Checker: ${grade(score)}`,
    summary: `${brand} scored ${score}/100 as an AI visibility readiness estimate. This is not a live ChatGPT, Gemini, Claude, Perplexity, or AI Overview citation check; it is a structured readiness model based on the facts and signals provided.`,
    metrics: [
      { label: "Confidence", value: confidence },
      { label: "Citation risk", value: citationRisk },
      { label: "Entity clarity", value: `${Math.min(100, Math.round((entityScore / 60) * 100))}/100` },
      { label: "Answer structure", value: `${Math.min(100, Math.round((structureScore / 50) * 100))}/100` },
      { label: "Crawler access", value: `${Math.min(100, Math.round((accessScore / 46) * 100))}/100` },
      { label: "Authority signals", value: `${Math.min(100, Math.round((authorityScore / 42) * 100))}/100` },
      { label: "Live AI check", value: "Not connected" },
      { label: "Model type", value: "Readiness audit" },
    ],
    working: working.slice(0, 5),
    problems: problems.slice(0, 5),
    actions: [...new Set([...actions, ...promptActions])].slice(0, 8),
  };
}

function calculateMoney(mode: ToolMode, data: FormData): Result {
  if (mode === "marketing-roi") {
    const spend = formNumber(data, "spend");
    const leads = formNumber(data, "leads");
    const customers = leads * (formNumber(data, "closeRate") / 100);
    const revenue = customers * formNumber(data, "saleValue");
    const grossProfit = revenue * (formNumber(data, "margin") / 100);
    const profit = grossProfit - spend;
    const roas = spend ? revenue / spend : 0;
    const roi = spend ? (profit / spend) * 100 : 0;
    return {
      label: "ROI",
      score: pct(roi),
      title: roi >= 0 ? "Marketing is above break-even" : "Marketing is below break-even",
      summary: `${numberFormat.format(leads)} leads create about ${numberFormat.format(customers)} customers and ${currency(revenue)} in revenue at these assumptions.`,
      metrics: [
        { label: "Revenue", value: currency(revenue) },
        { label: "Cost per lead", value: currency(spend / Math.max(leads, 1)) },
        { label: "CAC", value: currency(spend / Math.max(customers, 1)) },
        { label: "ROAS", value: `${roas.toFixed(2)}x` },
        { label: "Estimated profit", value: currency(profit) },
      ],
      working: ["You can now see the link between spend, leads, close rate, and margin."],
      problems: roi < 0 ? ["Estimated profit is negative at these assumptions."] : ["The model still depends on accurate tracking and sales reporting."],
      actions: ["Improve close rate, reduce CPL, raise average order value, or focus budget on the highest-intent channels."],
    };
  }

  if (mode === "meta-ads") {
    const budget = formNumber(data, "budget");
    const cpl = formNumber(data, "cpl");
    const leads = budget / Math.max(cpl, 1);
    const customers = leads * (formNumber(data, "closeRate") / 100);
    const revenue = customers * formNumber(data, "customerValue");
    const roas = budget ? revenue / budget : 0;
    const breakEvenCpl = formNumber(data, "customerValue") * (formNumber(data, "closeRate") / 100);
    return {
      label: "ROAS",
      score: `${roas.toFixed(2)}x`,
      title: roas >= 2 ? "Meta Ads economics look promising" : "Meta Ads assumptions need tightening",
      summary: `${currency(budget)} could generate about ${numberFormat.format(leads)} leads and ${numberFormat.format(customers)} customers.`,
      metrics: [
        { label: "Estimated leads", value: numberFormat.format(leads) },
        { label: "Estimated customers", value: numberFormat.format(customers) },
        { label: "CAC", value: currency(budget / Math.max(customers, 1)) },
        { label: "Revenue", value: currency(revenue) },
        { label: "Break-even CPL", value: currency(breakEvenCpl) },
      ],
      working: ["Budget, CPL, close rate, and customer value are visible."],
      problems: cpl > breakEvenCpl ? ["Average CPL is above estimated break-even CPL."] : ["Results still depend on creative, offer, audience, and follow-up speed."],
      actions: ["Test stronger offers and creatives, track WhatsApp/form leads, and speed up follow-up before scaling spend."],
    };
  }

  if (mode === "google-ads") {
    const budget = formNumber(data, "budget");
    const cpc = formNumber(data, "cpc");
    const clicks = budget / Math.max(cpc, 1);
    const leads = clicks * (formNumber(data, "landingRate") / 100);
    const customers = leads * (formNumber(data, "closeRate") / 100);
    const revenue = customers * formNumber(data, "saleValue");
    const roas = budget ? revenue / budget : 0;
    const breakEvenCpc = formNumber(data, "saleValue") * (formNumber(data, "landingRate") / 100) * (formNumber(data, "closeRate") / 100);
    return {
      label: "ROAS",
      score: `${roas.toFixed(2)}x`,
      title: roas >= 2 ? "Search economics look workable" : "Search economics need improvement",
      summary: `${currency(budget)} buys about ${numberFormat.format(clicks)} clicks, ${numberFormat.format(leads)} leads, and ${numberFormat.format(customers)} customers.`,
      metrics: [
        { label: "Clicks", value: numberFormat.format(clicks) },
        { label: "Leads", value: numberFormat.format(leads) },
        { label: "Customers", value: numberFormat.format(customers) },
        { label: "CPA", value: currency(budget / Math.max(customers, 1)) },
        { label: "Revenue", value: currency(revenue) },
        { label: "Break-even CPC", value: currency(breakEvenCpc) },
      ],
      working: ["Search intent is modeled separately from landing page and sales conversion."],
      problems: cpc > breakEvenCpc ? ["Average CPC is above estimated break-even CPC."] : ["Keyword quality and landing-page relevance still need validation."],
      actions: ["Improve landing-page conversion, add negative keywords, track calls/forms, and focus spend on highest-intent queries."],
    };
  }

  if (mode === "patient-retention") {
    const appointments = formNumber(data, "inactivePatients") * (formNumber(data, "bookingRate") / 100);
    const revenue = appointments * formNumber(data, "treatmentValue");
    const cost = formNumber(data, "monthlyCost");
    return {
      label: "ROI Multiple",
      score: `${(revenue / Math.max(cost, 1)).toFixed(2)}x`,
      title: "Patient reactivation estimate",
      summary: `${numberFormat.format(appointments)} potential appointments could recover about ${currency(revenue)} before campaign/system cost.`,
      metrics: [
        { label: "Appointments", value: numberFormat.format(appointments) },
        { label: "Recovered revenue", value: currency(revenue) },
        { label: "Net return", value: currency(revenue - cost) },
        { label: "Monthly cost", value: currency(cost) },
      ],
      working: ["The model focuses on inactive patient database value and campaign cost."],
      problems: ["This is not a medical claim or guaranteed booking forecast."],
      actions: ["Segment inactive patients, confirm consent, write useful recall messaging, and route replies into a fast booking workflow."],
    };
  }

  const visitors = formNumber(data, "visitors");
  const currentLeads = visitors * (formNumber(data, "currentRate") / 100);
  const targetLeads = visitors * (formNumber(data, "targetRate") / 100);
  const extraCustomers = (targetLeads - currentLeads) * (formNumber(data, "closeRate") / 100);
  const monthlyRevenue = extraCustomers * formNumber(data, "customerValue");
  return {
    label: "Monthly Upside",
    score: currency(monthlyRevenue),
    title: "Estimated cost of lost website leads",
    summary: `Moving from ${pct(formNumber(data, "currentRate"))} to ${pct(formNumber(data, "targetRate"))} could add ${numberFormat.format(targetLeads - currentLeads)} leads each month.`,
    metrics: [
      { label: "Current leads", value: numberFormat.format(currentLeads) },
      { label: "Potential leads", value: numberFormat.format(targetLeads) },
      { label: "Additional customers", value: numberFormat.format(extraCustomers) },
      { label: "Monthly revenue difference", value: currency(monthlyRevenue) },
      { label: "Annual revenue difference", value: currency(monthlyRevenue * 12) },
    ],
    working: ["You can now quantify why conversion rate matters before buying more traffic."],
    problems: ["The estimate depends on accurate analytics and lead-to-sale tracking."],
    actions: ["Improve CTA clarity, mobile speed, trust proof, form friction, and follow-up tracking."],
  };
}

function generateSchema(data: FormData): Result {
  const type = String(data.get("schemaType") || "Organization");
  const name = String(data.get("name") || "").trim();
  const url = String(data.get("url") || "").trim();
  const description = String(data.get("description") || "").trim();
  const image = String(data.get("image") || "").trim();
  const details = String(data.get("details") || "").trim();
  const base: Record<string, unknown> = { "@context": "https://schema.org", "@type": type, name };
  if (url) base.url = url;
  if (description) base.description = description;
  if (image) base.image = image;
  if (type === "LocalBusiness") base.address = { "@type": "PostalAddress", addressCountry: "PK" };
  if (type === "Service") base.provider = { "@type": "Organization", name };
  if (type === "Article") base.headline = name;
  if (type === "FAQPage") {
    const lines = details.split(/\n+/);
    base.mainEntity = Array.from({ length: Math.ceil(lines.length / 2) }).map((_, index) => {
      const q = (lines[index * 2] || "").replace(/^Q:\s*/i, "").trim();
      const a = (lines[index * 2 + 1] || "").replace(/^A:\s*/i, "").trim();
      return q && a ? { "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } } : null;
    }).filter(Boolean);
  }
  if (type === "BreadcrumbList") {
    base.itemListElement = details.split(/\n+/).filter(Boolean).map((line, index) => {
      const [label, itemUrl] = line.split("|").map((part) => part.trim());
      return { "@type": "ListItem", position: index + 1, name: label || `Step ${index + 1}`, item: itemUrl || url };
    });
  }

  return {
    label: "JSON-LD",
    score: "Ready",
    title: `${type} schema generated`,
    summary: "Copy this starter JSON-LD, place it on the matching page, and validate it before publishing.",
    metrics: [{ label: "Schema type", value: type }, { label: "Required name", value: name ? "Provided" : "Missing" }],
    working: ["The output avoids fake ratings, reviews, prices, and unsupported claims."],
    problems: name ? ["Validate the JSON-LD and confirm it matches visible page content."] : ["Name is required for a useful schema entity."],
    actions: ["Copy the JSON-LD, add it to the page, validate it, and update it when page facts change."],
    json: JSON.stringify(base, null, 2),
  };
}

function getReportText(tool: ToolPage, result: Result) {
  return [
    tool.name,
    new Date().toLocaleDateString(),
    "",
    result.title,
    result.summary,
    "",
    ...result.metrics.map((item) => `${item.label}: ${item.value}`),
    "",
    "Fix first:",
    ...result.actions,
  ].join("\n");
}

export default function ToolInterface({ tool }: { tool: ToolPage }) {
  const checks = auditProfiles[tool.mode] || [];
  const fields = calculatorFields[tool.mode] || [];
  const isAudit = checks.length > 0;
  const isSchema = tool.mode === "schema-generator";
  const toolMcpName = `${tool.mode.replace(/[^a-zA-Z0-9_]/g, "_")}Tool`;
  const [result, setResult] = useState<Result | null>(null);
  const [leadStatus, setLeadStatus] = useState("");
  const reportText = useMemo(() => (result ? getReportText(tool, result) : ""), [result, tool]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextResult =
      tool.mode === "ai-visibility"
        ? calculateAiVisibility(data, checks)
        : isAudit
          ? calculateAudit(data, checks, tool.name)
          : isSchema
            ? generateSchema(data)
            : calculateMoney(tool.mode, data);
    setResult(nextResult);
    toolEvent("result", tool, { result_label: nextResult.label, result_score: nextResult.score });
  }

  async function shareResult() {
    if (!result) return;
    const text = `${tool.name}: ${result.score}. ${result.title}`;
    if (navigator.share) await navigator.share({ title: tool.name, text, url: location.href });
    else await navigator.clipboard.writeText(`${text} ${location.href}`);
    toolEvent("share", tool, { result_score: result.score });
  }

  function downloadReport() {
    if (!result) return;
    const blob = new Blob([reportText], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${tool.slug}-report.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    toolEvent("download", tool, { result_score: result.score });
  }

  async function copySchema() {
    if (!result?.json) return;
    await navigator.clipboard.writeText(result.json);
    toolEvent("copy_schema", tool, { result_score: result.score });
  }

  function rerunTool() {
    if (result) toolEvent("rerun", tool, { result_score: result.score });
    setResult(null);
  }

  function sendLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result) return;
    const data = new FormData(event.currentTarget);
    const message = [
      `Free tool report request: ${tool.name}`,
      `Name: ${data.get("leadName")}`,
      `Email: ${data.get("leadEmail")}`,
      `Website: ${data.get("leadWebsite") || "Not provided"}`,
      `Phone: ${data.get("leadPhone") || "Not provided"}`,
      `Result: ${result.score}`,
      `Context: ${result.title}`,
      `Page: ${location.href}`,
    ].join("\n");
    toolEvent("lead", tool, { result_score: result.score });
    setLeadStatus("Opening WhatsApp with your report context.");
    window.open(`https://wa.me/923135147935?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }

  return (
    <section id="use-tool" data-service-tone={getServiceTone(tool.category)} className={`${styles.surface} border-y border-white/[0.08] bg-[#050505] px-6 py-16 text-white lg:px-10 lg:py-24`}>
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="portfolio-kicker">Use the Tool</p>
          <h2 className="mt-5 font-syne text-4xl font-bold leading-tight text-white sm:text-5xl">{tool.name}</h2>
          <p className="mt-5 text-base leading-8 text-white/64">{tool.interpretation}</p>
          <div className={`${styles.expectations} mt-7`}>
            {tool.checks.map((item) => (
              <div key={item} className="text-sm leading-6 text-white/68"><CheckCircle2 size={17} aria-hidden="true" />{item}</div>
            ))}
          </div>
        </div>

        <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-7">
          <form
            toolname={toolMcpName}
            tooldescription={`Runs the ${tool.name} free tool and returns a planning result for the visitor.`}
            onSubmit={onSubmit}
            className="grid gap-5"
          >
            {isAudit ? (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field name="website" label="Website URL" type="url" placeholder="https://example.com" required toolParamDescription="The website URL to review with this free diagnostic tool." />
                  <Field name="brand" label="Brand / business name" placeholder="Business name" required toolParamDescription="The brand or business name being reviewed." />
                  <Field name="industry" label="Industry" placeholder="Clinic, restaurant, real estate..." toolParamDescription="The industry or business category for context." />
                  <Field name="location" label="Location" placeholder="Rawalpindi, Islamabad..." toolParamDescription="The target city, region, or service area." />
                </div>
                <TextArea name="services" label="Primary services or page focus" placeholder="List the main services, offers, or page goal" toolParamDescription="The main services, offers, or page goal to evaluate." />
                {tool.mode === "ai-visibility" ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextArea name="competitors" label="Competitors to compare in AI answers" placeholder="Competitor 1, Competitor 2, Competitor 3" toolParamDescription="Competitor brands or websites to compare when reviewing AI visibility." />
                    <TextArea name="profiles" label="Official profiles and citations" placeholder="Google Business Profile, LinkedIn, Clutch, GoodFirms, YouTube, founder profile, case-study URLs..." toolParamDescription="Official profiles, citations, and proof links that support entity trust." />
                  </div>
                ) : null}
                <div className="grid gap-3 md:grid-cols-2">
                  {checks.map(([, , text], index) => (
                    <label key={text} className="flex gap-3 rounded-[18px] border border-white/10 bg-black/40 p-4 text-sm leading-6 text-white/68">
                      <input name={`check-${index}`} type="checkbox" toolparamdescription={`Whether this audit statement is true: ${text}`} className="mt-1 accent-[#FF6801]" />
                      <span>{text}</span>
                    </label>
                  ))}
                </div>
              </>
            ) : null}

            {!isAudit && !isSchema ? (
              <div className="grid gap-4 md:grid-cols-2">
                {fields.map((field) => (
                  <Field
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    type="number"
                    defaultValue={field.value}
                    suffix={field.suffix}
                    required
                    toolParamDescription={`The numeric ${field.label.toLowerCase()} value used by the ${tool.name} calculator.`}
                  />
                ))}
              </div>
            ) : null}

            {isSchema ? (
              <>
                <label className="grid gap-2 text-sm text-white/70">
                  Schema type
                  <select name="schemaType" toolparamdescription="The schema.org type to generate JSON-LD for." className="rounded-[16px] border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#FF6801]">
                    {["Organization", "LocalBusiness", "Person", "Service", "Article", "FAQPage", "BreadcrumbList"].map((type) => <option key={type}>{type}</option>)}
                  </select>
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field name="name" label="Name" required toolParamDescription="The entity, page, article, service, or organization name for the JSON-LD output." />
                  <Field name="url" label="URL" type="url" placeholder="https://example.com/page/" toolParamDescription="The canonical URL for the item being described in schema." />
                  <Field name="description" label="Description" toolParamDescription="A concise description to include in the generated JSON-LD." />
                  <Field name="image" label="Image URL" type="url" toolParamDescription="An image URL to include in the generated JSON-LD when applicable." />
                </div>
                <TextArea name="details" label="Details, FAQs, or breadcrumbs" placeholder="For FAQPage use Q: question / A: answer. For BreadcrumbList use Label | URL per line." rows={5} toolParamDescription="Additional details used to generate FAQs, breadcrumb items, or richer schema properties." />
              </>
            ) : null}

            <button type="submit" className="portfolio-button w-fit">Show My Result <ArrowUpRight className="h-4 w-4" /></button>
          </form>

          {result ? (
            <section className="mt-8 border-t border-white/10 pt-8" aria-live="polite">
              <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                <div className="rounded-[20px] border border-[#FF6801]/48 bg-[#FF6801]/10 p-5">
                  <p className="font-orbitron text-xs uppercase tracking-[0.14em] text-[#FF6801]">{result.label}</p>
                  <p className="mt-3 font-syne text-4xl font-bold text-white">{result.score}</p>
                </div>
                <div>
                  <h3 className="font-syne text-3xl font-bold text-white">{result.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{result.summary}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {result.metrics.map((item) => (
                      <div key={item.label} className="rounded-[18px] border border-white/10 bg-black/42 p-4">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">{item.label}</p>
                        <p className="mt-2 font-orbitron text-lg text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {result.json ? (
                <pre className="mt-6 max-h-[420px] overflow-auto rounded-[18px] border border-white/10 bg-black p-4 text-xs leading-5 text-white/76">
                  {`<script type="application/ld+json">\n${result.json}\n</script>`}
                </pre>
              ) : null}

              <div className="mt-7 grid gap-5 lg:grid-cols-3">
                <ResultList title="What's Working" items={result.working} />
                <ResultList title="What Hurts Visibility" items={result.problems} />
                <ResultList title="Fix First" items={result.actions} />
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <ActionButton onClick={shareResult} icon={<Share2 className="h-4 w-4" />}>Share Result</ActionButton>
                {result.json ? <ActionButton onClick={copySchema} icon={<Copy className="h-4 w-4" />}>Copy JSON-LD</ActionButton> : null}
                <ActionButton onClick={downloadReport} icon={<Download className="h-4 w-4" />}>Download Report</ActionButton>
                <ActionButton onClick={rerunTool} icon={<RotateCcw className="h-4 w-4" />}>Rerun Tool</ActionButton>
                <Link href={tool.serviceHref} onClick={() => toolEvent("service_click", tool, { result_score: result.score, service_href: tool.serviceHref })} className="inline-flex items-center gap-2 rounded-full border border-[#FF6801]/42 px-4 py-3 text-sm font-semibold text-[#FF6801] hover:bg-[#FF6801] hover:text-black">
                  {tool.serviceLabel} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <form onSubmit={sendLead} className="mt-8 grid gap-4 rounded-[22px] border border-white/10 bg-black/40 p-5">
                <div>
                  <h4 className="font-syne text-2xl font-bold text-white">Get the detailed report</h4>
                  <p className="mt-2 text-sm leading-6 text-white/58">The primary result is free. Share your details only if you want Crea8iv Media to review the context.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field name="leadName" label="Name" required toolParamDescription="The visitor's name for Crea8iv Media follow-up." />
                  <Field name="leadEmail" label="Work email" type="email" required toolParamDescription="The visitor's work email for receiving a detailed report follow-up." />
                  <Field name="leadWebsite" label="Website" type="url" toolParamDescription="The website connected to the free tool report request." />
                  <Field name="leadPhone" label="Phone / WhatsApp" type="tel" toolParamDescription="The phone or WhatsApp number for optional report follow-up." />
                </div>
                <label className="flex gap-3 text-xs leading-5 text-white/58">
                  <input name="consent" type="checkbox" toolparamdescription="Consent to share this tool result with Crea8iv Media for follow-up." className="mt-1 accent-[#FF6801]" required />
                  <span>I agree to share this tool result with Crea8iv Media for follow-up about my detailed report.</span>
                </label>
                <button type="submit" className="portfolio-button w-fit">Send My Detailed Report <ArrowUpRight className="h-4 w-4" /></button>
                {leadStatus ? <p className="text-sm text-[#FF6801]">{leadStatus}</p> : null}
              </form>
            </section>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  defaultValue,
  suffix,
  required,
  toolParamDescription,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  suffix?: string;
  required?: boolean;
  toolParamDescription?: string;
}) {
  return (
    <label className="grid gap-2 text-sm text-white/70">
      {label}
      <span className="flex rounded-[16px] border border-white/10 bg-black focus-within:border-[#FF6801]">
        <input name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} required={required} min={type === "number" ? (["cpc", "cpl"].includes(name) ? 0.01 : 0) : undefined} max={suffix === "%" ? 100 : undefined} step={type === "number" ? "any" : undefined} toolparamdescription={toolParamDescription} className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none" />
        {suffix ? <span className="grid place-items-center px-3 text-white/45">{suffix}</span> : null}
      </span>
    </label>
  );
}

function TextArea({ name, label, placeholder, rows = 3, toolParamDescription }: { name: string; label: string; placeholder?: string; rows?: number; toolParamDescription?: string }) {
  return (
    <label className="grid gap-2 text-sm text-white/70">
      {label}
      <textarea name={name} rows={rows} placeholder={placeholder} toolparamdescription={toolParamDescription} className="rounded-[16px] border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#FF6801]" />
    </label>
  );
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-orbitron text-sm uppercase tracking-[0.15em] text-[#FF6801]">{title}</h4>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/68">
        {(items.length ? items : ["No major item selected yet."]).map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function ActionButton({ children, icon, onClick }: { children: React.ReactNode; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white/82 hover:border-[#FF6801]/50 hover:text-white">
      {icon}
      {children}
    </button>
  );
}
