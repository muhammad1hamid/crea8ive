import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY, qatarBusinessDescription } from "@/data/company";
export const metadata: Metadata = {
  title: { absolute: "Business Information & Transparency | Crea8iv Media" },
  description: "Current business identity, operating status and official contact details for Crea8iv Media, a Pakistan sole proprietorship serving Pakistan and Qatar.",
  alternates: { canonical: `${COMPANY.website}/company-verification/` },
};
export default function BusinessInformation() {
  return <main className="registration-page mx-auto max-w-5xl px-6 pb-24 pt-36"><p className="text-[#ff9b57]">Business information · Updated {COMPANY.updated}</p><h1 className="my-6 text-4xl font-bold">A clear business identity.</h1><p className="text-lg leading-8">{COMPANY.brandName} operates in Pakistan as a {COMPANY.pakistanEntityType}. Our former private limited company is closed. Its historical incorporation and tax certificates do not represent the current business.</p><dl className="my-10 grid gap-6 sm:grid-cols-2">{[["Brand",COMPANY.brandName],["Pakistan business form",COMPANY.pakistanEntityType],["Pakistan business address",COMPANY.pakistanBusinessAddress],["Official email",COMPANY.email],["Pakistan phone",COMPANY.pakistanPhoneDisplay]].map(([label,value])=><div key={label}><dt className="text-white/60">{label}</dt><dd className="mt-2">{value}</dd></div>)}</dl><h2 className="text-2xl">Serving Qatar</h2><p className="my-5 leading-8">{qatarBusinessDescription()}</p><p className="leading-8">For supplier onboarding, request the current contracting and invoicing details for your proposed project. No government endorsement, certification or current tax registration number is implied by this page.</p><div className="mt-8 flex flex-wrap gap-6"><a href={`mailto:${COMPANY.email}`} className="text-[#ff9b57] underline">Request business information</a><Link href="/qatar/" className="text-[#ff9b57] underline">Qatar services</Link><Link href="/contact/" className="underline">Discuss a project</Link></div></main>;
}
