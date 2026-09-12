import { useEffect, useRef, useState } from "react";
import {
  Phone, FileText, Paintbrush, Code2, Rocket, HeartHandshake,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const steps = [
  { icon: Phone,          title: "Discovery Call",    body: "We learn about your business, goals, and audience." },
  { icon: FileText,       title: "Proposal & Quote",  body: "Clear scope, timeline, and price — no surprises." },
  { icon: Paintbrush,     title: "Design",            body: "We design your site concept and refine it with your feedback." },
  { icon: Code2,          title: "Development",       body: "We build the site, fully responsive and optimized." },
  { icon: Rocket,         title: "Review & Launch",   body: "Final review, then your site goes live." },
  { icon: HeartHandshake, title: "Support",           body: "Ongoing maintenance keeps things running smoothly." },
];

function StepCard({ s, i }: { s: typeof steps[0]; i: number }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isRight = i % 2 === 1;

  /* Intersection → activate */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) { setActive(true); io.disconnect(); } },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Mouse-tracking spotlight */
  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.background = `radial-gradient(180px circle at ${x}px ${y}px, color-mix(in oklab, var(--teal) 18%, transparent), transparent 70%)`;
    };

    card.addEventListener("mousemove", onMove);
    return () => card.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Reveal delay={i * 100} variant={isRight ? "fade-left" : "fade-up"}>
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group relative flex items-start gap-4 overflow-hidden rounded-2xl p-6 transition-all duration-500 ${
          active ? "surface-card-glow" : "surface-card"
        } ${hovered ? "-translate-y-1.5 shadow-[0_8px_40px_-12px_color-mix(in_oklab,var(--teal)_40%,transparent)]" : ""}`}
      >
        {/* Mouse-tracking spotlight layer */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Animated border trace on hover */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-2xl border transition-all duration-500 ${
            hovered ? "border-primary/50 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--teal)_20%,transparent)]" : "border-transparent"
          }`}
        />

        {/* Step number */}
        <span
          className={`shrink-0 font-display text-[10px] font-bold tracking-widest transition-all duration-500 ${
            active || hovered ? "text-primary" : "text-muted-foreground/40"
          }`}
        >
          {String(i + 1).padStart(2, "0")}
        </span>

        {/* Icon — spins + glows on hover */}
        <span
          className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ${
            hovered
              ? "border-primary/60 bg-primary/15 text-primary shadow-[var(--neon-teal)] scale-110"
              : active
              ? "border-primary/40 bg-primary/10 text-primary shadow-[var(--neon-teal)]"
              : "border-border bg-surface text-muted-foreground"
          }`}
        >
          <s.icon
            className={`size-5 transition-transform duration-500 ${hovered ? "rotate-12 scale-110" : "rotate-0"}`}
            strokeWidth={1.8}
          />
        </span>

        {/* Text */}
        <div className="min-w-0">
          <h3
            className={`font-display text-base font-semibold leading-snug transition-colors duration-300 ${
              hovered ? "text-primary" : ""
            }`}
          >
            {s.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </div>

        {/* Shimmer sweep on hover */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ${
            hovered ? "translate-x-full" : ""
          }`}
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--teal) 8%, transparent), transparent)",
          }}
        />

        {/* Static active glow */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-700 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--teal) 6%, transparent), transparent 60%)",
          }}
        />
      </div>
    </Reveal>
  );
}

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-20" />

      {/* Vertical centre line (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18rem] hidden h-[calc(100%-22rem)] w-px -translate-x-1/2 lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--teal) 30%, transparent) 20%, color-mix(in oklab, var(--teal) 30%, transparent) 80%, transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Process"
          title={<>How We <span className="text-gradient-teal">Work</span></>}
          subtitle="A simple, transparent process from first message to live website."
        />

        {/* Mobile / tablet */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:hidden">
          {steps.map((s, i) => <StepCard key={s.title} s={s} i={i} />)}
        </div>

        {/* Desktop: two-column zigzag */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6">
          {steps.map((s, i) => (
            <div key={s.title} className={i % 2 === 1 ? "mt-10" : ""}>
              <StepCard s={s} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
