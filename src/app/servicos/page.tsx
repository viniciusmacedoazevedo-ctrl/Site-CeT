import type { Metadata } from "next";
import { serviceGroups } from "@/data/content";
import { services } from "@/data/services";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/primitives";
import { ServiceFlipGrid } from "@/components/services/ServiceFlipGrid";
import { ContactCTA } from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: "Serviços contábeis",
  description: "Assessoria fiscal, contábil, trabalhista, imposto de renda, auditoria, planejamento tributário e mais: os 12 serviços da C&T Consultores na Paraíba.",
  alternates: { canonical: "/servicos" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero kicker="Serviços" crumbs={[{ label: "Serviços" }]} title={<>{services.length} frentes de atuação, <span className="accent-serif text-cyan-300">um só parceiro.</span></>} text="Toque em um cartão para ver o resumo e acesse a página completa de cada serviço.">
        <ul className="flex flex-wrap gap-2">
          {serviceGroups.map((g) => (
            <li key={g.id}><a href={`#${g.id.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()}`} className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-cyan hover:text-white">{g.title}</a></li>
          ))}
        </ul>
      </PageHero>
      {serviceGroups.map((g, i) => {
        const dark = i % 2 === 1;
        const id = g.id.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
        return (
          <section key={g.id} id={id} aria-labelledby={`${id}-titulo`} className={`relative py-20 lg:py-28 ${dark ? "surface-dark" : i === 0 ? "bg-white" : "bg-mist"}`}>
            <div className="container-site">
              <SectionHeader tone={dark ? "dark" : "light"} index={String(i + 1).padStart(2, "0")} kicker={g.title} id={`${id}-titulo`} title={g.description} />
              <div className="mt-12"><ServiceFlipGrid group={g.id} tone={dark ? "dark" : "light"} /></div>
            </div>
          </section>
        );
      })}
      <ContactCTA />
    </>
  );
}
