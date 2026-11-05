"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function RedirectToResults({ destination = "/results/" }: { destination?: string }) {
  useEffect(() => {
    window.location.replace(destination);
  }, [destination]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-center text-white">
      <div className="max-w-xl">
        <p className="font-orbitron text-[11px] uppercase tracking-[0.22em] text-[#FF6801]">Portfolio moved</p>
        <h1 className="mt-4 font-orbitron text-4xl font-semibold uppercase leading-tight sm:text-5xl">
          Opening the real portfolio archive.
        </h1>
        <p className="mt-5 text-sm leading-6 text-white/58">
          We now keep portfolio and proof in one stronger place, using the actual Crea8iv asset archive.
        </p>
        <Link
          href={destination}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-[#FF6801]/42 bg-[#FF6801]/10 px-5 py-3 font-orbitron text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#FF6801] hover:text-black"
        >
          View Results <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
