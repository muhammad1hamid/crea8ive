import Image from "next/image";
import { CaseConsultingContext } from "@/components/ConsultingContext";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import "./BuildscapeCaseStudy.css";

const root = "/img/portfolio/websites/buildscape/";
const client = "https://buildscape.pk/";
const url = `${SITE_URL}/case-studies/buildscape/`;
const stages = [
  [
    "Discovery",
    "Service pages, local visibility, social content and advertising introduce the company in the context of a project need.",
  ],
  [
    "Trust",
    "Company information, projects, films and planning answers give visitors material to evaluate before making contact.",
  ],
  [
    "Enquiry",
    "The public project intake interface and WhatsApp paths offer different ways to start a conversation.",
  ],
  [
    "Follow-up",
    "A useful brief provides context for a human conversation. Automatic assignment and CRM syncing are not verified.",
  ],
  [
    "Measurement",
    "Review of available website and campaign data informs continuing work. No performance results are claimed here.",
  ],
];
const rows = [
  [
    "Website strategy, design and development",
    "Current production website, responsive presentation, services, projects, company information and public enquiry interface.",
    "Completed",
  ],
  [
    "Website maintenance",
    "Continuing content, presentation and usability improvements.",
    "Ongoing",
  ],
  [
    "SEO, AEO and AI visibility",
    "Live service and location pages, planning answers, metadata, structured data and discovery files; continuing refinement.",
    "Ongoing",
  ],
  [
    "Google Business Profile",
    "Client-confirmed profile management and local visibility scope.",
    "Ongoing",
  ],
  [
    "Video and social content",
    "Client-confirmed production, editing and social management scope; a company film is publicly available.",
    "Ongoing",
  ],
  [
    "Paid advertising",
    "Client-confirmed campaign management, including Meta Ads and supporting creative.",
    "Ongoing",
  ],
  [
    "Creative coordination",
    "Supporting assets and coordinated marketing execution.",
    "Ongoing",
  ],
];
const faqs = [
  [
    "Who designed and developed the Buildscape website?",
    "The Buildscape website was designed and developed by Crea8iv Media. Buildscape is the client and remains a separate company.",
  ],
  [
    "Is the current Buildscape website live?",
    "Yes. The public production website at buildscape.pk was reviewed on 27 September 2026. This is a verification date, not a launch date.",
  ],
  [
    "What does the ongoing engagement cover?",
    "Website improvements, Google Business Profile management, local visibility, video production, social media management, paid advertising, SEO, answer engine optimization and supporting creative work.",
  ],
  [
    "Does AI visibility work guarantee citations or rankings?",
    "No. Clear company information, useful answers, crawlable pages and structured data support understanding and discovery. Rankings and inclusion in AI answers are not guaranteed.",
  ],
];
function Shot({
  name,
  alt,
  width = 1440,
  height = 960,
  priority = false,
}: {
  name: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={`${root}buildscape-production-${name}-20260927.webp`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      unoptimized
    />
  );
}

export default function BuildscapeCaseStudyPage() {
  const contact = `https://wa.me/${BUSINESS_DETAILS.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi Crea8iv Media, I would like to discuss a project similar to Buildscape.")}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${client}#organization`,
        name: "Buildscape",
        legalName: "BUILDSCAPE (PRIVATE) LIMITED",
        url: client,
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        name: "Buildscape: Connecting Construction Expertise with a Complete Digital Presence",
        description:
          "Crea8iv Media's ongoing Buildscape engagement across website development, local visibility, content and marketing management.",
        url,
        image: `${SITE_URL}${root}buildscape-production-desktop-20260927.webp`,
        dateModified: "2026-09-30",
        creator: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: { "@id": `${client}#organization` },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        inLanguage: "en",
        citation: [
          client,
          `${client}projects/`,
          `${client}films/why-buildscape/`,
          `${client}answers/grey-structure-vs-turnkey-construction/`,
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "Buildscape Case Study | Crea8iv Media",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${url}#case-study` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Case Studies",
            item: `${SITE_URL}/case-studies/`,
          },
          { "@type": "ListItem", position: 3, name: "Buildscape", item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
    ],
  };
  return (
    <article className="buildscape-study">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
        }}
      />
      <header className="bs-wrap bs-intro">
        <Link className="bs-link" href="/case-studies/">
          All case studies <ArrowUpRight size={16} />
        </Link>
        <div className="bs-brand">
          <Image
            src={`${root}buildscape-mark-copper.png`}
            alt="Buildscape brand mark"
            width={64}
            height={64}
          />
          <span>Client partnership / Architecture & construction</span>
        </div>
        <h1>Buildscape</h1>
        <p className="bs-deck">
          Connecting construction expertise with a complete digital presence.
        </p>
        <p className="bs-lead">
          An ongoing partnership across website development, local visibility,
          video production, social media, paid advertising and search. Built
          around one task: helping people understand Buildscape before they
          discuss a project.
        </p>
        <div className="bs-actions">
          <a className="bs-button" href={contact}>
            Discuss a Similar Project <ArrowRight size={18} />
          </a>
          <a
            className="bs-link"
            href={client}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Buildscape <ArrowUpRight size={18} />
          </a>
        </div>
        <p className="bs-meta">
          Islamabad & Rawalpindi, Pakistan / Ongoing engagement / Production
          reviewed 27 September 2026
        </p>
        <figure>
          <Shot
            name="desktop"
            height={1000}
            priority
            alt="Current Buildscape homepage with copper accents, service navigation and a residential exterior visual"
          />
          <figcaption>
            The current public website, designed and developed by Crea8iv Media.
            Architectural imagery may include concept visualizations, not
            photographs of completed construction.
          </figcaption>
        </figure>
      </header>
      <nav className="bs-jump bs-wrap" aria-label="Case study sections">
        <a href="#overview">Engagement</a>
        <a href="#website">Website</a>
        <a href="#visibility">Visibility</a>
        <a href="#content">Content & campaigns</a>
        <a href="#evidence">Work in practice</a>
      </nav>
      <section id="overview" className="bs-wrap bs-section">
        <p className="bs-kicker">01 / The engagement</p>
        <h2>
          One company.
          <br />A connected public presence.
        </h2>
        <dl className="bs-facts">
          {[
            ["Client", "BUILDSCAPE (PRIVATE) LIMITED"],
            [
              "Industry",
              "Architecture, engineering, construction, interiors and infrastructure",
            ],
            ["Markets", "Islamabad and Rawalpindi, Pakistan"],
            [
              "Agency role",
              "Website development and integrated marketing management",
            ],
            [
              "Services",
              "Website, local visibility, video, social, paid ads, SEO and AEO",
            ],
            ["Relationship", "Ongoing client engagement"],
          ].map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="bs-columns">
          <div>
            <h3>About Buildscape</h3>
            <p>
              <a href={client}>Buildscape</a> brings architecture, engineering,
              construction and interior capabilities together for residential
              and commercial projects. Its website also presents infrastructure
              development and the divisions behind this wider scope.
            </p>
            <p>
              For someone planning a build in Islamabad or Rawalpindi, that
              breadth needs a clear explanation: which service fits the project,
              what the company does and where to start a conversation.
            </p>
          </div>
          <div>
            <h3>The engagement objectives</h3>
            <ul>
              <li>Present services and divisions in clear, useful language.</li>
              <li>Make projects and films easy to explore.</li>
              <li>Support mobile browsing and project enquiries.</li>
              <li>Maintain a recognizable identity across public channels.</li>
              <li>
                Support local discovery and connect marketing with enquiry
                handling.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bs-band">
        <div className="bs-wrap bs-section">
          <p className="bs-kicker">02 / The connected approach</p>
          <h2>
            From first discovery
            <br />
            to a better conversation.
          </h2>
          <ol className="bs-flow">
            {stages.map(([title, text], i) => (
              <li key={title}>
                <span className="bs-step">
                  0{i + 1}
                  <ArrowRight size={18} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <p className="bs-note">
            This describes the role of each channel, not an automated funnel.
            Meta-to-CRM connections and automatic lead assignment are not
            presented as operational.
          </p>
        </div>
      </section>
      <section id="website" className="bs-wrap bs-section">
        <p className="bs-kicker">03 / Website design & development</p>
        <h2>
          A considered architecture website.
          <br />
          Built to be explored.
        </h2>
        <p className="bs-lead">
          The current website is live. Copper accents, architectural imagery and
          a restrained visual hierarchy give Buildscape a distinctive
          presentation, while dedicated pages organize the substance behind the
          brand.
        </p>
        <div className="bs-devices">
          <figure>
            <Shot
              name="dark"
              height={1000}
              alt="Buildscape desktop homepage in dark appearance"
            />
            <figcaption>
              Dark appearance on desktop. The website also offers a light
              appearance through its theme control.
            </figcaption>
          </figure>
          <figure className="bs-phone">
            <Shot
              name="mobile"
              width={390}
              height={844}
              alt="Current Buildscape mobile homepage with responsive navigation and construction introduction"
            />
            <figcaption>
              Mobile presentation captured from production.
            </figcaption>
          </figure>
        </div>
        <div className="bs-columns">
          <div>
            <h3>Architecture with a clear hierarchy</h3>
            <p>
              Company information, divisions and individual service pages
              separate the firm&apos;s capabilities. Architecture, engineering,
              home construction, interiors and large-scale building work each
              have a place in the navigation.
            </p>
            <h3>Trust through useful context</h3>
            <p>
              Leadership and company information sit alongside project material
              and films. These give prospective clients different ways to
              evaluate the firm, from a quick introduction to a deeper
              exploration of its work.
            </p>
          </div>
          <div>
            <h3>Project presentation with context</h3>
            <p>
              A categorized portfolio supports browsing by project type and
              opens into individual project entries. The site distinguishes
              visualizations from evidence of completed construction.
            </p>
            <h3>Designed for the next step</h3>
            <p>
              Contact links, WhatsApp actions and a structured project intake
              interface are visible on the public website. Maintenance and
              usability refinements continue beyond the initial development
              work.
            </p>
          </div>
        </div>
        <figure className="bs-wide">
          <Shot
            name="projects"
            alt="Buildscape project portfolio with category navigation and published architectural visuals"
          />
          <figcaption>
            Concept renders illustrate design intent; completion and delivery
            roles should be confirmed with Buildscape.{" "}
            <a href={`${client}projects/`}>Explore the client portfolio</a>.
          </figcaption>
        </figure>
      </section>
      <section id="visibility" className="bs-band">
        <div className="bs-wrap bs-section">
          <p className="bs-kicker">
            04 / Search, local visibility & AI understanding
          </p>
          <h2>
            Clear services.
            <br />
            Clear location. Clear identity.
          </h2>
          <div className="bs-columns">
            <div>
              <h3>Search starts with understandable pages</h3>
              <p>
                The live site includes dedicated service pages, location-focused
                construction pages and practical answers to planning questions.
                This connects what Buildscape offers with the decisions people
                make before an enquiry.
              </p>
              <p>
                Metadata, canonical URLs, internal links and structured data
                reinforce the page hierarchy. Public organization information
                identifies Buildscape separately from Crea8iv Media as the
                agency.
              </p>
            </div>
            <div>
              <h3>A foundation for AI discovery</h3>
              <p>
                Organization, service, page, FAQ and video information is
                represented in structured data where relevant. A public sitemap,
                robots file and llms.txt provide additional discovery and
                navigation context.
              </p>
              <p>
                These practices support retrieval and understanding. They do not
                establish that an AI service has cited Buildscape, and llms.txt
                is not a guarantee of indexing or inclusion in AI answers.
              </p>
            </div>
          </div>
          <figure className="bs-wide">
            <Shot
              name="answer"
              alt="Buildscape planning guide explaining grey structure and turnkey construction through a direct answer and supporting detail"
            />
            <figcaption>
              A real planning answer:{" "}
              <a
                href={`${client}answers/grey-structure-vs-turnkey-construction/`}
              >
                grey structure versus turnkey construction
              </a>
              . Useful explanations support a more informed project discussion.
            </figcaption>
          </figure>
          <div className="bs-columns">
            <div>
              <h3>Google Business Profile & local visibility</h3>
              <p>
                Google Business Profile management and local visibility are
                confirmed parts of the ongoing engagement. Their role is to
                support discovery in Islamabad and Rawalpindi and maintain a
                coherent relationship between the profile and website.
              </p>
              <p>
                Specific profile edits, review-response work, verification
                status and map-pack positions are not claimed without supporting
                records.
              </p>
            </div>
            <div>
              <h3>Public technical evidence</h3>
              <ul>
                <li>
                  <a href={`${client}sitemap.xml`}>Published sitemap</a>
                </li>
                <li>
                  <a href={`${client}robots.txt`}>Crawler instructions</a>
                </li>
                <li>
                  <a href={`${client}llms.txt`}>Machine-readable site guide</a>
                </li>
                <li>
                  <a href={`${client}house-construction-company-islamabad/`}>
                    Islamabad construction content
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="content" className="bs-wrap bs-section">
        <p className="bs-kicker">05 / Content & coordinated marketing</p>
        <h2>
          Give the expertise
          <br />
          more than one way to be seen.
        </h2>
        <div className="bs-columns">
          <div>
            <h3>Video production & presentation</h3>
            <p>
              Video production and editing are part of the ongoing agency scope.
              The current website provides a film library and dedicated film
              pages, making video part of the company experience rather than an
              isolated social asset.
            </p>
            <p>
              The company introduction below explains Buildscape&apos;s
              coordinated service approach. It is published as a
              company-supplied film; individual production credits and
              additional formats are not assumed.
            </p>
          </div>
          <div>
            <h3>Social media management</h3>
            <p>
              Content production and social management support a consistent
              public presence alongside the website. Service explanations,
              company context and approved project material give this work a
              common reference point.
            </p>
            <p>
              The purpose is to help an audience understand the company and
              continue the conversation. Posting frequency and engagement growth
              are not presented as verified results.
            </p>
          </div>
        </div>
        <figure className="bs-wide">
          <video
            controls
            preload="none"
            playsInline
            width="1280"
            height="720"
            poster="https://buildscape.pk/videos/company/why-buildscape-poster-720.webp"
            aria-label="Why Buildscape company introduction film"
          >
            <source
              src="https://buildscape.pk/videos/company/why-buildscape.mp4"
              type="video/mp4"
            />
            <a href={`${client}films/why-buildscape/`}>
              Watch the company film
            </a>
          </video>
          <figcaption>
            Why Buildscape: public company introduction.{" "}
            <a href={`${client}films/why-buildscape/`}>
              Open the film page and its summary
            </a>
            . Video loads on play.
          </figcaption>
        </figure>
        <div className="bs-columns">
          <div>
            <h3>Paid advertising & Meta campaigns</h3>
            <p>
              Campaign management, including Meta Ads, is part of the confirmed
              engagement. The strategic connection is between the creative
              people see, the audience being addressed and the destination where
              they can understand the offer or make an enquiry.
            </p>
            <p>
              Creative, targeting, enquiry destinations and optimization belong
              to the campaign workflow. No advertising spend, lead volume,
              retargeting deployment or return on ad spend is asserted here.
            </p>
          </div>
          <div>
            <h3>Creative consistency</h3>
            <p>
              The current website, client logo and public film provide tangible
              examples of Buildscape&apos;s identity. Copper accents, the
              wordmark and architecture-led imagery form reference points for
              supporting creative work.
            </p>
            <p>
              Coordinating website presentation, video, social assets and
              advertising helps the engagement communicate one company across
              different formats.
            </p>
          </div>
        </div>
      </section>
      <section className="bs-band">
        <div className="bs-wrap bs-section">
          <p className="bs-kicker">06 / Enquiry experience</p>
          <h2>
            A clearer brief.
            <br />A human next step.
          </h2>
          <div className="bs-columns">
            <div>
              <h3>Public enquiry capture</h3>
              <p>
                The live contact page presents a staged project intake interface
                covering contact details, service requirements, location,
                project stage, timing and supporting information. WhatsApp paths
                offer an alternative starting point.
              </p>
              <a className="bs-link" href={`${client}contact/`}>
                View the public enquiry experience <ArrowUpRight size={18} />
              </a>
            </div>
            <div>
              <h3>Where public verification ends</h3>
              <p>
                The form interface was inspected without submitting a test
                enquiry. Delivery, internal lead management and sales follow-up
                were not verified end to end.
              </p>
              <p>
                No administration screens or customer records are shown. Meta
                syncing, automatic assignment and other CRM integrations require
                separate verification before being described as active.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="evidence" className="bs-wrap bs-section">
        <p className="bs-kicker">07 / Work in practice</p>
        <h2>
          Delivered foundations.
          <br />
          Continuing partnership.
        </h2>
        <p className="bs-lead">
          The evidence is the work itself: a production website, public service
          and project pages, a company film and a structured enquiry interface.
          Approved performance data has not been supplied, so no growth metrics
          are presented.
        </p>
        <div
          className="bs-table"
          role="region"
          aria-label="Deliverables and status"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th>Service area</th>
                <th>Deliverable or confirmed scope</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([service, deliverable, status]) => (
                <tr key={service}>
                  <th scope="row">{service}</th>
                  <td>{deliverable}</td>
                  <td>{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="bs-note">
          Public features reviewed on 27 September 2026. Ongoing scope is
          client-confirmed. Unverified integrations are excluded rather than
          labeled completed or planned.
        </p>
        <div className="bs-columns">
          <div>
            <h3>The continuing cycle</h3>
            <p>
              Content production, website improvements, campaign management and
              local visibility work continue as one engagement. Review of
              available performance information can guide what to refine next,
              while new public material gives the website and marketing channels
              more useful substance.
            </p>
          </div>
          <div>
            <h3>The agency behind the work</h3>
            <p>
              <Link href="/">Crea8iv Media</Link>, also referred to as Creative
              Media, is the agency partner. Founded by{" "}
              <Link href="/syed-qamar-abbas/">Syed Qamar Abbas</Link>, the
              agency connects website development with creative and marketing
              services. Buildscape remains the separate client company.
            </p>
          </div>
        </div>
        <div className="bs-faq">
          <h3>About this project</h3>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <CaseConsultingContext slug="buildscape" />
      <footer className="bs-band">
        <div className="bs-wrap bs-section">
          <p className="bs-kicker">Your next project</p>
          <h2>
            Build a Connected Digital
            <br />
            Presence for Your Business
          </h2>
          <p className="bs-lead">
            Bring your website, content and marketing into a more useful
            relationship.
          </p>
          <div className="bs-actions">
            <a className="bs-button" href={contact}>
              Discuss Your Project <ArrowRight size={18} />
            </a>
            <Link className="bs-link" href="/our-services/">
              Explore Agency Services <ArrowUpRight size={18} />
            </Link>
            <Link className="bs-link" href="/case-studies/">
              More Case Studies <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
