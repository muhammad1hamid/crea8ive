import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import EvidenceMedia from "./EvidenceMedia";
import styles from "./portfolio-project-card.module.css";

type PortfolioProjectCardProps = {
  title: string;
  category: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageAlt: string;
  imageRatio?: number;
  href: string;
  linkLabel: string;
  external?: boolean;
};

export default function PortfolioProjectCard({ title, category, subtitle, description,
  image, imageAlt, imageRatio = 4 / 5, href, linkLabel, external = false }: PortfolioProjectCardProps) {
  return (
    <article className={styles.card} data-folder-project>
      <div className={styles.media} style={{ "--project-image-ratio": imageRatio } as CSSProperties}>
        <EvidenceMedia src={image} alt={imageAlt}
          sizes="(max-width: 639px) calc(100vw - 72px), (max-width: 1023px) 42vw, 340px"
          className={styles.image} />
      </div>
      <div className={styles.copy}>
        <p className={styles.category}>{category}</p>
        <h3>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {description && <details className={styles.details}>
          <summary>Project details</summary>
          <p className={styles.description}>{description}</p>
        </details>}
        <Link href={href} className={styles.action} target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}>
          {linkLabel}<ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
