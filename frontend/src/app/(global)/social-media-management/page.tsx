import type { Metadata } from "next";
import ServiceRevamp from "@/components/resource/ServiceRevamp";
import { generateMetadata as generateSlugMetadata } from "../[slug]/page";
import { socialMediaContent } from "./social-media-content";

const slug = "social-media-management";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default function SocialMediaManagementPage() {
  return <ServiceRevamp config={socialMediaContent} />;
}
