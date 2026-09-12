import { useState } from "react";

export function Logo({ className }: { className?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={`inline-flex flex-col leading-none ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Wave — draws on load, loops forever */}
      <svg
        viewBox="0 0 60 12"
        className="mb-0.5 h-2.5 w-14 text-primary"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 8c5 0 6-6 11-6s6 6 11 6 6-6 11-6 6 6 11 6 6-4 14-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: 80,
            strokeDashoffset: 80,
            animation:
              "wave-run 1.2s cubic-bezier(0.4,0,0.2,1) forwards, wave-loop 2s linear 1.2s infinite",
          }}
        />
      </svg>

      {/* Wordmark — letter reveal on load + glitch + shimmer on hover */}
      <span className="relative inline-flex overflow-hidden">
        {/* Shimmer layer */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 font-display text-lg font-bold tracking-[0.28em]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--teal) 70%, white) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            opacity: hovered ? 1 : 0,
            animation: hovered ? "logo-shimmer 0.9s linear infinite" : "none",
            transition: "opacity 0.2s",
          }}
        >
          CALYPSO
        </span>

        {/* Glitch + letter reveal layer */}
        <span
          className="font-display text-lg font-bold tracking-[0.28em] text-foreground inline-flex"
          style={{
            animation: hovered ? "logo-glitch 0.6s steps(1) infinite" : "none",
          }}
        >
          {"CALYPSO".split("").map((ch, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: 0,
                animation: `logo-letter-up 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms forwards`,
              }}
            >
              {ch}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
