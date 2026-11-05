import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Code2,
  FileCheck2,
  Globe2,
  MapPinned,
  MessagesSquare,
  Search,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react';
import { markets, marketLanguages, type Market } from '@/data/markets';
import { services as marketServices, cityPlans } from '@/data/market-expansion';
import PartnershipEnquiry from '@/components/PartnershipEnquiry';
import './markets.css';

const origin = 'https://crea8ivmedia.com';
const detailVisual = '/img/locations/international-detail-system.webp';
const detailVisualUrl = `${origin}${detailVisual}`;

export function shortMarketName(name: string) {
  return (
    {
      'United States': 'US',
      'United Kingdom': 'UK',
      'United Arab Emirates': 'UAE',
      'Saudi Arabia': 'Saudi',
    } as Record<string, string>
  )[name] ?? name;
}

export function marketMetadata(m: Market): Metadata {
  const title = `${shortMarketName(m.name)} Web Design, Ads & AI SEO | Crea8iv`;
  const url = `${origin}/${m.slug}/`;
  const description = m.intro;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { ...marketLanguages, 'x-default': `${origin}/locations/` },
    },
    openGraph: {
      title,
      description,
      url,
      locale: m.locale.replace('-', '_'),
      type: 'website',
      images: [detailVisualUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [detailVisualUrl],
    },
  };
}

export function MarketLinks() {
  return (
    <nav aria-label="Choose a service market" className="market-selector">
      <Link href="/locations/">
        <Globe2 size={17} aria-hidden="true" />
        <span>All markets</span>
      </Link>
      {markets.map((market) => (
        <Link key={market.slug} href={`/${market.slug}/`}>
          <Globe2 size={17} aria-hidden="true" />
          <span>{market.name}</span>
          <small>English</small>
        </Link>
      ))}
    </nav>
  );
}

