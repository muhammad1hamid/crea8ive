const steps = [
  ["01", "Discover", "We find the opportunity hiding inside your market, audience, and offer."],
  ["02", "Position", "We create a point of view your best customers can understand and remember."],
  ["03", "Activate", "We connect creative, media, search, and conversion into one operating system."],
  ["04", "Scale", "We keep what works, remove what does not, and compound the advantage."],
] as const;

export default function LuxuryProcess() {
  return (
    <section className="luxury-process bg-[#f1ece5] px-6 py-20 text-[#17120f] sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow eyebrow-dark">Our approach</p>
            <h2 className="mt-4 max-w-md font-syne text-4xl leading-[0.98] sm:text-6xl">Quietly rigorous. Visibly effective.</h2>
          </div>
          <div className="grid sm:grid-cols-2">
            {steps.map(([number, title, copy]) => (
              <div key={number} className="border-t border-[#17120f]/15 py-7 sm:px-7 sm:first:pl-0 sm:nth-child(odd):border-r">
                <p className="text-xs font-semibold tracking-[0.18em] text-[#FF6801]">{number}</p>
                <h3 className="mt-7 font-syne text-2xl">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#17120f]/65">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
