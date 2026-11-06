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
  { label: "FIND", tone: "find", image: "01-find-brand-v2", alt: "An orange-handled magnifying lens highlights a forest-green business marker among ivory storefronts.", icon: Search, href: "/ai-search-optimization/" },
  { label: "CHECK", tone: "check", image: "02-check-brand-v2", alt: "A forest-green checkmark shield beside glass evidence tiles and an orange inspection lens.", icon: ShieldCheck, href: "/our-services/" },
  { label: "DECIDE", tone: "decide", image: "03-decide-brand-v2", alt: "A hand presses an orange confirmation button beside a green path leading to a conversation.", icon: Zap, href: "#home-how-it-connects" },
];

/** Brand-coloured conceptual artwork supports the server-rendered buyer journey. */
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