export default function MarketPage({ market: m }: { market: Market }) {
  const url = `${origin}/${m.slug}/`;
  const cityPlan = cityPlans[m.slug];
  const services = [
    {
      id: 'web-development',
      title: 'Website design & development',
      shortTitle: 'Website System',
      text: m.website,
      href: '/website-development/',
      Icon: Code2,
      detail:
        'Discovery, information architecture, responsive UI, development, content review and release testing. Existing React, Next.js or WordPress requirements are assessed during scoping.',
      proof: ['Clear service hierarchy', 'Mobile enquiry journey', 'Release and handover QA'],
    },
    {
      id: 'google-ads',
      title: 'Google Ads management',
      shortTitle: 'Demand Capture',
      text: m.ads,
      href: '/google-ads/',
      Icon: Target,
      detail:
        'Account review, campaign structure, landing-page alignment, conversion definitions and ongoing search-term analysis. Media spend and agency fees are scoped separately; ROAS is not guaranteed.',
      proof: ['Search-intent structure', 'Landing-page alignment', 'Qualified lead review'],
    },
    {
      id: 'ai-visibility',
      title: 'SEO & AI search visibility',
      shortTitle: 'AI Visibility',
      text: m.search,
      href: '/ai-search-optimization/',
      Icon: SearchCheck,
      detail:
        'Crawlability, metadata, internal linking, structured data and evidence-led content support discovery. AI citations are platform decisions, not a deliverable we can promise.',
      proof: ['AEO answer blocks', 'GEO entity clarity', 'Structured data'],
    },
  ];
  const faqs = [
    [m.question, m.answer],
    [
      `What does Crea8iv Media deliver for ${m.name} businesses?`,
      `For ${m.name}-facing projects, Crea8iv Media can scope website development, Google Ads, SEO, AEO, GEO, AI visibility and conversion improvements around the actual service area, language needs and enquiry process.`,
    ],
    [
      'How is pricing agreed?',
      'We define the deliverables, dependencies, review rounds and ongoing support in a written proposal. No fixed local-currency price or advertising budget is implied by this page.',
    ],
    [
      'How will progress be measured?',
      'We agree conversion definitions and review available analytics alongside lead quality. A WhatsApp click is not a confirmed lead, and a lead is not revenue. Access and tracking limitations are recorded.',
    ],
    [
      'Will you guarantee search rankings or AI recommendations?',
      'No. We improve technical access, useful content and accurate business information. Search engines and AI systems decide what they index, rank or cite.',
    ],
  ];
  const aiBlocks = [
    {
      title: 'SEO foundation',
      text: 'Crawlable service pages, canonical URLs, metadata, internal links and sitemap readiness help search engines understand the market page.',
      Icon: Search,
    },
    {
      title: 'AEO answer structure',
      text: 'Direct answers, plain-language FAQs and buyer questions make the page easier for answer engines to extract and cite accurately.',
      Icon: MessagesSquare,
    },
    {
      title: 'GEO / LLMO clarity',
      text: 'Entity facts, service scope, delivery base and market coverage are stated clearly so generative systems do not infer false local-office claims.',
      Icon: Bot,
    },
  ];

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: m.heading,
        description: m.intro,
        inLanguage: m.locale,
        image: detailVisualUrl,
        isPartOf: { '@id': `${origin}/#website` },
        publisher: { '@id': `${origin}/#organization` },
        about: [
          { '@type': 'Thing', name: 'Website development' },
          { '@type': 'Thing', name: 'Google Ads management' },
          { '@type': 'Thing', name: 'AI search visibility' },
          { '@type': 'Country', name: m.name },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: 'Home', item: `${origin}/` },
          { name: 'Locations', item: `${origin}/locations/` },
          { name: m.name, item: url },
        ].map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })),
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#priorities`,
        name: `${m.name} digital growth priorities`,
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: service.title,
          item: `${url}#${service.id}`,
        })),
      },
      ...services.map((service) => ({
        '@type': 'Service',
        '@id': `${url}#${service.id}`,
        name: service.title,
        description: service.text,
        provider: { '@id': `${origin}/#organization` },
        areaServed: { '@type': 'Country', name: m.name },
        url: `${url}#${service.id}`,
      })),
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faqs.map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text },
        })),
      },
    ],
  };

  return (
    <main className="market-page market-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
      />
      <nav aria-label="Breadcrumb" className="market-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/locations/">Locations</Link>
        <span>/</span>
        <span>{m.name}</span>
      </nav>

      <header className="market-detail-hero">
        <div className="market-detail-copy">
          <p className="market-eyebrow">CREA8IV MEDIA / SERVING {m.name.toUpperCase()}</p>
          <h1>{m.heading}</h1>
          <p>{m.intro}</p>
          <div className="market-hero-actions" aria-label={`${m.name} project actions`}>
            <a className="market-cta" href="#partnership-enquiry">
              Discuss your project <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <Link className="market-secondary-button" href="/case-studies/">
              Explore our work <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="market-detail-proof" aria-label="Page proof points">
            <span><ShieldCheck size={18} aria-hidden="true" /> No fake local office claim</span>
            <span><Sparkles size={18} aria-hidden="true" /> SEO / AEO / GEO ready</span>
            <span><FileCheck2 size={18} aria-hidden="true" /> Scope-led delivery</span>
          </div>
        </div>
        <figure className="market-detail-visual">
          <Image
            src={detailVisual}
            alt={`Premium digital marketing system visual for ${m.name} website, Google Ads and AI search visibility`}
            width="1600"
            height="900"
            priority
            sizes="(max-width: 1100px) calc(100vw - 40px), 610px"
          />
          <figcaption>
            <span>{m.name}</span>
            <strong>Website + Ads + SEO / AI visibility</strong>
            <small>Delivered remotely from Rawalpindi, Pakistan</small>
          </figcaption>
        </figure>
      </header>

      <MarketLinks />
      {m.slug !== 'qatar' && cityPlan ? (
        <nav className="market-selector market-service-selector" aria-label={`${m.name} services`}>
          {marketServices.map((service) => (
            <Link key={service.slug} href={`/${m.slug}/${service.slug}/`}>
              <Workflow size={17} aria-hidden="true" />
              <span>{service.name}</span>
            </Link>
          ))}
          <Link href={`/${m.slug}/${cityPlan.slug}/`}>
            <MapPinned size={17} aria-hidden="true" />
            <span>{cityPlan.name}</span>
          </Link>
        </nav>
      ) : null}

      <section className="market-section market-answer-grid" aria-labelledby="market-answer-title">
        <div>
          <p className="market-eyebrow">DIRECT ANSWER</p>
          <h2 id="market-answer-title">
            What does Crea8iv Media provide for {m.name} businesses?
          </h2>
        </div>
        <p>
          Crea8iv Media provides remote website development, Google Ads management, SEO,
          AEO, GEO and AI visibility support for {m.name}-facing businesses. The work is
          scoped around actual service coverage, language requirements, enquiry handling and
          performance review instead of generic international marketing claims.
        </p>
      </section>

      <section id="services" className="market-section market-luxury-services">
        <div className="market-section-heading">
          <div>
            <p className="market-eyebrow">THREE CONNECTED PRIORITIES</p>
            <h2>Build the destination. Reach the right people. Make the next step clear.</h2>
          </div>
          <p>
            The page, paid acquisition and search layer work as one system, so a visitor can
            understand the offer before your team receives the enquiry.
          </p>
        </div>
        <div className="market-priority-grid">
          {services.map(({ Icon, ...service }, index) => (
            <article className="market-priority-card" id={service.id} key={service.id}>
              <span className="market-step-number">0{index + 1}</span>
              <span className="market-priority-icon" aria-hidden="true"><Icon size={28} /></span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.proof.map((item) => (
                  <li key={item}><CheckCircle2 size={16} aria-hidden="true" /> {item}</li>
                ))}
              </ul>
              <p>{service.detail}</p>
              <Link href={service.href}>
                Explore {service.shortTitle.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="market-section market-ai-section" aria-labelledby="ai-title">
        <div className="market-ai-intro">
          <p className="market-eyebrow">SEO / AEO / GEO / LLMO</p>
          <h2 id="ai-title">Built for search engines, answer engines and AI-assisted discovery.</h2>
          <p>
            AI visibility is not a promise of rankings or citations. It is a disciplined way to
            make service information, company facts, market scope and evidence easier to parse.
          </p>
        </div>
        <div className="market-ai-cards">
          {aiBlocks.map(({ Icon, ...block }) => (
            <article key={block.title} className="market-ai-card">
              <Icon size={24} aria-hidden="true" />
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="market-section market-coverage-panel" aria-labelledby="coverage-title">
        <div>
          <p className="market-eyebrow">MARKET COVERAGE</p>
          <h2 id="coverage-title">Coverage and language are treated as business decisions.</h2>
          <p>
            We do not create thin location pages simply to repeat place names. The page structure
            is expanded only when the service area, offer, language, buyer questions or proof
            genuinely differs.
          </p>
        </div>
        <div className="market-coverage-list">
          <span><Globe2 size={18} aria-hidden="true" /> Country-level market page</span>
          {cityPlan ? <span><MapPinned size={18} aria-hidden="true" /> Optional {cityPlan.name} plan</span> : null}
          <span><MessagesSquare size={18} aria-hidden="true" /> Localized enquiry path</span>
          <span><BarChart3 size={18} aria-hidden="true" /> Reviewable measurement model</span>
        </div>
      </section>

      <section id="industries" className="market-section">
        <p className="market-eyebrow">EVIDENCE, NOT PROMISES</p>
        <h2>Review the work behind the approach.</h2>
        <p>
          These are examples of agency delivery, not claims of {m.name}-based clients or local
          campaign results. Each case study identifies its client, scope and evidence.
        </p>
        <div className="market-work market-case-grid">
          <Link href="/case-studies/buildscape/">
            <Image
              src="/img/portfolio/websites/buildscape/buildscape-production-card-20260927.webp"
              alt="Buildscape website developed by Crea8iv Media"
              width="1200"
              height="800"
              sizes="(max-width: 767px) 100vw, 50vw"
              loading="lazy"
            />
            <h3>Buildscape</h3>
            <p>Architecture and construction: website presentation and an ongoing integrated engagement.</p>
          </Link>
          <Link href="/case-studies/the-smile-xperts/">
            <Image
              src="/img/case-studies/the-smile-xperts/the-smile-xperts-brand-guideline-cover.webp"
              alt="The Smile Xperts brand presentation"
              width="1200"
              height="800"
              sizes="(max-width: 767px) 100vw, 50vw"
              loading="lazy"
            />
            <h3>The Smile Xperts</h3>
            <p>Healthcare: treatment information, professional authority and appointment-focused journeys.</p>
          </Link>
        </div>
      </section>

      <section id="process" className="market-section">
        <p className="market-eyebrow">REMOTE DELIVERY, CLEAR OWNERSHIP</p>
        <h2>A process your team can participate in.</h2>
        <p>{m.collaboration}</p>
        <ol className="market-process market-process-luxury">
          <li>
            <h3>Define</h3>
            <p>Agree the business objective, audience, scope, account access and a named approver.</p>
          </li>
          <li>
            <h3>Build & review</h3>
            <p>Review content and design before implementation. Test agreed journeys on mobile and desktop.</p>
          </li>
          <li>
            <h3>Release & improve</h3>
            <p>Confirm deployment, tracking and handover. Prioritise ongoing work using available data and sales feedback.</p>
          </li>
        </ol>
        <p>
          Learn about <Link href="/syed-qamar-abbas/">founder Syed Qamar Abbas</Link> and review our{' '}
          <Link href="/company-verification/">current business information</Link>. Contracting,
          privacy and supplier requirements are agreed for each engagement.
        </p>
      </section>

      <section id="faq" className="market-section">
        <h2>Before we start</h2>
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>

      <PartnershipEnquiry market={m.name} />
    </main>
  );
}
