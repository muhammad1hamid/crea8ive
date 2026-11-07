import Image from "next/image";
import { ArrowDown, ArrowUpRight, AudioLines, Crosshair, LayoutGrid, Palette, Radio, ScanSearch, SlidersHorizontal, Workflow } from "lucide-react";
import styles from "./growth-systems.module.css";

const services = [
  ["Local Presence", "Google Business Profile Growth", "Maps visibility, reviews optimization, listing enhancement, local keyword presence, and trust-building strategies."],
  ["Social Engine", "Social Media Management", "Content planning, posting strategy, feed styling, audience engagement, and platform-wise brand positioning."],
  ["Paid Reach", "Meta Ads", "Conversion-focused ad systems for Facebook and Instagram with audience testing, creative hooks, and scaling logic."],
  ["Search Capture", "Google Ads", "High-intent traffic campaigns designed to capture buyers at the exact moment they are searching for your service."],
  ["Digital Presence", "Website Development", "Responsive websites with premium visuals, user-focused structure, clean UI, and stronger conversion pathways."],
  ["Brand Identity", "Branding & Creative", "Logo language, visual system, campaign concepts, graphics, color direction, and premium identity design."],
  ["Creative Assets", "Content Creation", "Scroll-stopping visual content, motion snippets, ad creatives, copywriting support, and social media storytelling."],
  ["Strategy Layer", "Consultation", "Expert guidance to align brand goals, ad direction, digital positioning, content planning, and campaign decisions."],
];

const channels = [
  ["GBP", 50, 12], ["Social", 78, 23], ["Meta", 85, 50], ["Google", 78, 77],
  ["Web", 50, 88], ["Brand", 22, 77], ["Content", 15, 50], ["Consult", 22, 23],
] as const;

const layers = [
  ["Visibility Layer", "Google Business Profile, Google Ads, and social platforms bring targeted attention."],
  ["Trust Layer", "Branding, creative direction, and consistent visuals build authority and recognition."],
  ["Conversion Layer", "Website development and ad systems turn traffic into leads, clients, and sales opportunities."],
];

const stages = [
  { icon: ScanSearch, title: "Audit & Discovery", copy: "We understand your market, your current position, and where growth is getting blocked." },
  { icon: Workflow, title: "System Design", copy: "We map the right mix of content, branding, ads, website, and positioning for your business." },
  { icon: Palette, title: "Creative Production", copy: "We build visuals, campaigns, layouts, content pieces, and brand presentation assets." },
  { icon: SlidersHorizontal, title: "Optimization", copy: "We continuously refine messaging, targeting, design decisions, and performance direction." },
];

export default function GrowthSystemsIntro() {
  return (
    <>
      <section id="cm-growth-hero" className={styles.hero} aria-labelledby="growth-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Automated Brand Growth</p>
          <h1 id="growth-title">Growth Systems that look futuristic and <em>sell like machines</em></h1>
          <p className={styles.lede}>Crea8iv Media builds complete growth systems for brands that want stronger visibility, sharper branding, smarter lead generation, and premium digital presence. Every service works together like one intelligent marketing engine.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#cm-services">Explore Services <ArrowDown aria-hidden="true" /></a>
            <a className={styles.secondary} href="#cm-contact">Start Your Growth Plan <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <figure className={styles.heroVisual}>
          <div className={styles.robotStage}>
            <Radio className={styles.signal} aria-hidden="true" />
            <Image src="/img/robot.webp" alt="Crea8iv Media’s orange and cream robotic mascot" width={800} height={800} preload />
          </div>
          <figcaption>
            <span>Growth Engine Visual</span>
            <strong>Design + Ads + Content + Systems</strong>
          </figcaption>
        </figure>
        <ul className={styles.benefits} aria-label="Growth system benefits">
          <li><LayoutGrid aria-hidden="true" /><strong>8</strong><span>Core Services</span></li>
          <li><AudioLines aria-hidden="true" /><strong>24</strong><span>Creative Mindset</span></li>
          <li><Crosshair aria-hidden="true" /><strong>100%</strong><span>Responsive Design</span></li>
        </ul>
      </section>

      <section id="cm-services" className={styles.chapter} aria-labelledby="growth-services-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>All-in-One Services</p>
          <h2 id="growth-services-title">Every service connects into one beautiful growth system.</h2>
          <p>At Crea8iv Media, we go beyond being just a service provider. We operate as a full-scale brand growth partner.</p>
        </div>
        <ol className={styles.fourGrid}>
          {services.map(([label, title, copy], index) => (
            <li key={title} className={styles.service}>
              <div className={styles.cardMeta}><span>{String(index + 1).padStart(2, "0")}</span><span>{label}</span></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="cm-engine" className={`${styles.chapter} ${styles.engine}`} aria-labelledby="growth-engine-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>System Thinking</p>
          <h2 id="growth-engine-title">Not random services. One connected marketing machine.</h2>
          <p>We don’t sell our services separately—we connect them. By aligning your website, branding, social media, content, advertising, and consultation, we create a unified growth engine that works seamlessly together to drive real, measurable results.</p>
        </div>
        <figure className={styles.diagram}>
          <figcaption><Workflow aria-hidden="true" />Growth Core</figcaption>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="36" />
            <circle cx="50" cy="50" r="25" />
            {channels.map(([label, x, y]) => <line key={label} x1="50" y1="50" x2={x} y2={y} />)}
          </svg>
          <ul aria-label="Connected channels">
            {channels.map(([label, x, y]) => <li key={label} style={{ left: `${x}%`, top: `${y}%` }}>{label}</li>)}
          </ul>
        </figure>
        <dl className={styles.layers}>
          {layers.map(([label, copy], index) => (
            <div key={label}>
              <dt><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{label}</dt>
              <dd>{copy}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="cm-process" className={styles.chapter} aria-labelledby="growth-process-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>How We Build</p>
          <h2 id="growth-process-title">A premium robotic-style workflow with human creativity inside.</h2>
        </div>
        <ol className={`${styles.fourGrid} ${styles.workflow}`}>
          {stages.map(({ icon: Icon, title, copy }, index) => (
            <li key={title} className={styles.service}>
              <div className={styles.stageMeta}><span>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="cm-contact" className={`${styles.chapter} ${styles.contact}`} aria-labelledby="growth-contact-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Let’s Build Your Growth System</p>
          <h2 id="growth-contact-title">Beautiful visuals. Smart systems. Real business momentum.</h2>
          <p>If you want a premium digital presence with robotics-inspired visuals and connected marketing services, Crea8iv Media is ready to design your next growth system.</p>
        </div>
        <dl>
          <div><dt>Office</dt><dd>Office No 01, 1st Floor, Plaza 54, Phase 4 Civic Center, Bahria Town, Rawalpindi, 46220</dd></div>
          <div><dt>Hours</dt><dd>10:00 - 18:00</dd></div>
          <div><dt>Phone</dt><dd><a href="tel:+923135147935">0313 5147935</a></dd></div>
        </dl>
      </section>
    </>
  );
}
