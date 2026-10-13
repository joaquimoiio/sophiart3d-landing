import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/whatsapp";

const nav = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Criações", href: "#criacoes" },
  { label: "Monte seu pedido", href: "#monte-seu-pedido" },
  { label: "Dúvidas", href: "#duvidas" },
];

/** Menu flutuante em formato de pílula, com o mesmo contorno "adesivo" da logo. */
export default function Header() {
  return (
    <header className="fixed inset-x-3 top-3 z-[65] sm:inset-x-5 sm:top-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border-[3px] border-grape-800 bg-white pl-5 pr-1.5 shadow-[0_5px_0_var(--color-grape-800)] sm:h-16 sm:pl-7 sm:pr-2">
        <a href="#top" className="font-display text-xl font-bold text-grape-800 sm:text-2xl">
          Sophi<span className="text-sky-500">Art</span>
          <span className="text-bubble-500">3D</span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 font-display text-[1.05rem] font-semibold text-grape-800">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors duration-300 hover:text-bubble-500">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-grape-800 px-4 font-display font-semibold text-white transition-colors duration-300 hover:bg-bubble-600 sm:h-11 sm:px-5"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Pedir orçamento
        </a>
      </div>
    </header>
  );
}
