// ============================================================
// FAQ — respostas neutras. Nada de prazo, preço ou promessa.
// Os comentários CONFIRMAR ficam só no código (não aparecem no site).
// ============================================================

export type FaqItem = {
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    q: "Como faço para pedir uma peça?",
    a: "É rapidinho: é só chamar a gente no WhatsApp contando a sua ideia. A gente conversa sobre formato, cores e detalhes e já monta um orçamento personalizado para você.",
  },
  {
    q: "Posso escolher as cores?",
    a: "Com certeza! As cores são parte da diversão. Você conta a sua ideia e a gente combina a paleta perfeita para a sua peça.",
  },
  {
    q: "Dá para colocar um nome ou frase?",
    a: "Dá sim — essa é uma das nossas especialidades. Nomes, iniciais, frases e datas: o que você quiser para deixar a peça com a sua cara.",
  },
  {
    q: "De que material são as peças?",
    a: "Trabalhamos com impressão 3D em filamento, um material leve, resistente e cheio de possibilidades de cor. Cada peça é feita com carinho e cuidado.",
  },
  {
    // CONFIRMAR com a equipe: prazo médio de produção.
    q: "E o prazo de produção?",
    a: "O prazo varia conforme o tamanho e a quantidade da peça. Chame no WhatsApp que a gente te passa a data exata do seu pedido.",
  },
  {
    // CONFIRMAR com a equipe: opções de envio e região de entrega.
    q: "Vocês fazem entrega ou envio?",
    a: "Combinamos a melhor forma de entrega para você — retirada ou envio, conforme a sua região.",
  },
  {
    q: "Posso pedir em quantidade, tipo para festa ou brindes?",
    a: "Adoramos! Lembrancinhas, brindes e pedidos em lote são bem-vindos. Conte a quantidade e a data que a gente já verifica a melhor forma de produzir tudo com calma e capricho.",
  },
  {
    q: "Vocês atendem de onde?",
    a: "Somos de Santa Catarina e atendemos gente de todo o Brasil pelo WhatsApp. É só chamar que a gente conversa.",
  },
];
