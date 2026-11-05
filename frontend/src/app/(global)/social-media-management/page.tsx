import type { Metadata } from "next";
import SlugPage, { generateMetadata as generateSlugMetadata } from "../[slug]/page";

const slug = "social-media-management";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default function SocialMediaManagementPage() {
  return <SlugPage params={Promise.resolve({ slug })} />;
}
