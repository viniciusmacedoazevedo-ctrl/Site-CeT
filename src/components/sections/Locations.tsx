"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import { fullAddress, googleMapsDirections, googleMapsSearch, units, type Unit } from "@/data/units";
import { mainWhatsApp, whatsappLink } from "@/data/company";
import { SectionHeading } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";

const UnitMap = dynamic(() => import("@/components/locations/UnitMap").then((m) => m.UnitMap), {
  ssr: false,
  loading: () => <div className="grid-paper size-full bg-[#eef3f7]" />,
});

export function Locations() {
  const [activeId, setActiveId] = useState<Unit["id"]>(units[0].id);

  return (
    <section id="unidades" aria-labelledby="unidades-titulo" className="relative py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Unidades"
            id="unidades-titulo"
            title={<>Duas unidades na Paraíba. Explore em 3D.</>}
            text="Aproxime, gire e incline o mapa para conhecer a região de cada unidade. Abra a rota no Google Maps com um toque."
          />
          <div role="tablist" aria-label="Escolha a unidade" className="grid grid-cols-2 gap-2 rounded-2xl border border-line bg-mist p-1.5 sm:w-[26rem]">
            {units.map((u) => {
              const selected = u.id === activeId;
              return (
                <button
                  key={u.id}
                  role="tab"
                  type="button"
                  id={`tab-${u.id}`}
                  aria-selected={selected}
                  aria-controls={`painel-${u.id}`}
                  onClick={() => setActiveId(u.id)}
                  className={`relative rounded-xl px-4 py-3 text-left transition ${selected ? "text-white" : "text-navy hover:bg-white"}`}
                >
                  {selected && <motion.span layoutId="unit-tab" className="absolute inset-0 rounded-xl bg-navy shadow-[var(--shadow-lift)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative block text-[0.65rem] font-semibold uppercase tracking-[0.16em] opacity-70">Unidade</span>
                  <span className="relative mt-0.5 block font-display text-lg">{u.city}</span>
                </button>
              );
            })}
          </div>
        </div>

        {units.map((u) => (
          <UnitPanel key={u.id} unit={u} active={u.id === activeId} />
        ))}
      </div>
    </section>
  );
}

function UnitPanel({ unit, active }: { unit: Unit; active: boolean }) {
  return (
    <div
      id={`painel-${unit.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${unit.id}`}
      hidden={!active}
      className="mt-10"
    >
      <motion.div initial={false} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="grid gap-5 lg:grid-cols-[1fr_22rem]">
            <div className="relative h-[28rem] overflow-hidden rounded-[1.75rem] border border-line shadow-[var(--shadow-lift)] sm:h-[34rem] lg:h-[38rem]">
              <UnitMap unit={unit} active={active} />
            </div>

            <aside className="flex flex-col gap-5">
              <div className="card flex flex-1 flex-col p-6">
                <p className="eyebrow !text-[0.68rem]">C&T Consultores e Associados</p>
                <h3 className="mt-3 text-3xl">{unit.city}</h3>
                <address className="mt-5 flex gap-3 not-italic text-sm leading-relaxed text-ink/80">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-cyan" aria-hidden />
                  <span>
                    {unit.street}, {unit.number}
                    <br />
                    {unit.district} — {unit.city} - {unit.state}
                    <br />
                    CEP {unit.postalCode}
                  </span>
                </address>
                <ul className="mt-4 space-y-2 text-sm">
                  {unit.phones.map((p) => (
                    <li key={p.tel}>
                      <a href={`tel:${p.tel}`} className="inline-flex items-center gap-3 font-semibold text-navy hover:text-brand">
                        <Phone className="size-5 text-cyan" aria-hidden /> {p.display}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={whatsappLink(unit.whatsapp ?? mainWhatsApp.number, `Olá! Gostaria de falar com a unidade ${unit.city} da C&T.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-semibold text-navy hover:text-brand">
                      <SocialIcon network="whatsapp" className="size-5 text-cyan" /> WhatsApp
                    </a>
                  </li>
                </ul>
                <div className="mt-auto grid gap-2 pt-6">
                  <a href={googleMapsDirections(unit)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600">
                    <Navigation className="size-4" aria-hidden /> Como chegar
                  </a>
                  <a href={googleMapsSearch(unit)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-navy transition hover:border-navy">
                    <ExternalLink className="size-4" aria-hidden /> Abrir no Google Maps
                  </a>
                </div>
                <p className="sr-only">Endereço completo: {fullAddress(unit)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {unit.photos.map((p) => (
                  <Image key={p.src} src={p.src} alt={p.alt} width={1600} height={782} sizes="(min-width: 1024px) 11rem, 50vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                ))}
              </div>
            </aside>
          </motion.div>
    </div>
  );
}
