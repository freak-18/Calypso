import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "fade-up" | "fade-left" | "scale" | "flip";

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "fade-up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const effectiveDelay = isMobile ? Math.min(delay, 100) : delay;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mobile = window.innerWidth < 768;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) { setShown(true); io.disconnect(); }
      },
      { threshold: mobile ? 0.01 : 0.12, rootMargin: mobile ? "0px 0px -40px 0px" : "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden: Record<RevealVariant, string> = isMobile
    ? {
        "fade-up": "opacity-0 translate-y-6",
        "fade-left": "opacity-0 translate-y-6",
        "scale": "opacity-0 translate-y-6",
        "flip": "opacity-0 translate-y-6",
      }
    : {
        "fade-up": "opacity-0 translate-y-10 blur-[3px] scale-[0.98]",
        "fade-left": "opacity-0 -translate-x-10",
        "scale": "opacity-0 scale-75 rotate-[-4deg]",
        "flip": "opacity-0 [transform:perspective(600px)_rotateX(20deg)_translateY(20px)]",
      };

  const visible = "opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0 blur-0 [transform:perspective(600px)_rotateX(0deg)_translateY(0)]";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${effectiveDelay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        shown ? visible : hidden[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "mr-auto text-left",
      )}
    >
      <span className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 font-display text-[11px] tracking-[0.26em] uppercase text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/15">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
        {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl leading-[1.04] font-semibold sm:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}

export function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale3d(1.02,1.02,1.02)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.15s ease-out";
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave]);

  return ref;
}
