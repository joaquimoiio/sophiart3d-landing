"use client";

import ParallaxLayer from "./ParallaxLayer";

type Props = {
  /** cor da seção de cima */
  from?: string;
  /** cor da seção de baixo */
  to?: string;
  flip?: boolean;
  className?: string;
};

/**
 * Separador orgânico em camadas. Cada onda desliza em velocidade
 * diferente (parallax horizontal) — nada de linha reta.
 */
export default function WaveDivider({
  from = "#f6e8ff",
  to = "#2a1158",
  flip = false,
  className = "",
}: Props) {
  const waves = [
    {
      opacity: 0.25,
      depth: 0.25,
      rangeX: 70,
      d: "M0,72 C220,128 420,20 720,58 C980,92 1180,26 1440,72 L1440,160 L0,160 Z",
    },
    {
      opacity: 0.5,
      depth: 0.5,
      rangeX: -54,
      d: "M0,96 C260,44 480,132 760,92 C1020,56 1240,124 1440,88 L1440,160 L0,160 Z",
    },
    {
      opacity: 1,
      depth: 0.75,
      rangeX: 34,
      d: "M0,116 C240,84 460,150 720,116 C980,84 1220,150 1440,118 L1440,160 L0,160 Z",
    },
  ];

  return (
    <div
      className={`relative h-[120px] w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`}
      style={{ background: from, marginBottom: -1, marginTop: -1 }}
    >
      {waves.map((w, i) => (
        <ParallaxLayer
          key={i}
          depth={w.depth}
          range={0}
          rangeX={w.rangeX}
          className="absolute -inset-x-[6%] bottom-0 h-full"
        >
          <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden="true"
            style={{ opacity: w.opacity, fill: to }}
          >
            <path d={w.d} />
          </svg>
        </ParallaxLayer>
      ))}
    </div>
  );
}
