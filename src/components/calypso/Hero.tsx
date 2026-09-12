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
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className="surface-card-glow group relative overflow-hidden rounded-2xl px-4 py-4 sm:px-6 sm:py-5 transition-all duration-500 hover:-translate-y-1"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--teal) 12%, transparent), transparent 70%)" }} />
      <p className="font-display text-2xl font-bold text-gradient-teal sm:text-3xl">
        {count}{suffix}
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{label}</p>
    </div>
  );
}

export function Hero() {
  const mouse = useMouseParallax();
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    const el = imageRef.current;
    if (!el) return;
    el.style.transform = `perspective(1000px) rotateY(${mouse.x * 4}deg) rotateX(${-mouse.y * 3}deg)`;
  }, [mouse]);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24 pb-0 sm:pt-32 lg:pt-36 flex flex-col">
      {/* Background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-abyss)" }} />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />

      {/* Parallax orbs — smaller on mobile */}
      <div aria-hidden="true" className="pointer-events-none absolute -z-10"
        style={{
          top: "8%", left: "15%",
          width: "clamp(14rem, 40vw, 28rem)", height: "clamp(14rem, 40vw, 28rem)",
          background: "radial-gradient(circle, color-mix(in oklab, var(--teal) 22%, transparent), transparent 70%)",
          filter: "blur(60px)",
          transform: `translate(${mouse.x * -30}px, ${mouse.y * -20}px)`,
          transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
        }} />
      <div aria-hidden="true" className="pointer-events-none absolute -z-10"
        style={{
          bottom: "20%", right: "10%",
          width: "clamp(10rem, 30vw, 22rem)", height: "clamp(10rem, 30vw, 22rem)",
          background: "radial-gradient(circle, color-mix(in oklab, var(--coral) 18%, transparent), transparent 70%)",
          filter: "blur(70px)",
          transform: `translate(${mouse.x * 25}px, ${mouse.y * 20}px)`,
          transition: "transform 1s cubic-bezier(0.23,1,0.32,1)",
        }} />

      <div className="mx-auto grid max-w-7xl flex-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="text-center lg:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 backdrop-blur-sm sm:gap-2.5 sm:px-4 sm:py-2">
              <Zap className="size-3 text-primary" />
              <span className="font-display text-[10px] tracking-[0.2em] uppercase text-primary sm:text-[11px] sm:tracking-[0.26em]">
                Digital Presence Partner
              </span>
              <span className="hidden h-3 w-px bg-primary/30 sm:block" />
              <span className="hidden text-[10px] text-muted-foreground sm:block">Est. 2024</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] font-bold tracking-tight sm:mt-7">
              <span className="block text-foreground/90">We Build</span>
              <span className="glitch relative block text-gradient-teal">Digital</span>
              <span className="block text-foreground/90">Presence.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg lg:mx-0">
              Calypso crafts high-converting websites for businesses ready to dominate online —
              from first impression to first client.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9 lg:justify-start">
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
            <div className="mt-10 grid grid-cols-3 gap-2 sm:mt-12 sm:gap-3">
              <StatCard value={2} suffix="–4wk" label="Discovery to launch" delay={0} />
              <StatCard value={100} suffix="%" label="Built to convert" delay={100} />
              <StatCard value={50} suffix="+" label="Projects delivered" delay={200} />
            </div>
          </Reveal>
        </div>

        {/* Hero image — hidden on mobile, shown lg+ */}
        <Reveal delay={120} variant="scale" className="relative hidden lg:block">
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
            <div aria-hidden="true" className="pointer-events-none absolute inset-0"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.03) 2px, oklch(0 0 0 / 0.03) 4px)",
              }} />
          </div>

          <div className="float-slow surface-card-glow absolute -bottom-5 -left-10 rounded-2xl px-5 py-4">
            <p className="font-display text-2xl font-bold text-gradient-teal">2–4 wks</p>
            <p className="text-xs text-muted-foreground">Discovery to launch</p>
          </div>
          <div className="surface-card-glow absolute -top-5 right-3 rounded-2xl px-5 py-4">
            <p className="font-display text-2xl font-bold text-gradient-coral">100%</p>
            <p className="text-xs text-muted-foreground">Built to convert</p>
          </div>
          <div aria-hidden="true" className="absolute -bottom-3 -right-3 size-20 rounded-full border border-primary/20 bg-primary/5 blur-sm" />
        </Reveal>

        {/* Hero image — shown on tablet only (sm–lg) */}
        <Reveal delay={120} variant="fade-up" className="relative mt-4 lg:hidden">
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-primary/20 sm:max-w-md">
            <img
              src={heroDevices}
              alt="Calypso-built website on laptop and phone"
              width={1408}
              height={1008}
              className="w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0"
              style={{ background: "var(--gradient-ink)", opacity: 0.3 }} />
          </div>
        </Reveal>
      </div>

      {/* Marquee strip */}
      <div className="relative mt-14 overflow-hidden border-y border-border/50 py-3 backdrop-blur-sm sm:mt-20 sm:py-4">
        <div className="absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-20" />
        <div className="absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-20" />
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap sm:gap-12">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={`${item}-${i}`}
              className="flex items-center gap-8 font-display text-xs tracking-[0.26em] uppercase text-muted-foreground/70 sm:gap-12 sm:text-sm sm:tracking-[0.32em]">
              {item}
              <span className="size-1 rounded-full bg-primary/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
