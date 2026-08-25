import { FormEvent, useState } from "react";
import { CATEGORIES, COMPANY, productsByCat, waLink } from "../data/catalog";
import { HazardBar, Icon, Logo } from "./ui";

type FooterProps = {
  navigate: (to: string, section?: string) => void;
  onWizard: () => void;
};

export default function Footer({ navigate, onWizard }: FooterProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  const companyLinks = [
    { label: "La empresa", section: "empresa" },
    { label: "Proceso de compra", section: "proceso" },
    { label: "Clientes", section: "testimonios" },
    { label: "Contacto", section: "contacto" },
  ];

  return (
    <footer className="relative bg-ink text-paper">
      <HazardBar />

      {/* franja fase 2 + boletín */}
      <div className="border-b border-steel bg-coal">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="font-cond text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-amber">
              Próximamente · Fase 2
            </p>
            <p className="mt-2 text-sm leading-relaxed text-smoke">
              Portal de clientes, financiamiento 100% en línea, seguimiento de pedidos y
              marketplace de usados certificados. Déjanos tu correo y te avisamos al lanzar.
            </p>
          </div>
          {sent ? (
            <p className="inline-flex items-center gap-2 font-cond text-sm font-semibold uppercase tracking-[0.18em] text-wa">
              <Icon name="check" className="h-4.5 w-4.5" /> Listo, te avisaremos al lanzar
            </p>
          ) : (
            <form onSubmit={subscribe} className="flex w-full max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="min-w-0 flex-1 border border-steel bg-ink px-4 py-3 text-sm text-paper placeholder:text-smoke/60 outline-none transition-colors focus:border-amber"
              />
              <button type="submit" className="btn btn-amber shrink-0 px-5">
                Avisarme
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        {/* marca */}
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-smoke">
            Distribuidor multimarca de maquinaria vial, agrícola y vehículos de trabajo.
            Stock real en Lima, garantía de fábrica y postventa certificada desde{" "}
            {COMPANY.founded}.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Concesionario autorizado", "Taller certificado", "ISO 9001"].map((t) => (
              <span
                key={t}
                className="border border-steel px-3 py-1.5 font-cond text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-fog"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* catálogos */}
        <div>
          <h3 className="font-cond text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-amber">
            Catálogos
          </h3>
          <ul className="mt-5 space-y-3">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => navigate(c.route)}
                  className="group inline-flex items-center gap-3 text-sm text-fog transition-colors hover:text-amber"
                >
                  <span className="h-[2px] w-4 bg-steel transition-all group-hover:w-6 group-hover:bg-amber" />
                  {c.name}
                  <span className="font-cond text-[0.68rem] uppercase tracking-wider text-smoke">
                    ({productsByCat(c.id).length})
                  </span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={onWizard}
                className="group inline-flex items-center gap-3 text-sm text-fog transition-colors hover:text-amber"
              >
                <span className="h-[2px] w-4 bg-steel transition-all group-hover:w-6 group-hover:bg-amber" />
                ¿No encuentras tu equipo?
              </button>
            </li>
          </ul>
        </div>

        {/* empresa */}
        <div>
          <h3 className="font-cond text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-amber">
            Empresa
          </h3>
          <ul className="mt-5 space-y-3">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => navigate("/", l.section)}
                  className="group inline-flex items-center gap-3 text-sm text-fog transition-colors hover:text-amber"
                >
                  <span className="h-[2px] w-4 bg-steel transition-all group-hover:w-6 group-hover:bg-amber" />
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* contacto */}
        <div>
          <h3 className="font-cond text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-amber">
            Contacto directo
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-fog">
            <li className="flex items-start gap-3">
              <Icon name="pin" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber" />
              {COMPANY.address}
            </li>
            <li className="flex items-start gap-3">
              <Icon name="phone" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber" />
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-amber">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="mail" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-amber">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="clock" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber" />
              {COMPANY.hours}
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink("Hola Terramak, quiero información sobre sus equipos.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-wa"
            >
              <Icon name="whatsapp" className="h-4.5 w-4.5" />
              WhatsApp
            </a>
            <button onClick={onWizard} className="btn btn-ghost-light">
              Hablar con un asesor
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-steel">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 sm:px-8 md:flex-row">
          <p className="text-center text-xs text-smoke md:text-left">
            © 2026 {COMPANY.legal} · RUC {COMPANY.ruc} · Lima, Perú. Precios referenciales en
            US$, sujetos a stock y tipo de cambio.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 font-cond text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-fog transition-colors hover:text-amber"
          >
            Volver arriba
            <Icon
              name="arrow-right"
              className="h-4 w-4 -rotate-90 transition-transform group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
