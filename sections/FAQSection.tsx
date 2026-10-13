"use client";

import SectionHeading from "@/components/SectionHeading";
import Accordion from "@/components/Accordion";
import FloatToy from "@/components/FloatToy";
import { faq } from "@/data/faq";

export default function FAQSection() {
  return (
    <section className="dark-world relative overflow-hidden py-20 sm:py-28" aria-label="Perguntas frequentes">
      <FloatToy name="gato" depth={0.7} mouse={22} className="right-[4%] top-[8%] hidden w-36 lg:block" float="anim-bob" />
      <FloatToy name="robo" depth={0.35} mouse={10} className="left-[4%] top-[26%] hidden w-28 lg:block" />
      <FloatToy name="rosquinha-morango" depth={0.9} mouse={30} className="bottom-[6%] left-[6%] hidden w-36 xl:block" float="anim-float-med" />

      <div className="relative z-10 mx-auto max-w-3xl px-5">
        <SectionHeading
          onDark
          eyebrow="Tá com dúvida?"
          title={
            <>
              A gente <span className="text-sky-400">responde</span>
            </>
          }
          subtitle="Reunimos aqui o que mais perguntam. Se ficar qualquer dúvida, é só chamar no WhatsApp."
        />

        <div className="mt-12">
          <Accordion items={faq} />
        </div>
      </div>
    </section>
  );
}
