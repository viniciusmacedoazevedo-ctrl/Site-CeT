import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Phone } from "lucide-react";
import { getService, services } from "@/data/services";
import { units } from "@/data/units";
import { mainWhatsApp, whatsappLink, SITE_URL } from "@/data/company";
import { ButtonLink } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";

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
  const related = [services[(idx + 1) % services.length], services[(idx + 2) % services.length], services[(idx + 3) % services.length]];

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
      <section className="relative overflow-hidden border-b border-line bg-mist pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div aria-hidden className="grid-paper absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-site relative">
          <nav aria-label="Trilha de navegação" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-navy">Início</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/#servicos" className="hover:text-navy">Serviços</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-navy">{service.title}</li>
            </ol>
          </nav>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <span className="grid size-16 place-items-center rounded-2xl bg-white text-brand shadow-[var(--shadow-soft)]">
                <Icon className="size-8" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="eyebrow mt-8">{service.category} · Serviço {String(idx + 1).padStart(2, "0")}</p>
              <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">{service.title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">{service.intro}</p>
            </div>
            <ButtonLink href="/#contato" arrow className="self-start lg:self-end">Fale com um especialista</ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl">O que fazemos</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.scope.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-line p-5">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-cyan text-white"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
                  <span className="text-[0.95rem] leading-relaxed text-ink/85">{item}</span>
                </li>
              ))}
            </ul>
            <h2 className="mt-14 text-3xl">Para quem é</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{service.audience}</p>
            <p className="mt-10 rounded-2xl bg-mist p-5 text-sm leading-relaxed text-muted">
              Cada empresa tem uma realidade própria. O escopo, os prazos e os valores são definidos após a análise do seu
              caso por um de nossos consultores.
            </p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.5rem] bg-navy p-7 text-white">
              <p className="font-display text-2xl">Converse com a C&T</p>
              <p className="mt-2 text-sm text-white/70">Tire suas dúvidas sobre {service.title.toLowerCase()} com um consultor.</p>
              <div className="mt-6 space-y-3">
                {units.map((u) => (
                  <a key={u.id} href={`tel:${u.phones[0].tel}`} className="flex items-center justify-between rounded-xl border border-white/15 px-4 py-3 text-sm transition hover:border-cyan hover:bg-white/5">
                    <span className="flex items-center gap-3"><Phone className="size-4 text-cyan" aria-hidden /> {u.city}</span>
                    <span className="font-semibold">{u.phones[0].display}</span>
                  </a>
                ))}
                <a href={whatsappLink(mainWhatsApp.number, `Olá! Gostaria de saber mais sobre ${service.title}.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-cyan px-4 py-3 text-sm font-semibold transition hover:bg-cyan-600">
                  <SocialIcon network="whatsapp" className="size-4" /> Conversar pelo WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-16 lg:py-20">
        <div className="container-site">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl sm:text-3xl">Outros serviços</h2>
            <Link href="/#servicos" className="inline-flex items-center gap-2 text-sm font-semibold text-brand"><ArrowLeft className="size-4" aria-hidden /> Todos os serviços</Link>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((r) => {
              const RIcon = r.icon;
              return (
                <li key={r.slug}>
                  <Link href={`/servicos/${r.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                    <RIcon className="size-6 text-brand" strokeWidth={1.6} aria-hidden />
                    <p className="mt-4 font-display text-lg text-navy">{r.title}</p>
                    <p className="mt-2 text-sm text-muted">{r.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand">Saiba mais <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
