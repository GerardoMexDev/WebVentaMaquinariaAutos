import { useEffect, useRef, useState } from "react";
import { CATEGORIES, Product, waLink } from "../data/catalog";
import { Icon } from "./ui";

export type WizardCtx = { product?: Product } | null;

type Msg = { from: "bot" | "user"; text: string };
type Phase = "typing" | "reply" | "input" | "done";

interface Answers {
  cat?: string;
  uso?: string;
  tiempo?: string;
  contacto?: string;
}

const QUESTIONS: { key: keyof Answers; ask: string; opts: string[] }[] = [
  {
    key: "cat",
    ask: "¡Hola! Soy el asistente de Terramak. Te haré 4 preguntas rápidas para conectarte con el asesor correcto. Primero: ¿qué tipo de equipo estás buscando?",
    opts: CATEGORIES.map((c) => c.name),
  },
  {
    key: "uso",
    ask: "Perfecto. ¿Para qué necesitas el equipo?",
    opts: ["Mi empresa u obra", "Trabajo independiente", "Uso personal"],
  },
  {
    key: "tiempo",
    ask: "¿Y cuándo planeas hacer la compra?",
    opts: ["Compra inmediata (0–30 días)", "En 1 a 3 meses", "Solo estoy explorando"],
  },
];

const CONTACTO_ASK =
  "¡Última pregunta! Déjame tu nombre, ciudad y presupuesto aproximado para preparar tu cotización.";

