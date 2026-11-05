import NativeMarketingPage from "@/components/pages/NativeMarketingPage";
import { nativeMetadata } from "@/components/pages/nativeMetadata";
import { nativePages } from "@/lib/native-pages";

export const metadata = nativeMetadata("patientflow");

export default function PatientFlowPage() {
  return <NativeMarketingPage page={nativePages.patientflow} />;
}

