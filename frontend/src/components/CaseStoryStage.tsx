import Link from "next/link";
import { ArrowUpRight, CircleDot } from "lucide-react";
import ClientStoriesCarousel, { type ClientStory } from "./ClientStoriesCarousel";
import styles from "./case-story-stage.module.css";

export default function CaseStoryStage({ projects }: { projects: ClientStory[] }) {
  return <section id="featured-case-studies" data-home-case-story className={styles.section} aria-labelledby="home-case-studies-heading">
    <div className={styles.shell}>
      <div className={styles.header}>
        <p className={styles.eyebrow}><CircleDot size={15} aria-hidden="true" />Client stories</p>
        <h2 id="home-case-studies-heading">The work is only <em>half the story.</em></h2>
        <p className={styles.intro}>Behind every project is a business challenge. Explore what the client needed, what we worked on and how the solution came together.</p>
        <Link href="/case-studies/" className={styles.allCases}>Explore All Case Studies<ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
      <ClientStoriesCarousel
        projects={projects}
        label="Featured client projects"
        slideIdPrefix="case-story"
        selectOnHover
        showAllCases={false}
      />
    </div>
  </section>;
}
