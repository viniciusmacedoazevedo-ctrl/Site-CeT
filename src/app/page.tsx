import { Hero } from "@/components/sections/Hero";
import { AboutTeaser, ContactCTA, LinksSection, SectionRail, ServicesShowcase, UnitsSection } from "@/components/sections/HomeSections";
import { Differentials } from "@/components/sections/Differentials";
import { Partners } from "@/components/sections/Partners";
import { ClientsStrip } from "@/components/portfolio/ClientsStrip";
import { LgpdBand } from "@/components/lgpd/LgpdBand";

/**
 * Narrativa da página inicial, alternando claro e escuro:
 * 01 abertura (marinho) · 02 A C&T (branco) · 03 serviços (marinho) · 04 diferenciais (névoa)
 * 05 parceiros (preto) · clientes (branco, só aparece com clientes cadastrados) · 06 unidades (branco)
 * · LGPD (ciano claro) · 07 links (marinho) · 08 contato (branco) · rodapé (preto)
 */
export default function Home() {
  return (
    <>
      <SectionRail />
      <Hero />
      <AboutTeaser />
      <ServicesShowcase />
      <Differentials index="04" />
      <Partners index="05" />
      <ClientsStrip />
      <UnitsSection index="06" />
      <LgpdBand />
      <LinksSection />
      <ContactCTA />
    </>
  );
}
