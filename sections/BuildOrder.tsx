"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import { orderMessage, whatsappLink } from "@/lib/whatsapp";
import { fireConfetti } from "@/lib/confetti";
import FloatToy from "@/components/FloatToy";

const TYPES = [
  "Letreiro / nome",
  "Chaveiro",
  "Decoração",
  "Peça de Páscoa",
  "Articulado",
  "Bichinho de Tricô 3D",
  "Outra ideia",
];

const COLORS = ["Rosa", "Roxo", "Azul", "Amarelo", "Laranja", "Branco", "Multicolorido"];

export default function BuildOrder() {
  const reduce = useReducedMotion();
  const [type, setType] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [details, setDetails] = useState<string>("");

  const toggleColor = (c: string) =>
    setColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const message = useMemo(
    () => orderMessage({ type, colors: colors.join(", "), details }),
    [type, colors, details]
  );

  return (
    <section
      className="relative overflow-hidden bg-lilac-50 py-20 sm:py-28"
      aria-label="Monte seu pedido"
    >

      <FloatToy name="robo" depth={0.8} mouse={26} className="right-[2%] top-[9%] hidden w-40 xl:block" float="anim-float-med" />
      <FloatToy name="rosquinha-chocolate" depth={0.4} mouse={12} className="left-[3%] top-[44%] hidden w-28 xl:block" />

      <div className="relative z-10 mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Personalizado do seu jeito"
          title={
            <>
              Monte seu pedido em{" "}
              <span className="text-bubble-300">3 passos</span>
            </>
          }
          subtitle="Sem cadastro. Escolha, escreva e mande: a mensagem já vai pronta para o WhatsApp."
        />

        <div className="mt-14 space-y-8">
          {/* Passo 1 */}
          <div className="rounded-[2rem] card-toy p-7">
            <h3 className="flex items-center gap-3 font-display text-xl font-semibold text-grape-800">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-bubble-500 font-display text-white">
                1
              </span>
              O que você quer criar?
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  aria-pressed={type === t}
                  className={`btn-mash rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                    type === t
                      ? "border-2 border-grape-800 bg-bubble-600 text-white"
                      : "border-2 border-grape-800/25 bg-white text-grape-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Passo 2 */}
          <div className="rounded-[2rem] card-toy p-7">
            <h3 className="flex items-center gap-3 font-display text-xl font-semibold text-grape-800">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-500 font-display text-white">
                2
              </span>
              Quais cores combinam com você?
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleColor(c)}
                  aria-pressed={colors.includes(c)}
                  className={`btn-mash rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                    colors.includes(c)
                      ? "border-2 border-grape-800 bg-sky-400 text-grape-900"
                      : "border-2 border-grape-800/25 bg-white text-grape-800"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Passo 3 */}
          <div className="rounded-[2rem] card-toy p-7">
            <h3 className="flex items-center gap-3 font-display text-xl font-semibold text-grape-800">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-grape-500 font-display text-white">
                3
              </span>
              Nome ou detalhes especiais
            </h3>
            <label className="sr-only" htmlFor="order-details">
              Nome ou detalhes
            </label>
            <input
              id="order-details"
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Ex.: nome 'Sophia', cores rosa e roxo, para o quarto da minha filha…"
              className="mash-input mt-5 w-full"
            />
          </div>

          {/* Preview da mensagem */}
          <motion.div
            initial={reduce ? false : { y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="bezel"
          >
            <div className="bezel-inner bg-grape-800 p-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                Sua mensagem pronta
              </p>
              <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-white/10 p-5 font-body text-base font-semibold leading-relaxed text-white">
                {message}
              </pre>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <CTAButton
                  href={whatsappLink(message)}
                  external
                  size="lg"
                  variant="primary"
                  onClick={() => fireConfetti()}
                  icon={
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  }
                >
                  Enviar no WhatsApp
                </CTAButton>
                <p className="text-sm font-semibold text-white/70">
                  Você ainda pode editar tudo na conversa.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
