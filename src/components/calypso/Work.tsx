import { ArrowUpRight } from "lucide-react";
import cmc from "@/assets/work-cmc.jpg";
import zivon from "@/assets/work-zivon.jpg";
import { Reveal, SectionHeading, useTilt } from "./Reveal";

const projects = [
  {
    name: "CMC Elevators",
    category: "Business Website",
    summary: "A professional, trust-building website for an elevator company — designed to convert enquiries from property developers and facility managers.",
    image: cmc,
    accent: "var(--teal)",
  },
  {
    name: "ZIVON",
    category: "Brand Website",
    summary: "A modern digital identity built to position ZIVON as a credible, forward-thinking brand in its industry.",
    image: zivon,
    accent: "var(--coral)",
  },
];

function ProjectCard({ p, i }: { p: typeof projects[0]; i: number }) {
  const tiltRef = useTilt(5);

  return (
    <Reveal delay={i * 120} variant="fade-up">
      <article
        ref={tiltRef}
        className="group surface-card relative h-full overflow-hidden rounded-[2rem] transition-all duration-500 hover:border-primary/25"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative overflow-hidden">
          <img
            src={p.image}
            alt={`${p.name} website by Calypso`}
            loading="lazy"
            width={1200}
            height={900}
            className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-108 sm:h-80"
            style={{ transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)" }}
          />
          {/* Overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `linear-gradient(to bottom, transparent 40%, color-mix(in oklab, ${p.accent} 30%, transparent))` }}
          />
          <span
            className="absolute top-5 left-5 rounded-full border px-3 py-1 font-display text-[10px] tracking-[0.18em] uppercase backdrop-blur-md transition-all duration-300 group-hover:scale-105"
            style={{
              borderColor: `color-mix(in oklab, ${p.accent} 40%, transparent)`,
              background: `color-mix(in oklab, ${p.accent} 12%, oklch(0.10 0.04 258 / 0.7))`,
              color: p.accent,
            }}
          >
            {p.category}
          </span>
        </div>

        <div className="p-7">
          <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-primary">{p.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
          >
            View Case Study
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title={<>Our <span className="text-gradient-teal">Work</span></>}
          subtitle="A look at the digital presences we've built."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
