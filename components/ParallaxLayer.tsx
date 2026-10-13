"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/hooks";

type ParallaxLayerProps = {
  children: ReactNode;
  /** 0 = longe (lento), 1 = perto (rápido). Controla profundidade real. */
  depth?: number;
  /** Deslocamento vertical total no scroll (px) quando depth = 1. */
  range?: number;
  /** Deslocamento horizontal total no scroll (px) quando depth = 1. */
  rangeX?: number;
  /**
   * Parallax de mouse (desktop). Valor em px para cada camada.
   * Sinal positivo segue o cursor, negativo vai na direção oposta.
   * Geralmente perto = negativo, longe = positivo.
   */
  mouseX?: number;
  mouseY?: number;
  /** Classe extra no wrapper externo. */
  className?: string;
  style?: CSSProperties;
  /** Desliga tudo (mobile, reduced-motion, etc). */
  disabled?: boolean;
};

/**
 * Camada de parallax reutilizável.
 * - Camada externa: parallax de scroll (scrub).
 * - Camada interna: parallax de mouse (quickTo, suavizado).
 * Assim scroll e mouse nunca briguem pelo mesmo `transform`.
 */
export default function ParallaxLayer({
  children,
  depth = 0.5,
  range = 190,
  rangeX = 0,
  mouseX = 0,
  mouseY = 0,
  className = "",
  style,
  disabled = false,
}: ParallaxLayerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || disabled || reduced) return;

    const ctx = gsap.context(() => {
      // 1) Parallax de scroll: quanto mais perto (depth alto), mais viaja.
      gsap.to(el, {
        y: -depth * range,
        ...(rangeX !== 0 ? { x: -depth * rangeX } : {}),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2) Parallax de mouse (só desktop).
      const m = mouseRef.current;
      if (m && isDesktop && (mouseX !== 0 || mouseY !== 0)) {
        const xTo = gsap.quickTo(m, "x", { duration: 0.9, ease: "power3.out" });
        const yTo = gsap.quickTo(m, "y", { duration: 0.9, ease: "power3.out" });
        const onMove = (e: MouseEvent) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;
          xTo(nx * mouseX);
          yTo(ny * mouseY);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        gsap.set(m, { x: 0, y: 0 });
        // guarda o listener para limpar
        (m as any)._cleanupMouse = () =>
          window.removeEventListener("mousemove", onMove);
      }
    }, el);

    return () => {
      const m = mouseRef.current;
      if (m && (m as any)._cleanupMouse) (m as any)._cleanupMouse();
      ctx.revert();
    };
  }, [depth, range, rangeX, mouseX, mouseY, disabled, reduced, isDesktop]);

  return (
    <div
      ref={scrollRef}
      className={className}
      style={{ ...style, willChange: "transform" }}
      aria-hidden={false}
    >
      <div ref={mouseRef} className="h-full w-full" style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
