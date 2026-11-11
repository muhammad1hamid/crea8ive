import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { websitePortfolioItems } from "@/lib/website-portfolio";
import styles from "./website-portfolio-grid.module.css";
import PortfolioProjectCard from "./PortfolioProjectCard";
import folderStyles from "./portfolio-project-card.module.css";

export default function WebsitePortfolioGrid({ compact = false }: { compact?: boolean }) {
  if (compact) return <div className={folderStyles.grid}>
    {websitePortfolioItems.map(item => <PortfolioProjectCard key={item.slug}
      title={item.brand} category={item.category} subtitle={item.title} description={item.summary}
      image={item.image} imageAlt={item.imageAlt} href={item.href} linkLabel={item.linkLabel}
      imageRatio={item.slug === "buildscape" ? 720 / 500 : 4 / 5}
      external={/^https?:\/\//.test(item.href)} />)}
  </div>;
  return <div className={styles.grid}>
    {websitePortfolioItems.map((item) => {
      const external = /^https?:\/\//.test(item.href);
      return <a key={item.slug} href={item.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={styles.card}>
        <div className={styles.media}><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc((100vw - 64px) / 2), 440px" className={styles.image} /></div>
        <div className={styles.copy}>
          <p className={styles.category}>{item.category}</p>
          <h3>{item.brand}</h3>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.summary}>{item.summary}</p>
          <span className={styles.cta}>{item.linkLabel}<ArrowUpRight size={17} aria-hidden="true" /></span>
        </div>
      </a>;
    })}
  </div>;
}
