import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="lux-eyebrow mb-6">Page not found</p>
      <h1 className="font-orbitron text-[clamp(5rem,18vw,11rem)] font-bold leading-none tracking-normal text-transparent bg-clip-text bg-molten drop-shadow-[0_0_40px_rgba(255,104,1,0.35)]">
        404
      </h1>
      <p className="mt-4 max-w-md font-inter text-white/60">
        The page you&apos;re looking for has moved or never existed. Let&apos;s get you
        back to building your growth system.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button href="/" variant="solid" size="lg">
          Back to Home
        </Button>
        <Button href="/contact" variant="primary" size="lg">
          Book a Call
        </Button>
      </div>
    </section>
  );
}
