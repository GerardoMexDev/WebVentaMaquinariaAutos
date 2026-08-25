import type { CSSProperties } from "react";
import { CATEGORIES, COMPANY, productsByCat } from "../data/catalog";
import { Icon } from "./ui";

type HeroProps = {
  navigate: (to: string, section?: string) => void;
  onWizard: () => void;
};

const CAT_ICONS: Record<string, string> = {
  vial: "road",
  agro: "leaf",
  autos: "car",
};

export default function Hero({ navigate, onWizard }: HeroProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
      {/* fondo con respiración ken burns */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={COMPANY.heroImage}
          alt=""
          className="kenburns h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="gridlines-dark absolute inset-0 opacity-60" />
      </div>

      {/* HUD lateral */}
      <div
        className="absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex"
        aria-hidden="true"
      >
        <span className="h-24 w-px bg-paper/25" />
        <p className="rotate-180 font-cond text-[0.66rem] font-semibold uppercase tracking-[0.4em] text-smoke [writing-mode:vertical-rl]">
          Est. {COMPANY.founded} — Lima HQ · 12°02′S 77°02′O
        </p>
        <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-amber text-amber" />
        <span className="h-24 w-px bg-paper/25" />
      </div>

      {/* contenido */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 pt-36 sm:px-8 lg:pt-40">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="inline-flex items-center gap-2.5 border border-paper/20 bg-ink/50 px-4 py-2 backdrop-blur-sm">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-wa text-wa" />
            <span className="font-cond text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-fog">
              Stock real · Entrega inmediata en Lima
            </span>
          </span>
          <span className="hidden font-cond text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-smoke sm:inline">
            Financiamiento aprobado en 48 h
          </span>
        </div>

        <h1 className="mt-7 font-display uppercase leading-[0.96] tracking-wide">
          <span className="mask-line text-[11.5vw] sm:text-7xl lg:text-[6.4rem]">
            <span style={{ "--d": "0.15s" } as React.CSSProperties}>Potencia que mueve</span>
          </span>
          <span className="mask-line text-[11.5vw] sm:text-7xl lg:text-[6.4rem]">
            <span style={{ "--d": "0.32s" } as React.CSSProperties}>
              tu <em className="not-italic text-amber">obra</em>, tu{" "}
              <em className="not-italic text-olive">campo</em>
            </span>
          </span>
          <span className="mask-line text-[11.5vw] sm:text-7xl lg:text-[6.4rem]">
            <span style={{ "--d": "0.49s" } as React.CSSProperties}>
              y tu <em className="not-italic text-autoblue">camino</em>.
            </span>
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
          Maquinaria vial, agrícola y vehículos de trabajo de las marcas líderes mundiales —
          usados certificados con horas y kilometraje comprobados, garantía Terramak,
          financiamiento a tu medida y un taller que responde en campo.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <button onClick={() => navigate("/", "divisiones")} className="btn btn-amber">
            Explorar catálogos
            <Icon name="arrow-right" className="h-4.5 w-4.5" />
          </button>
          <button onClick={onWizard} className="btn btn-ghost-light">
            <Icon name="whatsapp" className="h-4.5 w-4.5" />
            Cotizar por WhatsApp
          </button>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          {["Garantía Terramak Certified", "Taller certificado", "Repuestos originales 24 h"].map(
            (t) => (
              <li
                key={t}
                className="inline-flex items-center gap-2 font-cond text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-smoke"
              >
                <Icon name="check" className="h-3.5 w-3.5 text-amber" />
                {t}
              </li>
            )
          )}
        </ul>
      </div>

      {/* riel de divisiones */}
      <div className="relative z-10 border-t border-paper/15 bg-ink/55 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-3 sm:divide-x sm:divide-paper/15">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(c.route)}
              className="group flex items-center gap-4 border-b border-paper/15 px-5 py-5 text-left transition-colors last:border-b-0 hover:bg-paper/5 sm:border-b-0 sm:px-8"
            >
              <span className="font-cond text-[0.7rem] font-semibold tracking-[0.2em] text-smoke">
                {c.num}
              </span>
              <span
                className="grid h-11 w-11 shrink-0 place-items-center border transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{ borderColor: c.color, color: c.color }}
              >
                <Icon name={CAT_ICONS[c.id]} className="h-5.5 w-5.5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-lg uppercase tracking-wide text-paper">
                  {c.name}
                </span>
                <span className="block font-cond text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-smoke">
                  {productsByCat(c.id).length} equipos en stock
                </span>
              </span>
              <Icon
                name="arrow-up-right"
                className="arrow-slide ml-auto h-5 w-5 shrink-0 text-smoke group-hover:text-amber"
              />
              <span className="sr-only">Ver catálogo {c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
