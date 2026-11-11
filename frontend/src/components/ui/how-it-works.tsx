import { cn } from "@/lib/utils";
import Image from "next/image";
import styles from "../homepage-buyer-journey.module.css";

export interface Step {
  title: string;
  description: string;
}

export interface HowItWorksProps {
  features: Step[];
  className?: string;
}

const stages = [
  { id: "find", alt: "A spotlight and magnifying glass single out an orange person among a crowd, illustrating how customers find a business." },
  { id: "check", alt: "A five-star review card and blue verification shield illustrate how customers check a business's credibility." },
  { id: "decide", alt: "A glowing blue phone sends orange connection waves to one trusted profile, illustrating the decision to get in touch." },
];

/** Live card copy sits over the owner's reference-matched concept artwork. */
export default function HowItWorks({ features, className }: HowItWorksProps) {
  return (
    <div className={cn(styles.board, className)}>
      <ol className={styles.steps} aria-label="How customers decide">
        {features.map((step, index) => {
          const stage = stages[index];
          if (!stage) return null;
          return (
            <li key={stage.id} className={styles.step} data-buyer-stage={stage.id} data-buyer-entrance={index}>
              <div className={styles.card}>
                <Image className={styles.artwork} src={`/img/homepage/buyer-journey/reference-${stage.id}-v1.webp`}
                  alt={stage.alt} fill sizes="(min-width: 1440px) 430px, (min-width: 1024px) 30vw, (min-width: 700px) 420px, calc(100vw - 48px)" loading="lazy" />
                <div className={styles.cardCopy}>
                  <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className={styles.cardTitle}><span>They</span>{" "}<span className={styles.action}>{step.title.replace(/^They\s+/i, "")}</span></h3>
                  <p className={styles.description}>{step.description}</p>
                </div>
              </div>
              {index < Math.min(features.length, stages.length) - 1 && <svg className={styles.connector}
                viewBox="0 0 72 40" aria-hidden="true" focusable="false">
                <path className={styles.connectorLine} d="M3 29C24 8 43 8 66 30" />
                <path className={styles.connectorHead} d="M54 29L66 30L63 18" />
              </svg>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
