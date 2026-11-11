import type { Metadata } from "next";
import { CreativeShowcase } from "@/components/HomepageCreativeShowcase";
import ServiceRevamp from "@/components/resource/ServiceRevamp";
import { generateMetadata as generateSlugMetadata } from "../[slug]/page";
import { brandingContent, identityProjects } from "./branding-content";

const slug = "branding-and-creative";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default function BrandingAndCreativePage() {
  return (
    <ServiceRevamp config={brandingContent} featuredWork={
      <CreativeShowcase
        id="branding-work"
        headingId="branding-work-title"
        eyebrow="Selected brand work"
        heading={<>See the identity <em>in use.</em></>}
        intro="Explore visual systems created for a drinks brand, a dental clinic and an interiors studio."
        projects={identityProjects}
      />
    } />
  );
}
