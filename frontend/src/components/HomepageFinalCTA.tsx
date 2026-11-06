import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { BUSINESS_DETAILS } from "@/lib/site-config";
import FinalCtaMotion from "./FinalCtaMotion";
import styles from "./homepage-final-cta.module.css";

export default function HomepageFinalCTA() {
  const whatsappHref = `https://wa.me/${BUSINESS_DETAILS.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Crea8iv Media, I’d like to discuss a project.")}`;

  return (
    <section id="home-project-enquiry" data-home-closing className={`${styles.section} home-final-cta`} aria-labelledby="home-final-cta-title">
      <FinalCtaMotion className={styles.card}>
        <div className={styles.layout}>
          <div className={styles.copy} data-cta-reveal="copy">
            <p className={styles.eyebrow}>Let’s talk about what’s next</p>
            <h2 id="home-final-cta-title"><span className={styles.lead}>You’ve built something worth choosing.</span>{" "}<em>Let’s help people see why.</em></h2>
            <p className={styles.intro}>Tell us what you want to improve. We’ll help identify the next practical step—whether that starts with your website, visibility, campaigns or customer follow-up.</p>
          </div>
          <div className={styles.visual} data-cta-reveal="visual" aria-hidden="true">
            <Image src="/img/homepage/closing/growth-laptop.webp" alt="" width={960} height={640} sizes="(max-width: 699px) 75vw, (max-width: 1099px) 32vw, 26vw" className={styles.laptop} />
          </div>
          <div className={styles.actions} data-cta-reveal="actions">
            <p>What are you trying to improve right now?</p>
            <Link href="/contact/" prefetch={false} className={styles.primary} data-cta-reveal="button">Discuss Your Project <ArrowUpRight size={21} aria-hidden="true" /></Link>
            <a href={whatsappHref} className={styles.secondary} target="_blank" rel="noopener noreferrer" data-cta-reveal="button">WhatsApp the Team <ArrowUpRight size={21} aria-hidden="true" /></a>
          </div>
          <p className={styles.proof} data-cta-reveal="proof"><Layers size={27} strokeWidth={1.4} aria-hidden="true" /><span>Prefer to see the work first? <Link href="/case-studies/" prefetch={false}>Explore our case studies.</Link></span></p>
        </div>
      </FinalCtaMotion>
    </section>
  );
}
