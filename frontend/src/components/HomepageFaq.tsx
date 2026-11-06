import Image from "next/image";
import { homepageFaqs } from "@/data/homepage-faqs";
import PremiumFaqAccordion from "./PremiumFaqAccordion";
import styles from "./homepage-faq.module.css";

export default function HomepageFaq() {
  return (
    <section id="homepage-faq" data-home-faq className={styles.section} aria-labelledby="home-faq-heading">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Before we begin</p> {/* taste-skill-ignore: Required label in the locked reference. */}
          <h2 id="home-faq-heading">Before we begin, let’s make <em>things clear.</em></h2>
          <p className={styles.description}>Straight answers about our services, search visibility and how a project gets started.</p>
          <div className={styles.artwork} aria-hidden="true">
            <Image
              src="/img/homepage/faq/folded-qa.webp"
              alt=""
              width={900}
              height={600}
              sizes="(max-width: 767px) 290px, (max-width: 1023px) 310px, 370px"
              loading="lazy"
            />
          </div>
        </div>
        <PremiumFaqAccordion items={homepageFaqs} idPrefix="homepage-faq" />
      </div>
    </section>
  );
}
