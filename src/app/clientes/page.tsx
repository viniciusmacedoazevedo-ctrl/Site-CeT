import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ClientPortfolio } from "@/components/portfolio/ClientPortfolio";
import { ContactCTA } from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Conheça empresas atendidas pela C&T Consultores e Associados em Campina Grande, João Pessoa e em toda a Paraíba.",
  alternates: { canonical: "/clientes" },
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        kicker="Portfólio"
        crumbs={[{ label: "Clientes" }]}
        title={<>Empresas que <span className="accent-serif text-cyan-300">confiam na C&T.</span></>}
        text="Negócios de diferentes segmentos que confiam a sua contabilidade, os seus tributos e a sua gestão à nossa equipe."
      />
      <section aria-label="Clientes" className="bg-white py-20 lg:py-24">
        <div className="container-site">
          <ClientPortfolio />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
