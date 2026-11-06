import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import EvidenceMedia from "./EvidenceMedia";
import styles from "./homepage-creative-showcase.module.css";

type CreativeProject = { title: string; body: string; image: string; previewImage?: string; alt: string };

function CreativeProjectCard({ project, index }: { project: CreativeProject; index: number }) {
  const featured = index === 1;
  const titleId = `home-creative-project-${index}`;
  const href = index === 0 ? "/case-studies/co3-premium-liquid-shop/" : project.image;
  return <article className={styles.card} data-creative-project={index} data-featured={featured} aria-labelledby={titleId}>
    <div className={styles.media} data-artwork={index}>
      <EvidenceMedia src={project.previewImage ?? project.image} alt={project.alt} sizes="(max-width: 639px) 88vw, (max-width: 1023px) 45vw, 32vw" />
    </div>
    <div className={styles.caption}>
      <div className={styles.projectCopy}>
        <h3 id={titleId}>{project.title}</h3>
        <p>{project.body}</p>
      </div>
      <a href={href} target={index === 0 ? undefined : "_blank"} rel={index === 0 ? undefined : "noopener noreferrer"} className={styles.projectLink} aria-label={index === 0 ? `View ${project.title} case study` : `Open full ${project.title} artwork`}>
        <ArrowRight size={23} aria-hidden="true" />
      </a>
    </div>
  </article>;
}

export default function HomepageCreativeShowcase({ projects }: { projects: readonly CreativeProject[] }) {
  return <section id="home-creative-work" data-home-creative className={styles.section} aria-labelledby="home-creative-heading">
    <div className={styles.inner}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>The work</p>
          <h2 id="home-creative-heading">Brand identities, <em>campaigns</em> and content</h2>
          <p className={styles.intro}>Explore identity systems, product creative and social content made for real businesses.</p>
        </div>
        <Link href="/results/" className={styles.browse}>Browse All Work<ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
      <div className={styles.grid}>
        {projects.map((project, index) => <CreativeProjectCard key={project.title} project={project} index={index} />)}
      </div>
    </div>
  </section>;
}
