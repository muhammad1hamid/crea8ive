import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { ConnectedJourneyCard } from "../HomepageConnectedJourney";
import actionStyles from "../homepage-final-cta.module.css";
import styles from "./resource-page.module.css";

export type ResourceAction = { href: string; label: string; newTab?: boolean };

function ResourceActions({ actions, className }: { actions: readonly ResourceAction[]; className: string }) {
  return (
    <div className={className}>
      {actions.map(({ href, label, newTab }, index) => {
        const Icon = href.startsWith("#") ? ArrowDown : ArrowUpRight;
        return (
          <a key={href} href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined} className={index === 0 ? actionStyles.primary : actionStyles.secondary}>
            {label} <Icon size={18} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

export function ResourceHero({ id, breadcrumb, eyebrow, heading, intro, note, art, actions }: {
  id: string;
  breadcrumb: string;
  eyebrow: string;
  heading: ReactNode;
  intro: string;
  note?: ReactNode;
  art: { src: string; alt: string; width: number; height: number; cutout?: boolean };
  actions: readonly ResourceAction[];
}) {
  return (
    <section className={styles.hero} aria-labelledby={id}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{breadcrumb}</span>
        </nav>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 id={id}>{heading}</h1>
            <p className={styles.lead}>{intro}</p>
            {note && <p className={styles.heroNote}>{note}</p>}
            <ResourceActions actions={actions} className={styles.heroActions} />
          </div>
          <div className={styles.heroArt} data-art={art.cutout ? "cutout" : "cover"}>
            <Image
              src={art.src}
              alt={art.alt}
              width={art.width}
              height={art.height}
              sizes="(max-width: 520px) 90vw, (max-width: 899px) 480px, (max-width: 1399px) 43vw, 550px"
              preload
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResourceHeading({ id, eyebrow, heading, intro }: {
  id: string;
  eyebrow?: string;
  heading: ReactNode;
  intro?: string;
}) {
  return (
    <div className={styles.heading}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id}>{heading}</h2>
      {intro && <p className={styles.lead}>{intro}</p>}
    </div>
  );
}

export function ResourceClosing({ id, heading, intro, actions }: {
  id: string;
  heading: ReactNode;
  intro: string;
  actions: readonly ResourceAction[];
}) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className={actionStyles.section} aria-labelledby={headingId}>
      <div className={`${actionStyles.card} ${styles.closing}`}>
        <div className={actionStyles.copy}>
          <h2 id={headingId}>{heading}</h2>
          <p className={actionStyles.intro}>{intro}</p>
        </div>
        <ResourceActions actions={actions} className={styles.closingActions} />
      </div>
    </section>
  );
}

export function ResourceDetails({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className={styles.details}>
      <summary>{label} <ChevronDown size={18} aria-hidden="true" /></summary>
      <div className={styles.detailPanel}>{children}</div>
    </details>
  );
}

export function ResourceChecklist({ items, columns = 1 }: { items: readonly string[]; columns?: 1 | 2 }) {
  return (
    <ul className={styles.checklist} data-columns={columns}>
      {items.map((item) => (
        <li key={item}><Check size={18} aria-hidden="true" />{item}</li>
      ))}
    </ul>
  );
}

export function ResourceLibraryCard({ title, description, image, number, category, bestFor, href, action, fitColumns = 1, listLabel = "Best for" }: {
  title: string;
  description: string;
  image: string;
  number: number;
  category: string;
  bestFor: readonly string[];
  href: string;
  action: string;
  fitColumns?: 1 | 2;
  listLabel?: string;
}) {
  return (
    <ConnectedJourneyCard title={title} description={description} image={image} number={number} containedIcon>
      <ul className={styles.fitList} data-columns={fitColumns} aria-label={listLabel}>
        {bestFor.map((item) => (
          <li key={item}><Check size={16} aria-hidden="true" />{item}</li>
        ))}
      </ul>
      <div className={styles.cardFooter}>
        <span className={styles.cardType}>{category}</span>
        <Link href={href} prefetch={false} className={styles.cardLink} aria-label={`${action}: ${title}`}>
          {action} <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </ConnectedJourneyCard>
  );
}
