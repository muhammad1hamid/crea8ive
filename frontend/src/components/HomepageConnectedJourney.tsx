import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
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

export function ConnectedJourneyCard({ title, description, image, imageAlt = "", number, children, containedIcon = false }: {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  number?: number;
  children?: ReactNode;
  containedIcon?: boolean;
}) {
  return (
    <li className={containedIcon ? `${styles.card} ${styles.containedIcon}` : styles.card} data-journey-card>
      <div className={styles.cardTop}>
        {number !== undefined && <span className={styles.number} aria-hidden="true">{String(number).padStart(2, "0")}</span>}
        <Image className={styles.icon} src={image} alt={imageAlt} width={512} height={512} sizes={containedIcon ? "76px" : "112px"} loading="lazy" />
      </div>
      <div className={styles.cardCopy}>
        <h3>{title}</h3>
        <span className={styles.accentLine} aria-hidden="true" />
        <p>{description}</p>
        {children}
      </div>
    </li>
  );
}

export default function HomepageConnectedJourney() {
  return (
    <ConnectedJourney
      id="home-how-it-connects"
      headingId="home-connected-title"
      eyebrow="HOW IT CONNECTS"
      heading={<>Your customers don’t experience your business <em>in departments.</em></>}
      intro={<>
        <p>They discover you, explore your offer, compare their options and decide whether to enquire.</p>
        <p>We connect the website, search presence, content, campaigns and follow-up around those moments.</p>
      </>}
      stages={stages}
      action={{ href: "/contact/", label: "See How We Work" }}
    />
  );
}

export function ConnectedJourney({ id, headingId, eyebrow, heading, intro, stages, action }: {
  id: string;
  headingId: string;
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  stages: readonly { title: string; description: string; image: string; alt?: string }[];
  action?: { href: string; label: string };
}) {
  return (
    <section id={id} data-home-journey={id === "home-how-it-connects" ? true : undefined} className={styles.section} aria-labelledby={headingId}>
      <ConnectedJourneyMotion className={styles.inner}>
        <div className={styles.heading} data-journey-heading>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={headingId}>{heading}</h2>
          <div className={styles.intro}>{intro}</div>
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
              <ConnectedJourneyCard
                key={stage.image}
                title={stage.title}
                description={stage.description}
                image={`/img/homepage/connected-journey/${stage.image}.webp`}
                imageAlt={stage.alt}
                number={index + 1}
              />
            ))}
          </ol>
        </div>
        {action && <div className={styles.action}>
          <Link href={action.href} prefetch={false} className={styles.cta}>{action.label} <ArrowUpRight size={20} aria-hidden="true" /></Link>
        </div>}
      </ConnectedJourneyMotion>
    </section>
  );
}
