import Link from "next/link";
import { COMPANY } from "@/data/company";
export default function RegistrationTrust() {
  return <aside aria-label="Business information" className="border-y border-[#FF6801]/20 bg-[#0a0a0c] px-6 py-5 text-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm"><p><strong>{COMPANY.brandName}</strong> · Pakistan {COMPANY.pakistanEntityType}</p><Link href="/company-verification/" className="inline-flex min-h-11 items-center text-[#ff9b57] underline">Current business information →</Link></div></aside>;
}
