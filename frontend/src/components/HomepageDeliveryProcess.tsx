import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import ProcessCardReveal from "./ProcessCardReveal";
import MobileProjectJourney from "./MobileProjectJourney";
import HomepageProcessFlow from "./HomepageProcessFlow";
import styles from "./homepage-delivery-process.module.css";

const steps = [
  {
    title: "Understand",
    description: "We clarify your goals, audience, challenges, priorities and practical constraints.",
    image: "understand-chameleon",
    alt: "An orange and purple chameleon exploring a fan of colour swatches.",
  },
  {
    title: "Plan",
    description: "Agree the scope, measures of success, deliverables and responsibilities.",
    image: "plan-chess",
    alt: "A chess knight beside a strategy board with a planned path to a crown.",
  },
  {
    title: "Build & Launch",
    description: "Design, create, build, test and launch the agreed work.",
    image: "build-launch-rocket",
    alt: "Miniature construction workers assembling an orange and white rocket.",
  },
  {
    title: "Learn & Improve",
    description: "Review results and refine next steps where ongoing management is included.",
    image: "learn-improve-owl",
    alt: "A bespectacled owl studying a book beside an analytics board.",
  },
];

export default function HomepageDeliveryProcess() {
  return (
    <DeliveryProcess
      id="home-delivery-process"
      headingId="home-delivery-title"
      eyebrow="A CLEAR WAY TO WORK"
      heading={<>Good work shouldn’t feel <em>complicated.</em></>}
      intro="From the first discussion to delivery, you should know what we are solving, what is being built and what happens next."
      steps={steps}
      showContact
    />
  );
}

export function DeliveryProcess({ id, headingId, eyebrow, heading, intro, steps, showContact, mobileSequence }: {
  id: string;
  headingId: string;
  eyebrow: string;
  heading: ReactNode;
  intro?: string;
  steps: readonly { title: string; description: string; image: string; alt: string }[];
  showContact?: boolean;
  mobileSequence?: { label: string; steps: readonly string[] };
}) {
  const isHome = id === "home-delivery-process";
  return (
    <section id={id} data-home-process={isHome ? "" : undefined} className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={headingId}>{heading}</h2>
          {intro && <p data-process-lead className={styles.lead}>{intro}</p>}
        </div>
        {isHome ? (
          <HomepageProcessFlow steps={steps} />
        ) : <>
        <ProcessCardReveal className={styles.grid}>
          {steps.map((step, index) => (
            <li key={step.image} className={styles.card}>
              <div className={styles.artwork}>
                <Image
                  src={`/img/homepage/process/${step.image}.webp`}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 699px) calc(100vw - 48px), (max-width: 1100px) 46vw, 32vw"
                  loading="lazy"
                />
              </div>
              <div className={styles.copy}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ProcessCardReveal>
        <MobileProjectJourney
          stages={steps.map(({ title, description }) => ({ title, description }))}
          idPrefix={isHome ? undefined : id}
          sequence={mobileSequence}
        />
        </>}
        {showContact && <div className={styles.action}>
          <Link href="/contact/" prefetch={false} className={styles.cta}>
            Discuss Your Project <ArrowUpRight size={21} aria-hidden="true" />
          </Link>
        </div>}
      </div>
    </section>
  );
}
