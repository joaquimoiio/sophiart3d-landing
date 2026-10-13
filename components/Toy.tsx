import type { CSSProperties } from "react";
import Image from "next/image";

/*
 * Brinquedos da página (public/images/toys).
 * Para trocar um desenho, substitua o arquivo mantendo o mesmo nome.
 * Use PNG ou WebP quadrado com fundo transparente; qualquer tamanho serve.
 */
const toys = {
  polvo: "/images/toys/polvo.webp",
  bolha: "/images/toys/bolha.webp",
  robo: "/images/toys/robo.png",
  gato: "/images/toys/gato.webp",
  "gato-aceno": "/images/toys/gato-aceno.webp",
  rosquinha: "/images/toys/rosquinha.png",
  "rosquinha-morango": "/images/toys/rosquinha-morango.webp",
  "rosquinha-chocolate": "/images/toys/rosquinha-chocolate.webp",
  "rosquinha-rosa": "/images/toys/rosquinha-rosa.webp",
} as const;

export type ToyName = keyof typeof toys;

type ToyProps = {
  name: ToyName;
  className?: string;
  /** Largura aproximada na tela, para o next/image escolher o tamanho certo. */
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
};

/** Decorativo: ocupa a largura do elemento pai, sempre em caixa quadrada. */
export default function Toy({ name, className = "", sizes = "240px", priority = false, style }: ToyProps) {
  return (
    <Image
      src={toys[name]}
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      sizes={sizes}
      priority={priority}
      draggable={false}
      style={style}
      className={`pointer-events-none aspect-square h-auto w-full select-none object-contain ${className}`}
    />
  );
}
