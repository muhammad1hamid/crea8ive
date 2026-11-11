import Image from "next/image";
import type { ReactNode } from "react";
import { homepageFaqs } from "@/data/homepage-faqs";
import PremiumFaqAccordion from "./PremiumFaqAccordion";
import styles from "./homepage-faq.module.css";

export default function HomepageFaq() {
  return (
    <FaqSection
      id="homepage-faq"
      headingId="home-faq-heading"
      eyebrow="Before we begin"
      heading={<>Before we begin, let’s make <em>things clear.</em></>}
      description="Straight answers about our services, search visibility and how a project gets started."
      items={homepageFaqs}
    />
  );
}

export function FaqSection({ id, headingId, eyebrow, heading, description, items, centered = false, children }: {
  id: string;
  headingId: string;
  eyebrow: string;
  heading: ReactNode;
  description: string;
  items: readonly { question: string; answer: string }[];
  centered?: boolean;
  children?: ReactNode;
}) {
  return (
    <section id={id} data-home-faq={id === "homepage-faq" ? "" : undefined} className={centered ? `${styles.section} ${styles.centered}` : styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={headingId}>{heading}</h2>
          <p className={styles.description}>{description}</p>
          {!centered && <div className={styles.artwork} aria-hidden="true">
            <Image
              src="/img/homepage/faq/folded-qa.webp"
              alt=""
              width={900}
              height={600}
              sizes="(max-width: 767px) 290px, (max-width: 1023px) 310px, 370px"
              loading="lazy"
            />
          </div>}
        </div>
        <PremiumFaqAccordion items={items} idPrefix={id}>{children}</PremiumFaqAccordion>
      </div>
    </section>
  );
}
