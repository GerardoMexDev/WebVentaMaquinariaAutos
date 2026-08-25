import { CSSProperties, useMemo, useState } from "react";
import {
  CategoryMeta,
  Product,
  fmtPrice,
  galleryOf,
  productsByCat,
  waLink,
} from "../data/catalog";
import { HazardBar, Icon, Reveal } from "./ui";
import GalleryLightbox from "./GalleryLightbox";

type Props = {
  meta: CategoryMeta;
  navigate: (to: string, section?: string) => void;
  onWizard: (product?: Product) => void;
};

type SortKey = "relevancia" | "precio-asc" | "precio-desc" | "anio-desc";

const CONDITION_FILTERS = ["Todos", "Nuevo", "Usado"] as const;

function ProductCard({
  p,
  meta,
  onWizard,
  onGallery,
  delay,
}: {
  p: Product;
  meta: CategoryMeta;
  onWizard: Props["onWizard"];
  onGallery: (p: Product) => void;
  delay: number;
}) {
  const [openFicha, setOpenFicha] = useState(false);
  const photos = galleryOf(p);

  const directMsg = `Hola Terramak, quiero cotizar: ${p.brand} ${p.name} (${p.condition}, ${p.usage}). ¿Me confirman disponibilidad y precio final?`;

  return (
    <Reveal delay={delay} className="h-full">
      <article
        className="group flex h-full flex-col border border-linel bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(20,23,29,0.35)]"
        style={{ "--acc": meta.color, "--accdeep": meta.colorDeep } as CSSProperties}
      >
        {/* imagen — clic abre la galería */}
        <button
          type="button"
          onClick={() => onGallery(p)}
          aria-label={`Ver fotos de ${p.brand} ${p.name}`}
          className="relative block h-52 w-full cursor-zoom-in overflow-hidden bg-coal text-left"
        >
          <div className={`h-full w-full ${p.flip ? "-scale-x-100" : ""}`}>
            <img
              src={p.image}
              alt={`${p.brand} ${p.name}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          {/* velo con invitación a ver la galería */}
          <div className="absolute inset-0 grid place-items-center bg-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex items-center gap-2.5 border border-paper/40 bg-ink/70 px-4 py-2 font-cond text-[0.72rem] font-bold uppercase tracking-[0.2em] text-paper backdrop-blur-sm">
              <Icon name="camera" className="h-4.5 w-4.5 text-amber" />
              Ver galería
            </span>
          </div>
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span
              className={`px-2.5 py-1 font-cond text-[0.64rem] font-bold uppercase tracking-[0.16em] ${
                p.condition === "Nuevo" ? "bg-(--acc) text-ink" : "bg-steel text-paper"
              }`}
            >
              {p.condition}
            </span>
            {p.badge && (
              <span className="bg-amber px-2.5 py-1 font-cond text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink">
                {p.badge}
              </span>
            )}
          </div>
          <span className="absolute bottom-3 left-3 font-cond text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-fog">
            {p.type} · {p.usage}
          </span>
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-ink/80 px-2.5 py-1 font-cond text-[0.64rem] font-bold uppercase tracking-[0.14em] text-paper backdrop-blur-sm">
            <Icon name="camera" className="h-3.5 w-3.5 text-amber" />
            {photos.length} {photos.length === 1 ? "foto" : "fotos"}
          </span>
        </button>

        {/* cuerpo */}
        <div className="flex flex-1 flex-col p-6">
          <p className="font-cond text-[0.68rem] font-bold uppercase tracking-[0.24em] text-(--accdeep)">
            {p.brand}
          </p>
          <h3 className="mt-1.5 font-display text-xl uppercase leading-tight tracking-wide text-ink">
            {p.name}
          </h3>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.specs.map((s) => (
              <li
                key={s}
                className="border border-ink/12 bg-concrete px-2.5 py-1 font-cond text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink/70"
              >
                {s}
              </li>
            ))}
          </ul>

          {/* ficha técnica expandible */}
          <div
            className="grid transition-all duration-500 ease-out"
            style={{ gridTemplateRows: openFicha ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <dl className="mt-4 space-y-2 border-t border-dashed border-linel pt-4">
                {p.ficha.map((f) => (
                  <div key={f.k} className="flex justify-between gap-4 text-sm">
                    <dt className="shrink-0 font-semibold text-ink/55">{f.k}</dt>
                    <dd className="text-right text-ink/85">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <button
            onClick={() => setOpenFicha((v) => !v)}
            className="mt-4 inline-flex items-center gap-2 self-start font-cond text-[0.72rem] font-bold uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-(--accdeep)"
            aria-expanded={openFicha}
          >
            <Icon
              name="chevron"
              className={`h-4 w-4 transition-transform duration-300 ${openFicha ? "rotate-180" : ""}`}
            />
            {openFicha ? "Ocultar ficha" : "Ficha técnica"}
          </button>

          {/* precio + acciones */}
          <div className="mt-auto flex items-end justify-between gap-4 border-t border-linel pt-5">
            <div className="mt-5">
              <p className="font-cond text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-ink/50">
                Precio referencial
              </p>
              <p className="font-display text-[1.45rem] tracking-wide text-ink">
                {fmtPrice(p.price)}
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={waLink(directMsg)}
                target="_blank"
                rel="noreferrer"
                aria-label={`Cotizar ${p.name} directo por WhatsApp`}
                title="WhatsApp directo"
                className="grid h-11 w-11 place-items-center border border-ink/15 text-ink/70 transition-all hover:border-wa hover:bg-wa hover:text-paper"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
              </a>
              <button onClick={() => onWizard(p)} className="btn btn-amber px-4 py-2.5 text-[0.72rem]">
                Cotizar
                <Icon name="arrow-right" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function CatalogPage({ meta, navigate, onWizard }: Props) {
  const all = useMemo(() => productsByCat(meta.id), [meta.id]);
  const brands = useMemo(() => ["Todas", ...Array.from(new Set(all.map((p) => p.brand)))], [all]);

  const [brand, setBrand] = useState("Todas");
  const [condition, setCondition] = useState<(typeof CONDITION_FILTERS)[number]>("Todos");
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [gallery, setGallery] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = all.filter(
      (p) => (brand === "Todas" || p.brand === brand) && (condition === "Todos" || p.condition === condition)
    );
    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "anio-desc") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [all, brand, condition, sort]);

  const hasFilters = brand !== "Todas" || condition !== "Todos" || sort !== "relevancia";

  const resetFilters = () => {
    setBrand("Todas");
    setCondition("Todos");
    setSort("relevancia");
  };

  return (
    <div style={{ "--acc": meta.color, "--accdeep": meta.colorDeep } as CSSProperties}>
      {/* cabecera del catálogo */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={meta.image} alt="" loading="eager" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
          <div className="gridlines-dark absolute inset-0 opacity-50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 lg:pt-44">
          <nav className="flex items-center gap-2 font-cond text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-smoke" aria-label="Miga de pan">
            <button onClick={() => navigate("/")} className="transition-colors hover:text-amber">
              Inicio
            </button>
            <span className="text-steel">/</span>
            <span>Catálogo</span>
            <span className="text-steel">/</span>
            <span style={{ color: meta.color }}>{meta.short}</span>
          </nav>

          <div className="mt-6 flex items-end gap-6">
            <span className="num-outline hidden pb-2 font-display text-7xl leading-none lg:block">
              {meta.num}
            </span>
            <div>
              <h1 className="mask-line font-display text-5xl uppercase leading-[1.02] tracking-wide sm:text-6xl lg:text-7xl">
                <span style={{ "--d": "0.1s" } as CSSProperties}>{meta.name}</span>
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">{meta.desc}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              `${all.length} modelos en stock`,
              "Entrega inmediata",
              "Garantía Terramak",
              "Financiamiento 48 h",
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 border border-paper/20 bg-ink/50 px-4 py-2 font-cond text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-fog backdrop-blur-sm"
              >
                <Icon name="check" className="h-3.5 w-3.5" style={{ color: meta.color } as CSSProperties} />
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div className="relative h-1.5" style={{ background: meta.color }} />
      </section>

      {/* barra de filtros */}
      <div className="sticky top-[68px] z-30 border-b border-linel bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-3.5 sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`px-3.5 py-1.5 font-cond text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-all ${
                  brand === b
                    ? "bg-ink text-amber shadow-md"
                    : "border border-ink/15 text-ink/65 hover:border-ink hover:text-ink"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          <span className="hidden h-6 w-px bg-linel sm:block" />

          <div className="flex overflow-hidden border border-ink/15">
            {CONDITION_FILTERS.map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`px-3.5 py-1.5 font-cond text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-colors ${
                  condition === c ? "bg-(--acc) text-ink" : "text-ink/60 hover:bg-concrete"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <p className="hidden font-cond text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/50 md:block">
              {filtered.length} de {all.length} equipos
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-ink/15 bg-paper px-3 py-2 font-cond text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink/70 outline-none transition-colors focus:border-(--accdeep)"
              aria-label="Ordenar catálogo"
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="anio-desc">Año: más reciente</option>
            </select>
            {hasFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 font-cond text-[0.72rem] font-bold uppercase tracking-[0.14em] text-amberdeep transition-colors hover:text-ink"
              >
                <Icon name="reset" className="h-4 w-4" />
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* grilla */}
      <section className="gridlines bg-paper pb-24 pt-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {filtered.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  meta={meta}
                  onWizard={onWizard}
                  onGallery={setGallery}
                  delay={(i % 3) * 90}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-linel bg-concrete/60 px-6 py-20 text-center">
              <Icon name="gear" className="mx-auto h-10 w-10 text-ink/30" />
              <p className="mt-4 font-display text-2xl uppercase tracking-wide text-ink">
                Sin resultados con estos filtros
              </p>
              <p className="mx-auto mt-2 max-w-md text-ink/60">
                Prueba otra combinación, o cuéntanos qué buscas: también importamos equipos bajo
                pedido.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={resetFilters} className="btn btn-ghost-dark">
                  Limpiar filtros
                </button>
                <button onClick={() => onWizard()} className="btn btn-amber">
                  <Icon name="whatsapp" className="h-4.5 w-4.5" />
                  Pedir ayuda al asesor
                </button>
              </div>
            </div>
          )}

          {/* banda bajo pedido */}
          <Reveal delay={100} className="mt-16">
            <div className="relative overflow-hidden border border-steel bg-ink text-paper">
              <div className="hazard absolute inset-y-0 left-0 w-2.5" aria-hidden="true" />
              <div className="flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-cond text-[0.7rem] font-bold uppercase tracking-[0.26em]" style={{ color: meta.color }}>
                    Importación bajo pedido
                  </p>
                  <h2 className="mt-3 font-display text-3xl uppercase leading-tight tracking-wide sm:text-4xl">
                    ¿No encuentras el equipo exacto?
                  </h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-smoke">
                    Gestionamos la importación de unidades y configuraciones especiales de{" "}
                    {meta.name.toLowerCase()} con plazos y costos cerrados por contrato.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <button onClick={() => onWizard()} className="btn btn-wa">
                    <Icon name="whatsapp" className="h-4.5 w-4.5" />
                    Consultar ahora
                  </button>
                  <button onClick={() => navigate("/", "empresa")} className="btn btn-ghost-light">
                    Conocer Terramak
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <HazardBar className="h-2.5" />

      {/* galería de fotos del equipo */}
      <GalleryLightbox
        product={gallery}
        images={gallery ? galleryOf(gallery) : []}
        accent={meta.color}
        onClose={() => setGallery(null)}
        onWizard={(p) => onWizard(p)}
      />
    </div>
  );
}
