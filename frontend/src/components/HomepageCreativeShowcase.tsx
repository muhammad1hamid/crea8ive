import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import EvidenceMedia from "./EvidenceMedia";
import styles from "./homepage-creative-showcase.module.css";

type CreativeProject = { title: string; body: string; image: string; previewImage?: string; alt: string };
type LinkedCreativeProject = CreativeProject & { href: string; linkLabel: string; external?: boolean };

function CreativeProjectCard({ project, index, idPrefix }: { project: LinkedCreativeProject; index: number; idPrefix: string }) {
  const featured = index === 1;
  const titleId = `${idPrefix}-${index}`;
  return <article className={styles.card} data-creative-project={index} data-featured={featured} aria-labelledby={titleId}>
    <div className={styles.media} data-artwork={index}>
      <EvidenceMedia src={project.previewImage ?? project.image} alt={project.alt} sizes="(max-width: 639px) 88vw, (max-width: 1023px) 45vw, 32vw" />
    </div>
    <div className={styles.caption}>
      <div className={styles.projectCopy}>
        <h3 id={titleId}>{project.title}</h3>
        <p>{project.body}</p>
      </div>
      <a href={project.href} target={project.external ? "_blank" : undefined} rel={project.external ? "noopener noreferrer" : undefined} className={styles.projectLink} aria-label={project.linkLabel}>
        <ArrowRight size={23} aria-hidden="true" />
      </a>
    </div>
  </article>;
}

export default function HomepageCreativeShowcase({ projects }: { projects: readonly CreativeProject[] }) {
  return <CreativeShowcase
    id="home-creative-work"
    headingId="home-creative-heading"
    eyebrow="The work"
    heading={<>Brand identities, <em>campaigns</em> and content</>}
    intro="Explore identity systems, product creative and social content made for real businesses."
    projects={projects.map((project, index) => ({
      ...project,
      href: index === 0 ? "/case-studies/co3-premium-liquid-shop/" : project.image,
      external: index !== 0,
      linkLabel: index === 0 ? `View ${project.title} case study` : `Open full ${project.title} artwork`,
    }))}
  />;
}

export function CreativeShowcase({ id, headingId, eyebrow, heading, intro, projects, className }: {
  id: string;
  headingId: string;
  eyebrow: string;
  heading: ReactNode;
  intro: string;
  projects: readonly LinkedCreativeProject[];
  className?: string;
}) {
  return <section id={id} data-home-creative={id === "home-creative-work" ? true : undefined} className={className ? `${styles.section} ${className}` : styles.section} aria-labelledby={headingId}>
    <div className={styles.inner}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={headingId}>{heading}</h2>
          <p className={styles.intro}>{intro}</p>
        </div>
        <Link href="/results/" className={styles.browse}>Browse All Work<ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
      <div className={styles.grid}>
        {projects.map((project, index) => <CreativeProjectCard key={project.title} project={project} index={index} idPrefix={id === "home-creative-work" ? "home-creative-project" : `${id}-project`} />)}
      </div>
    </div>
  </section>;
}
