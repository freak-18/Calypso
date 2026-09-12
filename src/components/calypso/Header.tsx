import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CtaLink } from "./Cta";
import { Logo } from "./Logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Calypso" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 transition-all duration-500",
      scrolled ? "backdrop-blur-2xl" : "",
    )}>
      <div className={cn(
        "mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8",
        scrolled
          ? "h-16 border-b border-border/60 bg-background/75"
          : "h-20",
      )}>
        <a href="#top" className="shrink-0 transition-opacity duration-200 hover:opacity-80" aria-label="Calypso home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "group relative rounded-full px-4 py-2 text-sm transition-all duration-300",
                active === l.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active === l.href && (
                <span className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20" />
              )}
              <span className="relative">{l.label}</span>
              <span className={cn(
                "absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-primary transition-all duration-300",
                active === l.href ? "w-4" : "w-0 group-hover:w-4",
              )} />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CtaLink href="#contact" className="px-5 py-2.5 text-[13px]">
            Get a Free Quote
          </CtaLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="relative rounded-full border border-border/60 p-2.5 text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/8 lg:hidden"
        >
          <span className={cn("absolute inset-0 rounded-full transition-all duration-300", open ? "bg-primary/10" : "")} />
          {open ? <X className="relative size-5" /> : <Menu className="relative size-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={cn(
        "overflow-hidden transition-all duration-500 ease-out lg:hidden",
        open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
      )}>
        <div className="border-b border-border/60 bg-background/95 px-5 pb-6 backdrop-blur-2xl">
          <div className="flex flex-col pt-2">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={cn(
                  "flex items-center justify-between border-b border-border/40 py-3.5 font-display text-sm transition-all duration-300",
                  active === l.href ? "text-primary" : "text-muted-foreground",
                  open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                )}
              >
                {l.label}
                {active === l.href && <span className="size-1.5 rounded-full bg-primary" />}
              </a>
            ))}
            <CtaLink href="#contact" onClick={() => setOpen(false)} className="mt-5">
              Get a Free Quote
            </CtaLink>
          </div>
        </div>
      </div>
    </header>
  );
}
