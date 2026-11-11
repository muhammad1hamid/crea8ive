import Link from "next/link";
import { ArrowUpRight, CircleDot } from "lucide-react";
import CarouselStacked from "./ui/carousel-07";
import styles from "./case-story-stage.module.css";

type StoryProject = {
  id: string; name: string; category: string; status: string; description: string;
  caseHref: string; liveHref?: string;
  screen: { src: string; alt: string; width: number; height: number };
};

export default function CaseStoryStage({ projects }: { projects: StoryProject[] }) {
  return <section id="featured-case-studies" data-home-case-story className={styles.section} aria-labelledby="home-case-studies-heading">
    <div className={styles.shell}>
      <div className={styles.header}>
        <p className={styles.eyebrow}><CircleDot size={15} aria-hidden="true" />Client stories</p>
        <h2 id="home-case-studies-heading">The work is only <em>half the story.</em></h2>
        <p className={styles.intro}>Behind every project is a business challenge. Explore what the client needed, what we worked on and how the solution came together.</p>
        <Link href="/case-studies/" className={styles.allCases}>Explore All Case Studies<ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
      <CarouselStacked slides={projects.map(project => ({
        id: project.id, title: project.name, badge: project.category.split(" · ")[0], image: project.screen,
        content: <div className={styles.information}>
          <div className={styles.summary}>
            <p className={styles.category}>{project.category}</p>
            <p className={styles.status}>{project.status}</p>
            <p className={styles.description}>{project.description}</p>
          </div>
          <div className={styles.actions}>
            <Link href={project.caseHref} className={styles.caseLink}>Case Study<ArrowUpRight size={17} aria-hidden="true" /></Link>
            {project.liveHref && <a href={project.liveHref} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>View Website<ArrowUpRight size={17} aria-hidden="true" /></a>}
          </div>
        </div>,
      }))} />
    </div>
  </section>;
}
