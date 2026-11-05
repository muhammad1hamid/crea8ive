import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, Code2, Compass, MapPin, MonitorSmartphone, SearchCheck } from "lucide-react";
import EvidenceMedia from "@/components/EvidenceMedia";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import { stwArchitecture, stwFaqs, stwMeasurement, stwMoversSchema, stwMoversStudy as study } from "@/lib/stw-movers-case-study";
import styles from "./stw-movers-case-study.module.css";

const contents = [
  ["challenge", "The challenge"], ["approach", "The approach"], ["website", "Website & UX"],
  ["architecture", "Search architecture"], ["content", "Content & answers"], ["acquisition", "Lead generation"], ["outcomes", "Outcomes"],
] as const;

function ClientLink({ href = study.clientUrl, children }: { href?: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}

export default function StwMoversCaseStudyPage() {
  return <article className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(stwMoversSchema()).replace(/</g, "\\u003c") }} />
    <header className={`${styles.wrap} ${styles.intro}`}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href="/">Home</Link><ChevronRight size={13} aria-hidden="true" /><Link href="/case-studies/">Case studies</Link><ChevronRight size={13} aria-hidden="true" /><span aria-current="page">STW Movers</span>
      </nav>
      <div className={styles.introMeta}><span>Client work / Travel & transport</span><span><MapPin size={15} aria-hidden="true" />Barcelona, Spain</span></div>
      <h1>STW Movers<span>Website development, search visibility & lead generation</span></h1>
      <p className={styles.deck}>Building a connected digital experience for Barcelona chauffeur journeys, from travel research and service discovery to booking enquiries.</p>
      <div className={styles.actions}>
        <ClientLink>Visit STW Movers</ClientLink>
        <a href="#website">Explore the work <ArrowRight size={17} aria-hidden="true" /></a>
      </div>
      <figure className={styles.heroShot}>
        <Image src={study.desktop} alt="STW Movers public website with Barcelona chauffeur positioning, navigation and journey enquiry form" width={1440} height={1040} sizes="(min-width: 1320px) 1240px, 94vw" priority />
        <figcaption>STW Movers public homepage, captured {study.dateLabel}. Genuine project imagery; no before-and-after reconstruction.</figcaption>
      </figure>
      <dl className={styles.facts}>
        <div><dt>Industry</dt><dd>Private chauffeur & transfers</dd></div>
        <div><dt>Market</dt><dd>Barcelona, Spain</dd></div>
        <div><dt>Delivered scope</dt><dd>Website, UX, SEO & travel content</dd></div>
        <div><dt>Engagement</dt><dd>Ongoing growth & lead generation</dd></div>
      </dl>
      <p className={styles.byline}>By <Link href="/about/">Crea8iv Media</Link> <span>Published <time dateTime={study.published}>{study.publishedLabel}</time> · Updated <time dateTime={study.modified}>{study.modifiedLabel}</time></span></p>
    </header>

    <nav className={`${styles.wrap} ${styles.contents}`} aria-label="Case study sections">
      {contents.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
    </nav>

    <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="scope-heading">
      <div className={styles.sectionHead}><p className={styles.label}>The engagement</p><h2 id="scope-heading">A premium service needs a connected journey.</h2></div>
      <div className={styles.body}>
        <p><ClientLink>STW Movers</ClientLink> provides pre-booked private chauffeur and transfer services for airport arrivals, cruise connections, executive transport and group travel. Crea8iv Media developed and improved its website around a practical goal: help visitors understand the service and share a useful journey brief.</p>
        <p>This is an implementation case study and an ongoing growth engagement. It records delivered work, prepared acquisition infrastructure and a measurement approach. Public website evidence supports the presentation and content shown here; the technical delivery account is based on the supplied project brief.</p>
        <dl className={styles.statusList}>
          <div><dt>Implemented</dt><dd>Responsive website work, service and content templates, search foundations and traveller-focused editorial improvements.</dd></div>
          <div><dt>Prepared or enabled</dt><dd>Google Ads landing journeys, conversion interactions and the framework for connecting search activity with lead quality.</dd></div>
          <div><dt>Verified here</dt><dd>Public page presentation and the genuine screenshots captured for this case study. No numerical acquisition results are asserted.</dd></div>
          <div><dt>Ongoing verification</dt><dd>Production booking checks, campaign status, qualified enquiries, booking attribution and observed AI citations.</dd></div>
        </dl>
      </div>
    </section>

    <section id="challenge" className={`${styles.wrap} ${styles.section}`} aria-labelledby="challenge-heading">
      <div className={styles.sectionHead}><p className={styles.label}>The business challenge</p><h2 id="challenge-heading">Sell the certainty of a planned journey.</h2></div>
      <div className={styles.body}>
        <p>Barcelona transport searches bring together very different needs. An arriving family may be comparing taxi prices; a cruise passenger may be worried about terminal timing; an executive assistant may need a driver available between meetings. Those visitors need different information before they can make the same decision: whether a planned private journey fits their trip.</p>
        <p>The website needed to communicate that distinction clearly. An immediate street-hail taxi ride and a pre-booked chauffeur service are different products. Taxi and cab comparisons could introduce STW Movers without misrepresenting it as an official Barcelona street-hail taxi operator.</p>
        <ul className={styles.list}>
          <li><strong>Timing and uncertainty.</strong> Airport terminals, flight delays, cruise disembarkation and onward connections all affect pickup planning.</li>
          <li><strong>People and luggage.</strong> Passenger count alone does not establish vehicle suitability. Bags, family requirements and itinerary details also matter.</li>
          <li><strong>Mobile decisions.</strong> Travellers need readable information, reachable actions and a form they can use while moving.</li>
          <li><strong>A growing content estate.</strong> Services, places, routes and guides needed a clear hierarchy to reduce overlapping intent and inconsistent navigation.</li>
        </ul>
        <p>Visibility therefore had to lead somewhere useful: from a relevant answer to a suitable service, and from that service to a well-informed enquiry.</p>
      </div>
    </section>

    <section id="approach" className={`${styles.band} ${styles.section}`} aria-labelledby="approach-heading">
      <div className={styles.wrap}>
        <div className={styles.wideHead}><p className={styles.label}>Our strategic approach</p><h2 id="approach-heading">One experience, from first question to trip brief.</h2><p>Website development, SEO, answer-led content and paid-search preparation work together when each has a clear responsibility.</p></div>
        <ol className={styles.journey}>
          {[
            { Icon: Compass, title: "Research", copy: "Guides and direct answers address the traveller's question." },
            { Icon: SearchCheck, title: "Choose", copy: "Services and routes explain suitability, timing and vehicle considerations." },
            { Icon: MonitorSmartphone, title: "Enquire", copy: "Journey forms, calls and WhatsApp make the next step accessible." },
            { Icon: Code2, title: "Review", copy: "Consent-aware events, lead records and QA inform the next improvement." },
          ].map(({ Icon, title, copy }) => <li key={title}><Icon size={23} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></li>)}
        </ol>
        <p className={styles.bandNote}>SEO, AEO, GEO and AIO describe connected discovery work. Crawlable pages, clear service meaning and useful evidence are the shared foundation; none operates as a separate shortcut to rankings or citations.</p>
      </div>
    </section>

    <section id="website" className={`${styles.wrap} ${styles.section}`} aria-labelledby="website-heading">
      <div className={styles.sectionHead}><p className={styles.label}>Website development & premium UX</p><h2 id="website-heading">Make the service clear. Make the next step easy.</h2></div>
      <div className={styles.body}>
        <p>The website&apos;s charcoal-and-gold styling provides a consistent client identity across desktop and mobile. The work focused on how that identity supports navigation, reading and journey preparation, rather than relying on visual polish alone.</p>
        <h3>Navigation that reflects a traveller&apos;s task</h3>
        <p>Service navigation and dropdown hierarchy organise airport transfers, cruise-port travel, private drivers, executive journeys, hourly bookings and groups. Hero calls to action give visitors a direct route into a quote or journey form. Footer navigation brings services, company information, contact options and booking policies together.</p>
        <h3>A more considered mobile experience</h3>
        <p>Responsive layouts, horizontal card carousels and vehicle-image presentation help people compare options within a smaller screen. Readable controls and visible keyboard focus support interaction beyond touch. Article contents navigation and consistent reading layouts make longer planning guides easier to navigate.</p>
        <h3>Recover without starting again</h3>
        <p>Booking-interface improvements address duplicate error messages and clearer retry actions. Retaining trip details after a failed vehicle search reduces the effort of trying again. These are usability deliverables; complete production vehicle availability, pricing and booking confirmation require separate end-to-end verification.</p>
      </div>
    </section>

    <div className={`${styles.wrap} ${styles.showcase}`}>
      <figure>
        <div className={styles.desktopFrame}><EvidenceMedia src={study.desktop} alt="STW Movers desktop homepage and journey form" sizes="(min-width: 900px) 850px, 88vw" /></div>
        <figcaption>Desktop: service positioning, navigation and journey preparation.</figcaption>
      </figure>
      <figure>
        <div className={styles.mobileFrame}><EvidenceMedia src={study.mobile} alt="STW Movers mobile homepage with service introduction and booking actions" sizes="(min-width: 900px) 300px, 78vw" /></div>
        <figcaption>Mobile: the same public experience at a 390px viewport.</figcaption>
      </figure>
    </div>

    <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="foundation-heading">
      <div className={styles.sectionHead}><p className={styles.label}>Technical foundation</p><h2 id="foundation-heading">A maintainable system behind the presentation.</h2></div>
      <div className={styles.body}>
        <p>STW Movers uses <strong>Nuxt 4, Vue and TypeScript</strong>. Shared components provide consistent navigation, forms and layouts. Composables hold reusable behaviour, typed content supports repeatable service, location, answer and article templates, and Pinia manages shared state.</p>
        <p>Server-rendered pages expose crawlable text without requiring a visitor to complete an interactive booking process. The booking backend uses <strong>Java/Spring Boot</strong>, with database migrations that make changes to stored data structures repeatable.</p>
        <p>API integration connects journey details to vehicle and pricing requests. GitHub workflows support testing, builds and deployment. Each layer has its own responsibility: a successful build checks the application can be assembled, while deployment health checks and complete booking verification establish whether production services work together.</p>
        <p>That separation makes future service and content development easier to maintain while keeping operational checks explicit.</p>
      </div>
    </section>

    <section id="architecture" className={`${styles.band} ${styles.section}`} aria-labelledby="architecture-heading">
      <div className={styles.wrap}>
        <div className={styles.wideHead}><p className={styles.label}>SEO architecture</p><h2 id="architecture-heading">Give every page a job.</h2><p>A service explains the offer. A route resolves a journey. An answer handles one question. A guide supports a broader decision.</p></div>
        <div className={styles.tableScroll} role="region" aria-label="STW Movers search architecture" tabIndex={0}>
          <table><caption>Page roles and traveller intent</caption><thead><tr><th scope="col">Page type</th><th scope="col">Primary responsibility</th><th scope="col">Coverage</th></tr></thead><tbody>
            {stwArchitecture.map(row => <tr key={row.role}><th scope="row">{row.role}</th><td>{row.purpose}</td><td>{row.examples}</td></tr>)}
          </tbody></table>
        </div>
        <div className={styles.twoColumns}>
          <div><h3>Link the research to the service</h3><p>Contextual links connect a travel guide to the relevant airport, cruise, group or hourly service. Route pages can then resolve local details without making every article repeat the entire commercial offer.</p></div>
          <div><h3>Assign ownership of overlapping intent</h3><p>Closely related taxi, cab and chauffeur topics need distinct intent ownership. Canonical and indexing decisions follow the purpose and uniqueness of each page; campaign-only variants should not automatically become competing organic pages.</p></div>
        </div>
      </div>
    </section>

    <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="technical-heading">
      <div className={styles.sectionHead}><p className={styles.label}>Technical SEO</p><h2 id="technical-heading">Make useful pages understandable and discoverable.</h2></div>
      <div className={styles.body}>
        <p>The implementation work covers page titles and descriptions, canonical URL handling, structured data that matches visible content and content-driven sitemap generation. Modification dates should change when the underlying content changes, so freshness signals reflect genuine editorial work.</p>
        <p>Server-rendered service and editorial text supports crawling. Booking and account pages need indexing controls suited to their purpose; campaign-only pages require a deliberate indexability decision. These controls keep private or duplicate journeys from becoming accidental search destinations.</p>
        <p>Rendered-page checks inspect titles, H1s, canonical URLs and schema syntax, complementing source-level checks. They help catch differences between intended metadata and what the page actually serves.</p>
        <p>Core Web Vitals remain a measurement and optimisation objective. Image dimensions, loading choices and stable layouts support that work, but a field-data pass is not claimed without an appropriate real-user dataset and reporting period.</p>
      </div>
    </section>

    <figure className={`${styles.wrap} ${styles.evidence}`}>
      <div className={styles.landscapeFrame}><EvidenceMedia src={study.service} alt="STW Movers Barcelona airport transfer service page" sizes="(min-width: 1320px) 1240px, 94vw" /></div>
      <figcaption>A genuine service-page capture shows how a specific traveller need becomes a commercial destination. Captured {study.dateLabel}.</figcaption>
    </figure>

    <section id="content" className={`${styles.wrap} ${styles.section}`} aria-labelledby="content-heading">
      <div className={styles.sectionHead}><p className={styles.label}>AEO & editorial content</p><h2 id="content-heading">Answer the questions that shape a booking.</h2></div>
      <div className={styles.body}>
        <p>Content development starts with practical concerns: where to meet, what to share when a flight is delayed, how luggage affects vehicle choice and when hourly service makes sense. Direct answers and question-based headings help visitors find the relevant detail before reading further.</p>
        <h3>A dedicated airport pickup guide</h3>
        <p>The engagement includes the new comprehensive guide <strong>“Barcelona Airport Pickup Guide: T1, T2, Meeting Points, Delays and Luggage.”</strong> It brings terminal context, meeting-point preparation, delay communication and luggage considerations into one planning resource.</p>
        <ClientLink href={`${study.clientUrl}/blogs/barcelona-airport-pickup-guide`}>Read the airport pickup guide</ClientLink>
        <p>Ten existing articles were expanded across airport costs, taxi comparisons, cruise connections, group luggage, Eixample, Sitges, private-driver costs, hourly service and business travel. The objective is better decision support within the existing content estate.</p>
        <h3>Useful structure, grounded detail</h3>
        <p>Comparison tables explain trade-offs; booking checklists identify the details a traveller should prepare. Clearly labelled scenarios illustrate possible journeys without presenting fictional customers as actual client results. FAQs address remaining uncertainties, official sources support factual transport information and contextual service links offer a relevant next step.</p>
        <p>FAQs improve usefulness. They do not guarantee Google FAQ rich results, featured snippets or People Also Ask placement. Editorial review also needs to keep terminal guidance, transport information and linked sources current.</p>
        <ClientLink href={`${study.clientUrl}/answers`}>Explore the public answer hub</ClientLink>
      </div>
    </section>

    <figure className={`${styles.wrap} ${styles.evidence}`}>
      <div className={styles.answerFrame}><EvidenceMedia src={study.answers} alt="STW Movers answer hub organising Barcelona chauffeur and airport transfer questions" sizes="(min-width: 1320px) 1240px, 94vw" /></div>
      <figcaption>The public answer hub organises practical traveller questions. Its presence demonstrates content structure, not placement in a search engine or AI answer.</figcaption>
    </figure>

    <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="ai-heading">
      <div className={styles.sectionHead}><p className={styles.label}>AI search visibility</p><h2 id="ai-heading">Build clarity that can be cited.</h2></div>
      <div className={styles.body}>
        <p>The AI-search work improves discoverability, clarity and citation readiness through consistent business information, accurate service descriptions, self-contained answers, verifiable sources and relevant internal links.</p>
        <p>Clear entity information helps readers and systems recognise one business. Structured content makes specific answers easier to understand. The public distinction between pre-booked chauffeur transport and street-hail taxis is particularly important when comparison searches introduce the brand.</p>
        <p>These foundations support the broader SEO and content programme. Inclusion in ChatGPT, Gemini, Perplexity, Google AI Overviews or AI Mode remains outside the agency&apos;s control. Neither schema nor an llms.txt file guarantees rankings or citations.</p>
        <p>Observed mentions and citations belong in a dated, repeatable query review. This case study does not present AI inclusion as an achieved result.</p>
      </div>
    </section>

    <section id="acquisition" className={`${styles.band} ${styles.section}`} aria-labelledby="acquisition-heading">
      <div className={`${styles.wrap} ${styles.editorialGrid}`}>
        <div className={styles.sectionHead}><p className={styles.label}>Google Ads & lead generation</p><h2 id="acquisition-heading">Match the search to the right promise.</h2></div>
        <div className={styles.body}>
          <p>Google Ads is part of the lead-generation engagement. Dedicated landing experiences address searches for airport taxis, cab Barcelona, private transfers, taxi vans and group travel, and chauffeur Barcelona services.</p>
          <p>Each journey needs message alignment: acknowledge the visitor&apos;s search, explain the pre-booked private chauffeur offer and make the next action easy to find. A visitor searching for a taxi van should understand passenger and luggage suitability; an executive traveller needs itinerary and service context.</p>
          <p>Landing preparation brings together prominent enquiry and booking actions, mobile-friendly forms, call and WhatsApp contact paths, and consent-aware measurement. Campaign launch, delivery, spend and profitability require verified account evidence and are not presented as completed results here.</p>
          <h3>A click is the start of measurement</h3>
          <p>A phone or WhatsApp click records an interaction, not a conversation. An enquiry becomes a qualified lead only under an agreed definition; a purchase or confirmed booking requires the corresponding backend record. The reporting model keeps those stages separate.</p>
        </div>
      </div>
    </section>

    <section id="measurement" className={`${styles.wrap} ${styles.section}`} aria-labelledby="measurement-heading">
      <div className={styles.wideHead}><p className={styles.label}>Measurement & quality assurance</p><h2 id="measurement-heading">Measure the journey beyond the click.</h2><p>The measurement framework connects discovery with business records, while keeping intermediate actions and confirmed outcomes distinct.</p></div>
      <div className={styles.tableScroll} role="region" aria-label="Measurement definitions and evidence sources" tabIndex={0}>
        <table><caption>Measurement framework, not reported performance</caption><thead><tr><th scope="col">Area</th><th scope="col">What to measure</th><th scope="col">Evidence and interpretation</th></tr></thead><tbody>
          {stwMeasurement.map(row => <tr key={row.metric}><th scope="row">{row.metric}</th><td>{row.definition}</td><td>{row.source}</td></tr>)}
        </tbody></table>
      </div>
      <div className={styles.twoColumns}>
        <div><h3>Automated and responsive checks</h3><p>The QA approach combines typed-code and build checks with rendered metadata checks, responsive review and interaction testing. Mobile navigation, focus visibility, readable forms and recovery after a failed search each need their own checks.</p></div>
        <div><h3>Production verification remains distinct</h3><p>Deployment health, vehicle and pricing responses, enquiry delivery and a complete booking journey require separate production verification. A successful build does not establish that every production flow passed. AI referrals likewise represent only one part of search visibility.</p></div>
      </div>
    </section>

    <section id="outcomes" className={`${styles.wrap} ${styles.section}`} aria-labelledby="outcomes-heading">
      <div className={styles.sectionHead}><p className={styles.label}>Outcomes & ongoing work</p><h2 id="outcomes-heading">A clearer foundation for the next enquiry.</h2></div>
      <div className={styles.body}>
        <p>The outcome is a connected implementation: a clearer service and content architecture, more useful travel-planning material, a more consistent mobile and desktop experience, and stronger paths between articles, routes and enquiries.</p>
        <p>That foundation enables measurable organic discovery and paid acquisition. These are qualitative delivery outcomes, supported by the project account and public website evidence, rather than a claim of measured growth.</p>
        <p>Ongoing work includes content refinement, intent ownership, mobile usability, API reliability and measurement reconciliation. Approved performance reporting will need a date range, data source, baseline, comparison period, metric definition and clear attribution limitations before numerical results can be added.</p>
        <p>The next evidence layer is operational: consented analytics and Search Console exports, Google Ads account reports, deduplicated qualified-enquiry records, confirmed booking records and dated observations from the AI query panel.</p>
      </div>
    </section>

    <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="faq-heading">
      <div className={styles.sectionHead}><p className={styles.label}>Project questions</p><h2 id="faq-heading">Scope, service and evidence.</h2></div>
      <div className={styles.body}>{stwFaqs.map(faq => <details key={faq.question} className={styles.faq}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
    </section>

    <footer className={`${styles.wrap} ${styles.section} ${styles.articleFooter}`}>
      <div className={styles.sectionHead}><p className={styles.label}>Client & agency</p><h2>A partnership across experience and acquisition.</h2></div>
      <div className={styles.body}>
        <p><ClientLink>STW Movers</ClientLink> is the Barcelona transport business. <Link href="/">Crea8iv Media</Link> is the agency behind the website and connected growth work described in this case study.</p>
        <p>Explore the agency&apos;s <Link href="/website-development/">website development</Link>, <Link href="/ai-visibility-growth/">SEO and visibility programme</Link>, <Link href="/ai-search-optimization/">AEO and AI search visibility</Link>, and <Link href="/google-ads/">Google Ads management</Link> services.</p>
        <p className={styles.sourceNote}>Public references: <ClientLink href={`${study.clientUrl}/services/barcelona-airport-transfer`}>airport transfer service</ClientLink> and <ClientLink href={`${study.clientUrl}/answers`}>traveller answer hub</ClientLink>. Screenshots captured {study.dateLabel}; implementation scope supplied by Crea8iv Media. No customer information or private administration screens are shown.</p>
      </div>
    </footer>

    <section className={styles.finalCta} aria-labelledby="project-heading">
      <div className={styles.wrap}>
        <p className={styles.label}>Your next project</p><h2 id="project-heading">Build a website that connects discovery with enquiries.</h2>
        <p>Bring your service, customer journey and growth priorities into one focused project brief.</p>
        <div className={styles.actions}><LeadTriggerButton className={styles.primaryButton} eventLabel="stw_case_study_project">Discuss your project <ArrowRight size={18} aria-hidden="true" /></LeadTriggerButton><Link href="/contact/">Contact Crea8iv Media <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>
  </article>;
}
