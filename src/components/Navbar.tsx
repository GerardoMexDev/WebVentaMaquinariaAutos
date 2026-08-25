import { useState } from "react";
import { useScrolled } from "../lib/hooks";
import { COMPANY } from "../data/catalog";
import { Icon, Logo } from "./ui";

type NavProps = {
  route: string;
  navigate: (to: string, section?: string) => void;
  onWizard: () => void;
};

const LINKS: { label: string; to: string; section?: string }[] = [
  { label: "Inicio", to: "/" },
  { label: "Maq. Vial", to: "/vial" },
  { label: "Agrícola", to: "/agro" },
  { label: "Autos", to: "/autos" },
  { label: "La Empresa", to: "/", section: "empresa" },
  { label: "Proceso", to: "/", section: "proceso" },
];

export default function Navbar({ route, navigate, onWizard }: NavProps) {
  const scrolled = useScrolled(50);
  const [open, setOpen] = useState(false);

  const go = (to: string, section?: string) => {
    setOpen(false);
    navigate(to, section);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* barra superior de contacto */}
      <div
        className={`overflow-hidden bg-amber text-ink transition-all duration-500 ${
          scrolled ? "max-h-0" : "max-h-10"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-1.5 sm:px-8">
          <p className="font-cond text-[0.7rem] font-semibold uppercase tracking-[0.22em]">
            Concesionario multimarca · Lima, Perú · Desde {COMPANY.founded}
          </p>
          <div className="hidden items-center gap-5 md:flex">
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 font-cond text-[0.7rem] font-semibold uppercase tracking-[0.18em] hover:underline"
            >
              <Icon name="phone" className="h-3.5 w-3.5" />
              {COMPANY.phone}
            </a>
            <span className="inline-flex items-center gap-1.5 font-cond text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
              <Icon name="clock" className="h-3.5 w-3.5" />
              {COMPANY.hours}
            </span>
          </div>
        </div>
      </div>

      {/* barra principal */}
      <div
        className={`border-b transition-all duration-500 ${
          scrolled
            ? "border-steel bg-ink/95 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md"
            : "border-transparent bg-gradient-to-b from-ink/90 to-ink/0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
          <button onClick={() => go("/")} aria-label="Terramak — inicio" className="shrink-0">
            <Logo />
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
            {LINKS.map((l) => {
              const active = route === l.to && !l.section;
              return (
                <button
                  key={l.label}
                  onClick={() => go(l.to, l.section)}
                  className={`group relative font-cond text-[0.82rem] font-semibold uppercase tracking-[0.2em] transition-colors ${
                    active ? "text-amber" : "text-fog hover:text-paper"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-amber transition-transform duration-300 ${
                      active ? "w-full" : "w-full origin-left scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={onWizard} className="btn btn-amber hidden sm:inline-flex">
              <Icon name="whatsapp" className="h-4.5 w-4.5" />
              Cotizar ahora
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="grid h-11 w-11 place-items-center border border-steel text-paper transition-colors hover:border-amber hover:text-amber lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-5.5 w-5.5" />
            </button>
          </div>
        </div>

        {/* menú móvil */}
        <div
          className={`overflow-hidden border-steel bg-ink/98 backdrop-blur-md transition-all duration-400 lg:hidden ${
            open ? "max-h-96 border-t" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col px-5 py-4 sm:px-8" aria-label="Móvil">
            {LINKS.map((l, i) => (
              <button
                key={l.label}
                onClick={() => go(l.to, l.section)}
                className="flex items-center justify-between border-b border-steel/60 py-3.5 text-left font-cond text-sm font-semibold uppercase tracking-[0.22em] text-fog last:border-0 hover:text-amber"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {l.label}
                <Icon name="arrow-right" className="h-4 w-4 text-amber" />
              </button>
            ))}
            <button onClick={() => { setOpen(false); onWizard(); }} className="btn btn-amber mt-4">
              <Icon name="whatsapp" className="h-4.5 w-4.5" />
              Cotizar ahora
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
