import { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import heroDevices from "@/assets/hero-devices.jpg";
import { CtaLink } from "./Cta";
import { Reveal } from "./Reveal";

const marquee = [
  "Elevators", "E-Commerce", "Clinics", "Consultancies",
  "Agencies", "Startups", "Real Estate", "Manufacturing",
];

function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

function useCountUp(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1600, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className="surface-card-glow group relative overflow-hidden rounded-2xl px-6 py-5 transition-all duration-500 hover:-translate-y-1"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--teal) 12%, transparent), transparent 70%)" }} />
      <p className="font-display text-3xl font-bold text-gradient-teal">
        {count}{suffix}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export function Hero() {
  const mouse = useMouseParallax();
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    el.style.transform = `perspective(1000px) rotateY(${mouse.x * 4}deg) rotateX(${-mouse.y * 3}deg)`;
  }, [mouse]);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-28 pb-0 sm:pt-36 flex flex-col">
      {/* Background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-abyss)" }} />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />

      {/* Parallax orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute -z-10"
        style={{
          top: "8%", left: "15%",
          width: "28rem", height: "28rem",
          background: "radial-gradient(circle, color-mix(in oklab, var(--teal) 22%, transparent), transparent 70%)",
          filter: "blur(60px)",
          transform: `translate(${mouse.x * -30}px, ${mouse.y * -20}px)`,
          transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
        }} />
      <div aria-hidden="true" className="pointer-events-none absolute -z-10"
        style={{
          bottom: "20%", right: "10%",
          width: "22rem", height: "22rem",
          background: "radial-gradient(circle, color-mix(in oklab, var(--coral) 18%, transparent), transparent 70%)",
          filter: "blur(70px)",
          transform: `translate(${mouse.x * 25}px, ${mouse.y * 20}px)`,
          transition: "transform 1s cubic-bezier(0.23,1,0.32,1)",
        }} />
      <div aria-hidden="true" className="pointer-events-none absolute -z-10"
        style={{
          top: "40%", left: "50%",
          width: "18rem", height: "18rem",
          background: "radial-gradient(circle, color-mix(in oklab, var(--violet) 15%, transparent), transparent 70%)",
          filter: "blur(80px)",
          transform: `translate(${mouse.x * 15}px, ${mouse.y * -15}px)`,
          transition: "transform 1.2s cubic-bezier(0.23,1,0.32,1)",
        }} />

      {/* Floating geometric shapes */}
      <div aria-hidden="true" className="float-slow pointer-events-none absolute top-32 right-[8%] -z-10 size-3 rounded-full bg-primary/60" />
      <div aria-hidden="true" className="float-medium pointer-events-none absolute top-64 left-[6%] -z-10 size-2 rounded-full bg-coral/60" style={{ animationDelay: "2s" }} />
      <div aria-hidden="true" className="drift pointer-events-none absolute top-1/2 right-[20%] -z-10 size-1.5 rounded-full bg-primary/40" />
      <div aria-hidden="true" className="spin-slow pointer-events-none absolute top-48 left-[30%] -z-10 size-16 rounded-full border border-primary/10" />
      <div aria-hidden="true" className="spin-slow pointer-events-none absolute bottom-40 right-[15%] -z-10 size-24 rounded-full border border-coral/8"
        style={{ animationDirection: "reverse", animationDuration: "30s" }} />

      <div className="mx-auto grid max-w-7xl flex-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 backdrop-blur-sm">
              <Zap className="size-3 text-primary" />
              <span className="font-display text-[11px] tracking-[0.26em] uppercase text-primary">
                Digital Presence Partner
              </span>
              <span className="h-3 w-px bg-primary/30" />
              <span className="text-[10px] text-muted-foreground">Est. 2024</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-tight">
              <span className="block text-foreground/90">We Build</span>
              <span className="glitch relative block text-gradient-teal">
                Digital
              </span>
              <span className="block text-foreground/90">Presence.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Calypso crafts high-converting websites for businesses ready to dominate online —
              from first impression to first client.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CtaLink href="#contact" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get a Free Quote
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0 skew-x-12" />
              </CtaLink>
              <CtaLink href="#work" variant="ghost" className="group">
                <span className="relative">
                  View Our Work
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </span>
              </CtaLink>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-12 grid grid-cols-3 gap-3">
              <StatCard value={2} suffix="–4wk" label="Discovery to launch" delay={0} />
              <StatCard value={100} suffix="%" label="Built to convert" delay={100} />
              <StatCard value={50} suffix="+" label="Projects delivered" delay={200} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} variant="scale" className="relative">
          <div
            ref={imageRef}
            className="relative overflow-hidden rounded-[2rem] border border-primary/20 glow-ring"
            style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d" }}
          >
            <img
              src={heroDevices}
              alt="Calypso-built website on laptop and phone"
              width={1408}
              height={1008}
              className="w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0"
              style={{ background: "var(--gradient-ink)", opacity: 0.3 }} />
            {/* Scanline effect */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.03) 2px, oklch(0 0 0 / 0.03) 4px)",
              }} />
          </div>

          {/* Floating badges */}
          <div className="float-slow surface-card-glow absolute -bottom-5 -left-6 rounded-2xl px-5 py-4 sm:-left-10">
            <p className="font-display text-2xl font-bold text-gradient-teal">2–4 wks</p>
            <p className="text-xs text-muted-foreground">Discovery to launch</p>
          </div>
          <div className="surface-card-glow absolute -top-5 right-3 rounded-2xl px-5 py-4" style={{ animationDelay: "1.5s" }}>
            <p className="font-display text-2xl font-bold text-gradient-coral">100%</p>
            <p className="text-xs text-muted-foreground">Built to convert</p>
          </div>

          {/* Corner accent */}
          <div aria-hidden="true" className="absolute -bottom-3 -right-3 size-20 rounded-full border border-primary/20 bg-primary/5 blur-sm" />
        </Reveal>
      </div>

      {/* Marquee strip */}
      <div className="relative mt-20 overflow-hidden border-y border-border/50 py-4 backdrop-blur-sm">
        <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={`${item}-${i}`}
              className="flex items-center gap-12 font-display text-sm tracking-[0.32em] uppercase text-muted-foreground/70">
              {item}
              <span className="size-1 rounded-full bg-primary/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
