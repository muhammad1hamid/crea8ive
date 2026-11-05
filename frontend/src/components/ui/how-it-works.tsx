import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Search, ShieldCheck, Zap } from "lucide-react";
import styles from "./how-it-works.module.css";

export interface Step {
  title: string;
  description: string;
}

export interface HowItWorksProps {
  features: Step[];
  className?: string;
}

const stages = [
  { label: "FIND", tone: "find", image: "01-find", alt: "A hand positioning a purple chess king on a circular target among white chess pieces.", icon: Search, href: "/ai-search-optimization/" },
  { label: "CHECK", tone: "check", image: "02-check", alt: "A hand choosing a purple checkmark button along a decision path with selection cards and a target.", icon: ShieldCheck, href: "/our-services/" },
  { label: "DECIDE", tone: "decide", image: "03-decide", alt: "A white chess knight beside a strategy board, orange and purple books and chess pieces.", icon: Zap, href: "#home-how-it-connects" },
];

/** Supplied artwork and server-rendered copy form one three-stage buyer journey. */
export default function HowItWorks({ features, className }: HowItWorksProps) {
  return (
    <div className={cn(styles.board, className)}>
      <ol className={styles.cards} aria-label="How customers decide">
        {features.map((step, index) => {
          const stage = stages[index];
          if (!stage) return null;
          const Icon = stage.icon;
          return (
            <li key={step.title} className={styles.card} data-buyer-stage={stage.tone} data-journey-card>
              <div className={styles.glass}>
                <div className={styles.visual}>
                  <Image src={`/img/homepage/buyer-journey/${stage.image}.webp`} alt={stage.alt} fill sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) 44vw, 31vw" loading="lazy" />
                </div>
                <div className={styles.cardCopy}>
                  <div className={styles.cardTop}>
                    <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.stage}><Icon size={17} strokeWidth={1.8} aria-hidden="true" />{stage.label}</span>
                  </div>
                  <h3><Link href={stage.href} prefetch={false}>{step.title}</Link></h3>
                  <span className={styles.rule} aria-hidden="true" />
                  <p>{step.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
