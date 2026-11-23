import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { getService, services } from "@/data/services";
import { serviceGroups } from "@/data/content";
import { units } from "@/data/units";
import { mainWhatsApp, whatsappLink, SITE_URL } from "@/data/company";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink, Reveal } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: `${service.title} em Campina Grande e João Pessoa`,
    description: service.seoDescription,
    alternates: { canonical: `/servicos/${service.slug}` },
    openGraph: { title: `${service.title} | C&T Consultores e Associados`, description: service.seoDescription, url: `${SITE_URL}/servicos/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const Icon = service.icon;
  const idx = services.indexOf(service);
  const prev = services[(idx - 1 + services.length) % services.length];
  const next = services[(idx + 1) % services.length];
  const group = serviceGroups.find((g) => g.id === service.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro,
    serviceType: service.title,
    provider: { "@id": `${SITE_URL}/#organizacao` },
    areaServed: units.map((u) => ({ "@type": "City", name: u.city })),
    url: `${SITE_URL}/servicos/${service.slug}`,
  };

  return (
    <>
      <PageHero
        kicker={`${group?.title ?? service.category} · ${String(idx + 1).padStart(2, "0")}/${services.length}`}
        crumbs={[{ href: "/servicos", label: "Serviços" }, { label: service.title }]}
        title={service.title}
        text={service.intro}
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-brand shadow-[var(--shadow-glow)]">
            <Icon className="size-7" strokeWidth={1.5} aria-hidden />
          </span>
          <ButtonLink href="/contato" arrow>Fale com um especialista</ButtonLink>
        </div>
      </PageHero>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="kicker text-brand"><span className="kicker-index">01</span>O que fazemos</p>
            <ol className="mt-8 divide-y divide-line border-y border-line">
              {service.scope.map((item, i) => (
                <li key={item}>
                  <Reveal delay={i * 0.06} className="group flex items-start gap-5 py-5">
                    <span className="font-display text-sm tabular-nums text-cyan">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-lg leading-relaxed text-ink/85">{item}</span>
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-transparent transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-white"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
                  </Reveal>
                </li>
              ))}
            </ol>
            <p className="kicker mt-14 text-brand"><span className="kicker-index">02</span>Para quem é</p>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-navy-900">{service.audience}</p>
            <p className="mt-10 border-l-2 border-ink pl-5 text-sm leading-relaxed text-muted">
              Cada empresa tem uma realidade própria. O escopo, os prazos e os valores são definidos após a análise do seu
              caso por um de nossos consultores.
            </p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="surface-dark noise relative overflow-hidden rounded-[1.75rem] p-7">
              <p className="font-display text-2xl font-semibold">Converse com a C&T</p>
              <p className="mt-2 text-sm text-white/65">Tire suas dúvidas sobre {service.title.toLowerCase()} com um consultor.</p>
              <div className="mt-6 space-y-2.5">
                {units.map((u) => (
                  <a key={u.id} href={`tel:${u.phones[0].tel}`} className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:border-cyan">
                    <span className="flex items-center gap-3"><Phone className="size-4 text-cyan" aria-hidden /> {u.city}</span>
                    <span className="font-semibold">{u.phones[0].display}</span>
                  </a>
                ))}
                <a href={whatsappLink(mainWhatsApp.number, `Olá! Gostaria de saber mais sobre ${service.title}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-cyan w-full">
                  <SocialIcon network="whatsapp" className="size-4" /> Conversar pelo WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <nav aria-label="Outros serviços" className="grid border-t border-ink/10 bg-ink-950 text-white sm:grid-cols-2">
        {[{ s: prev, dir: "Anterior" }, { s: next, dir: "Próximo" }].map(({ s, dir }) => {
          const SIcon = s.icon;
          return (
            <Link key={dir} href={`/servicos/${s.slug}`} className={`group flex items-center gap-5 p-8 transition hover:bg-navy-900 sm:p-12 ${dir === "Próximo" ? "sm:flex-row-reverse sm:text-right sm:border-l sm:border-white/10" : ""}`}>
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 transition group-hover:border-cyan group-hover:bg-cyan">
                {dir === "Anterior" ? <ArrowLeft className="size-5" aria-hidden /> : <ArrowRight className="size-5" aria-hidden />}
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-white/45">{dir} serviço</span>
                <span className="mt-1 flex items-center gap-2 font-display text-xl font-semibold sm:text-2xl">
                  <SIcon className="size-5 text-cyan" aria-hidden /> {s.title}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
