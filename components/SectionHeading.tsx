"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  onDark?: boolean;
  className?: string;
};

/** Cabeçalho de seção com entrada cinematográfica (fade-up + blur). */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  onDark = false,
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      className={`flex flex-col ${alignCls} gap-5 ${className}`}
      initial={reduce ? false : { y: 42, opacity: 0, filter: "blur(8px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
    >
      {eyebrow ? (
        <span className="eyebrow">{eyebrow}</span>
      ) : null}

      <h2
        className={`sticker-title ${onDark ? "on-dark text-white" : "text-white"} max-w-[16ch] text-[2.4rem] leading-[1.02] sm:text-5xl md:text-6xl`}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={`max-w-[52ch] text-lg font-semibold leading-relaxed ${
            onDark ? "text-white/85" : "text-grape-800/80"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
