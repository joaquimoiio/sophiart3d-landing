"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { motion } from "framer-motion";
import Logo3D from "@/components/Logo3D";
import CTAButton from "@/components/CTAButton";
import Marquee from "@/components/Marquee";
import Toy, { type ToyName } from "@/components/Toy";
import OctopusMascot from "@/components/OctopusMascot";
import { Cube, Sparkle } from "@/components/shapes";
import { WhatsAppIcon } from "@/components/icons";
import { gsap } from "@/lib/gsap";
import { whatsappLink } from "@/lib/whatsapp";
import { fireConfetti } from "@/lib/confetti";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/hooks";
import { products } from "@/data/products";

/**
 * Cada peça flutuante tem três movimentos independentes, um por wrapper:
 *  - fly:   no scroll, voa para fora da tela e cresce (a câmera "mergulha")
 *  - mouse: desliza conforme o cursor; quanto maior o valor, mais perto da câmera
 *  - float: balanço contínuo em CSS
 */
type Piece = {
  toy: ToyName;
  /** posição + largura (classes Tailwind) */
  box: string;
  fly: { x: string; y: string; scale: number; rotate?: number };
  mouse: number;
  float: "anim-float-slow" | "anim-float-med" | "anim-bob";
  delay: number;
};

const pieces: Piece[] = [
  // Fundo (pequenas, lentas)
  {
    toy: "rosquinha",
    box: "left-[4%] top-[16%] w-[10vw] lg:w-[5vw]",
    fly: { x: "-14vw", y: "-30vh", scale: 1.3, rotate: -40 },
    mouse: 8,
    float: "anim-float-slow",
    delay: 0.5,
  },
  {
    toy: "rosquinha-rosa",
    box: "right-[5%] top-[14%] w-[12vw] lg:w-[6.5vw]",
    fly: { x: "16vw", y: "-32vh", scale: 1.3, rotate: 40 },
    mouse: 10,
    float: "anim-float-med",
    delay: 0.6,
  },
  // Meio (personagens)
  {
    toy: "gato",
    box: "left-[1%] top-[53%] w-[25vw] sm:w-[19vw] lg:left-[8%] lg:top-[37%] lg:w-[14vw]",
    fly: { x: "-46vw", y: "-8vh", scale: 1.8, rotate: -14 },
    mouse: 22,
    float: "anim-float-slow",
    delay: 0.75,
  },
  {
    toy: "robo",
    box: "right-[1%] top-[52%] w-[24vw] sm:w-[19vw] lg:right-[7%] lg:top-[36%] lg:w-[14vw]",
    fly: { x: "46vw", y: "-10vh", scale: 1.8, rotate: 14 },
    mouse: 26,
    float: "anim-float-med",
    delay: 0.85,
  },
  // Primeiro plano (maiores, saem rápido)
  {
    toy: "rosquinha-chocolate",
    box: "-left-[6%] bottom-[1%] w-[24vw] lg:-left-[2%] lg:-bottom-[4%] lg:w-[12vw]",
    fly: { x: "-52vw", y: "34vh", scale: 2.4, rotate: -70 },
    mouse: 48,
    float: "anim-float-slow",
    delay: 1,
  },
  {
    toy: "rosquinha-morango",
    box: "-right-[7%] bottom-[9%] w-[26vw] lg:-right-[1%] lg:bottom-[14%] lg:w-[11vw]",
    fly: { x: "54vw", y: "30vh", scale: 2.4, rotate: 80 },
    mouse: 54,
    float: "anim-float-med",
    delay: 1.1,
  },
];

const bits = [
  { kind: "cube", box: "left-[21%] top-[60%]", size: 44, color: "#5ce1ff", top: "#eafcff", fly: { x: "-30vw", y: "10vh" }, mouse: 16 },
  { kind: "cube", box: "right-[23%] top-[64%]", size: 36, color: "#ffc93c", top: "#fff2cf", fly: { x: "30vw", y: "14vh" }, mouse: 18 },
  { kind: "cube", box: "left-[30%] top-[12%] hidden lg:block", size: 30, color: "#ff6ec2", top: "#ffe1f1", fly: { x: "-12vw", y: "-30vh" }, mouse: 9 },
  { kind: "spark", box: "right-[30%] top-[13%]", size: 26, color: "#ffffff", fly: { x: "10vw", y: "-28vh" }, mouse: 7 },
  { kind: "spark", box: "left-[16%] top-[33%]", size: 20, color: "#ffffff", fly: { x: "-24vw", y: "-16vh" }, mouse: 12 },
  { kind: "spark", box: "right-[17%] top-[72%]", size: 22, color: "#ffffff", fly: { x: "26vw", y: "20vh" }, mouse: 14 },
] as const;

// Bolhas que sobem ao fundo, em ritmos diferentes
const rising = [
  { left: "12%", size: 34, dur: 12, delay: 0 },
  { left: "27%", size: 20, dur: 9, delay: 3.5 },
  { left: "41%", size: 26, dur: 14, delay: 6 },
  { left: "63%", size: 18, dur: 10, delay: 1.5 },
  { left: "76%", size: 38, dur: 13, delay: 4.5 },
  { left: "90%", size: 24, dur: 11, delay: 8 },
];

const categories = [...products.map((p) => p.title), "Peças sob medida"];

