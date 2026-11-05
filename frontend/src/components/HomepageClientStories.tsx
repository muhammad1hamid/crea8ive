import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { homepageCaseStudies } from "@/lib/case-study-showcase";
import ClientStoriesCarousel, { type ClientStory } from "./ClientStoriesCarousel";
import styles from "./client-stories.module.css";

const projectScreens: Record<string, { src: string; alt: string; width: number; height: number }> = {
  buildscape: {
    src: "/img/portfolio/websites/buildscape/buildscape-production-desktop-20260927.webp",
    alt: "Buildscape construction and architecture website homepage",
    width: 1440,
    height: 1000,
  },
  "home-studio-interiors": {
    src: "/img/case-studies/home-studio-interiors/proof/home-studio-live-desktop-2026.webp",
    alt: "Home Studio Interiors website with its interior design portfolio and services",
    width: 1600,
    height: 866,
  },
  "black-petals": {
    src: "/img/case-studies/black-petals/black-petals-live-desktop.webp",
    alt: "Black Petals flower shop website with its floral collection",
    width: 2852,
    height: 1538,
  },
};

export default function HomepageClientStories() {
  const projects: ClientStory[] = homepageCaseStudies.map(study => ({
    id: study.id,
    name: study.name,
    industry: study.industry,
    description: study.eyebrow,
    image: projectScreens[study.id]?.src ?? study.image,
    imageAlt: projectScreens[study.id]?.alt ?? study.imageAlt,
    imageWidth: projectScreens[study.id]?.width ?? 1440,
    imageHeight: projectScreens[study.id]?.height ?? 900,
    caseStudyHref: study.primaryHref,
    liveHref: study.secondaryHref,
  }));

  return (
    <section id="home-client-stories" data-home-stories className={styles.section} aria-labelledby="home-evidence-heading">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Client project evidence</p>
          <h2 id="home-evidence-heading">Don’t just take <em>our word</em> for it.</h2>
          <p className={styles.lead}>Explore the projects, see the scope and inspect the work for yourself.</p>
        </div>
        <ClientStoriesCarousel projects={projects} />
        <noscript>
          <ul className={styles.fallback}>
            {projects.map(project => (
              <li key={project.id}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <Link href={project.caseStudyHref}>Read Case Study <ArrowUpRight size={16} aria-hidden="true" /></Link>
                {project.liveHref && <a href={project.liveHref} target="_blank" rel="noopener noreferrer">View Live Website <ArrowUpRight size={16} aria-hidden="true" /></a>}
              </li>
            ))}
          </ul>
        </noscript>
      </div>
    </section>
  );
}
