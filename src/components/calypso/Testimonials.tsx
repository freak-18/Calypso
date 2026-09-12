import { Quote } from "lucide-react";
import { Reveal, SectionHeading, useTilt } from "./Reveal";

const quotes = [
  {
    text: "Calypso gave our business a website that actually feels like us. Enquiries went up almost immediately.",
    name: "Client Name",
    company: "Company",
    accent: "var(--teal)",
  },
  {
    text: "Professional, fast, and easy to work with. They understood exactly what we needed.",
    name: "Client Name",
    company: "Company",
    accent: "var(--coral)",
  },
];

function QuoteCard({ q, i }: { q: typeof quotes[0]; i: number }) {
  const tiltRef = useTilt(6);

  return (
    <Reveal delay={i * 120} variant="scale">
      <figure
        ref={tiltRef}
        className="surface-card group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-primary/25 sm:rounded-[2rem] sm:p-9"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle, color-mix(in oklab, ${q.accent} 25%, transparent), transparent)` }}
        />

        <Quote
          className="size-10 transition-all duration-500 group-hover:scale-110"
          style={{ color: `color-mix(in oklab, ${q.accent} 50%, transparent)` }}
          strokeWidth={1.5}
        />

        <blockquote className="mt-6 font-display text-xl leading-snug">
          "{q.text}"
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-3 border-t border-border/60 pt-6">
          <span
            className="inline-flex size-10 items-center justify-center rounded-full font-display text-sm font-bold transition-all duration-300 group-hover:scale-110"
            style={{
              background: `color-mix(in oklab, ${q.accent} 18%, transparent)`,
              color: q.accent,
            }}
          >
            {q.name.charAt(0)}
          </span>
          <span className="text-sm">
            <span className="block font-semibold">{q.name}</span>
            <span className="text-muted-foreground">{q.company}</span>
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={<>What Clients <span className="text-gradient-teal">Say</span></>}
        />
        <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-2">
          {quotes.map((q, i) => <QuoteCard key={i} q={q} i={i} />)}
        </div>
      </div>
    </section>
  );
}
