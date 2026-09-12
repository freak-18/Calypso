import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 active:scale-95";

const styles = {
  coral:
    "bg-coral text-coral-foreground px-7 py-3.5 shadow-[var(--shadow-coral)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[var(--neon-coral)]",
  teal: "bg-primary text-primary-foreground px-7 py-3.5 shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[var(--neon-teal)]",
  ghost:
    "border border-border/70 bg-surface/30 px-7 py-3.5 text-foreground backdrop-blur hover:border-primary/50 hover:text-primary hover:bg-primary/8",
} as const;

type Variant = keyof typeof styles;

const Shimmer = () => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-700 group-hover:translate-x-full"
  />
);

export function CtaLink({
  variant = "coral",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return (
    <a className={cn(base, styles[variant], className)} {...props}>
      <Shimmer />
      {props.children}
    </a>
  );
}

export function CtaButton({
  variant = "coral",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button className={cn(base, styles[variant], className)} {...props}>
      <Shimmer />
      {props.children}
    </button>
  );
}
