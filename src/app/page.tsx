import { Hero } from "@/components/sections/Hero";
import { AboutTeaser, ContactCTA, LinksSection, SectionRail, ServicesShowcase, UnitsSection } from "@/components/sections/HomeSections";
import { Differentials } from "@/components/sections/Differentials";
import { Partners } from "@/components/sections/Partners";

/**
 * Narrativa da página inicial, alternando claro e escuro:
 * 01 abertura (marinho) · 02 A C&T (branco) · 03 serviços (marinho) · 04 diferenciais (névoa)
 * 05 parceiros (preto) · 06 unidades (branco) · 07 links (marinho) · 08 contato (branco) · rodapé (preto)
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
      <UnitsSection index="06" />
      <LinksSection />
      <ContactCTA />
    </>
  );
}
