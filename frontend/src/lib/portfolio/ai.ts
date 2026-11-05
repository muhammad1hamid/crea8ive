import "server-only";

import { z } from "zod";
import type { PortfolioProject } from "./types";

const aiEnhancementSchema = z.object({
  industry: z.string().optional(),
  services: z.array(z.string()).optional(),
  summary: z.string().optional(),
  challenge: z.string().optional(),
  objectives: z.array(z.string()).optional(),
  strategy: z.string().optional(),
  creativeDirection: z.string().optional(),
  deliverables: z.array(z.string()).optional(),
  results: z.array(z.string()).optional(),
  timeline: z.string().optional(),
  kpis: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        context: z.string(),
        source: z.string().optional(),
      }),
    )
    .optional(),
});

type AiEnhancement = z.infer<typeof aiEnhancementSchema>;

export async function enhanceProjectWithAI(project: PortfolioProject): Promise<PortfolioProject> {
  if (process.env.PORTFOLIO_AI_ENABLED !== "true") return project;

  const enhancement = await requestAiEnhancement(project).catch(() => null);
  if (!enhancement) return project;

  return {
    ...project,
    industry: enhancement.industry ?? project.industry,
    services: enhancement.services?.length ? enhancement.services : project.services,
    summary: enhancement.summary ?? project.summary,
    challenge: enhancement.challenge ?? project.challenge,
    objectives: enhancement.objectives?.length ? enhancement.objectives : project.objectives,
    strategy: enhancement.strategy ?? project.strategy,
    creativeDirection: enhancement.creativeDirection ?? project.creativeDirection,
    deliverables: enhancement.deliverables?.length ? enhancement.deliverables : project.deliverables,
    results: enhancement.results?.length ? enhancement.results : project.results,
    timeline: enhancement.timeline ?? project.timeline,
    kpis: enhancement.kpis?.length ? enhancement.kpis : project.kpis,
    searchText: [
      project.title,
      enhancement.industry ?? project.industry,
      (enhancement.services ?? project.services).join(" "),
      enhancement.summary ?? project.summary,
      enhancement.challenge ?? project.challenge,
      (enhancement.deliverables ?? project.deliverables).join(" "),
      project.assets.map((asset) => asset.name).join(" "),
    ]
      .join(" ")
      .toLowerCase(),
  };
}

async function requestAiEnhancement(project: PortfolioProject): Promise<AiEnhancement | null> {
  const evidence = {
    title: project.title,
    currentIndustry: project.industry,
    detectedServices: project.services,
    platforms: project.platforms,
    assetCounts: project.assetCounts,
    files: project.assets.slice(0, 80).map((asset) => ({
      name: asset.name,
      type: asset.type,
      category: asset.category,
      path: asset.path,
      description: asset.description,
    })),
  };

  if (process.env.PORTFOLIO_AI_ENDPOINT) {
    const response = await fetch(process.env.PORTFOLIO_AI_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.PORTFOLIO_AI_ENDPOINT_TOKEN ? { authorization: `Bearer ${process.env.PORTFOLIO_AI_ENDPOINT_TOKEN}` } : {}),
      },
      body: JSON.stringify({ evidence, schema: "crea8iv-portfolio-case-study-v1" }),
      next: { revalidate: false },
    });
    if (!response.ok) return null;
    return aiEnhancementSchema.parse(await response.json());
  }

  if (!process.env.OPENAI_API_KEY) return null;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.PORTFOLIO_AI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are the portfolio strategist for Crea8iv Media. Return only valid JSON. Infer missing case study copy from evidence without inventing numeric results that are not supported by assets.",
        },
        {
          role: "user",
          content: `Create a premium agency case-study enhancement from this Drive evidence. JSON keys: industry, services, summary, challenge, objectives, strategy, creativeDirection, deliverables, results, timeline, kpis. Evidence: ${JSON.stringify(evidence)}`,
        },
      ],
      temperature: 0.35,
    }),
    next: { revalidate: false },
  });

  if (!response.ok) return null;
  const json = await response.json();
  const text = extractResponseText(json);
  if (!text) return null;
  return aiEnhancementSchema.parse(JSON.parse(text));
}

function extractResponseText(response: unknown) {
  if (typeof response !== "object" || response === null) return null;
  if ("output_text" in response && typeof response.output_text === "string") return response.output_text;

  const output = (response as { output?: Array<{ content?: Array<{ text?: string; type?: string }> }> }).output;
  return output?.flatMap((item) => item.content ?? []).find((item) => typeof item.text === "string")?.text ?? null;
}
