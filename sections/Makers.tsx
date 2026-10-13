"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import FloatToy from "@/components/FloatToy";
import { Icon, InstagramIcon } from "@/components/icons";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";

export default function Makers() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  // A arte desliza dentro da moldura enquanto a seção passa (parallax interno).
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-inner]",
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, frame);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="quem-faz"
      className="dark-world relative overflow-hidden py-20 sm:py-28"
      aria-label="Quem faz"
    >
      <FloatToy name="polvo" depth={0.8} mouse={24} className="bottom-[3%] left-[2%] hidden w-36 xl:block" float="anim-bob" />
      <FloatToy name="robo" depth={0.5} mouse={16} className="right-[3%] top-[7%] hidden w-32 xl:block" float="anim-float-med" />
      <FloatToy name="rosquinha-rosa" depth={0.25} mouse={8} className="left-[8%] top-[10%] hidden w-20 lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <SectionHeading
          onDark
          eyebrow="Quem faz"
          title={
            <>
              Um casal que transforma <span className="text-lemon-400">ideias</span> em afeto
            </>
          }
          subtitle="A SophiArt3D nasceu em Santa Catarina, de uma família que acredita que todo presente pode ser único."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
            className="bezel"
          >
            <div ref={frameRef} className="bezel-inner relative aspect-[4/3] bg-lilac-50">
              <div data-inner className="absolute inset-x-0 -inset-y-[12%]">
                <Image
                  src="/images/hero-art.jpg"
                  alt="Arte da SophiArt3D: a logo cercada por pincéis, carretéis de filamento e bichinhos em 3D"
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <div>
            <p className="text-xl font-semibold leading-relaxed text-white/90">
              Somos a <strong className="text-bubble-300">Denise</strong> e o{" "}
              <strong className="text-sky-400">Guilherme</strong>, uma família empreendedora que
              trocou o "e se fosse possível?" pelo "vamos fazer!". Cada peça passa pelas nossas
              mãos, do primeiro rascunho ao último detalhe.
            </p>

            <div className="mt-8 space-y-5">
              {site.makers.map((m, i) => (
                <motion.a
                  key={m.handle}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduce ? false : { opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.32, 0.72, 0, 1] }}
                  className="group flex items-center gap-5 rounded-[1.6rem] border-[3px] border-white/25 bg-white/10 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/60"
                >
                  <span
                    className={`grid h-16 w-16 shrink-0 place-items-center rounded-full border-[3px] border-grape-900 text-grape-900 ${
                      i === 0 ? "bg-bubble-300" : "bg-sky-400"
                    }`}
                  >
                    <Icon name={m.icon} className="h-7 w-7" />
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-xl font-semibold text-white">{m.name}</p>
                    <p className="text-sm font-semibold text-white/80">{m.role}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-bubble-200">
                      <InstagramIcon className="h-4 w-4" /> @{m.handle}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
