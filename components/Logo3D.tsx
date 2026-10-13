"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

/* ============================================================
   Logo 3D "balão/gel" — letras infladas, brilhantes e quicando
   uma a uma, com hover elástico. Fiéis ao logotipo da marca.
   ============================================================ */

type Theme = "pink" | "cyan" | "orange";

const themes: Record<Theme, CSSProperties> = {
  pink: { ["--gloss-a" as any]: "#ffd0e8", ["--gloss-b" as any]: "#ff6ec2", ["--gloss-c" as any]: "#f22c9c" },
  cyan: { ["--gloss-a" as any]: "#e6fbff", ["--gloss-b" as any]: "#5ce1ff", ["--gloss-c" as any]: "#2ac7f0" },
  orange: { ["--gloss-a" as any]: "#fff0d0", ["--gloss-b" as any]: "#ffc93c", ["--gloss-c" as any]: "#ff9a2e" },
};

const letters: { ch: string; theme: Theme }[] = [
  { ch: "S", theme: "pink" },
  { ch: "o", theme: "pink" },
  { ch: "p", theme: "pink" },
  { ch: "h", theme: "pink" },
  { ch: "i", theme: "pink" },
  { ch: "i", theme: "cyan" },
  { ch: "i", theme: "cyan" },
  { ch: "A", theme: "cyan" },
  { ch: "r", theme: "cyan" },
  { ch: "t", theme: "cyan" },
  { ch: "3", theme: "orange" },
  { ch: "D", theme: "pink" },
];

export default function Logo3D({
  className = "",
  sizeClass = "text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
}: {
  className?: string;
  sizeClass?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <h1
      aria-label="SophiArt3D"
      className={`balloon select-none leading-none ${sizeClass} ${className}`}
      style={{ letterSpacing: "-0.01em" }}
    >
      <span className="sr-only">SophiArt3D</span>
      <span aria-hidden="true" className="flex flex-wrap items-end justify-center">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            className={`gloss inline-block`}
            style={themes[l.theme]}
            initial={reduce ? false : { y: -70, opacity: 0, rotate: -10, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            transition={
              reduce
                ? { duration: 0.01 }
                : { type: "spring", stiffness: 460, damping: 11, delay: 0.15 + i * 0.07 }
            }
            whileHover={
              reduce
                ? undefined
                : { scale: 1.16, y: -8, rotate: Math.random() * 10 - 5, transition: { type: "spring", stiffness: 420, damping: 9 } }
            }
          >
            {l.ch}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}
