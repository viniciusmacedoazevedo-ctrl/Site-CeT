import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { UnitsExplorer } from "@/components/locations/UnitsExplorer";
import { ContactCTA } from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: "Unidades em Campina Grande e João Pessoa",
  description: "Endereços, telefones e mapas 3D das unidades da C&T Consultores e Associados em Campina Grande e João Pessoa - PB.",
  alternates: { canonical: "/unidades" },
};

export default function UnitsPage() {
  return (
    <>
      <PageHero kicker="Unidades" crumbs={[{ label: "Unidades" }]} title={<>Perto de você, <span className="accent-serif text-cyan-300">em 3D.</span></>} text="Escolha uma cidade: o mapa tridimensional voa até a unidade, com endereço, telefones e rota." />
      <section aria-label="Explorar unidades" className="bg-white py-16 lg:py-24">
        <div className="container-site"><UnitsExplorer /></div>
      </section>
      <ContactCTA />
    </>
  );
}
