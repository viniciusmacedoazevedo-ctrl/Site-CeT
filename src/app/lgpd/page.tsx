import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Cookie, FileText, Mail, UserRoundCheck } from "lucide-react";
import { company } from "@/data/company";
import { clientBenefits, measures, rights, roles } from "@/data/lgpd";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink, Reveal, SectionHeader } from "@/components/ui/primitives";
import { LgpdSeal } from "@/components/lgpd/LgpdSeal";
import { Pending } from "@/components/legal/LegalPage";
import { ContactCTA } from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: "LGPD e proteção de dados",
  description: "A C&T Consultores e Associados está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Veja como protegemos os dados dos nossos clientes.",
  alternates: { canonical: "/lgpd" },
};

export default function LgpdPage() {
  return (
    <>
      <PageHero
        kicker="Proteção de dados · LGPD"
        crumbs={[{ label: "LGPD" }]}
        title={<>Seus dados em boas mãos. <span className="accent-serif text-cyan-300">Em conformidade com a LGPD.</span></>}
        text={<>A {company.name} segue a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) em todos os serviços. Para você, isso significa mais segurança e transparência no tratamento das suas informações e das informações da sua empresa.</>}
      >
        <div className="flex flex-wrap items-center gap-6">
          <LgpdSeal className="size-32 drop-shadow-[0_0_30px_rgb(23_174_210/0.35)]" />
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#como-protegemos" variant="cyan" arrow>Como protegemos</ButtonLink>
            <ButtonLink href="/direitos-do-titular" variant="outline-light">Exercer meus direitos</ButtonLink>
          </div>
        </div>
      </PageHero>

      <section aria-labelledby="para-voce" className="bg-white py-24 lg:py-28">
        <div className="container-site">
          <SectionHeader index="01" kicker="Para você" id="para-voce" title={<>O que a conformidade <span className="accent-serif text-brand">garante ao cliente.</span></>} text="Contabilidade lida com dados sensíveis para o seu negócio: documentos fiscais, folha de pagamento, dados bancários e informações pessoais de sócios e colaboradores." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clientBenefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} className="group h-full rounded-[1.5rem] border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-cyan hover:shadow-[var(--shadow-lift)]">
                <span className="grid size-12 place-items-center rounded-2xl bg-cyan-50 text-brand transition group-hover:bg-cyan group-hover:text-white"><b.icon className="size-6" aria-hidden /></span>
                <h3 className="mt-6 text-lg font-semibold text-navy-900">{b.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="como-protegemos" aria-labelledby="medidas" className="surface-dark relative scroll-mt-24 overflow-hidden py-24 lg:py-28">
        <div aria-hidden className="hairline-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="container-site relative">
          <SectionHeader tone="dark" index="02" kicker="Como protegemos" id="medidas" title={<>Práticas que acompanham <span className="accent-serif text-cyan-300">cada etapa do serviço.</span></>} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {measures.map((m, i) => (
              <Reveal key={m.title} delay={(i % 4) * 0.06} className="glass-dark h-full rounded-[1.5rem] p-7">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-cyan/15 text-cyan-300"><m.icon className="size-5" aria-hidden /></span>
                    <span className="font-display text-sm text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">{m.title}</h3>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-white/65">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="papeis" className="bg-mist py-24 lg:py-28">
        <div className="container-site">
          <SectionHeader index="03" kicker="Para empresas clientes" id="papeis" title={<>Quem responde por <span className="accent-serif text-brand">cada dado.</span></>} text="Se a sua empresa tem funcionários, os dados deles também passam pela contabilidade. A LGPD define papéis claros para isso." />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {roles.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 0.06} className="flex h-full gap-5 rounded-[1.5rem] bg-white p-7 shadow-[0_1px_0_rgb(16_42_67/0.04)]">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-navy text-white"><r.icon className="size-6" aria-hidden /></span>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900">{r.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="direitos" className="bg-white py-24 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <SectionHeader index="04" kicker="Seus direitos" id="direitos" title={<>A lei garante. <span className="accent-serif text-brand">Nós facilitamos.</span></>} text="Como titular de dados, você pode a qualquer momento:" />
            <Reveal delay={0.08}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {rights.map((r, i) => (
                  <li key={r} className="flex gap-3 rounded-2xl border border-line p-4 text-[0.95rem] text-navy">
                    <span className="font-display text-sm font-semibold text-cyan">{String(i + 1).padStart(2, "0")}</span>
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="flex flex-col gap-4 lg:pt-28">
            <div className="rounded-[1.5rem] bg-navy p-7 text-white">
              <UserRoundCheck className="size-7 text-cyan-300" aria-hidden />
              <h3 className="mt-5 text-xl font-semibold">Encarregado de dados (DPO)</h3>
              <p className="mt-2 text-white/70">
                Nome: <span className="text-white"><Pending>a confirmar</Pending></span>
              </p>
              <p className="mt-1 flex items-center gap-2 text-white/70">
                <Mail className="size-4 text-cyan-300" aria-hidden />
                {company.privacyEmail ? <a href={`mailto:${company.privacyEmail}`} className="text-white underline">{company.privacyEmail}</a> : <Pending>e-mail de privacidade a confirmar</Pending>}
              </p>
              <ButtonLink href="/direitos-do-titular" variant="cyan" arrow className="mt-6">Fazer uma solicitação</ButtonLink>
            </div>
            <nav aria-label="Documentos de privacidade" className="rounded-[1.5rem] border border-line p-3">
              {[
                { href: "/politica-de-privacidade", label: "Política de Privacidade", icon: FileText },
                { href: "/politica-de-cookies", label: "Política de Cookies", icon: Cookie },
                { href: "/direitos-do-titular", label: "Formulário de direitos do titular", icon: UserRoundCheck },
              ].map((d) => (
                <Link key={d.href} href={d.href} className="group flex items-center gap-3 rounded-xl px-4 py-3 font-display text-sm font-medium text-navy transition hover:bg-mist">
                  <d.icon className="size-4 text-brand" aria-hidden />
                  <span className="flex-1">{d.label}</span>
                  <ArrowUpRight className="size-4 text-muted transition group-hover:text-cyan" aria-hidden />
                </Link>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
