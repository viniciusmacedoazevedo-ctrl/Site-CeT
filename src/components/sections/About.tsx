import Image from "next/image";
import { Smartphone } from "lucide-react";
import { appLinks, company } from "@/data/company";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

/**
 * Seção institucional. Missão, visão e valores conforme o site atual.
 * O texto de apresentação é provisório e pode ser editado livremente.
 */
export function About() {
  return (
    <section id="empresa" aria-labelledby="empresa-titulo" className="relative bg-mist py-24 lg:py-32">
      <div className="container-site grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)]">
            <Image
              src="/images/branding/diretores.webp"
              alt={`${company.directors.join(" e ")}, diretores da ${company.name}`}
              width={1400}
              height={788}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3.4] w-full object-cover object-[50%_30%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent p-6 pt-20">
              <p className="font-display text-xl text-white">{company.directors.join(" e ")}</p>
              <p className="mt-1 text-sm text-white/75">Diretores da {company.name}</p>
            </div>
          </div>
          <div className="absolute -right-4 -top-6 hidden rounded-2xl border border-line bg-white px-6 py-5 shadow-[var(--shadow-lift)] sm:block lg:-right-10">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">Fundada em</p>
            <p className="font-display text-4xl text-brand">{company.foundingYear}</p>
          </div>
          <div aria-hidden className="absolute -bottom-8 -left-8 -z-10 size-40 rounded-full border border-cyan/30" />
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="A Empresa"
            id="empresa-titulo"
            title={<>Tradição contábil com olhar atento para o <em className="text-brand">futuro</em> do seu negócio.</>}
            text="A C&T Consultores e Associados atua na Paraíba com equipes dedicadas às áreas contábil, fiscal, trabalhista, financeira e de legalização. Unimos conhecimento técnico e atendimento próximo para acompanhar empresas e pessoas físicas em cada etapa, da rotina de obrigações às decisões estratégicas."
          />

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            <Reveal className="bg-white p-6" delay={0.05}>
              <p className="eyebrow !text-[0.68rem]">Missão</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{company.mission}</p>
            </Reveal>
            <Reveal className="bg-white p-6" delay={0.1}>
              <p className="eyebrow !text-[0.68rem]">Visão</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{company.vision}</p>
            </Reveal>
            <Reveal className="bg-white p-6 sm:col-span-2" delay={0.15}>
              <p className="eyebrow !text-[0.68rem]">Valores</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {company.values.map((v) => (
                  <li key={v} className="rounded-full border border-cyan/30 bg-cyan-50 px-4 py-1.5 text-sm font-semibold text-brand">{v}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-6 flex flex-col gap-4 rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/10 text-cyan"><Smartphone className="size-6" aria-hidden /></span>
            <div className="flex-1">
              <p className="font-semibold">App C&T</p>
              <p className="mt-1 text-sm text-white/70">Calendário de obrigações, solicitações ao escritório, documentos na nuvem e comunicados na palma da mão.</p>
            </div>
            <div className="flex gap-2">
              <a href={appLinks.android} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold hover:bg-white hover:text-navy">Android</a>
              <a href={appLinks.ios} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold hover:bg-white hover:text-navy">iOS</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
