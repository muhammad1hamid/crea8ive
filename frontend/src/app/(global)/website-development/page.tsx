import type { Metadata } from "next";
import SlugPage, { generateMetadata as generateSlugMetadata } from "../[slug]/page";

const slug = "website-development";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default function WebsiteDevelopmentPage() {
  return <SlugPage params={Promise.resolve({ slug })} />;
}
