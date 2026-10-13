"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/** Faixa infinita (loop contínuo, pausa no hover). Duplica o conteúdo p/ o loop. */
export default function Marquee({
  children,
  duration = 34,
  reverse = false,
  className = "",
}: Props) {
  return (
    <div className={`marquee-mask overflow-hidden py-3 ${className}`}>
      <div
        className={`marquee-track ${reverse ? "rev" : ""}`}
        style={{ ["--marquee-dur" as any]: `${duration}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
