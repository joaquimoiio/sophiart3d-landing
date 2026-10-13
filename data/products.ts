// ============================================================
// Categorias de produto — edite textos, cores e mensagens aqui.
// `image`: deixe "" para usar o ícone da categoria, ou coloque
// o caminho de uma foto real (ex.: "/images/letreiro.jpg") — TODO.
// ============================================================

import type { IconName } from "@/components/icons";

export type Product = {
  id: string;
  title: string;
  /** Nome de um ícone de components/icons.tsx */
  icon: IconName;
  tagline: string;
  description: string;
  bullets: string[];
  gradient: [string, string];
  message: string;
  image?: string;
};

export const products: Product[] = [
  {
    id: "letreiros",
    title: "Letreiros & Nomes",
    icon: "letreiro",
    tagline: "O nome dele em 3D",
    description:
      "Nomes, frases e letreiros personalizados para quarto, festa ou vitrine. Um presente que tem a cara de quem recebe.",
    bullets: ["Nome ou frase à sua escolha", "Várias fontes e cores", "Ideia linda para festas e quartos"],
    gradient: ["#ff8ad1", "#ff4fb0"],
    message: "Oi! Quero um letreiro personalizado com o nome ___",
    image: "", // TODO: foto real do cliente
  },
  {
    id: "chaveiros",
    title: "Chaveiros",
    icon: "chaveiro",
    tagline: "Carinhos no bolso",
    description:
      "Chaveiros com nome, inicial ou formato especial. Leves, resistentes e perfeitos para lembrancinhas que ninguém joga fora.",
    bullets: ["Ótimo para lembrancinhas", "Nome, inicial ou forma", "Cores combinando com tudo"],
    gradient: ["#5ce1ff", "#2ac7f0"],
    message: "Oi! Quero um chaveiro personalizado com o nome ___",
    image: "", // TODO
  },
  {
    id: "decoracoes",
    title: "Decorações",
    icon: "decoracao",
    tagline: "Um toque só seu",
    description:
      "Peças decorativas para deixar qualquer cantinho mais alegre e com a sua identidade — de suportes a enfeites autoriais.",
    bullets: ["Para casa, festa ou trabalho", "Combinam com o seu estilo", "Feitas sob medida"],
    gradient: ["#b28ae8", "#7b3fd4"],
    message: "Oi! Quero uma decoração personalizada em impressão 3D ___",
    image: "", // TODO
  },
  {
    id: "pascoa",
    title: "Páscoa",
    icon: "pascoa",
    tagline: "Coelhos, ovos e muito chocolate",
    description:
      "Coelhinhos, ovos e peças de Páscoa que deixam a mesa (e o sorriso) mais doces. Perfeitos para presentear e decorar.",
    bullets: ["Coelhos, ovos e surpresas", "Perfeitos para presentear", "Edição de temporada"],
    gradient: ["#ffc93c", "#ff9a2e"],
    message: "Oi! Quero uma peça de Páscoa personalizada ___",
    image: "", // TODO
  },
  {
    id: "articulados",
    title: "Articulados",
    icon: "articulado",
    tagline: "Bichinhos que mexem",
    description:
      "Peças articuladas que se movem, encaixam e encantam. Um charme para colecionar, presentear ou usar de chaveiro.",
    bullets: ["Movem e articulam de verdade", "Achadinhos para colecionar", "Diversão garantida"],
    gradient: ["#ff6ec2", "#b28ae8"],
    message: "Oi! Quero um bichinho articulado personalizado ___",
    image: "", // TODO
  },
  {
    id: "trico",
    title: "Bichinhos de Tricô 3D",
    icon: "trico",
    tagline: "Coração de tricô, alma de 3D",
    description:
      "A magia do tricô traduzida em impressão 3D: bichinhos fofos com textura e personalidade para decorar e presentear.",
    bullets: ["Textura única de tricô", "Fofura em cada detalhe", "Presente autoral"],
    gradient: ["#7ee9ff", "#7b3fd4"],
    message: "Oi! Quero um Bichinho de Tricô 3D personalizado ___",
    image: "", // TODO
  },
];
