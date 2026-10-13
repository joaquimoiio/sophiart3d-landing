"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Printer from "@/components/Printer";
import FloatToy from "@/components/FloatToy";
import { Icon, type IconName } from "@/components/icons";

const steps: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "ideia",
    title: "Você conta sua ideia",
    text: "Chama a gente no WhatsApp e conta o que quer criar. Pode ser um rascunho, uma foto ou só um sonho — a gente ajuda a dar forma.",
  },
  {
    icon: "desenho",
    title: "A gente desenha",
    text: "Transformamos a sua ideia em um modelo 3D, escolhendo formatos, cores e detalhes juntinho com você.",
  },
  {
    icon: "impressora",
    title: "A mágica da impressão",
    text: "A peça nasce camada por camada na impressora. É aqui que o filamento vira objeto de verdade — e a gente vigia de perto.",
  },
  {
    icon: "pacote",
    title: "Sua peça pronta",
    text: "Finalizamos com todo o carinho e combinamos a melhor forma de você receber. Pronto: a sua ideia agora é realidade!",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  return (
    <>
      <section
        ref={sectionRef}
        id="como-funciona"
        className="relative overflow-hidden bg-bubble-50 py-20 sm:py-28"
        aria-label="Como a mágica acontece"
      >

        <FloatToy name="gato-aceno" depth={0.7} className="right-[3%] top-[6%] hidden w-36 lg:block" />
        <FloatToy name="robo" depth={0.3} mouse={10} className="left-[1%] top-[40%] hidden w-28 xl:block" />
        <FloatToy name="rosquinha-morango" depth={0.9} mouse={30} className="-right-8 bottom-[6%] hidden w-36 lg:block" float="anim-float-med" />

        <div className="relative z-10 mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Como a mágica acontece"
            title={
              <>
                Da <span className="text-bubble-300">ideia</span> à sua{" "}
                <span className="text-sky-400">mão</span>
              </>
            }
            subtitle="São 4 passos. Enquanto você rola a página, a impressora vai montando a peça."
          />

          <div className="mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Impressora sticky */}
            <div className="order-2 lg:order-1">
              <div className="lg:sticky lg:top-24">
                <div className="bezel mx-auto max-w-md">
                  <div className="bezel-inner bg-lilac-50 p-6">
                    <Printer className="mx-auto w-full max-w-[320px]" triggerRef={sectionRef} />
                    <p className="mt-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-grape-700/70">
                      imprimindo camada por camada
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passos */}
            <ol className="order-1 flex flex-col gap-8 lg:order-2">
              {steps.map((s, i) => (
                <motion.li
                  key={i}
                  initial={reduce ? false : { y: 40, opacity: 0, filter: "blur(6px)" }}
                  whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  className="flex gap-5 rounded-[1.75rem] card-toy p-6"
                >
                  <div className="relative">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border-[3px] border-grape-800 bg-lemon-400 text-grape-800">
                      <Icon name={s.icon} className="h-7 w-7" />
                    </span>
                    <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border-2 border-grape-800 bg-bubble-500 font-display text-sm font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-grape-800">{s.title}</h3>
                    <p className="mt-2 font-semibold leading-relaxed text-grape-800/80">{s.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
