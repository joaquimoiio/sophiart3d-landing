# SophiArt3D — Landing page

Landing da **SophiArt3D** (peças personalizadas em impressão 3D, Santa Catarina). Visual infantil e colorido, com parallax em camadas usando os personagens da própria arte da marca.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · Framer Motion · lucide-react · `next/image` · `next/font`.

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm start
```

## Como editar

| O que mudar | Arquivo |
|---|---|
| Nome, Instagram, criadores, destaques | `data/site.ts` |
| Categorias de produto (textos, cor, ícone, foto) | `data/products.ts` |
| Perguntas frequentes | `data/faq.ts` |
| Depoimentos | `data/testimonials.ts` |
| Número e mensagens do WhatsApp | `lib/whatsapp.ts` |
| Textos de cada seção | `sections/*.tsx` |
| Cores, fontes, animações | `app/globals.css` |

- **Fotos dos produtos:** em `data/products.ts`, preencha `image: "/images/foto.jpg"` e coloque o arquivo em `public/images/`. Enquanto estiver `""`, o cartão mostra o ícone da categoria.
- **Ícones:** os nomes usados nos dados (`icon: "chaveiro"`) estão em `components/icons.tsx`. Não há emojis no site.
- **Depoimentos:** a lista começa vazia e os cartões só aparecem quando houver pelo menos um depoimento real.
- **Domínio final (SEO/Open Graph):** `SITE_URL` em `app/layout.tsx`.
- **Prazo e entrega:** o FAQ não promete prazo nem região. Os pontos a validar estão em comentários `CONFIRMAR` em `data/faq.ts` (não aparecem no site).

## Personagens e parallax

- Os brinquedos (polvo, bolha, robô, dois gatos e quatro rosquinhas) ficam em `public/images/toys/` e são renderizados por `components/Toy.tsx`. Para trocar um desenho, substitua o arquivo mantendo o mesmo nome (PNG ou WebP com fundo transparente).
- **Polvo e bolhas** (`components/OctopusMascot.tsx`): o polvo foi recortado do desenho original e as bolhas viraram elementos separados. O polvo "nada" (`.anim-swim`) e cada bolha balança no seu ritmo (`.anim-bubble`); no hero, bolhas extras sobem ao fundo (`.anim-rise`). As animações ficam em `app/globals.css`.
- **Hero** (`sections/Hero.tsx`): cena fixa com camadas. No scroll a câmera "mergulha": os brinquedos voam para fora e o polvo cresce. No desktop as camadas também acompanham o cursor. Para mexer em posição, tamanho e profundidade, edite a lista `pieces`.
- **Seções:** `components/FloatToy.tsx` coloca um brinquedo com parallax de scroll e de cursor. `depth` perto de 0 anda pouco (fundo), perto de 1 anda muito (frente).
- **Vitrine:** carrossel horizontal preso ao scroll no desktop (deslize nativo no celular), com uma palavra gigante ao fundo em outra velocidade.
- **Quem faz:** a arte desliza dentro da moldura.
- Com `prefers-reduced-motion` as animações de scroll são desligadas.

## Deploy na Vercel

1. Suba o repositório para o GitHub.
2. Na Vercel, importe o projeto. O framework Next.js é detectado automaticamente e não há variáveis de ambiente.
3. Depois do deploy, troque `SITE_URL` em `app/layout.tsx` pelo domínio real.
