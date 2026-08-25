import { useCallback, useEffect, useState } from "react";
import { Product, fmtPrice, waLink } from "../data/catalog";
import { usePrefersReducedMotion } from "../lib/hooks";
import { Icon } from "./ui";

/**
 * Galería de equipo en pantalla completa.
 * Carrusel infinito (clon al inicio y al final con salto sin transición),
 * autoplay, teclado, gestos táctiles, miniaturas y ficha del equipo.
 */
export default function GalleryLightbox({
  product,
  images,
  accent,
  onClose,
  onWizard,
}: {
  product: Product | null;
  images: string[];
  accent: string;
  onClose: () => void;
  onWizard: (p: Product) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);

  const len = images.length;
  const loop = len > 1;
  const realIdx = ((idx % len) + len) % len;

  /* reset al cambiar de equipo */
  useEffect(() => {
    setIdx(0);
    setAnim(true);
    setPaused(false);
  }, [product?.id]);

  const next = useCallback(() => {
    if (!loop) return;
    setAnim(true);
    setIdx((i) => i + 1);
  }, [loop]);

  const prev = useCallback(() => {
    if (!loop) return;
    setAnim(true);
    setIdx((i) => i - 1);
  }, [loop]);

  /* teclado + bloqueo de scroll */
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [product, next, prev, onClose]);

  /* autoplay */
  useEffect(() => {
    if (!product || !loop || paused || reduced) return;
    const t = window.setInterval(next, 4200);
    return () => window.clearInterval(t);
  }, [product, loop, paused, reduced, next]);

  if (!product) return null;

  /* pista infinita: [último, ...todas, primero] */
  const track = loop ? [images[len - 1], ...images, images[0]] : images;
  const jump = (i: number) => {
    if (i === realIdx) return;
    setAnim(false);
    setIdx(i);
  };

  const onTrackEnd = () => {
    if (!loop) return;
    if (idx === len) {
      setAnim(false);
      setIdx(0);
    } else if (idx === -1) {
      setAnim(false);
      setIdx(len - 1);
    }
  };

  const directMsg = `Hola Terramak, quiero cotizar: ${product.brand} ${product.name} (${product.condition}, ${product.usage}). ¿Me confirman disponibilidad y precio final?`;

  return (
    <div
      className="page-in fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de fotos — ${product.brand} ${product.name}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/96 backdrop-blur-sm" aria-hidden="true" />

      <div
        className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden border border-steel bg-coal shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* cabecera */}
        <div className="flex items-center justify-between gap-4 border-b border-steel px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="h-3.5 w-3.5 shrink-0" style={{ background: accent }} />
            <p className="truncate font-display text-lg uppercase tracking-wide text-paper">
              {product.brand} {product.name}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <span className="font-cond text-[0.72rem] font-bold uppercase tracking-[0.22em] text-smoke">
              Foto {realIdx + 1} <span className="text-steel">/</span> {len}
            </span>
            <button
              onClick={onClose}
              aria-label="Cerrar galería"
              className="grid h-10 w-10 place-items-center border border-steel text-fog transition-colors hover:border-amber hover:text-amber"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.55fr_1fr] lg:overflow-hidden">
          {/* carrusel */}
          <div
            className="flex min-w-0 flex-col lg:overflow-y-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="relative aspect-[16/10] w-full overflow-hidden bg-ink"
              onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX === null) return;
                const dx = e.changedTouches[0].clientX - touchX;
                if (dx < -45) next();
                if (dx > 45) prev();
                setTouchX(null);
              }}
            >
              <div
                className="flex h-full"
                style={{
                  transform: `translateX(-${(idx + (loop ? 1 : 0)) * 100}%)`,
                  transition:
                    anim && !reduced
                      ? "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)"
                      : "none",
                }}
                onTransitionEnd={onTrackEnd}
              >
                {track.map((src, i) => (
                  <div key={i} className="h-full w-full shrink-0">
                    <img
                      src={src}
                      alt={`${product.brand} ${product.name} — foto ${
                        loop ? ((i - 1 + len) % len) + 1 : i + 1
                      }`}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>

              {/* controles sobre la imagen */}
              {loop && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-paper/25 bg-ink/60 text-paper backdrop-blur-sm transition-all hover:border-amber hover:bg-amber hover:text-ink"
                  >
                    <Icon name="arrow-right" className="h-5 w-5 rotate-180" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Foto siguiente"
                    className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-paper/25 bg-ink/60 text-paper backdrop-blur-sm transition-all hover:border-amber hover:bg-amber hover:text-ink"
                  >
                    <Icon name="arrow-right" className="h-5 w-5" />
                  </button>
                  <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => jump(i)}
                        aria-label={`Ir a la foto ${i + 1}`}
                        className={`h-1.5 transition-all duration-300 ${
                          i === realIdx
                            ? "w-7"
                            : "w-3 bg-paper/40 hover:bg-paper/80"
                        }`}
                        style={i === realIdx ? { background: accent } : undefined}
                      />
                    ))}
                  </div>
                </>
              )}
              {!loop && (
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap border border-paper/20 bg-ink/70 px-3 py-1.5 font-cond text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-fog backdrop-blur-sm">
                  Próximamente más fotos de este equipo
                </p>
              )}
            </div>

            {/* miniaturas */}
            {loop && (
              <div className="flex gap-2.5 overflow-x-auto border-t border-steel bg-ink/60 p-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => jump(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden border-2 transition-all duration-300 ${
                      i === realIdx
                        ? "opacity-100"
                        : "border-transparent opacity-50 hover:opacity-90"
                    }`}
                    style={i === realIdx ? { borderColor: accent } : undefined}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ficha del equipo */}
          <div className="flex flex-col border-t border-steel lg:overflow-y-auto lg:border-l lg:border-t-0">
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="px-2.5 py-1 font-cond text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink"
                  style={{ background: accent }}
                >
                  {product.condition}
                </span>
                <span className="border border-steel px-2.5 py-1 font-cond text-[0.64rem] font-bold uppercase tracking-[0.16em] text-fog">
                  {product.usage}
                </span>
                {product.badge && (
                  <span className="bg-amber px-2.5 py-1 font-cond text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink">
                    {product.badge}
                  </span>
                )}
              </div>

              <h2 className="mt-4 font-display text-2xl uppercase leading-tight tracking-wide text-paper sm:text-3xl">
                {product.brand} {product.name}
              </h2>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {product.specs.map((s) => (
                  <li
                    key={s}
                    className="border border-steel bg-ink px-2.5 py-1 font-cond text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-fog"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <dl className="mt-5 space-y-2.5 border-t border-dashed border-steel pt-5">
                {product.ficha.map((f) => (
                  <div key={f.k} className="flex justify-between gap-4 text-sm">
                    <dt className="shrink-0 font-semibold text-smoke">{f.k}</dt>
                    <dd className="text-right text-fog">{f.v}</dd>
                  </div>
                ))}
              </dl>

              {loop && (
                <p className="mt-5 hidden items-center gap-2 font-cond text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-smoke/70 lg:flex">
                  <Icon name="chevron" className="h-3.5 w-3.5 -rotate-90" />
                  <Icon name="chevron" className="h-3.5 w-3.5 rotate-90" />
                  Usa las flechas del teclado o desliza
                </p>
              )}
            </div>

            <div className="mt-auto border-t border-steel bg-ink/50 p-6">
              <p className="font-cond text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-smoke">
                Precio referencial
              </p>
              <p className="font-display text-3xl tracking-wide text-paper">
                {fmtPrice(product.price)}
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={waLink(directMsg)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-wa w-full"
                >
                  <Icon name="whatsapp" className="h-4.5 w-4.5" />
                  Cotizar por WhatsApp
                </a>
                <button
                  onClick={() => {
                    onClose();
                    onWizard(product);
                  }}
                  className="btn btn-ghost-light w-full"
                >
                  Hablar con un asesor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
