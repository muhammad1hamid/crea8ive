import type { Metadata } from "next";
import { ServiceConsultingContext } from '@/components/ConsultingContext';
import SlugPage, { generateMetadata as generateSlugMetadata } from "../[slug]/page";

const slug = "growth-systems";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default function GrowthSystemsPage() {
  return <><SlugPage params={Promise.resolve({ slug })} /><ServiceConsultingContext discipline="growth" /></>;
}
