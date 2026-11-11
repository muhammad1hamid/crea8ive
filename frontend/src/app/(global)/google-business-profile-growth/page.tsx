import type { Metadata } from "next";
import ServiceRevamp from "@/components/resource/ServiceRevamp";
import { generateMetadata as generateSlugMetadata } from "../[slug]/page";
import { businessProfileContent } from "./business-profile-content";

const slug = "google-business-profile-growth";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default function GoogleBusinessProfileGrowthPage() {
  return <ServiceRevamp config={businessProfileContent} />;
}
