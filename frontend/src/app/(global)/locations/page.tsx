import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Globe2, MapPinned } from 'lucide-react';
import { ConnectedJourneyCard } from '@/components/HomepageConnectedJourney';
import ConnectedJourneyMotion from '@/components/ConnectedJourneyMotion';
import { DeliveryProcess } from '@/components/HomepageDeliveryProcess';
import { FaqSection } from '@/components/HomepageFaq';
import journeyStyles from '@/components/homepage-connected-journey.module.css';
import actionStyles from '@/components/homepage-final-cta.module.css';
import buyerStyles from '@/components/ui/how-it-works.module.css';
import { markets, marketLanguages } from '@/data/markets';
import styles from './locations.module.css';

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
    kicker: 'Trust destination',
    text: 'Responsive market pages that explain the offer, establish credibility and make the next step obvious.',
    bullets: ['Service architecture', 'Conversion paths', 'Release testing'],
    href: '/website-development/',
    image: '/img/homepage/connected-journey/02-explore.webp',
  },
  {
    title: 'Google Ads',
    kicker: 'Demand capture',
    text: 'Search campaigns and landing journeys aligned around buyer intent, enquiry quality and reviewable actions.',
    bullets: ['Search intent', 'Landing alignment', 'Conversion definitions'],
    href: '/google-ads/',
    image: '/img/homepage/service-orbit/05-paid-ads.webp',
  },
  {
    title: 'SEO & AI visibility',
    kicker: 'Discovery layer',
    text: 'Crawlable pages, useful answers and entity signals that help Google and AI systems understand the business.',
    bullets: ['Structured data', 'Answer blocks', 'Internal links'],
    href: '/ai-search-optimization/',
    image: '/img/homepage/service-orbit/02-seo-ai.webp',
  },
];

