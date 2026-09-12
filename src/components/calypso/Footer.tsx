import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 pt-12 pb-8 sm:pt-16 sm:pb-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 opacity-30"
        style={{ background: "var(--gradient-abyss)", transform: "rotate(180deg)" }} />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 text-center sm:gap-6 sm:px-8">
        <div className="group transition-all duration-300 hover:drop-shadow-[0_0_20px_color-mix(in_oklab,var(--teal)_60%,transparent)]">
          <Logo />
        </div>

        <p className="font-display text-xs tracking-[0.18em] uppercase text-primary sm:text-sm">
          We Build Your Digital Presence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
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
