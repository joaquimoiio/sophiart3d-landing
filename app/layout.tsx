import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import Confetti from "@/components/Confetti";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

// TODO: troque pelo domínio final antes de publicar.
const SITE_URL = "https://www.sophiart3d.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SophiArt3D · Peças personalizadas em impressão 3D",
    template: "%s · SophiArt3D",
  },
  description:
    "Peças personalizadas em impressão 3D: letreiros, chaveiros, decorações, Páscoa, articulados e Bichinhos de Tricô 3D. Feito sob encomenda em Santa Catarina.",
  keywords: [
    "impressão 3D",
    "peças personalizadas",
    "letreiro personalizado",
    "chaveiro personalizado",
    "presente personalizado",
    "SophiArt3D",
    "Santa Catarina",
  ],
  authors: [{ name: "SophiArt3D" }],
  creator: "SophiArt3D",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "SophiArt3D",
    title: "SophiArt3D · Peças personalizadas em impressão 3D",
    description:
      "Peças personalizadas em impressão 3D feitas sob encomenda em Santa Catarina.",
    images: [
      {
        url: "/images/hero-art.jpg",
        width: 1280,
        height: 1282,
        alt: "Arte da marca SophiArt3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SophiArt3D · Peças personalizadas em impressão 3D",
    description: "Peças personalizadas em impressão 3D.",
    images: ["/images/hero-art.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SophiArt3D",
  image: `${SITE_URL}/images/hero-art.jpg`,
  description:
    "Peças personalizadas em impressão 3D: letreiros, chaveiros, decorações, Páscoa, articulados e Bichinhos de Tricô 3D.",
  url: SITE_URL,
  telephone: "+55 48 98839-2776",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Santa Catarina",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.instagram.com/sophiiiart3d",
    "https://www.instagram.com/denisepatriciojose",
    "https://www.instagram.com/gui.frasson",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <CustomCursor />
        <WhatsAppButton />
        <Confetti />
      </body>
    </html>
  );
}
