import {
  Rocket, Building2, Sparkles, ShoppingCart,
  ShieldCheck, Globe, Puzzle, Check, ArrowUpRight,
} from "lucide-react";
import { Reveal, SectionHeading, useTilt } from "./Reveal";
import { setSelectedService } from "@/lib/quoteStore";

const services = [
  {
    icon: Rocket,
    name: "Starter Website",
    blurb: "For businesses that need a clean, professional presence fast.",
    points: ["Up to 5 pages", "Mobile-responsive design", "Contact form & WhatsApp integration", "Basic SEO setup", "1 round of revisions"],
    featured: false,
    accent: "var(--teal)",
  },
  {
    icon: Building2,
    name: "Business Website",
    blurb: "For established businesses that need credibility and functionality.",
    points: ["Up to 10 pages", "Custom design (not templated)", "SEO optimization", "Blog/News section", "Google Business Profile integration", "2 rounds of revisions"],
    featured: true,
    accent: "var(--teal)",
  },
  {
    icon: Sparkles,
    name: "Premium Website",
    blurb: "For businesses that want a fully custom digital experience.",
    points: ["Unlimited pages", "Advanced animations & interactions", "Custom features", "Priority support", "Performance & SEO optimization", "3 rounds of revisions"],
    featured: false,
    accent: "var(--coral)",
  },
  {
    icon: ShoppingCart,
    name: "E-Commerce",
    blurb: "For businesses ready to sell online.",
    points: ["Full product catalog setup", "Secure payment gateway", "Order & inventory management", "Customer accounts", "Mobile-optimized checkout"],
    featured: false,
    accent: "var(--teal)",
  },
  {
    icon: ShieldCheck,
    name: "Maintenance",
    blurb: "Keep your site fast, secure, and up to date.",
    points: ["Monthly updates & backups", "Security monitoring", "Content updates", "Performance checks"],
    featured: false,
    accent: "var(--teal)",
  },
  {
    icon: Globe,
    name: "Domain & Hosting",
    blurb: "We handle the technical setup so you don't have to.",
    points: ["Domain registration & setup", "Hosting configuration", "SSL certificate", "Email setup"],
    featured: false,
    accent: "var(--teal)",
  },
  {
    icon: Puzzle,
    name: "Custom Features",
    blurb: "Need something specific? We build it.",
    points: ["Booking/appointment systems", "Client portals", "API integrations", "Multi-language support"],
    featured: false,
    accent: "var(--coral)",
  },
];

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const tiltRef = useTilt(8);

  return (
    <Reveal delay={i * 55} variant="fade-up">
      <article
        ref={tiltRef}
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-5 transition-all duration-500 sm:p-7 ${
          s.featured
            ? "surface-card-glow"
            : "surface-card hover:border-primary/30"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 size-52 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle, color-mix(in oklab, ${s.accent} 20%, transparent), transparent 70%)` }}
        />

        {/* Featured badge */}
        {s.featured && (
          <span className="absolute top-5 right-5 rounded-full bg-coral px-3 py-1 font-display text-[10px] tracking-[0.18em] uppercase text-coral-foreground shadow-[var(--shadow-coral)]">
            Popular
          </span>
        )}

        <span
          className="inline-flex size-12 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110"
          style={{
            borderColor: `color-mix(in oklab, ${s.accent} 30%, transparent)`,
            background: `color-mix(in oklab, ${s.accent} 12%, transparent)`,
            color: s.accent,
          }}
        >
          <s.icon className="size-5" strokeWidth={1.8} />
        </span>

        <h3 className="mt-6 text-xl font-semibold">{s.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>

        <ul className="mt-6 space-y-2.5 border-t border-border/60 pt-5">
          {s.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} />
              {p}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            const points = s.points.map((p) => `• ${p}`).join("\n");
            setSelectedService(s.name, points);
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-auto flex items-center gap-1.5 pt-6 font-display text-xs font-semibold tracking-wide text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
        >
          Get a quote <ArrowUpRight className="size-3.5" />
        </button>
      </article>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Services"
          title={<>What We <span className="text-gradient-teal">Build</span></>}
          subtitle="Every business is different. Our packages are designed to match where you are — and where you're going."
        />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.name} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
