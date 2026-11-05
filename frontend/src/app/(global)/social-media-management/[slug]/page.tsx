import {
  generateServiceLandingMetadata,
  generateServiceLandingStaticParams,
  ServiceLandingRoute,
} from "@/components/ServiceLandingRoute";

const family = "social-media-management" as const;

export function generateStaticParams() {
  return generateServiceLandingStaticParams(family);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return generateServiceLandingMetadata(family, await params);
}

export default async function SocialMediaManagementLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ServiceLandingRoute family={family} params={await params} />;
}
