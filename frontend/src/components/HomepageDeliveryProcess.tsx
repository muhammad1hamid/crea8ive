import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProcessCardReveal from "./ProcessCardReveal";
import styles from "./homepage-delivery-process.module.css";

const steps = [
  {
    title: "Understand",
    description: "We discuss your goals, audience, current challenges, priorities and practical constraints.",
    image: "understand-chameleon",
    alt: "An orange and purple chameleon exploring a fan of colour swatches.",
  },
  {
    title: "Plan",
    description: "We define the scope, measurable outcomes, key deliverables and responsibilities.",
    image: "plan-chess",
    alt: "A chess knight beside a strategy board with a planned path to a crown.",
  },
  {
    title: "Build & Launch",
    description: "We design, create, implement, test and release the agreed work.",
    image: "build-launch-rocket",
    alt: "Miniature construction workers assembling an orange and white rocket.",
  },
  {
    title: "Learn & Improve",
    description: "Where ongoing management is included, we review performance and refine the next actions.",
    image: "learn-improve-owl",
    alt: "A bespectacled owl studying a book beside an analytics board.",
  },
];

export default function HomepageDeliveryProcess() {
  return (
    <section id="home-delivery-process" data-home-process className={styles.section} aria-labelledby="home-delivery-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>A CLEAR WAY TO WORK</p>
          <h2 id="home-delivery-title">Good work shouldn’t feel <em>complicated.</em></h2>
          <p data-process-lead className={styles.lead}>From the first discussion to delivery, you should know what we are solving, what is being built and what happens next.</p>
        </div>
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
        <div className={styles.action}>
          <Link href="/contact/" prefetch={false} className={styles.cta}>
            Discuss Your Project <ArrowUpRight size={21} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
