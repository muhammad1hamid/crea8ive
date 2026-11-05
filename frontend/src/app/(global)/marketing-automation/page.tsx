import type { Metadata } from "next";
import { ServiceConsultingContext } from '@/components/ConsultingContext';
import StrategicGrowthPage from "@/components/strategic/StrategicGrowthPage";
import { getPageUrl, marketingAutomationPage } from "@/lib/growth-pages";

export const metadata: Metadata = {
  title: { absolute: marketingAutomationPage.title },
  description: marketingAutomationPage.description,
  alternates: { canonical: getPageUrl(marketingAutomationPage.slug) },
  openGraph: {
    title: marketingAutomationPage.title,
    description: marketingAutomationPage.description,
    url: getPageUrl(marketingAutomationPage.slug),
    type: "website",
  },
};

export default function MarketingAutomationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Marketing Automation",
    description: marketingAutomationPage.description,
    url: getPageUrl(marketingAutomationPage.slug),
    provider: { "@type": "Organization", name: "Crea8iv Media", url: "https://crea8ivmedia.com/" },
    areaServed: ["Rawalpindi", "Islamabad", "Pakistan"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <StrategicGrowthPage page={marketingAutomationPage} />
      <ServiceConsultingContext discipline="automation" />
    </>
  );
}
