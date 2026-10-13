import type { CSSProperties } from "react";

/* Formas decorativas simples em SVG (os brinquedos em si são imagens: ver Toy.tsx). */

type Size = { size?: number; className?: string; style?: CSSProperties };

/** Cubo isométrico fofo. */
export function Cube({
  size = 60,
  className = "",
  color = "#5ce1ff",
  top = "#eafcff",
}: Size & { color?: string; top?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <polygon points="50,10 86,31 50,52 14,31" fill={top} />
      <polygon points="14,31 50,52 50,90 14,69" fill={color} />
      <polygon points="86,31 50,52 50,90 86,69" fill={color} opacity="0.62" />
    </svg>
  );
}

/** Estrela/sparkle de 4 pontas. */
export function Sparkle({
  size = 26,
  color = "#ffffff",
  className = "",
  opacity = 1,
}: Size & { color?: string; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M12 0c.7 6.1 5.2 10.6 12 12-6.8 1.4-11.3 5.9-12 12-.7-6.1-5.2-10.6-12-12C6.8 10.6 11.3 6.1 12 0Z"
        fill={color}
      />
    </svg>
  );
}

/** Gotinha de filamento (usada nos separadores e no indicador de scroll). */
export function Drop({ size = 22, className = "", color = "#ff4fb0" }: Size & { color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2c4 6.5 7 10.2 7 13.4A7 7 0 0 1 5 15.4C5 12.2 8 8.5 12 2Z" fill={color} />
    </svg>
  );
}
