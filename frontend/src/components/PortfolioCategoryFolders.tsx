import grids from "@/data/portfolio-grid-assets.json";
import { websitePortfolioItems } from "@/lib/website-portfolio";
import WebsitePortfolioGrid from "@/components/WebsitePortfolioGrid";
import EvidenceMedia from "@/components/EvidenceMedia";
import PortfolioFolderBrowser, { type PortfolioFolder } from "@/components/PortfolioFolderBrowser";
import styles from "./portfolio-category-folders.module.css";

export default function PortfolioCategoryFolders() {
  const categories = ["E Commerce", "Health Clinics", "Interiors & Architects", "Restaurants"];
  const icons = ["commerce", "health", "interiors", "food"] as const;
  const folders: PortfolioFolder[] = [
    {
      id: "websites",
      label: "Websites",
      countLabel: `${websitePortfolioItems.length} websites`,
      images: websitePortfolioItems.slice(0, 3).map(item => item.image),
      icon: "websites",
      tone: "warm",
    },
    ...categories.map<PortfolioFolder>((category, index) => {
      const items = grids.filter(item => item.category === category);
      // Named client showcases make the category previews easier to recognise.
      const previews = [...items].sort((a, b) =>
        Number(b.id.startsWith("client-social-showcases")) - Number(a.id.startsWith("client-social-showcases"))
      );
      return {
        id: `creative-${index}`,
        label: category,
        countLabel: `${items.length} social grids`,
        images: previews.slice(0, 3).map(item => item.optimizedSrc || item.src),
        icon: icons[index],
        tone: index % 2 === 0 ? "green" : "warm",
      };
    }),
  ];

  const galleries = [
    <WebsitePortfolioGrid key="websites" />,
    ...categories.map(category => (
      <div className={styles.gallery} key={category}>
        {grids.filter(item => item.category === category).map((item, index) => {
          const image = item.optimizedSrc || item.src;
          const title = /whatsapp|^\W+$|^pp$/i.test(item.label)
            ? `${category} social grid ${index + 1}`
            : item.label;
          return (
            <figure className={styles.gridCard} key={item.id}>
              <div className={styles.gridImage}>
                <EvidenceMedia src={image} alt={title} sizes="(max-width: 639px) 85vw, (max-width: 1023px) 40vw, 340px" />
              </div>
              <figcaption>
                <strong>{title}</strong>
                <span>{category} · Social content</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    )),
  ];

  return (
    <section id="home-work-library" className={styles.library} aria-labelledby="work-library-heading">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>WORK LIBRARY</p>
          <h3 id="work-library-heading">Explore work <em>by category</em></h3>
          <p className={styles.hint}>Open a folder to explore the work inside.</p>
        </div>
        <PortfolioFolderBrowser folders={folders} galleries={galleries} />
      </div>
    </section>
  );
}
