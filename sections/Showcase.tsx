"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import Toy from "@/components/Toy";
import { Icon } from "@/components/icons";
import { products, type Product } from "@/data/products";
import { gsap } from "@/lib/gsap";
import { whatsappLink, productMessage } from "@/lib/whatsapp";

/* Card com tilt 3D que segue o mouse. */
function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 240, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 240, damping: 18 });

  return (
    <motion.div
      onMouseMove={
        reduce
          ? undefined
          : (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              x.set((e.clientX - r.left) / r.width - 0.5);
              y.set((e.clientY - r.top) / r.height - 0.5);
            }
      }
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="w-[78vw] max-w-[360px] shrink-0 sm:w-[340px]">
      <TiltCard className="bezel h-full">
        <div className="bezel-inner flex h-full flex-col bg-white p-6">
          {/* visual */}
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-[1.35rem] border-[3px] border-grape-800"
            style={{ background: product.gradient[1] }}
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 78vw, 340px"
                className="object-cover"
              />
            ) : (
              <>
                <div className="dots absolute inset-0" />
                <div className="absolute inset-0 grid place-items-center text-white">
                  <Icon name={product.icon} className="h-20 w-20" strokeWidth={1.75} />
                </div>
              </>
            )}
          </div>

          <h3 className="mt-5 font-display text-2xl font-semibold text-grape-800">{product.title}</h3>
          <p className="mt-1 font-display text-base font-semibold text-bubble-600">
            {product.tagline}
          </p>
          <p className="mt-3 flex-1 font-semibold leading-relaxed text-grape-800/80">
            {product.description}
          </p>

          <ul className="mt-4 space-y-2">
            {product.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-bold text-grape-800/75">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-grape-800 text-white">
                  <Icon name="check" className="h-3 w-3" strokeWidth={3.5} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <CTAButton
              href={whatsappLink(productMessage(product.title))}
              external
              variant="primary"
              className="w-full justify-center"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              }
            >
              Quero esse
            </CTAButton>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

export default function Showcase() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(track.scrollWidth - window.innerWidth + 80, 1);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // camadas de fundo em velocidades diferentes
      gsap.to("[data-bg-slow]", {
        x: () => -distance() * 0.45,
        ease: "none",
        scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${distance()}`, scrub: 1 },
      });
      gsap.to("[data-bg-fast]", {
        x: () => -distance() * 1.25,
        ease: "none",
        scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${distance()}`, scrub: 1 },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-grape-800 py-20 sm:py-24"
      aria-label="Vitrine de produtos"
      id="criacoes"
    >

      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          onDark
          eyebrow="Nossa vitrine"
          title={
            <>
              O que a gente{" "}
              <span className="text-lemon-400">cria</span>
            </>
          }
          subtitle="Seis categorias para escolher. E se a sua ideia não estiver aqui, a gente cria do zero."
        />
      </div>

      {/* Trilho horizontal pinado (desktop) / scroll nativo (mobile) */}
      <div ref={pinRef} className="relative mt-4 overflow-hidden">
        {/* palavra gigante que desliza mais devagar que os cartões */}
        <p
          data-bg-slow
          aria-hidden="true"
          className="giant-word pointer-events-none absolute left-[4vw] top-1/2 -translate-y-1/2 text-[34vh] text-grape-600/80"
        >
          letreiros chaveiros decorações articulados
        </p>
        <div data-bg-fast className="pointer-events-none absolute left-[70vw] top-[4%] hidden w-28 md:block">
          <Toy name="robo" className="anim-float-slow" />
        </div>
        <div data-bg-fast className="pointer-events-none absolute bottom-[3%] left-[150vw] hidden w-32 md:block">
          <Toy name="rosquinha-rosa" className="anim-float-med" />
        </div>
        <div className="flex items-center py-10 md:min-h-[100dvh] md:pb-6 md:pt-24">
          <div className="no-scrollbar w-full overflow-x-auto md:overflow-visible">
            <div ref={trackRef} className="flex w-max items-stretch gap-7 px-6 sm:px-10">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
              {/* Card final: convite */}
              <div className="flex w-[78vw] max-w-[360px] shrink-0 items-center sm:w-[340px]">
                <div className="bezel w-full">
                  <div className="bezel-inner flex h-full flex-col items-center justify-center gap-5 bg-lemon-400 p-8 text-center">
                    <div className="w-32">
                      <Toy name="polvo" className="anim-bob" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-grape-900">
                      Não achou o que queria?
                    </h3>
                    <p className="font-semibold text-grape-900/85">
                      A gente cria do seu jeito! Conte sua ideia e a gente dá um jeito.
                    </p>
                    <CTAButton href={whatsappLink()} external variant="secondary" className="justify-center">
                      Bora criar
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
