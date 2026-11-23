import type { Metadata } from "next";
import { Info } from "lucide-react";
import { linkCategories } from "@/data/useful-links";
import { PageHero } from "@/components/layout/PageHero";
import { LinksAccordion } from "@/components/links/LinksAccordion";

export const metadata: Metadata = {
  title: "Central de Links Úteis",
  description: "Receita Federal, Simples Nacional, eSocial, SEFAZ-PB, JUCEP, REDESIM, prefeituras de Campina Grande e João Pessoa, CRC-PB e mais, em um só lugar.",
  alternates: { canonical: "/links-uteis" },
};

export default function LinksPage() {
  const total = linkCategories.reduce((n, c) => n + c.links.length, 0);
  return (
    <>
      <PageHero kicker="Central de Links Úteis" crumbs={[{ label: "Links Úteis" }]} title={<>{total} portais oficiais, <span className="accent-serif text-cyan-300">organizados.</span></>} text="Busque pelo nome do serviço ou abra uma categoria." />
      <section aria-label="Portais" className="bg-mist py-16 lg:py-24">
        <div className="container-site max-w-5xl">
          <LinksAccordion tone="light" searchable defaultOpen="federal" />
          <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            Os serviços acessados por estes links são prestados pelos respectivos órgãos e entidades externos. A C&T não
            se responsabiliza pelo conteúdo, disponibilidade ou políticas de privacidade desses portais.
          </p>
        </div>
      </section>
    </>
  );
}
