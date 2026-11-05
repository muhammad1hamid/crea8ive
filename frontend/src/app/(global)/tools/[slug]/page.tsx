import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import ToolInterface from "@/components/tools/ToolInterface";
import { SITE_URL } from "@/lib/site-config";
import { tools, toolsBySlug } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolsBySlug[slug];
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    keywords: [
      tool.name,
      tool.title,
      `${tool.category} tool`,
      `${tool.category} calculator`,
      "free marketing tools Pakistan",
      "Crea8iv Media tools",
      tool.serviceLabel,
    ],
    alternates: { canonical: `${SITE_URL}/tools/${tool.slug}/` },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `${SITE_URL}/tools/${tool.slug}/`,
      siteName: "Crea8iv Media",
    },
    twitter: { card: "summary_large_image", title: tool.title, description: tool.description },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = toolsBySlug[slug];
  if (!tool) notFound();
  const relatedTools = tool.relatedTools.map((slug) => toolsBySlug[slug]).filter(Boolean);
  const canonical = `${SITE_URL}/tools/${tool.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        name: tool.name,
        description: tool.description,
        url: canonical,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Free Growth Tools", item: `${SITE_URL}/tools/` },
          { "@type": "ListItem", position: 3, name: tool.name, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: tool.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="native-page overflow-hidden bg-[#050505] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(255,104,1,.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.035),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <nav className="mb-8 flex flex-wrap items-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#FF6801]">Home</Link>
              <span>/</span>
              <Link href="/tools/" className="hover:text-[#FF6801]">Free Growth Tools</Link>
              <span>/</span>
              <span className="text-white/72">{tool.name}</span>
            </nav>
            <p className="portfolio-kicker">{tool.category} Tool</p>
            <h1 className="mt-6 max-w-5xl font-syne text-[clamp(2.45rem,5.7vw,5.6rem)] font-bold leading-[0.97] text-white">{tool.name}</h1>
            <p className="mt-7 max-w-[820px] text-lg leading-8 text-white/72">{tool.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#use-tool" className="portfolio-button">Use Free Tool <ArrowUpRight className="h-4 w-4" /></Link>
              <Link href="/tools/" className="portfolio-text-link">All Tools <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <aside className="lux-card p-6">
            <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-[#FF6801]">What You Need</p>
            <p className="mt-4 text-sm leading-7 text-white/68">{tool.inputSummary}</p>
            <Link href={tool.serviceHref} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF6801]">
              Related service: {tool.serviceLabel} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <ToolInterface tool={tool} />

      <section className="border-y border-white/[0.08] bg-[#080706] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-3">
          <InfoCard title="What the tool checks" items={tool.checks} />
          <InfoCard title="How it works" items={tool.howItWorks.map((item, index) => `${index + 1}. ${item}`)} />
          <InfoCard title="Who it is for" items={tool.audience} />
        </div>
      </section>


      <section className="border-y border-white/[0.08] bg-[#080706] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="portfolio-kicker">Interpretation</p>
            <h2 className="mt-5 font-syne text-4xl font-bold leading-tight text-white sm:text-5xl">What the result means</h2>
            <p className="mt-5 text-base leading-8 text-white/68">{tool.interpretation}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="lux-card p-5">
              <h3 className="font-orbitron text-lg font-semibold text-white">Relevant Resources</h3>
              <div className="mt-5 grid gap-3">
                {tool.resourceLinks.map((link) => <Link key={link.href} href={link.href} className="text-sm text-white/68 hover:text-[#FF6801]">{link.label}</Link>)}
              </div>
            </div>
            <div className="lux-card p-5">
              <h3 className="font-orbitron text-lg font-semibold text-white">Relevant Service</h3>
              <p className="mt-4 text-sm leading-6 text-white/64">Need implementation help after the result?</p>
              <Link href={tool.serviceHref} className="mt-5 inline-flex items-center gap-2 font-orbitron text-xs uppercase tracking-[0.14em] text-[#FF6801]">
                {tool.serviceLabel} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-syne text-4xl font-bold text-white">Related tools</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedTools.map((related) => <ToolCard key={related.slug} tool={related} compact />)}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-[#080706] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="font-syne text-4xl font-bold text-white">FAQs</h2>
          <div className="mt-8 grid gap-4">
            {tool.faqs.map((faq) => (
              <details key={faq.question} className="rounded-[20px] border border-white/10 bg-black/40 p-5">
                <summary className="cursor-pointer font-orbitron text-lg text-white">{faq.question}</summary>
                <p className="mt-4 text-sm leading-7 text-white/68">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="lux-card p-6">
      <h2 className="font-orbitron text-2xl font-semibold text-white">{title}</h2>
      <ul className="mt-6 grid gap-3">
        {items.map((item) => <li key={item} className="border-t border-white/10 pt-3 text-sm leading-6 text-white/68">{item}</li>)}
      </ul>
    </article>
  );
}
