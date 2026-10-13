import { site } from "@/data/site";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      <path d="M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

const links = [
  { label: "Início", href: "#top" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Criações", href: "#criacoes" },
  { label: "Monte seu pedido", href: "#monte-seu-pedido" },
  { label: "Dúvidas", href: "#duvidas" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#22104a] pb-10 pt-16">

      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <p className="balloon text-3xl" aria-label="SophiArt3D">
              <span className="gloss" style={{ ["--gloss-a" as any]: "#ffd0e8", ["--gloss-b" as any]: "#ff6ec2", ["--gloss-c" as any]: "#f22c9c" }}>
                Sophi
              </span>
              <span className="gloss" style={{ ["--gloss-a" as any]: "#e6fbff", ["--gloss-b" as any]: "#5ce1ff", ["--gloss-c" as any]: "#2ac7f0" }}>
                Art
              </span>
              <span className="gloss" style={{ ["--gloss-a" as any]: "#fff0d0", ["--gloss-b" as any]: "#ffc93c", ["--gloss-c" as any]: "#ff9a2e" }}>
                3D
              </span>
            </p>
            <p className="mt-4 max-w-xs font-semibold text-white/75">{site.tagline}</p>
            <p className="mt-2 text-sm font-bold text-white/60">{site.bio}</p>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé">
            <p className="eyebrow">Navegue</p>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-semibold text-white/75 transition-colors duration-300 hover:text-bubble-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <p className="eyebrow">Fale com a gente</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-white/75 transition-colors duration-300 hover:text-[#3fe27c]"
                >
                  <WhatsAppIcon /> WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-white/75 transition-colors duration-300 hover:text-bubble-300"
                >
                  <InstagramIcon /> @{site.handle}
                </a>
              </li>
            </ul>

            <div className="mt-5 space-y-2">
              {site.makers.map((m) => (
                <a
                  key={m.handle}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-bold text-white/55 transition-colors duration-300 hover:text-white/85"
                >
                  {m.name} · @{m.handle}
                </a>
              ))}
            </div>
          </div>

          {/* Carinho */}
          <div>
            <p className="eyebrow">Nossa essência</p>
            <p className="mt-5 text-lg font-semibold leading-relaxed text-white/75">
              Peças personalizadas feitas com cuidado para deixar os seus momentos ainda mais
              especiais.
            </p>
            <p className="mt-4 w-fit rounded-full bg-white/10 px-4 py-2 font-display font-semibold text-white/85">
              Feito à mão em {site.location}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm font-semibold text-white/55">
            © {new Date().getFullYear()} {site.name} · Todos os direitos reservados
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-white/40">
            Peças personalizadas em impressão 3D
          </p>
        </div>
      </div>
    </footer>
  );
}
