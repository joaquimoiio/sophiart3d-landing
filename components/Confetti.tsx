"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const COLORS = ["#ff4fb0", "#5ce1ff", "#ffc93c", "#b28ae8", "#ff8ad1", "#ffffff", "#ff9a2e"];

type Detail = { x: number; y: number; count: number };

/** Chuva de confete em DOM (Web Animations API). Leve e sem canvas. */
export default function Confetti() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const burst = (e: Event) => {
      if (reduced) return;
      const { x, y, count } = (e as CustomEvent<Detail>).detail;
      for (let i = 0; i < count; i++) {
        const bit = document.createElement("div");
        bit.className = "confetti-bit";
        const size = 7 + Math.random() * 11;
        const round = Math.random() > 0.55;
        bit.style.width = `${size}px`;
        bit.style.height = `${round ? size : size * (0.5 + Math.random())}px`;
        bit.style.background = COLORS[i % COLORS.length];
        bit.style.borderRadius = round ? "50%" : "3px";
        bit.style.left = `${x}px`;
        bit.style.top = `${y}px`;
        document.body.appendChild(bit);

        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 190;
        const dx = Math.cos(angle) * dist;
        const up = Math.sin(angle) * dist - 130;
        const rot = (Math.random() - 0.5) * 800;

        const anim = bit.animate(
          [
            { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
            {
              transform: `translate(${dx * 0.55}px, ${up}px) rotate(${rot * 0.5}deg)`,
              opacity: 1,
              offset: 0.42,
            },
            {
              transform: `translate(${dx}px, ${up + 280}px) rotate(${rot}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 1100 + Math.random() * 1000,
            easing: "cubic-bezier(0.18,0.62,0.32,1)",
          }
        );
        anim.onfinish = () => bit.remove();
      }
    };

    window.addEventListener("sophiart:confetti", burst);
    return () => window.removeEventListener("sophiart:confetti", burst);
  }, [reduced]);

  return null;
}
