"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Box, MapPin, Navigation, Phone } from "lucide-react";
import { googleMapsDirections, googleMapsSearch, units, type Unit } from "@/data/units";
import { mainWhatsApp, whatsappLink } from "@/data/company";
import { SocialIcon } from "@/components/ui/SocialIcon";

const UnitMap = dynamic(() => import("./UnitMap").then((m) => m.UnitMap), {
  ssr: false,
  loading: () => <div className="hairline-grid size-full bg-navy-900" />,
});

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Exploração das unidades em duas etapas:
 * 1) escolha da cidade (cartões com fotos reais);
 * 2) transição para o palco com mapa 3D, endereço, telefones e rota.
 */
export function UnitsExplorer() {
  const [selected, setSelected] = useState<Unit["id"] | null>(null);
  const unit = units.find((u) => u.id === selected) ?? null;

  // Permite abrir direto uma unidade por âncora (#campina-grande / #joao-pessoa).
  useEffect(() => {
    const fromHash = () => {
      const id = location.hash.replace("#", "");
      if (units.some((u) => u.id === id)) setSelected(id as Unit["id"]);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait" initial={false}>
        {!unit ? (
          <motion.div key="chooser" className="grid gap-4 md:grid-cols-2" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
            {units.map((u, i) => (
              <motion.button
                key={u.id}
                layoutId={`unit-${u.id}`}
                type="button"
                onClick={() => setSelected(u.id)}
                className="group relative h-[22rem] overflow-hidden rounded-[1.75rem] text-left text-white sm:h-[28rem]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                aria-label={`Explorar a unidade ${u.city} em 3D`}
              >
                <Image src={u.photos[0].src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10 transition-opacity duration-500 group-hover:opacity-90" />
                <span className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10 transition group-hover:ring-cyan/60" />
                <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy-950/40 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] backdrop-blur">
                  <MapPin className="size-3.5 text-cyan" aria-hidden /> Unidade {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                  <span>
                    <span className="block font-display text-4xl font-semibold leading-none sm:text-5xl">{u.city}</span>
                    <span className="mt-3 block text-sm text-white/70">{u.district} · {u.state}</span>
                  </span>
                  <span className="btn btn-cyan shrink-0 !px-4 !py-3 transition-transform duration-500 group-hover:-translate-y-1">
                    <Box className="size-4" aria-hidden /> <span className="hidden sm:inline">Explorar em 3D</span>
                  </span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div key="stage" layoutId={`unit-${unit.id}`} className="overflow-hidden rounded-[1.75rem] bg-navy-950 text-white shadow-[0_40px_90px_-40px_rgb(6_19_33/0.9)] ring-1 ring-white/10" transition={{ duration: 0.7, ease }}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <button type="button" onClick={() => setSelected(null)} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
                <ArrowLeft className="size-4" aria-hidden /> Todas as unidades
              </button>
              <div role="tablist" aria-label="Trocar unidade" className="flex gap-1 rounded-full bg-white/[0.06] p-1">
                {units.map((u) => (
                  <button key={u.id} role="tab" type="button" aria-selected={u.id === unit.id} onClick={() => setSelected(u.id)} className={`relative rounded-full px-4 py-2 font-display text-xs font-medium transition-colors ${u.id === unit.id ? "text-white" : "text-white/55 hover:text-white"}`}>
                    {u.id === unit.id && <motion.span layoutId="unit-switch" className="absolute inset-0 rounded-full bg-cyan" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className="relative">{u.city}</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={unit.id} className="grid lg:grid-cols-[1.65fr_1fr]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <div className="relative h-[26rem] sm:h-[32rem] lg:h-[38rem]">
                  <UnitMap unit={unit} active />
                </div>

                <motion.aside className="flex flex-col gap-6 border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}>
                  <Item>
                    <p className="kicker text-cyan-300">C&T Consultores e Associados</p>
                    <h3 className="mt-3 text-4xl font-semibold">{unit.city}</h3>
                  </Item>
                  <Item>
                    <address className="flex gap-3 not-italic text-sm leading-relaxed text-white/75">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-cyan" aria-hidden />
                      <span>{unit.street}, {unit.number}<br />{unit.district} — {unit.city} - {unit.state}<br />CEP {unit.postalCode}</span>
                    </address>
                  </Item>
                  <Item className="flex flex-wrap gap-2">
                    {unit.phones.map((p) => (
                      <a key={p.tel} href={`tel:${p.tel}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-cyan hover:text-cyan">
                        <Phone className="size-4 text-cyan" aria-hidden /> {p.display}
                      </a>
                    ))}
                    <a href={whatsappLink(unit.whatsapp ?? mainWhatsApp.number, `Olá! Gostaria de falar com a unidade ${unit.city} da C&T.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-cyan hover:text-cyan">
                      <SocialIcon network="whatsapp" className="size-4 text-cyan" /> WhatsApp
                    </a>
                  </Item>
                  <Item className="grid grid-cols-2 gap-2">
                    {unit.photos.map((p) => (
                      <Image key={p.src} src={p.src} alt={p.alt} width={1600} height={782} sizes="12rem" className="aspect-[4/3] w-full rounded-xl object-cover ring-1 ring-white/10" />
                    ))}
                  </Item>
                  <Item className="mt-auto grid gap-2">
                    <a href={googleMapsDirections(unit)} target="_blank" rel="noopener noreferrer" className="btn btn-cyan w-full">
                      <Navigation className="size-4" aria-hidden /> Traçar rota
                    </a>
                    <a href={googleMapsSearch(unit)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light w-full">
                      Abrir no Google Maps <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  </Item>
                </motion.aside>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

function Item({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}>
      {children}
    </motion.div>
  );
}
