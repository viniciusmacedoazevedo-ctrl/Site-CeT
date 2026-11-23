"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { instagramProfile } from "@/data/company";
import { moments, type Moment } from "@/data/content";
import { Reveal, SectionHeader } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";

const fmt = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" });

/**
 * Momentos e Instagram. Publicações administráveis em src/data/content.ts.
 * Ao clicar, a imagem se expande com a legenda (sem texto exposto na grade).
 */
export function Instagram({ index }: { index?: string }) {
  const [open, setOpen] = useState<Moment | null>(null);
  return (
    <section id="momentos" aria-labelledby="momentos-titulo" className="relative bg-white py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader index={index} kicker="Momentos · Instagram" id="momentos-titulo" title={<>Pessoas, causas e <span className="accent-serif text-brand">celebrações.</span></>} />
          <a href={instagramProfile.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark self-start md:self-auto">
            <SocialIcon network="instagram" className="size-4" /> {instagramProfile.handle}
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {moments.map((m, i) => (
            <li key={m.title}>
              <Reveal delay={(i % 3) * 0.06}>
                <motion.button layoutId={`moment-${m.title}`} type="button" onClick={() => setOpen(m)} className="group relative block w-full overflow-hidden rounded-2xl" aria-label={`Ver ${m.title}`}>
                  <Image src={m.image} alt="" width={720} height={720} sizes="(min-width: 1024px) 30vw, 50vw" className="aspect-square size-full object-cover transition duration-700 group-hover:scale-[1.05]" />
                  <span className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/85 to-transparent p-4 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="font-display text-sm font-semibold text-white sm:text-base">{m.title}</span>
                  </span>
                </motion.button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-navy-950/80 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div layoutId={`moment-${open.title}`} role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => e.stopPropagation()} className="grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white sm:grid-cols-[1.1fr_1fr]">
              <Image src={open.image} alt="" width={720} height={720} className="aspect-square w-full object-cover" />
              <div className="flex flex-col p-6 sm:p-8">
                <button type="button" onClick={() => setOpen(null)} autoFocus className="ml-auto grid size-9 place-items-center rounded-full bg-mist text-navy hover:bg-navy hover:text-white" aria-label="Fechar">
                  <X className="size-4" />
                </button>
                <p className="kicker mt-2 text-brand">{fmt.format(new Date(open.date))}</p>
                <p className="mt-3 font-display text-2xl font-semibold text-navy-900">{open.title}</p>
                <p className="mt-4 leading-relaxed text-muted">{open.caption}</p>
                <a href={instagramProfile.href} target="_blank" rel="noopener noreferrer" className="btn btn-navy mt-auto">
                  Ver no Instagram <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
