"use client";

import { motion, useReducedMotion } from "framer-motion";
import FloatToy from "@/components/FloatToy";
import { Sparkle } from "@/components/shapes";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/whatsapp";
import { fireConfetti } from "@/lib/confetti";

export default function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-bubble-300 py-28 sm:py-36" aria-label="Chamada final">
      <div className="dots absolute inset-0" aria-hidden="true" />

      {/* brinquedos em profundidades diferentes */}
      <FloatToy name="rosquinha-rosa" depth={0.25} range={260} mouse={8} className="left-[14%] top-[10%] w-14 sm:w-20" />
      <FloatToy name="rosquinha-chocolate" depth={0.45} range={260} mouse={14} className="right-[10%] top-[8%] w-24 sm:w-36" float="anim-float-med" />
      <FloatToy name="polvo" depth={0.9} range={300} mouse={30} className="bottom-[2%] left-[2%] hidden w-52 lg:block" float="anim-bob" />
      <FloatToy name="robo" depth={0.75} range={300} mouse={26} className="bottom-[4%] right-[3%] hidden w-48 lg:block" float="anim-float-med" />
      <FloatToy name="gato-aceno" depth={0.55} range={240} mouse={18} className="left-[22%] top-[52%] hidden w-28 xl:block" />
      <Sparkle size={26} className="anim-sparkle absolute left-[32%] top-[16%]" color="#fff" />
      <Sparkle size={20} className="anim-sparkle absolute bottom-[24%] right-[26%]" color="#fff" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <motion.h2
          initial={reduce ? false : { y: 40, opacity: 0, scale: 0.92 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
          className="sticker-title text-6xl leading-[0.98] text-white sm:text-7xl md:text-8xl"
        >
          Bora criar sua peça?
        </motion.h2>

        <p className="mx-auto mt-6 max-w-[40ch] text-xl font-bold text-grape-900">
          Sua ideia merece ganhar forma. Chama a gente e conta o que você imaginou.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => fireConfetti(e.clientX, e.clientY, 42)}
            className="btn-mash group inline-flex items-center gap-4 rounded-full border-[3px] border-grape-900 bg-[#25D366] px-8 py-5 font-display text-2xl font-semibold text-grape-900 shadow-[0_8px_0_var(--color-grape-900)] sm:px-12 sm:text-3xl"
          >
            <WhatsAppIcon className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
            Falar agora no WhatsApp
          </a>
        </div>

        <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-grape-900/80">
          Santa Catarina · atendemos todo o Brasil
        </p>
      </div>
    </section>
  );
}
