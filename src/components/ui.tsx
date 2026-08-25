import { CSSProperties, ReactNode } from "react";
import { useInView } from "../lib/hooks";

/* ---------------- iconografía propia (SVG inline) ---------------- */

const PATHS: Record<string, ReactNode> = {
  "arrow-right": (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M6.5 17.5 17.5 6.5" />
      <path d="M9 6.5h8.5V15" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5L19.5 7" />,
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  chevron: <path d="M6 9.5l6 6 6-6" />,
  phone: (
    <path d="M5.5 3.5h3.6l1.5 4.3-2.1 1.6a12.8 12.8 0 0 0 6.1 6.1l1.6-2.1 4.3 1.5v3.6a1.9 1.9 0 0 1-2 1.9A16 16 0 0 1 3.6 5.5a1.9 1.9 0 0 1 1.9-2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7.5 12 13.5l8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5S5 15.6 5 10.2a7 7 0 1 1 14 0c0 5.4-7 11.3-7 11.3Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2.2" />
    </>
  ),
  send: (
    <>
      <path d="M4 11.5 20 4l-6 16-2.6-6.9L4 11.5Z" />
      <path d="M11.4 13.1 20 4" />
    </>
  ),
  reset: (
    <>
      <path d="M4.5 8.5A8.5 8.5 0 1 1 3.6 14" />
      <path d="M4.5 3.5v5h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 19 6v5.2c0 4.6-3.1 7.7-7 9.8-3.9-2.1-7-5.2-7-9.8V6l7-3Z" />
      <path d="M9 11.8l2.1 2.1 4-4.3" />
    </>
  ),
  wrench: (
    <path d="M14.2 6.3a4.4 4.4 0 0 0-5.9 5.5L3.5 16.6a1.9 1.9 0 0 0 0 2.7l1.2 1.2a1.9 1.9 0 0 0 2.7 0l4.8-4.8a4.4 4.4 0 0 0 5.5-5.9l-2.8 2.8-2.6-.6-.6-2.6 2.5-2.6Z" />
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" />
    </>
  ),
  coins: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.8v10.4" />
      <path d="M9.6 9.3c0-.9 1-1.5 2.4-1.5s2.4.6 2.4 1.5c0 2.4-4.8 1.5-4.8 4 0 .9 1 1.5 2.4 1.5s2.4-.6 2.4-1.5" />
    </>
  ),
  star: (
    <path d="M12 2.8l2.8 5.8 6.4.9-4.6 4.4 1.1 6.3-5.7-3-5.7 3 1.1-6.3L2.8 9.5l6.4-.9L12 2.8Z" />
  ),
  road: (
    <>
      <path d="M5.5 20C8.5 14 7 9 9.2 4" />
      <path d="M18.5 20c-3-6-1.5-11-3.7-16" />
      <path d="M12 6.5v2M12 11.5v2M12 16.5v2" />
    </>
  ),
  leaf: (
    <>
      <path d="M6 18.5C6 10.5 12 5 20 4.5 19.5 12.5 14 18.5 6 18.5Z" />
      <path d="M4 20.5c2.5-6 7-10.5 12-13" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v-3l1.8-4.4A2 2 0 0 1 7.7 7.3h8.6a2 2 0 0 1 1.9 1.3L20 13v3" />
      <path d="M3.5 16h17" />
      <path d="M5.5 13h13" />
      <circle cx="8" cy="17.5" r="1.8" />
      <circle cx="16" cy="17.5" r="1.8" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" />
      <path d="M9 8.2c-.6 2.8 4 7.4 6.8 6.8l.8-1.7-2.1-1.2-1 .8a5.6 5.6 0 0 1-2.5-2.5l.8-1-1.2-2.1L9 8.2Z" fill="currentColor" stroke="none" />
    </>
  ),
};

export function Icon({
  name,
  className = "w-5 h-5",
  filled = false,
  style,
}: {
  name: keyof typeof PATHS | string;
  className?: string;
  filled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

/* ---------------- reveal on scroll ---------------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`rv ${inView ? "rv-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- encabezado de sección ---------------- */

export function SectionHead({
  eyebrow,
  title,
  desc,
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-[3px] w-10 bg-amber" />
          <span
            className={`eyebrow font-cond font-semibold uppercase tracking-[0.28em] text-[0.72rem] ${
              dark ? "text-amber" : "text-amberdeep"
            }`}
          >
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`mt-4 font-display uppercase leading-[0.98] text-4xl sm:text-5xl lg:text-6xl tracking-wide ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={170}>
          <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-smoke" : "text-ink/70"}`}>
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- estrellas ---------------- */

export function Stars({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span className="inline-flex gap-1 text-amber">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" filled className={className} />
      ))}
    </span>
  );
}

/* ---------------- logotipo ---------------- */

export function LogoMark({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 2 36 11v18L20 38 4 29V11z" fill="#f5a623" />
      <path d="M11 13h18v5h-6.5v11h-5V18H11z" fill="#14171d" />
      <path d="M4 29 20 38l16-9v-3L20 17 4 26z" fill="#d18a0b" opacity="0.35" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark className={compact ? "w-8 h-8" : "w-10 h-10"} />
      <span className="leading-none">
        <span className="block font-display text-[1.35rem] tracking-wider text-paper">
          TERRA<span className="text-amber">MAK</span>
        </span>
        {!compact && (
          <span className="block font-cond uppercase tracking-[0.3em] text-[0.6rem] text-smoke mt-1">
            Maquinaria &amp; Motores
          </span>
        )}
      </span>
    </span>
  );
}

/* ---------------- franja de peligro decorativa ---------------- */

export function HazardBar({ className = "h-2.5" }: { className?: string }) {
  return <div className={`hazard w-full ${className}`} aria-hidden="true" />;
}
