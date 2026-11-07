import type { Metadata } from "next";
import { ServiceConsultingContext } from '@/components/ConsultingContext';
import SlugPage, { generateMetadata as generateSlugMetadata } from "../[slug]/page";
import styles from "./growth-systems.module.css";

const slug = "growth-systems";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default function GrowthSystemsPage() {
  return (
    <div className={styles.page}>
      <SlugPage params={Promise.resolve({ slug })} />
      <div className={styles.consultation}>
        <ServiceConsultingContext discipline="growth" />
      </div>
    </div>
  );
}
