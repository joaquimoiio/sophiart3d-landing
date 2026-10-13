import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import Showcase from "@/sections/Showcase";
import BuildOrder from "@/sections/BuildOrder";
import Makers from "@/sections/Makers";
import SocialProof from "@/sections/SocialProof";
import FAQSection from "@/sections/FAQSection";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";
import WaveDivider from "@/components/WaveDivider";

/* As cores dos separadores acompanham o fundo chapado de cada seção. */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <WaveDivider from="#cdb2f7" to="#fff1fa" />
        <HowItWorks />

        <WaveDivider from="#fff1fa" to="#3b1a6e" />
        <Showcase />

        <WaveDivider from="#3b1a6e" to="#f6e8ff" />
        <div id="monte-seu-pedido">
          <BuildOrder />
        </div>

        <WaveDivider from="#f6e8ff" to="#2a1158" />
        <Makers />

        <WaveDivider from="#2a1158" to="#ffe1f1" />
        <SocialProof />

        <WaveDivider from="#ffe1f1" to="#2a1158" />
        <div id="duvidas">
          <FAQSection />
        </div>

        <WaveDivider from="#2a1158" to="#ff8ad1" />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
