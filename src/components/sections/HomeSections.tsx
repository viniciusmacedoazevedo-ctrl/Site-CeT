"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquareText, Phone } from "lucide-react";
import { company, mainWhatsApp, whatsappLink } from "@/data/company";
import { units } from "@/data/units";
import { ButtonLink, Reveal, SectionHeader, Tilt } from "@/components/ui/primitives";
import { ServiceFlipGrid } from "@/components/services/ServiceFlipGrid";
import { UnitsExplorer } from "@/components/locations/UnitsExplorer";
import { LinksAccordion } from "@/components/links/LinksAccordion";
import { SocialIcon } from "@/components/ui/SocialIcon";

/* 02 — A C&T (resumo) */
export function AboutTeaser() {
  return (
    <section id="a-cet" aria-labelledby="a-cet-titulo" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeader
            index="02"
            kicker="A C&T"
            id="a-cet-titulo"
            title={<>Tradição contábil com <span className="accent-serif text-brand">visão de futuro.</span></>}
            text="Equipes dedicadas às áreas contábil, fiscal, trabalhista, financeira e de legalização, unindo conhecimento técnico e atendimento próximo."
          />
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2">
            {company.values.map((v, i) => (
              <motion.span
                key={v}
                whileHover={{ y: -3 }}
                className="cursor-default rounded-full border border-ink/80 px-4 py-2 font-display text-sm font-medium text-ink transition-colors hover:border-cyan hover:bg-cyan hover:text-white"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {v}
              </motion.span>
            ))}
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <ButtonLink href="/sobre" variant="navy" arrow>Conheça a C&T</ButtonLink>
          </Reveal>
        </div>

        <Reveal className="relative">
          <div aria-hidden className="absolute -inset-6 rounded-[2.25rem] border border-ink/10" />
          <div aria-hidden className="absolute -right-3 -top-3 size-24 border-r-2 border-t-2 border-cyan" />
          <div aria-hidden className="absolute -bottom-3 -left-3 size-24 border-b-2 border-l-2 border-ink" />
          <Tilt className="group overflow-hidden rounded-[1.75rem]" max={5}>
            <Image src="/images/branding/diretores.webp" alt={`${company.directors.join(" e ")}, diretores da ${company.name}`} width={1400} height={788} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/4.2] w-full object-cover object-[50%_30%]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-6 pt-24 text-white">
              <p className="font-display text-lg font-semibold">{company.directors.join(" & ")}</p>
              <p className="text-sm text-white/70">Diretores</p>
            </div>
            <div className="absolute right-5 top-5 rounded-2xl bg-white/95 px-4 py-3 text-center shadow-[var(--shadow-lift)] backdrop-blur">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">Desde</p>
              <p className="font-display text-2xl font-semibold text-brand">{company.foundingYear}</p>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

/* 03 — Serviços (grade interativa) */
export function ServicesShowcase() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="surface-dark relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="hairline-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="container-site relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader tone="dark" index="03" kicker="Serviços" id="servicos-titulo" title={<>12 frentes de atuação. <span className="accent-serif text-cyan-300">Toque para descobrir.</span></>} />
          <Reveal><ButtonLink href="/servicos" variant="outline-light" arrow>Ver página de serviços</ButtonLink></Reveal>
        </div>
        <div className="mt-12">
          <ServiceFlipGrid withTabs tone="dark" />
        </div>
      </div>
    </section>
  );
}

/* 06 — Unidades */
export function UnitsSection({ index = "06" }: { index?: string }) {
  return (
    <section id="unidades" aria-labelledby="unidades-titulo" className="relative bg-white py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader index={index} kicker="Unidades" id="unidades-titulo" title={<>Duas unidades na Paraíba. <span className="accent-serif text-brand">Explore em 3D.</span></>} text="Escolha uma cidade para ver o mapa tridimensional, o endereço e traçar sua rota." />
        </div>
        <div className="mt-12">
          <UnitsExplorer />
        </div>
      </div>
    </section>
  );
}

