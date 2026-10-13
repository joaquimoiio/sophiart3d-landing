import type { CSSProperties } from "react";
import Toy from "@/components/Toy";

/*
 * Polvo com as bolhas ao redor. As bolhas são elementos separados,
 * nas mesmas posições do desenho original (em % da caixa do polvo).
 *  - left/top/size: posição e largura
 *  - dur/delay:     ritmo do balanço de cada bolha
 *  - depth:         quanto acompanha o cursor (usado pelo Hero)
 *  - fly:           para onde voa no scroll (usado pelo Hero)
 */
const bubbles = [
  { left: "-10%", top: "29%", size: "18.5%", dur: 4.6, delay: 0, depth: 30, fly: ["-34vw", "-18vh"] },
  { left: "102%", top: "44%", size: "16%", dur: 5.4, delay: 0.8, depth: 36, fly: ["36vw", "-10vh"] },
  { left: "89%", top: "19%", size: "13%", dur: 4.1, delay: 1.5, depth: 24, fly: ["30vw", "-34vh"] },
  { left: "5%", top: "9%", size: "6.6%", dur: 3.4, delay: 0.4, depth: 16, fly: ["-22vw", "-40vh"] },
  { left: "102%", top: "0%", size: "6.7%", dur: 3.8, delay: 2.1, depth: 14, fly: ["24vw", "-44vh"] },
] as const;

export default function OctopusMascot({ priority = false }: { priority?: boolean }) {
  return (
    <div className="relative aspect-[900/839] w-full">
      <div className="anim-swim absolute inset-0">
        <Toy name="polvo" priority={priority} sizes="(max-width: 1024px) 64vw, 460px" className="!aspect-auto" />
      </div>

      {bubbles.map((b, i) => (
        <div
          key={i}
          data-fly
          data-fly-x={b.fly[0]}
          data-fly-y={b.fly[1]}
          data-fly-scale={1.5}
          className="absolute"
          style={{ left: b.left, top: b.top, width: b.size }}
        >
          <div data-mouse={b.depth}>
            <Toy
              name="bolha"
              sizes="120px"
              className="anim-bubble !aspect-auto"
              style={{ "--bubble-dur": `${b.dur}s`, "--bubble-delay": `${b.delay}s` } as CSSProperties}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
