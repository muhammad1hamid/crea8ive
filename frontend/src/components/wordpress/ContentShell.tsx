import type { ReactNode } from "react";

type ContentShellProps = {
  title?: string;
  eyebrow?: string;
  titleAs?: "h1" | "div";
  className?: string;
  children: ReactNode;
};

export default function ContentShell({ title, eyebrow, titleAs = "h1", className = "", children }: ContentShellProps) {
  const hasHeader = Boolean(title || eyebrow);
  const TitleTag = titleAs;
  return (
    // Imported pages share the theme canvas without recolouring their media.
    <div className={`brand-site-shell min-h-screen bg-transparent text-white ${className}`}>
      {hasHeader && (
        <section className="bg-gradient-to-b from-white/[0.02] to-transparent pt-24 pb-7 sm:pt-32 sm:pb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {eyebrow ? (
              <p className="lux-eyebrow mb-4">{eyebrow}</p>
            ) : null}
            {title ? (
              <TitleTag className="font-syne text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {title}
              </TitleTag>
            ) : null}
          </div>
          {/* hairline gradient divider instead of a hard border */}
          <div className="mx-auto mt-8 h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
      )}

      <section className="pb-20 pt-0">
        <div className="mx-auto max-w-[1600px] px-0">{children}</div>
      </section>
    </div>
  );
}
