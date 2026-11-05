const proofCards = [
  {
    label: "Proof source",
    title: "First-party case studies",
    body: "Results, portfolio assets, service pages, and live project screenshots now carry the trust layer without expired embeds.",
  },
  {
    label: "Local confidence",
    title: "Rawalpindi and Islamabad focus",
    body: "The website reinforces local market context, service relevance, and clear WhatsApp contact paths for qualified leads.",
  },
  {
    label: "Buyer clarity",
    title: "Trust before the click",
    body: "Every major page is shaped around proof, process, outcomes, and a practical next step instead of empty review widgets.",
  },
] as const;

export default function GoogleReviewsShowcase() {
  return (
    <section className="relative left-1/2 mt-6 w-[min(1120px,calc(100vw-24px))] -translate-x-1/2 overflow-hidden rounded-[26px] border border-[#FF6801]/20 bg-white/[0.04] p-3 shadow-[0_24px_70px_-50px_rgba(255,104,1,0.65)] sm:w-[min(1120px,calc(100vw-40px))] sm:p-4">
      <div className="grid gap-3 md:grid-cols-3">
        {proofCards.map((card) => (
          <article key={card.title} className="rounded-[20px] border border-white/10 bg-[#090706] p-5">
            <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6801]">{card.label}</p>
            <h3 className="mt-3 font-syne text-xl leading-tight text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
