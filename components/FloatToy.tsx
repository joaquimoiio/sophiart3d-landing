"use client";

import ParallaxLayer from "@/components/ParallaxLayer";
import Toy, { type ToyName } from "@/components/Toy";

type Props = {
  name: ToyName;
  /** posição + largura (classes Tailwind); o componente já é `absolute` */
  className?: string;
  /** 0 = longe (anda pouco no scroll), 1 = perto (anda muito) */
  depth?: number;
  range?: number;
  /** deslocamento com o cursor, em px */
  mouse?: number;
  float?: "anim-float-slow" | "anim-float-med" | "anim-bob";
};

/** Brinquedo decorativo de seção: parallax de scroll + cursor + balanço. */
export default function FloatToy({
  name,
  className = "",
  depth = 0.5,
  range = 220,
  mouse = 18,
  float = "anim-float-slow",
}: Props) {
  return (
    <ParallaxLayer
      depth={depth}
      range={range}
      mouseX={-mouse}
      mouseY={-mouse * 0.6}
      className={`pointer-events-none absolute ${className}`}
    >
      <Toy name={name} className={float} />
    </ParallaxLayer>
  );
}
