import { useCountUp, useInView } from "../lib/hooks";
import {
  BRANDS_MARQUEE,
  CATEGORIES,
  COMPANY,
  TESTIMONIALS,
  catById,
  productsByCat,
} from "../data/catalog";
import { HazardBar, Icon, Reveal, SectionHead, Stars } from "./ui";

type SP = {
  navigate: (to: string, section?: string) => void;
  onWizard: () => void;
};

/* ---------------- marquee de marcas ---------------- */

export function BrandMarquee() {
  const items = [...BRANDS_MARQUEE, ...BRANDS_MARQUEE];
  return (
    <div className="marquee overflow-hidden border-y border-steel bg-coal py-5" aria-label="Marcas representadas">
      <div className="marquee-track items-center gap-10 pr-10">
        {items.map((b, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-xl uppercase tracking-[0.08em] text-smoke transition-colors hover:text-amber">
              {b}
            </span>
            <Icon name="gear" className="h-4 w-4 shrink-0 text-amber/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- divisiones ---------------- */

function DivisionTile({
  catId,
  big = false,
  navigate,
}: {
  catId: (typeof CATEGORIES)[number]["id"];
  big?: boolean;
  navigate: SP["navigate"];
}) {
  const c = catById(catId);
  return (
    <button
      onClick={() => navigate(c.route)}
      className={`group relative block w-full overflow-hidden border border-steel bg-coal text-left ${
        big ? "min-h-[420px] lg:min-h-full" : "min-h-[240px]"
      }`}
    >
      <img
        src={c.image}
        alt={c.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10 transition-opacity duration-500" />
      <div
        className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: c.color }}
      />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-7">
        <div className="flex items-center gap-3">
          <span className="font-cond text-[0.7rem] font-semibold tracking-[0.24em] text-fog/80">
            {c.num}
          </span>
          <span className="h-px w-8" style={{ background: c.color }} />
          <span
            className="font-cond text-[0.7rem] font-semibold uppercase tracking-[0.24em]"
            style={{ color: c.color }}
          >
            {productsByCat(c.id).length} equipos en stock
          </span>
        </div>
        <h3 className="mt-3 font-display text-3xl uppercase tracking-wide text-paper lg:text-4xl">
          {c.name}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-fog/90">{c.tagline}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-cond text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-paper">
          Ver catálogo
          <Icon name="arrow-right" className="arrow-slide h-4.5 w-4.5" />
        </span>
      </div>
    </button>
  );
}

export function DivisionsSection({ navigate }: { navigate: SP["navigate"] }) {
  return (
    <section id="divisiones" className="gridlines relative bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Nuestras divisiones"
            title={
              <>
                Tres divisiones.
                <br />
                Un solo estándar.
              </>
            }
            desc="Cada división tiene su propio equipo de asesores especialistas, stock independiente y taller dedicado. Elige tu rubro y entra directo al catálogo."
          />
          <Reveal delay={200} className="hidden lg:block">
            <p className="font-cond text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-ink/45">
              ( 01 — 03 ) Catálogos activos
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <DivisionTile catId="vial" big navigate={navigate} />
          </Reveal>
          <div className="grid gap-5">
            <Reveal delay={120}>
              <DivisionTile catId="agro" navigate={navigate} />
            </Reveal>
            <Reveal delay={220}>
              <DivisionTile catId="autos" navigate={navigate} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- banda de cifras ---------------- */

function Stat({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className="px-6 py-10 text-center sm:py-12">
      <p className="font-display text-5xl tracking-wide text-paper lg:text-6xl">
        {n.toLocaleString("en-US")}
        <span className="text-amber">{suffix}</span>
      </p>
      <p className="mt-3 font-cond text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-smoke">
        {label}
      </p>
    </div>
  );
}

export function StatsBand() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const stats = [
    { value: 18, suffix: "+", label: "Años en el mercado" },
    { value: 1450, suffix: "+", label: "Equipos entregados" },
    { value: 27, suffix: "", label: "Marcas representadas" },
    { value: 96, suffix: "%", label: "Clientes que recomiendan" },
  ];
  return (
    <section className="gridlines-dark relative border-y border-steel bg-ink">
      <div ref={ref} className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-steel lg:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} {...s} active={inView} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- la empresa ---------------- */

const ABOUT_BLOCKS = [
  {
    num: "01",
    title: "Historia",
    body: "Terramak nació en 2007 como un taller familiar de servicio técnico para maquinaria pesada en San Luis, Lima. Hoy operamos un patio de 12,000 m² con tres divisiones especializadas, flota propia de transporte y talleres certificados en Lima, Trujillo y Arequipa.",
  },
  {
    num: "02",
    title: "Misión",
    body: "Poner la máquina correcta en las manos correctas: asesoría honesta, stock real y un respaldo técnico que no desaparece después de la factura.",
  },
  {
    num: "03",
    title: "Visión",
    body: "Ser el distribuidor multimarca de referencia del Perú, reconocido por cumplir lo que promete: plazos, garantías y disponibilidad de repuestos.",
  },
  {
    num: "04",
    title: "Valores",
    body: "",
    chips: ["Integridad", "Cumplimiento", "Servicio primero", "Seguridad ante todo"],
  },
  {
    num: "05",
    title: "Servicio y repuestos",
    body: "Tres talleres certificados, doce unidades móviles de campo y un almacén central con repuestos originales despachados en 24 horas. Toda unidad — nueva o usada — pasa una inspección PDI de 200 puntos antes de entregarse.",
  },
  {
    num: "06",
    title: "Financiamiento",
    body: "Trabajamos con los principales bancos y financieras del país: crédito convencional hasta 60 meses, leasing operativo y financiero, y un plan agro con cuotas semestrales alineadas a tu cosecha. Aprobación típica en 48 horas.",
  },
];

export function AboutSection() {
  return (
    <section id="empresa" className="relative overflow-hidden bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* columna fija */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              eyebrow="La empresa"
              title={
                <>
                  Máquinas que responden.
                  <br />
                  <span className="text-amberdeep">Gente que responde.</span>
                </>
              }
              desc="No vendemos fierros: entregamos disponibilidad. Cada equipo sale de nuestro patio con inspección de 200 puntos, capacitación de operadores incluida y un asesor de postventa con nombre y apellido."
            />
            <Reveal delay={200} className="mt-10">
              <div className="corner-frame relative max-w-lg">
                <img
                  src={COMPANY.yardImage}
                  alt="Patio central de maquinaria Terramak al atardecer"
                  loading="lazy"
                  className="block w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/85 px-4 py-3 backdrop-blur-sm">
                  <span className="font-cond text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-fog">
                    Patio central · San Luis, Lima
                  </span>
                  <span className="font-cond text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber">
                    12,000 m²
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* columna que fluye */}
          <div className="space-y-4">
            {ABOUT_BLOCKS.map((b, i) => (
              <Reveal key={b.num} delay={(i % 2) * 80}>
                <article className="group border border-linel bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amberdeep/50 hover:shadow-[0_18px_40px_-20px_rgba(20,23,29,0.25)] sm:p-8">
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-2xl text-amber/80">{b.num}</span>
                    <h3 className="font-display text-xl uppercase tracking-wide text-ink sm:text-2xl">
                      {b.title}
                    </h3>
                  </div>
                  {b.body && (
                    <p className="mt-4 pl-[3.25rem] leading-relaxed text-ink/70">{b.body}</p>
                  )}
                  {b.chips && (
                    <div className="mt-5 flex flex-wrap gap-2 pl-[3.25rem]">
                      {b.chips.map((ch) => (
                        <span
                          key={ch}
                          className="border border-ink/15 px-3.5 py-1.5 font-cond text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink/75 transition-colors group-hover:border-amberdeep/60 group-hover:text-amberdeep"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* garantías */}
        <Reveal delay={100} className="mt-16">
          <div className="grid border border-linel bg-concrete sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-linel">
            {[
              { icon: "shield", t: "Garantía certificada", d: "Hasta 12 meses o 2,000 h en usados certificados Terramak." },
              { icon: "wrench", t: "Taller certificado", d: "Técnicos entrenados por fábrica, en patio y en campo." },
              { icon: "gear", t: "Repuestos originales", d: "Despacho nacional en 24 h desde almacén central." },
              { icon: "coins", t: "Financiamiento a medida", d: "Crédito, leasing y plan agro con cuotas semestrales." },
            ].map((g) => (
              <div
                key={g.t}
                className="group flex items-start gap-4 border-b border-linel p-6 transition-colors last:border-b-0 hover:bg-paper sm:border-b lg:border-b-0 [&:nth-child(2)]:border-b-0 sm:[&:nth-child(2)]:border-b lg:[&:nth-child(2)]:border-b-0"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-ink/15 text-amberdeep transition-colors group-hover:border-amberdeep group-hover:bg-amberdeep group-hover:text-paper">
                  <Icon name={g.icon} className="h-5.5 w-5.5" />
                </span>
                <span>
                  <span className="block font-display text-base uppercase tracking-wide text-ink">
                    {g.t}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-ink/65">{g.d}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- proceso ---------------- */

const STEPS = [
  {
    icon: "whatsapp",
    title: "Cuéntanos qué necesitas",
    body: "Por WhatsApp, teléfono o en nuestro patio. Un asesor especialista de tu rubro te responde el mismo día.",
  },
  {
    icon: "coins",
    title: "Cotización y financiamiento",
    body: "Propuesta formal en 24 horas con precio, disponibilidad y opciones de crédito o leasing preaprobadas.",
  },
  {
    icon: "check",
    title: "Entrega y capacitación",
    body: "Tu unidad pasa la inspección PDI de 200 puntos y tus operadores reciben capacitación sin costo.",
  },
  {
    icon: "wrench",
    title: "Postventa de por vida",
    body: "Taller certificado, unidades móviles y repuestos originales en 24 h mientras tu equipo siga en marcha.",
  },
];

export function ProcessSection({ onWizard }: { onWizard: SP["onWizard"] }) {
  return (
    <section id="proceso" className="gridlines-dark relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          tone="dark"
          eyebrow="Cómo trabajamos"
          title={
            <>
              De la consulta a la obra
              <br />
              <span className="text-amber">en cuatro pasos.</span>
            </>
          }
          desc="Un proceso claro y sin letra chica, pensado para que tu equipo esté produciendo lo antes posible."
        />

        <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div
            className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-steel md:block"
            aria-hidden="true"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <div className="group relative">
                <div className="flex items-center gap-4">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center border border-steel bg-coal text-amber transition-colors duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="num-outline font-display text-5xl leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl uppercase tracking-wide">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-16 flex flex-wrap items-center gap-4">
          <button onClick={onWizard} className="btn btn-amber">
            <Icon name="whatsapp" className="h-4.5 w-4.5" />
            Empezar por el paso 1
          </button>
          <p className="font-cond text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-smoke">
            Respuesta promedio: 15 min en horario de oficina
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- testimonios ---------------- */

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="relative bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Clientes"
          title={
            <>
              Lo que dicen quienes ya
              <br />
              <span className="text-amberdeep">trabajan con Terramak.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const c = catById(t.cat);
            return (
              <Reveal key={t.name} delay={i * 120} className={i === 0 ? "md:col-span-2" : ""}>
                <figure
                  className="group relative flex h-full flex-col border border-linel bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-22px_rgba(20,23,29,0.3)]"
                  style={{ borderLeftWidth: 4, borderLeftColor: c.color }}
                >
                  <span
                    className="absolute right-6 top-2 font-display text-7xl leading-none opacity-10"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <Stars />
                  <blockquote
                    className={`mt-5 leading-relaxed text-ink/80 ${
                      i === 0 ? "text-lg lg:text-xl" : "text-base"
                    }`}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-4 pt-7">
                    <span
                      className="grid h-11 w-11 place-items-center font-display text-lg text-paper"
                      style={{ background: c.color }}
                    >
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{t.name}</span>
                      <span className="block text-sm text-ink/60">
                        {t.role} · {t.company}
                      </span>
                    </span>
                    <span
                      className="ml-auto border px-2.5 py-1 font-cond text-[0.64rem] font-semibold uppercase tracking-[0.18em]"
                      style={{ borderColor: c.color, color: c.colorDeep }}
                    >
                      {c.short}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA final ---------------- */

export function CTABand({ navigate, onWizard }: SP) {
  return (
    <section id="contacto" className="relative bg-ink text-paper">
      <HazardBar className="h-3" />
      <div className="gridlines-dark relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Reveal>
                <h2 className="font-display text-4xl uppercase leading-[1.02] tracking-wide sm:text-5xl lg:text-6xl">
                  ¿Listo para mover tu
                  <br />
                  <span className="text-amber">próximo proyecto?</span>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-smoke">
                  Responde 4 preguntas rápidas y te conectamos con el asesor correcto, con una
                  propuesta lista. Sin spam, sin llamadas insistentes.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <div className="flex flex-col gap-4 border border-steel bg-coal/70 p-7">
                <button onClick={onWizard} className="btn btn-wa w-full">
                  <Icon name="whatsapp" className="h-5 w-5" />
                  Hablar por WhatsApp
                </button>
                <button onClick={() => navigate("/", "divisiones")} className="btn btn-ghost-light w-full">
                  Ver catálogos primero
                </button>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-smoke">
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2.5 transition-colors hover:text-amber"
                  >
                    <Icon name="phone" className="h-4.5 w-4.5 text-amber" />
                    {COMPANY.phone}
                  </a>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="flex items-center gap-2.5 transition-colors hover:text-amber"
                  >
                    <Icon name="mail" className="h-4.5 w-4.5 text-amber" />
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <HazardBar className="h-3" />
    </section>
  );
}
