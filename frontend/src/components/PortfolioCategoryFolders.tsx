import grids from "@/data/portfolio-grid-assets.json";
import { websitePortfolioItems } from "@/lib/website-portfolio";
import WebsitePortfolioGrid from "@/components/WebsitePortfolioGrid";
import PortfolioProjectCard from "@/components/PortfolioProjectCard";
import { localCaseStudies } from "@/lib/local-case-studies";
import { resultsCollection } from "@/lib/results-portfolio";
import PortfolioFolderBrowser, { type PortfolioFolder } from "@/components/PortfolioFolderBrowser";
import styles from "./portfolio-category-folders.module.css";
import cardStyles from "./portfolio-project-card.module.css";

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
    <WebsitePortfolioGrid key="websites" compact />,
    ...categories.map(category => (
      <div className={cardStyles.grid} key={category}>
        {grids.filter(item => item.category === category).map((item, index) => {
          const image = item.optimizedSrc || item.src;
          const project = resultsCollection.find(work => work.id === item.id);
          const title = project?.title ?? (/whatsapp|^\W+$|^pp$/i.test(item.label)
            ? `${category} social grid ${index + 1}`
            : item.label);
          const categorySlug = Object.entries(localCaseStudies).find(([, study]) => study.category === category)?.[0];
          const href = project?.href ?? (categorySlug ? `/case-studies/${categorySlug}/` : image);
          return (
            <PortfolioProjectCard key={item.id} title={title} category={`${category} · Social content`}
              image={image} imageAlt={title}
              imageRatio={item.optimizedWidth / item.optimizedHeight}
              href={href}
              linkLabel={project?.href ? project.linkLabel || "View project" : categorySlug ? "Explore category" : "Open artwork"} />
          );
        })}
      </div>
    )),
  ];

  return (
    <section id="home-work-library" data-home-work className={styles.library} aria-labelledby="work-library-heading">
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
