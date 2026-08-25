import { useCallback, useEffect, useRef, useState } from "react";
import { getRoute, useHashRoute } from "./lib/hooks";
import { Product, catById } from "./data/catalog";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import {
  AboutSection,
  BrandMarquee,
  CTABand,
  DivisionsSection,
  ProcessSection,
  StatsBand,
  TestimonialsSection,
} from "./components/HomeSections";
import CatalogPage from "./components/CatalogPage";
import WhatsAppAssistant, { WizardCtx } from "./components/WhatsAppAssistant";
import { Icon } from "./components/ui";

const CAT_ROUTES = ["/vial", "/agro", "/autos"] as const;

function NotFound({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="gridlines-dark flex min-h-[70vh] items-center bg-ink px-5 pt-32 text-paper">
      <div className="mx-auto max-w-2xl text-center">
        <p className="num-outline font-display text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl uppercase tracking-wide">
          Esta ruta no está en obra
        </h1>
        <p className="mt-4 text-smoke">
          La página que buscas no existe o fue movida. Vuelve al inicio y explora nuestros
          catálogos.
        </p>
        <button onClick={() => navigate("/")} className="btn btn-amber mt-8">
          Volver al inicio
          <Icon name="arrow-right" className="h-4.5 w-4.5" />
        </button>
      </div>
    </section>
  );
}

export default function App() {
  const [route, navigateTo] = useHashRoute();
  const pendingRef = useRef<string | null>(null);
  const [wizard, setWizard] = useState<{ open: boolean; ctx: WizardCtx }>({
    open: false,
    ctx: null,
  });

  const scrollToSection = (id: string) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  const navigate = useCallback(
    (to: string, section?: string) => {
      if (getRoute() === to) {
        if (section) scrollToSection(section);
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      pendingRef.current = section ?? null;
      navigateTo(to);
    },
    [navigateTo]
  );

  /* al cambiar de ruta: ir arriba o a la sección pendiente */
  useEffect(() => {
    const id = pendingRef.current;
    if (id) {
      const t = window.setTimeout(() => {
        scrollToSection(id);
        pendingRef.current = null;
      }, 120);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [route]);

  const openWizard = (product?: Product) =>
    setWizard({ open: true, ctx: product ? { product } : null });

  const catId = (CAT_ROUTES as readonly string[]).includes(route)
    ? (route.slice(1) as "vial" | "agro" | "autos")
    : null;

  return (
    <div className="min-h-screen bg-ink">
      <div className="noise-layer" aria-hidden="true" />

      <Navbar route={route} navigate={navigate} onWizard={() => openWizard()} />

      <main key={route} className="page-in">
        {route === "/" ? (
          <>
            <Hero navigate={navigate} onWizard={() => openWizard()} />
            <BrandMarquee />
            <DivisionsSection navigate={navigate} />
            <StatsBand />
            <AboutSection />
            <ProcessSection onWizard={() => openWizard()} />
            <TestimonialsSection />
            <CTABand navigate={navigate} onWizard={() => openWizard()} />
          </>
        ) : catId ? (
          <CatalogPage
            meta={catById(catId)}
            navigate={navigate}
            onWizard={(p?: Product) => openWizard(p)}
          />
        ) : (
          <NotFound navigate={navigate} />
        )}
      </main>

      <Footer navigate={navigate} onWizard={() => openWizard()} />

      <WhatsAppAssistant
        open={wizard.open}
        ctx={wizard.ctx}
        onOpen={() => setWizard((w) => ({ ...w, open: true }))}
        onClose={() => setWizard((w) => ({ ...w, open: false }))}
      />
    </div>
  );
}
