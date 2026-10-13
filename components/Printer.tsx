"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Larguras das camadas (formam uma pecinha arredondada que "cresce"). */
const LAYER_W = [58, 78, 92, 96, 84, 62, 40];

/**
 * Impressora 3D estilizada que constrói uma peça camada por camada
 * conforme o scroll (scrub com ScrollTrigger). Sem WebGL.
 * `triggerRef`: seção mais alta que dispara a construção (scroll storytelling).
 */
export default function Printer({
  className = "",
  triggerRef,
}: {
  className?: string;
  triggerRef?: RefObject<HTMLElement | null>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced) return;

    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<SVGElement>("[data-layer]");
      gsap.set(layers, { y: -14, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef?.current ?? wrap,
          start: "top 78%",
          end: "bottom 40%",
          scrub: 0.7,
        },
      });

      tl.to(layers, {
        y: 0,
        opacity: 1,
        stagger: 0.14,
        ease: "power1.out",
      });

      // bico sobe conforme a peça cresce
      tl.fromTo(
        "[data-nozzle]",
        { y: -4 },
        { y: -74, ease: "none" },
        0
      );
      // brilho pulsante do bico
      tl.fromTo(
        "[data-tip]",
        { opacity: 0.35 },
        { opacity: 1, ease: "none", repeat: 3, yoyo: true },
        0
      );
    }, wrap);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={wrapRef} className={className}>
      <svg viewBox="0 0 300 340" className="h-full w-full" aria-hidden="true">
        {/* moldura */}
        <rect x="22" y="18" width="24" height="286" rx="12" fill="#7b3fd4" />
        <rect x="254" y="18" width="24" height="286" rx="12" fill="#7b3fd4" />
        <rect x="22" y="18" width="256" height="26" rx="13" fill="#5b2a9e" />
        <rect x="30" y="24" width="240" height="8" rx="4" fill="#8f57e0" opacity="0.7" />

        {/* trilho */}
        <rect x="52" y="52" width="196" height="12" rx="6" fill="#3b1a6e" />

        {/* bico / cabeça de impressão */}
        <g data-nozzle>
          <rect x="118" y="60" width="64" height="44" rx="14" fill="#5ce1ff" />
          <rect x="118" y="60" width="64" height="16" rx="8" fill="#7ee9ff" opacity="0.8" />
          <circle cx="150" cy="82" r="12" fill="#2ac7f0" />
          <polygon points="138,104 162,104 150,126" fill="#3b1a6e" />
          <g data-tip>
            <circle cx="150" cy="126" r="6" fill="#ff4fb0" />
          </g>
        </g>

        {/* mesa de impressão */}
        <rect x="46" y="252" width="208" height="24" rx="12" fill="#8f57e0" />
        <rect x="46" y="252" width="208" height="10" rx="5" fill="#b28ae8" opacity="0.8" />

        {/* peça crescendo em camadas */}
        <g>
          {LAYER_W.map((w, i) => (
            <rect
              key={i}
              data-layer
              x={150 - w / 2}
              y={248 - (i + 1) * 19}
              width={w}
              height="17"
              rx="8"
              fill={i % 2 === 0 ? "#ff6ec2" : "#ff8ad1"}
            />
          ))}
        </g>

        {/* base / pés */}
        <rect x="18" y="300" width="264" height="20" rx="10" fill="#3b1a6e" />
      </svg>
    </div>
  );
}
