import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  FileCheck2,
  Globe2,
  MapPinned,
  MessagesSquare,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react';
import { markets, marketLanguages } from '@/data/markets';
import { MarketLinks } from '@/components/markets/MarketPage';

const origin = 'https://crea8ivmedia.com';

export const metadata: Metadata = {
  title: { absolute: 'International Web Development, Ads & SEO | Crea8iv' },
  description:
    'Explore international markets served by Crea8iv Media. Website development, Google Ads, SEO and AI visibility delivered from Rawalpindi, Pakistan.',
  alternates: {
    canonical: `${origin}/locations/`,
    languages: { ...marketLanguages, 'x-default': `${origin}/locations/` },
  },
  openGraph: {
    title: 'International Web Development, Ads & SEO | Crea8iv',
    description:
      'A premium market hub for businesses that need websites, Google Ads, SEO and AI visibility from a Pakistan-based digital team.',
    url: `${origin}/locations/`,
    type: 'website',
    images: [`${origin}/img/locations/international-market-visual.webp`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Web Development, Ads & SEO | Crea8iv',
    description:
      'Website development, Google Ads, SEO and AI visibility for international service markets.',
    images: [`${origin}/img/locations/international-market-visual.webp`],
  },
};

const serviceVisuals = [
  {
    title: 'Website systems',
    label: '01',
    kicker: 'Trust destination',
    text: 'Responsive market pages that explain the offer, establish credibility and make the next step obvious.',
    bullets: ['Service architecture', 'Conversion paths', 'Release testing'],
    href: '/website-development/',
    Icon: Code2,
  },
  {
    title: 'Google Ads',
    label: '02',
    kicker: 'Demand capture',
    text: 'Search campaigns and landing journeys aligned around buyer intent, enquiry quality and reviewable actions.',
    bullets: ['Search intent', 'Landing alignment', 'Conversion definitions'],
    href: '/google-ads/',
    Icon: Target,
  },
  {
    title: 'SEO & AI visibility',
    label: '03',
    kicker: 'Discovery layer',
    text: 'Crawlable pages, useful answers and entity signals that help Google and AI systems understand the business.',
    bullets: ['Structured data', 'Answer blocks', 'Internal links'],
    href: '/ai-search-optimization/',
    Icon: SearchCheck,
  },
];

const deliverySteps = [
  {
    title: 'Market brief',
    text: 'We define the offer, audience, target country, city focus, review rhythm and business constraints before design or ads begin.',
    Icon: MapPinned,
  },
  {
    title: 'Digital foundation',
    text: 'The website, copy, enquiry route, analytics and tracking plan are shaped around what the business can actually fulfil.',
    Icon: Workflow,
  },
  {
    title: 'Visibility build',
    text: 'SEO, AI visibility and paid acquisition are connected through consistent landing pages, evidence and clean measurement.',
    Icon: BarChart3,
  },
  {
    title: 'Review and improve',
    text: 'Reports separate traffic, enquiries, qualified opportunities and revenue so decisions stay useful and realistic.',
    Icon: FileCheck2,
  },
];

const faqs = [
  [
    'Does Crea8iv Media have offices in every listed country?',
    'No. Crea8iv Media is based in Rawalpindi, Pakistan. The location pages describe service markets and client delivery coverage, not overseas offices.',
  ],
  [
    'Can Crea8iv Media work with international businesses remotely?',
    'Yes. Project communication, approvals, website reviews and campaign reporting can be handled remotely with an agreed schedule, named approver and documented handover.',
  ],
  [
    'Which services are available for international clients?',
    'The core international services are website development, Google Ads, SEO, AI visibility, local landing pages, conversion planning and ongoing marketing support where scoped.',
  ],
  [
    'Do the location pages guarantee rankings or leads?',
    'No. The pages explain services and markets served. Search rankings, AI citations, enquiries and revenue depend on competition, budgets, implementation, market demand and sales follow-up.',
  ],
];

export default function LocationsPage() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${origin}/locations/#page`,
        url: `${origin}/locations/`,
        name: 'International Web Development, Google Ads and SEO Markets',
        description: metadata.description,
        isPartOf: { '@id': `${origin}/#website` },
        publisher: { '@id': `${origin}/#organization` },
        about: [
          { '@type': 'Thing', name: 'Website development' },
          { '@type': 'Thing', name: 'Google Ads' },
          { '@type': 'Thing', name: 'SEO and AI visibility' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Locations', item: `${origin}/locations/` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${origin}/locations/#faq`,
        mainEntity: faqs.map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text },
        })),
      },
    ],
  };

  return (
    <main className="market-page market-locations-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
      />
      <nav aria-label="Breadcrumb" className="market-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Locations</span>
      </nav>

      <header className="market-location-hero">
        <div className="market-location-copy">
          <p className="market-eyebrow">PAKISTAN-BASED / INTERNATIONAL DELIVERY</p>
          <h1>Web Development, Google Ads & SEO for International Businesses</h1>
          <p>
            Crea8iv Media helps businesses build stronger websites, sharper acquisition
            systems and clearer search visibility across international service markets.
            Delivery is led from Rawalpindi, Pakistan with structured remote collaboration,
            documented handover and practical performance review.
          </p>
          <div className="market-hero-actions" aria-label="Location page actions">
            <Link className="market-cta" href="/contact/">
              Discuss your project <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link className="market-secondary-button" href="/case-studies/">
              View case studies <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="market-hero-proof" aria-label="Delivery scope">
            <span><Globe2 size={18} aria-hidden="true" /> International markets</span>
            <span><ShieldCheck size={18} aria-hidden="true" /> No fake office claims</span>
            <span><MessagesSquare size={18} aria-hidden="true" /> Remote review flow</span>
          </div>
        </div>

        <figure className="market-location-visual">
          <Image
            src="/img/locations/international-market-visual.webp"
            alt="Dark global digital network showing international website, ads and search visibility connections"
            width="1600"
            height="900"
            priority
            sizes="(max-width: 1100px) calc(100vw - 40px), 600px"
          />
          <figcaption>
            Service-market visual: websites, Google Ads and search visibility connected across
            international demand.
          </figcaption>
        </figure>
      </header>

      <MarketLinks />

      <section className="market-section market-visual-services" aria-labelledby="market-service-title">
        <p className="market-eyebrow">CONNECTED SERVICES</p>
        <div className="market-section-heading">
          <h2 id="market-service-title">
            Digital systems that help international businesses prove trust, visibility and conversion.
          </h2>
          <p>
            Each market page connects website strategy, paid search and AI-ready SEO into one
            practical growth path without pretending the agency has a local office in every country.
          </p>
        </div>
        <div className="market-service-cards">
          {serviceVisuals.map(({ Icon, ...item }, index) => (
            <Link key={item.title} href={item.href} className="market-visual-card" data-card={index + 1}>
              <span className="market-card-label">{item.label}</span>
              <span className="market-visual-icon" aria-hidden="true"><Icon size={28} /></span>
              <span className="market-card-orbit" aria-hidden="true" />
              <small>{item.kicker}</small>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
              <ul aria-label={`${item.title} proof points`}>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <em>Explore service <ArrowUpRight size={15} aria-hidden="true" /></em>
            </Link>
          ))}
        </div>
        <div className="market-system-panel" aria-label="International growth system flow">
          <div>
            <p className="market-eyebrow">MARKET VISIBILITY SYSTEM</p>
            <h3>From search demand to qualified enquiry.</h3>
            <p>
              The page, campaign and SEO layer are designed together so international visitors
              see a coherent offer instead of disconnected marketing parts.
            </p>
          </div>
          <ol>
            <li><Code2 size={20} aria-hidden="true" /><span>Website</span></li>
            <li><Target size={20} aria-hidden="true" /><span>Google Ads</span></li>
            <li><Sparkles size={20} aria-hidden="true" /><span>SEO / AI</span></li>
            <li><MessagesSquare size={20} aria-hidden="true" /><span>Enquiries</span></li>
          </ol>
        </div>
      </section>

      <section className="market-section market-delivery-section" aria-labelledby="delivery-title">
        <p className="market-eyebrow">HOW INTERNATIONAL DELIVERY WORKS</p>
        <h2 id="delivery-title">A clear operating model for clients outside the agency office.</h2>
        <div className="market-delivery-grid">
          {deliverySteps.map(({ Icon, ...step }, index) => (
            <article key={step.title} className="market-delivery-card">
              <span className="market-step-number">0{index + 1}</span>
              <Icon size={25} aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="market-section market-listing-section" aria-labelledby="markets-title">
        <p className="market-eyebrow">MARKETS SERVED</p>
        <h2 id="markets-title">Country pages built for clarity, not inflated local claims.</h2>
        <p>
          These pages help prospects and search systems understand where Crea8iv Media can
          support website, advertising and visibility work. Each page keeps the delivery-base
          distinction clear.
        </p>
        <div className="market-card-grid">
          {markets.map((market) => (
            <Link key={market.slug} href={`/${market.slug}/`} className="market-country-card">
              <span><Globe2 size={20} aria-hidden="true" /> {market.name}</span>
              <p>{market.intro}</p>
              <small>View market page <ArrowUpRight size={14} aria-hidden="true" /></small>
            </Link>
          ))}
        </div>
      </section>

      <section className="market-section market-proof-section" aria-labelledby="evidence-title">
        <div>
          <p className="market-eyebrow">EVIDENCE TRAVELS</p>
          <h2 id="evidence-title">Use real work as proof. Keep local claims honest.</h2>
        </div>
        <p>
          Our <Link href="/case-studies/">case studies</Link> explain actual client work and scope.
          We do not relabel Pakistan projects as local international results. Review our{' '}
          <Link href="/company-verification/">business information</Link> and{' '}
          <Link href="/about/">agency background</Link> before discussing a project.
        </p>
      </section>

      <section className="market-section" id="faq">
        <h2>International service FAQs</h2>
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
