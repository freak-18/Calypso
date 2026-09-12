import { Target, Layers, Timer, MessagesSquare, HeartHandshake } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const reasons = [
  { icon: Target, title: "Built for Business, Not Just for Looks", body: "Every design decision is made to drive enquiries, not just win design awards." },
  { icon: Layers, title: "Technical + Creative, Under One Roof", body: "Design, development, and strategy come from one team. No vendor juggling." },
  { icon: Timer, title: "Fast, Transparent Process", body: "Clear timelines, clear pricing, no scope surprises. Ever." },
  { icon: MessagesSquare, title: "We Speak Business, Not Just Code", body: "We translate your goals into a site that actually performs." },
  { icon: HeartHandshake, title: "Ongoing Partnership", body: "We don't disappear after launch. Maintenance and support keep your site working long-term." },
];

export function Why() {
  return (
    <section id="why" className="relative overflow-hidden py-24 sm:py-32">
      {/* Liquid blob */}
      <div
        aria-hidden="true"
        className="liquid-blob pointer-events-none absolute left-[-10%] top-1/2 -z-10 size-[40rem] -translate-y-1/2 opacity-[0.06]"
        style={{ background: "var(--color-primary)", filter: "blur(40px)" }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Why Calypso"
              title={<>Why Businesses <span className="text-gradient-teal">Choose Us</span></>}
              subtitle="Calypso is not a cheap freelancer — it's a digital partner that turns your brand into a revenue-generating online presence."
            />
            <Reveal delay={120}>
              <div className="mt-9 grid grid-cols-2 gap-4">
                {[
                  { k: "One team", v: "Design + Dev + Strategy" },
                  { k: "Value-priced", v: "Not billed by the hour" },
                ].map((x) => (
                  <div key={x.k} className="surface-card-glow group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
                    <p className="font-display text-base font-semibold text-primary">{x.k}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{x.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 70} variant="fade-left">
                <div className="group surface-card relative flex items-start gap-5 overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:translate-x-2 hover:border-primary/30">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "linear-gradient(90deg, color-mix(in oklab, var(--teal) 6%, transparent), transparent)" }}
                  />
                  <span className="relative mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[var(--neon-teal)]">
                    <r.icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <div className="relative">
                    <h3 className="text-lg font-semibold">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                  </div>
                  <span className="relative ml-auto hidden font-display text-xs font-bold text-primary/20 transition-colors duration-300 group-hover:text-primary/60 sm:block">
                    0{i + 1}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
