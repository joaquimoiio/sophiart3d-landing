// ============================================================
// Link oficial do WhatsApp da SophiArt3D
// Troque apenas WHATSAPP_NUMBER se o número mudar.
// ============================================================

export const WHATSAPP_NUMBER = "5548988392776"; // (48) 98839-2776
export const WHATSAPP_DISPLAY = "(48) 98839-2776";

export const DEFAULT_MESSAGE =
  "Oi! Vim pelo site da SophiArt3D e quero fazer um orçamento de uma peça personalizada.";

/** Monta o link wa.me com a mensagem já preenchida. */
export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensagem específica por categoria de produto. */
export function productMessage(product: string, extra = ""): string {
  const base = `Oi! Vim pelo site da SophiArt3D e quero um orçamento de ${product}.`;
  return extra ? `${base} ${extra}` : base;
}

/** Mensagem montada pelo fluxo "Monte seu pedido". */
export function orderMessage(parts: {
  type?: string;
  colors?: string;
  details?: string;
}): string {
  const lines = [
    "Oi! Vim pelo site da SophiArt3D e quero montar um pedido.",
    parts.type ? `- O que eu quero: ${parts.type}` : "",
    parts.colors ? `- Cores: ${parts.colors}` : "",
    parts.details ? `- Nome/detalhes: ${parts.details}` : "",
  ].filter(Boolean);
  return lines.join("\n");
}
