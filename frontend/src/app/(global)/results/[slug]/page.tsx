import type { Metadata } from "next";
import RedirectToResults from "@/components/RedirectToResults";
import { localCaseStudySlugs } from "@/lib/local-case-studies";
export function generateStaticParams() { return localCaseStudySlugs.map(slug=>({slug})); }
export const metadata: Metadata = {title:"Portfolio collection",alternates:{canonical:"https://crea8ivmedia.com/results/"},robots:{index:false,follow:true}};
export default function RetiredResultPost() { return <RedirectToResults />; }