export default function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  // Mergulho no scroll: tudo que tem [data-fly] voa para fora, o mascote vem para a câmera.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced) return;

    const ctx = gsap.context(() => {
      const st = { trigger: wrap, start: "top top", end: "bottom bottom", scrub: 0.6 };

      gsap.utils.toArray<HTMLElement>("[data-fly]").forEach((el) => {
        const d = el.dataset;
        gsap.to(el, {
          x: d.flyX,
          y: d.flyY,
          scale: Number(d.flyScale ?? 1.4),
          rotate: Number(d.flyRotate ?? 0),
          ease: "power1.in",
          scrollTrigger: st,
        });
      });

      gsap.to("[data-hero-copy]", { y: "-22vh", opacity: 0, ease: "power1.in", scrollTrigger: st });
      gsap.to("[data-hero-mascot]", { scale: 1.9, y: "16vh", ease: "power1.in", scrollTrigger: st });
      gsap.to("[data-hero-disc]", { scale: 3.4, ease: "power1.in", scrollTrigger: st });
      gsap.to("[data-hero-strip]", { y: "30vh", opacity: 0, ease: "power1.in", scrollTrigger: st });
    }, wrap);

    return () => ctx.revert();
  }, [reduced]);

  // Parallax de cursor (só desktop): cada camada desliza proporcional à sua profundidade.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced || !isDesktop) return;

    const layers = Array.from(wrap.querySelectorAll<HTMLElement>("[data-mouse]")).map((el) => ({
      depth: Number(el.dataset.mouse),
      xTo: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
      yTo: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
    }));

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      layers.forEach((l) => {
        l.xTo(-nx * l.depth);
        l.yTo(-ny * l.depth * 0.7);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, isDesktop]);

  return (
    <section
      ref={wrapRef}
      id="top"
      aria-label="Início"
      className={`relative ${reduced ? "" : "h-[170vh]"}`}
    >
      <div className="cotton-bg sticky top-0 h-[100svh] min-h-[620px] w-full overflow-hidden">
        <div className="dots absolute inset-0" aria-hidden="true" />

        {/* disco chapado atrás do mascote */}
        <div
          data-hero-disc
          aria-hidden="true"
          className="absolute bottom-[-34vh] left-1/2 h-[78vh] w-[78vh] -translate-x-1/2 rounded-full bg-[#e3d1fd]"
        />

        {/* faixa de categorias: passa por trás do mascote */}
        <div
          data-hero-strip
          className="absolute inset-x-0 bottom-[6%] border-y-[3px] border-grape-800 bg-lemon-400 font-display text-base font-semibold uppercase tracking-wide text-grape-800 sm:text-lg"
        >
          <Marquee duration={38} className="!py-2">
            {categories.map((c) => (
              <span key={c} className="mx-5 inline-flex items-center gap-10 whitespace-nowrap">
                {c}
                <span className="h-2.5 w-2.5 rounded-full bg-grape-800" aria-hidden="true" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* bolhas subindo ao fundo */}
        {rising.map((r, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="anim-rise absolute -bottom-12"
            style={{ left: r.left, width: r.size, "--bubble-dur": `${r.dur}s`, "--bubble-delay": `${r.delay}s` } as CSSProperties}
          >
            <Toy name="bolha" sizes="40px" className="!aspect-auto" />
          </div>
        ))}

        {/* miudezas */}
        {bits.map((b, i) => (
          <div
            key={i}
            data-fly
            data-fly-x={b.fly.x}
            data-fly-y={b.fly.y}
            data-fly-scale={1.6}
            data-fly-rotate={i % 2 ? 90 : -90}
            className={`absolute ${b.box}`}
            aria-hidden="true"
          >
            <div data-mouse={b.mouse}>
              {b.kind === "cube" ? (
                <Cube size={b.size} color={b.color} top={b.top} className="anim-float-med" />
              ) : (
                <Sparkle size={b.size} color={b.color} className="anim-sparkle" />
              )}
            </div>
          </div>
        ))}

        {/* brinquedos em camadas */}
        {pieces.map((p, i) => (
          <div
            key={i}
            data-fly
            data-fly-x={p.fly.x}
            data-fly-y={p.fly.y}
            data-fly-scale={p.fly.scale}
            data-fly-rotate={p.fly.rotate ?? 0}
            className={`absolute ${p.box}`}
          >
            <div data-mouse={p.mouse}>
              <div className="anim-pop" style={{ animationDelay: `${p.delay}s` }}>
                <Toy name={p.toy} className={p.float} sizes="(max-width: 1024px) 38vw, 20vw" />
              </div>
            </div>
          </div>
        ))}

        {/* mascote: clique para chover confete */}
        <div className="absolute bottom-[2%] left-1/2 w-[min(62vw,46vh)] -translate-x-1/2">
          <div data-hero-mascot className="origin-bottom">
            <div data-mouse={14}>
              <button
                type="button"
                aria-label="Fazer chover confete"
                onClick={(e) => fireConfetti(e.clientX, e.clientY, 40)}
                className="anim-pop block w-full cursor-pointer"
                style={{ animationDelay: "0.35s" }}
                data-cursor
              >
                <OctopusMascot priority />
              </button>
            </div>
          </div>
        </div>

        {/* logo + chamada */}
        <div
          data-hero-copy
          className="relative z-10 flex flex-col items-center px-4 pt-[clamp(5.5rem,13vh,8.5rem)] text-center"
        >
          <Logo3D sizeClass="text-[min(13.5vw,19vh)] lg:text-[min(11.5vw,21vh)]" />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.32, 0.72, 0, 1] }}
            className="mt-3 max-w-[30ch] font-display text-xl font-semibold leading-tight text-grape-800 sm:max-w-none sm:text-2xl lg:mt-4 lg:text-[1.7rem]"
          >
            Peças personalizadas em impressão 3D, feitas pela Denise e pelo Guilherme.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: [0.32, 0.72, 0, 1] }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <CTAButton href={whatsappLink()} external size="lg" variant="primary" icon={<WhatsAppIcon className="h-4 w-4" />}>
              Pedir no WhatsApp
            </CTAButton>
            <CTAButton href="#criacoes" variant="secondary" size="lg">
              Ver criações
            </CTAButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