const deliverySteps = [
  {
    title: 'Market brief',
    description: 'We agree on the offer, audience, target country and cities, review schedule and business constraints before design or ads begin.',
    image: 'understand-chameleon',
    alt: '',
  },
  {
    title: 'Digital foundation',
    description: 'We shape the website, copy, enquiry route, analytics and tracking around what your business can fulfil.',
    image: 'plan-chess',
    alt: '',
  },
  {
    title: 'Visibility build',
    description: 'We connect SEO, AI visibility and paid acquisition through consistent landing pages, evidence and clear measurement.',
    image: 'build-launch-rocket',
    alt: '',
  },
  {
    title: 'Review and improve',
    description: 'Reports separate traffic, enquiries, qualified opportunities and revenue so you can decide what to improve.',
    image: 'learn-improve-owl',
    alt: '',
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
].map(([question, answer]) => ({ question, answer }));

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
        mainEntity: faqs.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };

  return (
    <main className={`brand-site-shell ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
      />

      <header className={styles.hero}>
        <div className={styles.container}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Locations</span>
          </nav>
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Pakistan-based · International delivery</p>
              <h1>
                Web Development, Google Ads &amp; SEO for{' '}
                <span className={styles.heroAudience}>International Businesses</span>
              </h1>
              <p className={styles.heroLead}>
                We connect your website, paid search and SEO &amp; AI visibility. From Rawalpindi,
                Pakistan, our team works remotely with agreed reviews, documented handover and
                clear performance reporting.
              </p>
              <div className={styles.heroActions}>
                <Link className={actionStyles.primary} href="/contact/" prefetch={false}>
                  Discuss your project <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link className={actionStyles.secondary} href="/case-studies/" prefetch={false}>
                  View case studies <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
              <Link className={styles.heroJump} href="#markets-served">
                Explore markets <ArrowDown size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.heroVisual}>
              <Image
                className={styles.heroImage}
                src="/img/locations/international-market-visual.webp"
                alt="Illustration of a global network connecting websites, advertising and search visibility"
                width={1600}
                height={900}
                preload
                sizes="(max-width: 359px) calc(100vw - 40px), (max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 640px, (max-width: 1519px) 46vw, 670px"
              />
              <dl className={styles.heroFacts} aria-label="Delivery at a glance">
                <div className={styles.heroFact}>
                  <dt><MapPinned size={19} aria-hidden="true" /> Delivery base</dt>
                  <dd>Rawalpindi, Pakistan</dd>
                </div>
                <div className={styles.heroFact}>
                  <dt><Globe2 size={19} aria-hidden="true" /> Coverage</dt>
                  <dd>{markets.length} service markets</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      <section id="markets-served" className={styles.markets} aria-labelledby="markets-title" tabIndex={-1}>
        <div className={styles.container}>
          <div className={`${buyerStyles.heading} ${styles.heading}`}>
            <p className={buyerStyles.eyebrow}>Markets served</p>
            <h2 id="markets-title">Find your <em>service market.</em></h2>
            <p className={buyerStyles.lead}>
              Explore our English-language market guides for websites, advertising and search visibility.
              Our team serves all seven markets remotely from Rawalpindi, Pakistan.
            </p>
          </div>
          <ul className={styles.marketGrid}>
            {markets.map((market) => (
              <li key={market.slug} className={`${journeyStyles.card} ${styles.marketCard}`}>
                <div className={styles.marketTitle}>
                  <Globe2 size={20} aria-hidden="true" />
                  <h3>{market.name}</h3>
                </div>
                <p>{market.intro}</p>
                <Link
                  className={styles.cardLink}
                  href={`/${market.slug}/`}
                  aria-label={`View market page: ${market.name}`}
                  prefetch={false}
                >
                  View market page <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${journeyStyles.section} ${styles.services}`} aria-labelledby="market-service-title">
        <ConnectedJourneyMotion className={styles.container}>
          <div className={`${buyerStyles.heading} ${styles.heading}`} data-journey-heading>
            <p className={buyerStyles.eyebrow}>Connected services</p>
            <h2 id="market-service-title">Help customers find you, trust you <em>and enquire.</em></h2>
            <p className={buyerStyles.lead}>
              Website strategy, paid search and AI-ready SEO work together for each market we serve.
            </p>
          </div>
          <ol className={styles.serviceGrid} aria-label="International services">
            {serviceVisuals.map((item, index) => (
              <ConnectedJourneyCard
                key={item.href}
                title={item.title}
                description={item.text}
                image={item.image}
                number={index + 1}
              >
                <div className={styles.serviceDetails}>
                  <p className={styles.serviceKicker}>{item.kicker}</p>
                  <ul aria-label={`${item.title} focus areas`}>
                    {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                  <Link className={styles.cardLink} href={item.href} aria-label={`Explore service: ${item.title}`} prefetch={false}>
                    Explore service <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </ConnectedJourneyCard>
            ))}
          </ol>
          <div className={styles.flow}>
            <div>
              <p className={styles.eyebrow}>Market visibility system</p>
              <h3>From search demand to qualified enquiry.</h3>
              <p>Visitors see one consistent offer across your website, ads and search results.</p>
            </div>
            <ol aria-label="International growth system flow">
              {['Website', 'Google Ads', 'SEO / AI', 'Enquiries'].map((label, index) => (
                <li key={label}>
                  {index > 0 && <ArrowRight size={16} aria-hidden="true" />}
                  <span>{label}</span>
                </li>
              ))}
            </ol>
          </div>
        </ConnectedJourneyMotion>
      </section>

      <DeliveryProcess
        id="international-delivery"
        headingId="delivery-title"
        eyebrow="How international delivery works"
        heading={<>Four steps for <em>working remotely.</em></>}
        intro="Agree on the market and the work up front, then review performance against the enquiries and opportunities that matter to your business."
        steps={deliverySteps}
        mobileSequence={{ label: 'Visibility workstreams', steps: ['Pages', 'SEO / AI', 'Paid search', 'Tracking'] }}
      />

      <section className={styles.proof} aria-labelledby="evidence-title">
        <div className={styles.container}>
          <div className={`${buyerStyles.heading} ${styles.heading}`}>
            <p className={buyerStyles.eyebrow}>Evidence travels</p>
            <h2 id="evidence-title">See the work and <em>who’s behind it.</em></h2>
          </div>
          <p className={styles.proofCopy}>
            Our <Link href="/case-studies/" prefetch={false}>case studies</Link> explain actual client work
            and scope, including projects for businesses in Pakistan. Review our{' '}
            <Link href="/company-verification/" prefetch={false}>business information</Link> and{' '}
            <Link href="/about/" prefetch={false}>agency background</Link> before discussing a project.
          </p>
        </div>
      </section>

      <FaqSection
        id="faq"
        headingId="locations-faq-title"
        eyebrow="International delivery"
        heading={<>International service <em>FAQs.</em></>}
        description="Answers about coverage, remote collaboration, services and results."
        items={faqs}
      />

      <section className={actionStyles.section} aria-labelledby="locations-contact-title">
        <div className={`${actionStyles.card} ${styles.closing}`}>
          <div className={`${buyerStyles.heading} ${styles.heading}`}>
            <p className={buyerStyles.eyebrow}>Plan your project</p>
            <h2 id="locations-contact-title">Which market are <em>you targeting?</em></h2>
            <p className={buyerStyles.lead}>
              Tell us where you want to reach customers and what you want to improve.
            </p>
          </div>
          <Link className={actionStyles.primary} href="/contact/" prefetch={false}>
            Discuss your project <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <p className={styles.deliveryBase}><MapPinned size={17} aria-hidden="true" /> Delivered remotely from Rawalpindi, Pakistan</p>
        </div>
      </section>
    </main>
  );
}
