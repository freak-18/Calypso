import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 pt-16 pb-10">
      {/* Animated wave top */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 opacity-30"
        style={{ background: "var(--gradient-abyss)", transform: "rotate(180deg)" }} />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <div className="group transition-all duration-300 hover:drop-shadow-[0_0_20px_color-mix(in_oklab,var(--teal)_60%,transparent)]">
          <Logo />
        </div>

        <p className="font-display text-sm tracking-[0.18em] uppercase text-primary">
          We Build Your Digital Presence.
        </p>

        <div className="flex items-center gap-6">
          {["Services", "Work", "Pricing", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-border to-transparent" />

        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Calypso Website Builders. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
