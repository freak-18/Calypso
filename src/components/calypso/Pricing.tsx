import { ArrowRight, Check } from "lucide-react";
import { CtaLink } from "./Cta";
import { Reveal, SectionHeading } from "./Reveal";

const rows = [
  { pkg: "Starter Website", best: "New businesses needing an online presence", price: "On request", hot: false },
  { pkg: "Business Website", best: "Growing businesses needing credibility", price: "On request", hot: true },
  { pkg: "Premium Website", best: "Businesses wanting a custom experience", price: "On request", hot: false },
  { pkg: "E-Commerce", best: "Businesses ready to sell online", price: "On request", hot: false },
  { pkg: "Maintenance", best: "Ongoing site care", price: "On request / month", hot: false },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={<>Packages & <span className="text-gradient-teal">Pricing</span></>}
          subtitle="Transparent pricing based on the value your website delivers."
        />

        <Reveal delay={100} variant="flip">
          <div className="surface-card mt-14 overflow-hidden rounded-[2rem]">
            <div className="hidden grid-cols-[1.1fr_1.6fr_0.9fr] gap-4 border-b border-border/60 px-8 py-5 font-display text-[11px] tracking-[0.22em] uppercase text-muted-foreground sm:grid">
              <span>Package</span>
              <span>Best For</span>
              <span className="text-right">Starting At</span>
            </div>

            {rows.map((r, i) => (
              <Reveal key={r.pkg} delay={i * 60}>
                <div
                  className={`group relative grid gap-2 border-b border-border/40 px-8 py-6 transition-all duration-400 last:border-0 sm:grid-cols-[1.1fr_1.6fr_0.9fr] sm:items-center sm:gap-4 ${
                    r.hot
                      ? "bg-primary/5 border-l-2 border-l-primary"
                      : "hover:bg-surface/60"
                  }`}
                >
                  {/* Shimmer on hover */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <div className="flex items-center gap-3">
                    {r.hot && <Check className="size-4 shrink-0 text-primary" strokeWidth={2.5} />}
                    <p className={`font-display text-base font-semibold ${r.hot ? "text-primary" : ""}`}>{r.pkg}</p>
                    {r.hot && (
                      <span className="rounded-full bg-coral/15 px-2 py-0.5 font-display text-[9px] tracking-widest uppercase text-coral">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{r.best}</p>
                  <p className={`font-display text-sm font-semibold sm:text-right ${r.hot ? "text-gradient-teal" : "text-primary"}`}>
                    {r.price}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-8 flex flex-col items-center gap-6 text-center">
            <p className="max-w-2xl text-sm text-muted-foreground">
              All packages include hosting setup guidance, mobile optimization, and a free consultation call.
            </p>
            <CtaLink href="#contact">
              Get a Custom Quote
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