/* 07 — Links úteis (resumo expansível) */
export function LinksSection() {
  return (
    <section id="links" aria-labelledby="links-titulo" className="surface-dark relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="absolute -left-40 top-1/3 size-[30rem] rounded-full border border-white/5" />
      <div className="container-site relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader tone="dark" index="07" kicker="Central de Links Úteis" id="links-titulo" title={<>Os portais oficiais, <span className="accent-serif text-cyan-300">organizados.</span></>} text="Receita Federal, Estado da Paraíba, prefeituras e órgãos contábeis. Abra uma categoria." />
          <Reveal delay={0.1} className="mt-8"><ButtonLink href="/links-uteis" variant="outline-light" arrow>Central completa com busca</ButtonLink></Reveal>
        </div>
        <Reveal><LinksAccordion tone="dark" /></Reveal>
      </div>
    </section>
  );
}

/* 08 — Contato (chamada) */
export function ContactCTA() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="relative bg-white py-24 lg:py-28">
      <div className="container-site">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#061321,#0d2238_45%,#075a91)] px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
            <div aria-hidden className="absolute -right-20 -top-28 size-[28rem] rounded-full bg-cyan/25 blur-3xl" />
            <svg aria-hidden viewBox="0 0 600 300" className="absolute -bottom-10 right-0 w-[42rem] max-w-none opacity-40">
              <ellipse cx="300" cy="150" rx="290" ry="110" fill="none" stroke="#17aed2" strokeWidth="1.5" transform="rotate(-10 300 150)" />
              <ellipse cx="300" cy="150" rx="220" ry="70" fill="none" stroke="#fff" strokeOpacity="0.3" transform="rotate(-10 300 150)" />
            </svg>
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <p className="kicker text-cyan-300"><span className="kicker-index">08</span>Contato</p>
                <h2 id="contato-titulo" className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                  Vamos conversar sobre <span className="accent-serif text-cyan-300">a sua empresa?</span>
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/contato" className="group flex items-center justify-between rounded-2xl bg-white p-5 text-navy transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgb(23_174_210/0.7)] sm:col-span-2">
                  <span className="flex items-center gap-3 font-display font-semibold"><MessageSquareText className="size-5 text-cyan" aria-hidden /> Enviar mensagem</span>
                  <ArrowUpRight className="size-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <a href={whatsappLink(mainWhatsApp.number, "Olá! Vim pelo site da C&T.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-5 transition hover:border-cyan hover:bg-white/10 sm:col-span-2">
                  <SocialIcon network="whatsapp" className="size-5 text-cyan" /> <span className="font-display font-semibold">WhatsApp</span>
                  <span className="ml-auto text-sm text-white/60">{mainWhatsApp.display}</span>
                </a>
                {units.map((u) => (
                  <a key={u.id} href={`tel:${u.phones[0].tel}`} className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 transition hover:border-cyan hover:bg-white/10">
                    <span className="flex items-center gap-2 text-xs text-white/60"><Phone className="size-3.5 text-cyan" aria-hidden /> {u.city}</span>
                    <span className="mt-1 block font-display font-semibold">{u.phones[0].display}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Trilha lateral: mostra em que parte da narrativa o visitante está e permite saltar entre seções. */
const railSections = [
  { id: "topo", label: "Início" },
  { id: "a-cet", label: "A C&T" },
  { id: "servicos", label: "Serviços" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "parceiros", label: "Parceiros" },
  { id: "unidades", label: "Unidades" },
  { id: "links", label: "Links úteis" },
  { id: "contato", label: "Contato" },
];

export function SectionRail() {
  const [active, setActive] = useState("topo");
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        setActive(e.target.id);
        const bg = getComputedStyle(e.target).backgroundColor;
        const m = bg.match(/\d+/g);
        setDark(e.target.id === "topo" || (m ? Number(m[0]) + Number(m[1]) + Number(m[2]) < 200 : false) || e.target.classList.contains("surface-dark"));
      }),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    railSections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Seções da página" className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
      <ol className="space-y-3">
        {railSections.map((s, i) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} className="group flex items-center gap-3" aria-current={on ? "true" : undefined}>
                <span className={`h-px transition-all duration-500 ${on ? "w-10 bg-cyan" : `w-4 ${dark ? "bg-white/30" : "bg-ink/25"} group-hover:w-7`}`} />
                <span className={`font-display text-[0.65rem] tabular-nums transition-all duration-300 ${on ? "text-cyan opacity-100" : `${dark ? "text-white/50" : "text-ink/50"} opacity-0 group-hover:opacity-100`}`}>
                  {String(i + 1).padStart(2, "0")} {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
