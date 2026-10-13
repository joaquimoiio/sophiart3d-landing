"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import ParallaxLayer from "@/components/ParallaxLayer";
import Toy from "@/components/Toy";
import { Sparkle } from "@/components/shapes";
import { Icon, InstagramIcon } from "@/components/icons";
import { testimonials } from "@/data/testimonials";
import { highlights, site } from "@/data/site";

export default function SocialProof() {
  const reduce = useReducedMotion();
  const hasTestimonials = testimonials.length > 0;

  return (
    <section className="relative overflow-hidden bg-bubble-100 py-20 sm:py-28" aria-label="Instagram e depoimentos">
      <div className="mx-auto max-w-7xl px-5">
        {/* Depoimentos: só aparecem quando houver itens em data/testimonials.ts */}
        {hasTestimonials ? (
          <>
            <SectionHeading
              eyebrow="Quem já criou com a gente"
              title={
                <>
                  Histórias que viraram <span className="text-bubble-300">sorrisos</span>
                </>
              }
            />
            <div className="mb-16 mt-14 grid gap-7 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.figure
                  key={t.name}
                  initial={reduce ? false : { y: 42, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.75, delay: i * 0.12, ease: [0.32, 0.72, 0, 1] }}
                  className="card-toy flex flex-col p-7"
                >
                  <blockquote className="flex-1 text-lg font-semibold leading-relaxed text-grape-800">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-4">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-grape-800 font-display text-sm font-bold text-grape-900"
                      style={{ background: t.color }}
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-grape-800">{t.name}</p>
                      <p className="text-sm font-bold text-grape-800/70">
                        {t.city} · {t.product}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </>
        ) : null}

        {/* Bloco Instagram */}
        <motion.div
          initial={reduce ? false : { y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
          className="relative rounded-[2.5rem] border-[3px] border-grape-800 bg-grape-500 p-8 shadow-[0_10px_0_var(--color-grape-800)] sm:p-12"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="eyebrow">Siga no Instagram</p>
              <h2 className="sticker-title mt-5 text-4xl text-white sm:text-5xl">@{site.handle}</h2>
              <p className="mt-4 max-w-md text-lg font-semibold text-white/90">
                Bastidores, novidades e as peças que acabaram de sair da impressora.
              </p>

              {/* Destaques, como as bolinhas do perfil */}
              <ul className="mt-7 flex flex-wrap gap-4">
                {highlights.map((h) => (
                  <li key={h.label} className="flex w-[68px] flex-col items-center gap-2">
                    <span className="grid h-[64px] w-[64px] place-items-center rounded-full border-[3px] border-grape-900 bg-white text-grape-800">
                      <Icon name={h.icon} className="h-6 w-6" />
                    </span>
                    <span className="text-center text-[11px] font-bold leading-tight text-white/90">
                      {h.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <CTAButton
                  href={site.instagramUrl}
                  external
                  size="lg"
                  variant="light"
                  icon={<InstagramIcon className="h-4 w-4" />}
                >
                  Ver o perfil
                </CTAButton>
              </div>
            </div>

            {/* Gatinho em camadas */}
            <div className="relative mx-auto aspect-square w-full max-w-[380px]">
              <div className="absolute inset-[8%] rounded-full bg-grape-400" aria-hidden="true" />
              <ParallaxLayer depth={0.35} range={160} mouseX={-14} mouseY={-8} className="absolute inset-0 grid place-items-center">
                <div className="mx-auto w-[82%]">
                  <Toy name="gato-aceno" sizes="480px" className="anim-float-slow" />
                </div>
              </ParallaxLayer>
              <ParallaxLayer depth={0.8} range={220} mouseX={-30} mouseY={-18} className="absolute -right-[4%] top-[2%] w-[26%]">
                <Toy name="rosquinha-morango" className="anim-float-med" />
              </ParallaxLayer>
              <ParallaxLayer depth={0.6} range={200} mouseX={-22} mouseY={-12} className="absolute -left-[6%] bottom-[4%] w-[30%]">
                <Toy name="rosquinha-chocolate" className="anim-float-slow" />
              </ParallaxLayer>
              <Sparkle size={26} color="#ffc93c" className="anim-sparkle absolute left-[12%] top-[10%]" />
              <Sparkle size={18} color="#ffffff" className="anim-sparkle absolute bottom-[14%] right-[14%]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
