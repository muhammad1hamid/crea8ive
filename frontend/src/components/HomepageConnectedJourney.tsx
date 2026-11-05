import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ConnectedJourneyMotion from "./ConnectedJourneyMotion";
import styles from "./homepage-connected-journey.module.css";

const stages = [
  {
    title: "Discover",
    description: "Google Search, Maps, AI-assisted discovery, social content and ads help people encounter your business.",
    image: "01-discover",
    alt: "Blue 3D magnifying glass with an orange handle and a growth chart.",
  },
  {
    title: "Explore",
    description: "A clear website and helpful content show what you offer and who it is for.",
    image: "02-explore",
    alt: "Cobalt-blue 3D browser window with an orange cursor.",
  },
  {
    title: "Trust",
    description: "Real work, credible information, reviews and straightforward answers reduce uncertainty.",
    image: "03-trust",
    alt: "Emerald-green 3D shield with gold edging and a white checkmark.",
  },
  {
    title: "Enquire",
    description: "Relevant CTAs, fast forms, calls and WhatsApp make reaching out easy.",
    image: "04-enquire",
    alt: "Overlapping orange and white 3D conversation bubbles.",
  },
  {
    title: "Follow through",
    description: "Lead handling, reporting and automation help the team respond and improve.",
    image: "05-follow-through",
    alt: "Purple and cyan 3D progress arrows around an ascending growth chart.",
  },
];

export default function HomepageConnectedJourney() {
  return (
    <section id="home-how-it-connects" data-home-journey className={styles.section} aria-labelledby="home-connected-title">
      <ConnectedJourneyMotion className={styles.inner}>
        <div className={styles.heading} data-journey-heading>
          <p className={styles.eyebrow}>HOW IT CONNECTS</p>
          <h2 id="home-connected-title">Your customers don’t experience your business <em>in departments.</em></h2>
          <div className={styles.intro}>
            <p>They discover you, explore your offer, compare their options and decide whether to enquire.</p>
            <p>We connect the website, search presence, content, campaigns and follow-up around those moments.</p>
          </div>
        </div>
        <div className={styles.journey}>
          <div className={styles.track} data-journey-track aria-hidden="true">
            <span className={styles.desktopLine} />
            <svg className={styles.tabletLine} viewBox="0 0 1000 600" preserveAspectRatio="none">
              <path d="M 166.67 150 H 833.33 V 300 H 333.33 V 450 H 666.67" />
            </svg>
            <span className={styles.mobileLine} />
          </div>
          <ol className={styles.cards} aria-label="Connected growth stages">
            {stages.map((stage, index) => (
              <li key={stage.image} className={styles.card} data-journey-card>
                <div className={styles.cardTop}>
                  <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <Image
                    className={styles.icon}
                    src={`/img/homepage/connected-journey/${stage.image}.webp`}
                    alt={stage.alt}
                    width={512}
                    height={512}
                    sizes="112px"
                    loading="lazy"
                  />
                </div>
                <h3>{stage.title}</h3>
                <span className={styles.accentLine} aria-hidden="true" />
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.action}>
          <Link href="/contact/" prefetch={false} className={styles.cta}>See How We Work <ArrowUpRight size={20} aria-hidden="true" /></Link>
        </div>
      </ConnectedJourneyMotion>
    </section>
  );
}
