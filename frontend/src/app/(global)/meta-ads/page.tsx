import type { Metadata } from "next";
import ServiceRevamp from "@/components/resource/ServiceRevamp";
import { metaAdsContent } from "./meta-ads-content";
import { generateMetadata as generateSlugMetadata } from "../[slug]/page";
import styles from "./meta-ads.module.css";

const slug = "meta-ads";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default function MetaAdsPage() {
  return <ServiceRevamp config={metaAdsContent} className={styles.page} />;
}
