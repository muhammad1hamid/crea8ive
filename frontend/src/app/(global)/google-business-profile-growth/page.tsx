import type { Metadata } from "next";
import SlugPage, { generateMetadata as generateSlugMetadata } from "../[slug]/page";

const slug = "google-business-profile-growth";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default function GoogleBusinessProfileGrowthPage() {
  return <SlugPage params={Promise.resolve({ slug })} />;
}
