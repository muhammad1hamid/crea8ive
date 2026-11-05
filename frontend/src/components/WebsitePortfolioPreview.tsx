import Link from "next/link";
import PortfolioCategoryFolders from "@/components/PortfolioCategoryFolders";
import EvidenceMedia from "@/components/EvidenceMedia";
import { websitePortfolioItems } from "@/lib/website-portfolio";
import { ArrowUpRight, Check } from "lucide-react";
import styles from "./website-portfolio-preview.module.css";
export default function WebsitePortfolioPreview() {
  const featured = websitePortfolioItems.find(project => project.slug === "buildscape")!;
  return <section id="home-selected-work" data-home-work className={`${styles.section} home-website-proof`} aria-labelledby="website-proof-heading">
    <div className={styles.inner}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>The work</p>
          <h2 id="website-proof-heading">Made to stand out. Built to mean something.</h2>
        </div>
        <div className={styles.intro}>
          <p>
            Browse real websites, identities and creative work designed to make businesses clearer, more credible and easier to remember.
          </p>
        <div className={styles.links}>
          <Link href="/results/">Browse All Work →</Link>
          <Link href="/website-portfolio/" aria-label="Explore Crea8iv Media website portfolio">View Website Portfolio →</Link>
        </div>
        </div>
      </div>
      <article className={styles.featured} data-featured-project={featured.slug}>
        <div className={styles.frame}>
          <div className={styles.media}>
            <EvidenceMedia src="/img/portfolio/websites/buildscape/buildscape-production-desktop-20260927.webp" alt={featured.imageAlt} sizes="(max-width: 767px) 92vw, 55vw" />
          </div>
        </div>
        <div className={styles.copy}>
          <p className={styles.category}>{featured.category}</p>
          <h3>{featured.brand}</h3>
          <p>{featured.summary}</p>
          <ul>{featured.services.map(service => <li key={service}><Check size={17} aria-hidden="true" />{service}</li>)}</ul>
          <Link href={featured.href} className={styles.caseLink}>{featured.linkLabel}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </article>
    </div>
    <PortfolioCategoryFolders />
  </section>;
}
