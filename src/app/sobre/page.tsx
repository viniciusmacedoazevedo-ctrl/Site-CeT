import type { Metadata } from "next";
import Image from "next/image";
import { Smartphone } from "lucide-react";
import { appLinks, company } from "@/data/company";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, SectionHeader } from "@/components/ui/primitives";
import { Differentials } from "@/components/sections/Differentials";
import { Partners } from "@/components/sections/Partners";
import { Instagram } from "@/components/sections/Instagram";
import { ContactCTA } from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: "Sobre a C&T",
  description: "Conheça a C&T Consultores e Associados: escritório de contabilidade na Paraíba desde 1998, com unidades em Campina Grande e João Pessoa.",
  alternates: { canonical: "/sobre" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="A C&T" crumbs={[{ label: "A C&T" }]} title={<>Contabilidade com <span className="accent-serif text-cyan-300">tradição e proximidade.</span></>} text={`Desde ${company.foundingYear}, apoiando empresas e pessoas físicas na Paraíba.`} />

      <section aria-labelledby="quem-somos" className="bg-white py-24 lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <Reveal className="relative">
            <div aria-hidden className="absolute -left-3 -top-3 size-24 border-l-2 border-t-2 border-cyan" />
            <div aria-hidden className="absolute -bottom-3 -right-3 size-24 border-b-2 border-r-2 border-ink" />
            <Image src="/images/branding/diretores.webp" alt={`${company.directors.join(" e ")}, diretores da ${company.name}`} width={1400} height={788} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3.6] w-full rounded-[1.75rem] object-cover object-[50%_30%]" />
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-navy px-6 py-4 text-white shadow-[var(--shadow-lift)]">
              <p className="font-display font-semibold">{company.directors.join(" & ")}</p>
              <p className="text-sm text-white/60">Diretores</p>
            </div>
          </Reveal>
          <div>
            <SectionHeader index="01" kicker="Quem somos" id="quem-somos" title={<>Uma equipe dedicada a cada área do seu negócio.</>} />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                A {company.name} atua na Paraíba com equipes dedicadas às áreas contábil, fiscal, trabalhista, financeira e de
                legalização. Unimos conhecimento técnico e atendimento próximo para acompanhar empresas e pessoas físicas em
                cada etapa, da rotina de obrigações às decisões estratégicas.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Missão, visão e valores" className="surface-dark relative overflow-hidden py-24 lg:py-28">
        <div aria-hidden className="hairline-grid absolute inset-0 opacity-70" />
        <div className="container-site relative grid gap-4 md:grid-cols-3">
          {[
            { k: "Missão", v: company.mission },
            { k: "Visão", v: company.vision },
            { k: "Valores", v: company.values.join(" · ") },
          ].map((b, i) => (
            <Reveal key={b.k} delay={i * 0.08} className="glass-dark h-full rounded-[1.5rem] p-8">
              <p className="kicker text-cyan-300"><span className="kicker-index">{String(i + 1).padStart(2, "0")}</span>{b.k}</p>
              <p className="mt-6 text-lg leading-relaxed text-white/80">{b.v}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="flex flex-col gap-5 rounded-[1.5rem] bg-white p-7 text-navy sm:flex-row sm:items-center md:col-span-3">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-cyan text-white"><Smartphone className="size-6" aria-hidden /></span>
            <div className="flex-1">
              <p className="font-display text-lg font-semibold">App C&T</p>
              <p className="text-sm text-muted">Calendário de obrigações, solicitações ao escritório, documentos na nuvem e comunicados.</p>
            </div>
            <div className="flex gap-2">
              <a href={appLinks.android} target="_blank" rel="noopener noreferrer" className="btn btn-navy !py-2.5">Android</a>
              <a href={appLinks.ios} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark !py-2.5">iOS</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Differentials index="02" />
      <Partners index="03" />
      <Instagram index="04" />
      <ContactCTA />
    </>
  );
}
