import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { DeliveryProcess } from "@/components/HomepageDeliveryProcess";
import actionStyles from "@/components/homepage-final-cta.module.css";
import GrowthEngine from "./GrowthEngine";
import styles from "./growth-systems.module.css";

const services = [
  ["Local Presence", "Google Business Profile Growth", "Improve Maps visibility with stronger listings, local keywords and a review strategy that builds trust.", "connected-journey/01-discover"],
  ["Social Engine", "Social Media Management", "Plan content, style your feed and engage your audience with positioning tailored to each platform.", "connected-journey/04-enquire"],
  ["Paid Reach", "Meta Ads", "Build Facebook and Instagram campaigns with audience tests, creative hooks and a plan for scaling.", "service-orbit/05-paid-ads"],
  ["Search Capture", "Google Ads", "Reach high-intent buyers with search campaigns when they’re actively looking for your service.", "service-orbit/02-seo-ai"],
  ["Digital Presence", "Website Development", "Give visitors a responsive website with polished visuals, clear navigation and a straightforward path to enquire.", "connected-journey/02-explore"],
  ["Brand Identity", "Branding & Creative", "Build a visual identity with logo, colour and graphic direction that carries through to your campaigns.", "service-orbit/04-branding"],
  ["Creative Assets", "Content Creation", "Bring social and ad campaigns to life with visuals, short motion clips, ad creative and copywriting support.", "connected-journey/05-follow-through"],
  ["Strategy Layer", "Consultation", "Get guidance on brand goals, digital positioning, advertising, content planning and campaign decisions.", "service-orbit/01-strategy"],
];

const stages = [
  { title: "Audit & Discovery", description: "We review your market and current position to see where growth is getting blocked.", image: "understand-chameleon", alt: "" },
  { title: "System Design", description: "We map the right mix of content, branding, ads, website and positioning for your business.", image: "plan-chess", alt: "" },
  { title: "Creative Production", description: "We build the visuals, campaigns, layouts, content and brand assets the plan needs.", image: "build-launch-rocket", alt: "" },
  { title: "Optimization", description: "We review performance and keep refining messaging, targeting and design decisions.", image: "learn-improve-owl", alt: "" },
];

export default function GrowthSystemsIntro() {
  return (
    <>
      <section id="cm-growth-hero" className={styles.hero} aria-labelledby="growth-title">
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Connected marketing by Crea8iv Media</p>
            <h1 id="growth-title">Growth systems that turn <em>visibility into enquiries.</em></h1>
            <p className={styles.lede}>We connect your brand, website, content and ads so more of the right people find you and have a clear reason to get in touch.</p>
            <div className={styles.actions}>
              <a className={actionStyles.primary} href="#cm-contact">Start Your Growth Plan <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a className={actionStyles.secondary} href="#cm-services">Explore Services <ArrowDown size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className={styles.heroVisual}>
            <Image src="/img/robot.webp" alt="Crea8iv Media’s orange and cream robotic mascot" width={800} height={800} sizes="(max-width: 539px) 66vw, 360px" preload />
            <figcaption>
              <span><span className={styles.signal} aria-hidden="true" /> Growth Engine</span>
              <strong>Design + Ads + Content + Systems</strong>
            </figcaption>
          </figure>
          <ul className={styles.benefits} aria-label="Growth system highlights">
            <li>8 Core Services</li>
            <li>Creative Direction</li>
            <li>Responsive Design</li>
          </ul>
        </div>
      </section>

      <section id="cm-services" className={styles.chapter} aria-labelledby="growth-services-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>All-in-one services</p>
          <h2 id="growth-services-title">Eight services. <em>One growth system.</em></h2>
          <p>From the first search to the first enquiry, we plan and deliver the work as one growth partner.</p>
        </div>
        <ol className={styles.services}>
          {services.map(([label, title, description, image], index) => (
            <ConnectedJourneyCard key={title} title={title} description={description} image={`/img/homepage/${image}.webp`} number={index + 1} containedIcon>
              <span className={styles.serviceLabel}>{label}</span>
            </ConnectedJourneyCard>
          ))}
        </ol>
      </section>

      <GrowthEngine />

      <DeliveryProcess
        id="cm-process"
        headingId="growth-process-title"
        eyebrow="How we build"
        heading={<>From the first audit to <em>ongoing improvement.</em></>}
        steps={stages}
        mobileSequence={{ label: "Creative production sequence", steps: ["Visuals", "Campaigns", "Layouts", "Content", "Brand assets"] }}
      />
    </>
  );
}

export function GrowthSystemsContact() {
  return (
    <section id="cm-contact" className={`${styles.chapter} ${styles.contact}`} aria-labelledby="growth-contact-title">
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>Let’s build your growth system</p>
        <h2 id="growth-contact-title">What should your growth system <em>solve first?</em></h2>
        <p>Tell us where your brand, website or campaigns need to work harder. We’ll discuss how to connect them and where to start.</p>
        <div className={styles.actions}>
          <Link className={actionStyles.primary} href="/contact/" prefetch={false}>Discuss your project <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
      <dl>
        <div><dt>Office</dt><dd>Office No 01, 1st Floor, Plaza 54, Phase 4 Civic Center, Bahria Town, Rawalpindi, 46220</dd></div>
        <div><dt>Hours</dt><dd>10:00 - 18:00</dd></div>
        <div><dt>Phone</dt><dd><a href="tel:+923135147935">0313 5147935</a></dd></div>
      </dl>
    </section>
  );
}
