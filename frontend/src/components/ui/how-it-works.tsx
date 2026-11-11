import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowDown, Handshake, Search, ShieldCheck } from "lucide-react";
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
  { id: "find", alt: "Search results and an orange location pin illustrating business discovery.", icon: Search },
  { id: "check", alt: "Five-star review cards and a verification shield illustrating customer trust.", icon: ShieldCheck },
  { id: "decide", alt: "A target, arrow and contact button illustrating a customer's decision.", icon: Handshake },
];

const journeyPath = "M80 324 C220 346 320 330 395 277 C450 236 484 227 536 257 C602 294 596 334 720 333 C806 333 841 321 877 282 C926 233 965 221 1018 258 C1084 305 1112 344 1360 324";
const imageSizes = "(min-width: 1440px) 560px, (min-width: 1024px) 38vw, (min-width: 768px) 480px, (min-width: 430px) 410px, 100vw";

/** The owner's transparent illustrations sit on a single open journey. */
export default function HowItWorks({ features, className }: HowItWorksProps) {
  return (
    <div className={cn(styles.board, className)}>
      <svg className={styles.connection} viewBox="0 0 1440 370" preserveAspectRatio="none"
        aria-hidden="true" focusable="false" data-buyer-connection>
        <path className={styles.pathGlow} d={journeyPath} pathLength="1" data-buyer-line />
        <path className={styles.pathCore} d={journeyPath} pathLength="1" data-buyer-line />
        <path className={styles.pathPulse} d={journeyPath} pathLength="1" data-buyer-pulse />
        {[480, 960].map(x => (
          <g className={styles.indicator} key={x} transform={`translate(${x} 250)`} data-buyer-indicator>
            <circle r="24" />
            <path d="M-8 0H8M1-7L8 0L1 7" />
          </g>
        ))}
      </svg>
      <ol className={styles.steps} aria-label="How customers decide">
        {features.map((step, index) => {
          const stage = stages[index];
          if (!stage) return null;
          const Icon = stage.icon;
          const imageBase = `/img/homepage/buyer-journey/cinematic-${stage.id}`;
          return (
            <li key={stage.id} className={styles.step} data-buyer-stage={stage.id} data-buyer-entrance={index}>
              <div className={styles.visual}>
                <picture className={styles.artwork}>
                  <source type="image/webp" sizes={imageSizes}
                    srcSet={`${imageBase}-640.webp 640w, ${imageBase}-960.webp 960w, ${imageBase}-1200.webp 1200w`} />
                  <Image src={`${imageBase}-960.webp`} alt={stage.alt} width={960} height={720}
                    sizes={imageSizes} loading="lazy" />
                </picture>
              </div>
              <div className={styles.stepTitle}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
              </div>
              <div className={styles.stepCopy}>
                <span className={styles.supportIcon} aria-hidden="true"><Icon size={23} strokeWidth={1.8} /></span>
                <p>{step.description}</p>
              </div>
              {index < stages.length - 1 && (
                <div className={styles.verticalConnection} aria-hidden="true" data-buyer-connection>
                  <svg viewBox="0 0 52 72" focusable="false">
                    <path className={styles.pathGlow} d="M26 2C8 20 44 46 26 70" pathLength="1" data-buyer-line />
                    <path className={styles.pathCore} d="M26 2C8 20 44 46 26 70" pathLength="1" data-buyer-line />
                  </svg>
                  <span className={styles.downArrow} data-buyer-indicator><ArrowDown size={17} /></span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
