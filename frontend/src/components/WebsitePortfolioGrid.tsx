import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { websitePortfolioItems } from "@/lib/website-portfolio";
import styles from "./website-portfolio-grid.module.css";

export default function WebsitePortfolioGrid() {
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
