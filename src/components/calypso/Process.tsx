import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHeading } from "./Reveal";

const steps = [
  { title: "Discovery Call", body: "We learn about your business, goals, and audience." },
  { title: "Proposal & Quote", body: "Clear scope, timeline, and price — no surprises." },
  { title: "Design", body: "We design your site concept and refine it with your feedback." },
  { title: "Development", body: "We build the site, fully responsive and optimized." },
  { title: "Review & Launch", body: "Final review, then your site goes live." },
  { title: "Support", body: "Ongoing maintenance keeps things running smoothly." },
];

function StepCard({ s, i }: { s: typeof steps[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) setActive(true); },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Reveal delay={i * 90} variant="fade-up">
      <div ref={ref} className="group relative h-full">
        <div
          className={`relative z-10 inline-flex size-12 items-center justify-center rounded-full border font-display text-sm font-bold transition-all duration-700 ${
            active
              ? "border-primary bg-primary text-primary-foreground shadow-[var(--neon-teal)]"
              : "border-border bg-background text-muted-foreground"
          }`}
        >
          {String(i + 1).padStart(2, "0")}
        </div>

        <div
          className={`mt-5 rounded-2xl p-5 transition-all duration-500 ${
            active ? "surface-card-glow" : "surface-card"
          }`}
        >
          <h3 className="font-display text-base font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </div>

        {/* Connector dot */}
        <div
          className={`absolute top-6 left-6 -z-10 h-px transition-all duration-1000 ${
            active ? "bg-primary/40" : "bg-border"
          }`}
          style={{ width: "calc(100% + 1.25rem)" }}
        />
      </div>
    </Reveal>
  );
}

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-20" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Process"
          title={<>How We <span className="text-gradient-teal">Work</span></>}
          subtitle="A simple, transparent process from first message to live website."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map((s, i) => <StepCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
