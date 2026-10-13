# Tarefas — Landing SophiArt3D

Estilo: infantil, colorido, "adesivo" (contorno roxo grosso como a logo), com parallax em camadas.

## Melhorias de 13/10/2026

### Personagens
- [x] Bonecos em SVG trocados pelos desenhos escolhidos pelo cliente: polvo, robô, gato e rosquinha (`public/images/toys/`)
- [x] Polvo laranja recortado do desenho enviado, com as bolhas separadas e animadas; gato do sorvete no lugar do anterior (os dois arquivos com marca d'água saíram)
- [x] Polvo "nadando", bolhas balançando ao redor e bolhas subindo ao fundo do hero
- [x] Variedade: segundo gato (acenando) e mais três rosquinhas (morango, chocolate, rosa), alternados entre as seções
- [x] Recortes borrados da arte da marca, esferas e tablet removidos; sem desfoque nos brinquedos

### Parallax
- [x] Hero novo: logo gigante, polvo como mascote central, brinquedos em 3 profundidades (fundo, meio, primeiro plano)
- [x] Mergulho no scroll: os brinquedos voam para fora e o mascote cresce em direção à câmera
- [x] Parallax de cursor por camada no desktop
- [x] Brinquedos com parallax de scroll + cursor em todas as seções (`FloatToy`)
- [x] Vitrine: palavra gigante e brinquedos ao fundo em velocidades diferentes dos cartões
- [x] "Quem faz": arte deslizando dentro da moldura
- [x] Menu flutuante em pílula e faixa de categorias no hero

### Menos cara de IA
- [x] Todos os emojis removidos (interface, dados e mensagens de WhatsApp); ícones no lugar
- [x] Print do Instagram e moldura de celular removidos; o bloco agora usa o gatinho
- [x] Fundos chapados no lugar de gradientes com brilho; cartões e botões no estilo adesivo
- [x] Arte da marca borrada atrás do hero removida
- [x] Faixa de chips com emoji (Categories) virou a faixa do hero

### Correções
- [x] O FAQ exibia "TODO: confirme o prazo..." para o visitante; virou comentário `CONFIRMAR` no código
- [x] Depoimentos fictícios removidos; os cartões só aparecem com depoimentos reais
- [x] Cartões da vitrine não ficam mais escondidos atrás do menu
- [x] Borda aparente nas ondas entre seções

### Verificação
- [x] `npm run build` limpo
- [x] Conferido por screenshot em 1440px e 390px, em várias posições de scroll

## Pendente (depende do cliente)
- [ ] Rosquinha de granulado e rosquinha rosa em resolução maior (as atuais têm menos de 360px)
- [ ] Conferir a licença de uso comercial dos desenhos (polvo, gatos, robô, rosquinhas) nos sites de origem
- [ ] Fotos reais das peças para `data/products.ts`
- [ ] Depoimentos reais para `data/testimonials.ts`
- [ ] Confirmar prazo médio e opções de envio (`CONFIRMAR` em `data/faq.ts`)
- [ ] Domínio final em `SITE_URL` (`app/layout.tsx`)
