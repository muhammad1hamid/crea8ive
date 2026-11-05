import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import styles from "./notched-project-card.module.css";

export interface NotchedProjectCardProps {
  href: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  badge?: string;
  tags?: string[];
  screen?: { src: string; alt: string; className?: string };
  dim?: number;
  monochrome?: boolean;
  surface?: string;
  accent?: string;
  accentForeground?: string;
  className?: string;
}

/** A linked editorial cover with a rounded corner cutout for its action. */
export function NotchedProjectCard({
  href,
  title,
  description,
  image,
  imageAlt = "",
  badge,
  tags = [],
  screen,
  dim = screen ? 0.45 : 0,
  monochrome = false,
  surface = "#181818",
  accent = "#ff6801",
  accentForeground = "#130902",
  className,
}: NotchedProjectCardProps) {
  const cardStyle = {
    "--notch-surface": surface,
    "--card-accent": accent,
    "--card-accent-foreground": accentForeground,
  } as CSSProperties;

  return (
    <Link href={href} className={cn(styles.card, className)} style={cardStyle}>
      <span className={styles.coverFrame}>
        <span className={styles.cover}>
          <Image
            src={image}
            alt={screen ? "" : imageAlt}
            fill
            sizes="(max-width: 699px) calc(100vw - 48px), (max-width: 1099px) calc((100vw - 88px) / 2), 420px"
            className={cn(styles.image, monochrome && styles.monochrome)}
            loading="lazy"
          />
          {dim > 0 && <span className={styles.wash} style={{ backgroundColor: `rgb(0 0 0 / ${Math.min(1, Math.max(0, dim))})` }} aria-hidden="true" />}
          {screen && <span className={styles.screenFrame}><Image src={screen.src} alt={screen.alt} fill sizes="(max-width: 699px) 70vw, 340px" className={cn(styles.screen, screen.className)} loading="lazy" /></span>}
          {badge && <span className={styles.badge}>{badge}</span>}
        </span>
        <span className={styles.notch} aria-hidden="true" />
        <span className={styles.filletTop} aria-hidden="true" />
        <span className={styles.filletLeft} aria-hidden="true" />
        <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={24} strokeWidth={1.8} /></span>
      </span>
      <div className={styles.copy}>
        {tags.length > 0 && <span className={styles.tags}>{tags.map((tag) => <span key={tag}>{tag}</span>)}</span>}
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </Link>
  );
}

export default NotchedProjectCard;
