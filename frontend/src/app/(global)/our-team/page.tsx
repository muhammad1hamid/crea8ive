import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Check,
  Code2,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  PenTool,
  Target,
} from "lucide-react";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { SOCIAL_LINKS } from "@/lib/social-links";
import styles from "./our-team.module.css";

const canonical = `${SITE_URL}/our-team/`;
const title = "Crea8iv Media Team | Strategy, Creative, SEO & Growth Systems";
const description =
  "Meet the founder-led Crea8iv Media team building premium creative, performance marketing, SEO, automation and software systems for businesses in Pakistan.";
const founderImage = "/assets/syed-qamar-abbas-founder-card.webp";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "profile",
    images: [{ url: `${SITE_URL}${founderImage}`, width: 1728, height: 1152, alt: "Syed Qamar Abbas, Founder and CEO of Crea8iv Media" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}${founderImage}`] },
};

const disciplines = [
  { number: "01", icon: Compass, title: "Strategy & positioning", text: "We clarify the market, offer, audience, and next best action before execution begins." },
  { number: "02", icon: PenTool, title: "Creative direction", text: "We build visual systems that make the business look credible, memorable, and ready to choose." },
  { number: "03", icon: BarChart3, title: "Performance growth", text: "We connect search, paid media, content, and conversion paths to measurable business signals." },
  { number: "04", icon: BrainCircuit, title: "AI & automation", text: "We remove repetitive work with practical workflows, reporting, and assistive intelligence." },
  { number: "05", icon: Code2, title: "Software systems", text: "We design websites, dashboards, and custom tools around the way the team actually works." },
  { number: "06", icon: Target, title: "Quality control", text: "Every important touchpoint is reviewed for clarity, speed, accessibility, and conversion." },
] as const;

const principles = [
  "Founder-led direction with clear accountability",
  "One shared system across brand, marketing, and technology",
  "Decisions tied to buyer intent and measurable signals",
  "Calm, direct communication throughout delivery",
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      mainEntity: { "@id": `${SITE_URL}/syed-qamar-abbas/#person` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/syed-qamar-abbas/#person`,
      name: "Syed Qamar Abbas",
      jobTitle: "Founder and CEO",
      image: `${SITE_URL}${founderImage}`,
      url: `${SITE_URL}/syed-qamar-abbas/`,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.instagram, SOCIAL_LINKS.x],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Our team", item: canonical },
      ],
    },
  ],
};

export default function OurTeamPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

      <section className={styles.hero}>
        <div className={styles.heroRule} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Our team</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>The people behind the system</p>
              <h1>Small team.<br /><em>Serious growth systems.</em></h1>
              <p className={styles.heroIntro}>
                Crea8iv Media brings strategy, creative, performance marketing, SEO, automation, and software thinking into one accountable delivery team.
              </p>
              <div className={styles.heroActions}>
                <LeadTriggerButton className={styles.primaryButton} eventLabel="our-team-hero">
                  Meet us about your growth <ArrowUpRight aria-hidden="true" />
                </LeadTriggerButton>
                <Link href="#how-we-work" className={styles.secondaryLink}>
                  How we work <ArrowRight aria-hidden="true" />
                </Link>
              </div>
              <div className={styles.heroDetails}>
                <span><MapPin aria-hidden="true" /> Rawalpindi, Pakistan</span>
                <span><span className={styles.statusDot} aria-hidden="true" /> Founder-led delivery</span>
              </div>
            </div>

            <div className={styles.founderStage}>
              <div className={styles.stageIndex}>01 <span>/</span> Leadership</div>
              <div className={styles.founderImageFrame}>
                <Image
                  src={founderImage}
                  alt="Syed Qamar Abbas, Founder and CEO of Crea8iv Media"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className={styles.founderImage}
                />
              </div>
              <div className={styles.founderCaption}>
                <div>
                  <p className={styles.captionLabel}>Founder & CEO</p>
                  <h2>Syed Qamar Abbas</h2>
                </div>
                <Link href="/syed-qamar-abbas/" aria-label="Read Syed Qamar Abbas profile">
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statement} aria-labelledby="statement-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}><span>02</span><span>Our operating model</span></div>
          <div className={styles.statementGrid}>
            <h2 id="statement-title">A senior point of view, supported by specialist execution.</h2>
            <div>
              <p>Businesses do not experience your brand in departments. They experience one journey, from first search to first conversation to the decision to trust you.</p>
              <p>That is why our team works as one system. The strategy sets the direction, creative makes it visible, performance creates demand, and technology keeps the operation moving.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.disciplineSection} aria-labelledby="discipline-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>The capability map</p>
              <h2 id="discipline-title">Different disciplines.<br /><em>One standard.</em></h2>
            </div>
            <p>Every specialist role is connected to the same questions: is the message clear, is the experience credible, and is the next action easy?</p>
          </div>
          <div className={styles.disciplineGrid}>
            {disciplines.map(({ number, icon: Icon, title: disciplineTitle, text }) => (
              <article key={number} className={styles.disciplineCard}>
                <div className={styles.cardTop}><span>{number}</span><Icon aria-hidden="true" /></div>
                <h3>{disciplineTitle}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workSection} id="how-we-work" aria-labelledby="work-title">
        <div className={styles.sectionInner}>
          <div className={styles.workGrid}>
            <div>
              <div className={styles.sectionLabel}><span>03</span><span>How we work</span></div>
              <h2 id="work-title">Clarity first.<br /><em>Momentum after.</em></h2>
              <p className={styles.workIntro}>The first step is always a sharper understanding of the business problem. From there, we build the smallest useful improvement, measure it, and keep the system moving.</p>
              <Link href="/results/" className={styles.textLink}>See selected work <ArrowUpRight aria-hidden="true" /></Link>
            </div>
            <div className={styles.principlesPanel}>
              <p className={styles.captionLabel}>What you can expect</p>
              <ul>
                {principles.map((principle) => <li key={principle}><Check aria-hidden="true" /><span>{principle}</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contactSection} aria-labelledby="contact-title">
        <div className={styles.contactInner}>
          <div>
            <p className={styles.eyebrow}><MessageCircle aria-hidden="true" /> Start with the real problem</p>
            <h2 id="contact-title">Bring us the part of growth that feels stuck.</h2>
          </div>
          <div className={styles.contactAction}>
            <p>Tell us what is not working. We will help you see the next practical move.</p>
            <LeadTriggerButton className={styles.primaryButton} eventLabel="our-team-final">
              Book Free Growth Audit <ArrowUpRight aria-hidden="true" />
            </LeadTriggerButton>
            <a href={`mailto:${BUSINESS_DETAILS.email}`} className={styles.emailLink}><Mail aria-hidden="true" /> {BUSINESS_DETAILS.email}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
