import {
  generateServiceLandingMetadata,
  generateServiceLandingStaticParams,
  ServiceLandingRoute,
} from "@/components/ServiceLandingRoute";

const family = "content-creation" as const;

export function generateStaticParams() {
  return generateServiceLandingStaticParams(family);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return generateServiceLandingMetadata(family, await params);
}

export default async function ContentCreationLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ServiceLandingRoute family={family} params={await params} />;
}
