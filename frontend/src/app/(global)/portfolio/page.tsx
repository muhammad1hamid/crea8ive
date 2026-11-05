import type { Metadata } from "next";
import RedirectToResults from "@/components/RedirectToResults";

export const metadata: Metadata = {
  title: { absolute: "Portfolio moved to Results | Crea8iv Media" },
  description: "Crea8iv Media portfolio is now organized under the Results archive with real client assets and category proof.",
  alternates: { canonical: "https://crea8ivmedia.com/results/" },
  robots: { index: false, follow: true },
};

export default function PortfolioPage() {
  return <RedirectToResults />;
}