export default function WhatsAppAssistant({
  open,
  ctx,
  onClose,
  onOpen,
}: {
  open: boolean;
  ctx: WizardCtx;
  onClose: () => void;
  onOpen: () => void;
}) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [phase, setPhase] = useState<Phase>("typing");
  const [answers, setAnswers] = useState<Answers>({});
  const [input, setInput] = useState("");
  const [startedFor, setStartedFor] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const ctxKey = ctx?.product?.id ?? "general";

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const start = () => {
    setMsgs([]);
    setAnswers({});
    setInput("");
    setPhase("typing");
    const product = ctx?.product;
    const greet = product
      ? `¡Hola! Veo que te interesa la ${product.brand} ${product.name}. Te haré 4 preguntas rápidas y te paso con el asesor especialista.`
      : "¡Hola! Bienvenido a Terramak. Te haré 4 preguntas rápidas para conectarte con el asesor correcto.";
    later(() => {
      setMsgs([{ from: "bot", text: greet }]);
      setPhase("typing");
      later(() => {
        setMsgs((m) => [...m, { from: "bot", text: QUESTIONS[0].ask }]);
        setPhase("reply");
      }, 750);
    }, 700);
  };

  useEffect(() => {
    if (open && startedFor !== ctxKey) {
      setStartedFor(ctxKey);
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ctxKey]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, phase, open]);

  const answeredCount = [answers.cat, answers.uso, answers.tiempo, answers.contacto].filter(
    Boolean
  ).length;

  const answer = (opt: string) => {
    if (phase !== "reply") return;
    const step = answeredCount; // cat -> uso -> tiempo
    const q = QUESTIONS[step];
    setMsgs((m) => [...m, { from: "user", text: opt }]);
    setAnswers((a) => ({ ...a, [q.key]: opt }));
    setPhase("typing");
    later(() => {
      const next = QUESTIONS[step + 1];
      if (next) {
        setMsgs((m) => [...m, { from: "bot", text: next.ask }]);
        setPhase("reply");
      } else {
        setMsgs((m) => [...m, { from: "bot", text: CONTACTO_ASK }]);
        setPhase("input");
      }
    }, 850);
  };

  const sendContacto = () => {
    const text = input.trim();
    if (!text || phase !== "input") return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setAnswers((a) => ({ ...a, contacto: text }));
    setInput("");
    setPhase("typing");
    const firstName = text.split(/[\s,]+/)[0];
    later(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text: `¡Gracias, ${firstName}! Tu perfil quedó registrado y ya notifiqué al asesor de la división. Aquí tienes tu resumen — pulsa el botón para continuar la conversación en WhatsApp.`,
        },
      ]);
      setPhase("done");
    }, 1000);
  };

  const waMessage = () => {
    const p = ctx?.product;
    const lines = [
      "Hola Terramak, quiero cotizar un equipo.",
      "",
      `• Equipo: ${p ? `${p.brand} ${p.name} (${p.condition}, ${p.usage})` : "Por definir con el asesor"}`,
      `• Categoría: ${answers.cat ?? "—"}`,
      `• Uso principal: ${answers.uso ?? "—"}`,
      `• Tiempo de compra: ${answers.tiempo ?? "—"}`,
      `• Contacto: ${answers.contacto ?? "—"}`,
      "",
      "(Perfil enviado desde terramak.pe)",
    ];
    return lines.join("\n");
  };

  const currentOpts =
    phase === "reply" ? QUESTIONS[Math.min(answeredCount, QUESTIONS.length - 1)].opts : [];

  return (
    <>
      {/* botón flotante */}
      {!open && (
        <button
          onClick={onOpen}
          className="group fixed bottom-5 right-5 z-[60] flex items-center gap-3"
          aria-label="Abrir asistente de cotización por WhatsApp"
        >
          <span className="pointer-events-none hidden translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
            <span className="block border border-steel bg-ink px-3.5 py-2 font-cond text-[0.7rem] font-bold uppercase tracking-[0.16em] text-paper shadow-xl">
              Cotiza en 4 preguntas
            </span>
          </span>
          <span className="relative grid h-15 w-15 place-items-center">
            <span className="absolute inset-0 rounded-full bg-wa/50 motion-safe:animate-ping" />
            <span className="relative grid h-15 w-15 place-items-center rounded-full bg-wa text-[#07270f] shadow-[0_14px_30px_-10px_rgba(35,193,94,0.6)] transition-transform duration-300 group-hover:scale-105">
              <Icon name="whatsapp" className="h-7 w-7" />
            </span>
          </span>
        </button>
      )}

      {/* panel de conversación */}
      {open && (
        <div
          className="page-in fixed bottom-5 right-5 z-[60] flex h-[min(600px,78svh)] w-[min(92vw,384px)] flex-col overflow-hidden rounded-lg border border-steel bg-concrete shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]"
          role="dialog"
          aria-label="Asistente de cotización Terramak"
        >
          {/* cabecera */}
          <div className="flex items-center gap-3 border-b-2 border-wa bg-ink px-4 py-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber font-display text-lg text-ink">
              T
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-paper">Asesor Terramak</p>
              <p className="flex items-center gap-1.5 text-[0.7rem] text-smoke">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-wa" />
                en línea · responde en ~15 min
              </p>
            </div>
            <span className="ml-auto border border-steel px-2 py-1 font-cond text-[0.62rem] font-bold uppercase tracking-[0.14em] text-fog">
              {phase === "done" ? "Completado" : `Pregunta ${Math.min(answeredCount + 1, 4)}/4`}
            </span>
            <button
              onClick={start}
              aria-label="Reiniciar conversación"
              title="Reiniciar"
              className="text-smoke transition-colors hover:text-amber"
            >
              <Icon name="reset" className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={onClose}
              aria-label="Cerrar asistente"
              className="text-smoke transition-colors hover:text-paper"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          {/* mensajes */}
          <div ref={scrollRef} className="dots-wa flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[86%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.from === "user"
                      ? "rounded-tr-sm bg-wabubble text-ink"
                      : "rounded-tl-sm border border-linel bg-paper text-ink"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {phase === "typing" && (
              <div className="flex justify-start">
                <div className="wa-typing rounded-lg rounded-tl-sm border border-linel bg-paper px-4 py-3 shadow-sm">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          {/* zona de respuesta */}
          {phase === "reply" && (
            <div className="border-t border-steel bg-ink p-3">
              <p className="mb-2 font-cond text-[0.62rem] font-bold uppercase tracking-[0.22em] text-smoke">
                Respuesta rápida
              </p>
              <div className="flex flex-col gap-2">
                {currentOpts.map((o) => (
                  <button
                    key={o}
                    onClick={() => answer(o)}
                    className="rounded-full border border-wa/40 bg-coal px-4 py-2.5 text-left text-sm text-paper transition-all duration-200 hover:border-wa hover:bg-wa hover:text-[#07270f] hover:pl-5"
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === "input" && (
            <div className="flex items-center gap-2 border-t border-steel bg-ink p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendContacto()}
                placeholder="Ej. Jorge Ríos, Trujillo, US$ 80,000"
                className="min-w-0 flex-1 rounded-full border border-steel bg-coal px-4 py-2.5 text-sm text-paper placeholder:text-smoke/50 outline-none transition-colors focus:border-wa"
                aria-label="Nombre, ciudad y presupuesto"
              />
              <button
                onClick={sendContacto}
                disabled={!input.trim()}
                aria-label="Enviar respuesta"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wa text-[#07270f] transition-all enabled:hover:brightness-110 disabled:opacity-40"
              >
                <Icon name="send" className="h-5 w-5" />
              </button>
            </div>
          )}

          {phase === "done" && (
            <div className="border-t border-steel bg-ink p-3">
              <a
                href={waLink(waMessage())}
                target="_blank"
                rel="noreferrer"
                className="btn btn-wa w-full"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                Continuar en WhatsApp
              </a>
              <p className="mt-2.5 text-center text-[0.68rem] leading-snug text-smoke">
                Se abrirá WhatsApp con tu resumen listo para enviar al asesor.
              </p>
              <button
                onClick={start}
                className="mx-auto mt-2 block font-cond text-[0.66rem] font-bold uppercase tracking-[0.2em] text-smoke underline-offset-4 transition-colors hover:text-amber hover:underline"
              >
                Hacer otra consulta
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
