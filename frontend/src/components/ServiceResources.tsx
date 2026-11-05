import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceResources } from "@/lib/service-resources";

export default function ServiceResources({ slug }: { slug: string }) {
  const resources = serviceResources[slug];
  if (!resources) return null;
  return (
    <section className={`${detailStyles.resources} border-y border-white/10 px-6 py-10 text-white lg:px-10`}>
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-2xl font-semibold">Guides, tools and client work</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {resources.map(resource => (
            <li key={resource.href}><Link href={resource.href} className="inline-flex min-h-11 items-center gap-2 text-white/80 hover:text-[#FF6801]">{resource.label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-6">
          <Link href="/consultation/" className="inline-flex min-h-11 items-center text-[var(--icon-color)]">Discuss strategy</Link>
          <Link href="/contact/" className="inline-flex min-h-11 items-center text-[var(--icon-color)]">Request implementation</Link>
        </div>
      </div>
    </section>
  );
}
import detailStyles from "./service-body.module.css";
