"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/data/services";
import { SectionHeading } from "@/components/ui/primitives";

const filters = ["Todos", "Rotina", "Gestão", "Estratégia"] as const;
type Filter = (typeof filters)[number];

const filterHint: Record<Filter, string> = {
  Todos: "Todas as frentes de atuação",
  Rotina: "O dia a dia contábil, fiscal e de pessoal",
  Gestão: "Informação para gerir melhor",
  Estratégia: "Decisões, projetos e defesa",
};

export function Services() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const list = filter === "Todos" ? services : services.filter((s) => s.category === filter);

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="relative py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Serviços"
            id="servicos-titulo"
            title={<>Soluções completas para cada etapa da sua empresa.</>}
            text="Da rotina fiscal ao planejamento estratégico: 12 frentes de atuação conduzidas por especialistas."
          />
          <LayoutGroup>
            <div role="tablist" aria-label="Filtrar serviços" className="flex w-full gap-1 overflow-x-auto rounded-full border border-line bg-mist p-1 sm:w-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  type="button"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={`relative flex-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:flex-none ${filter === f ? "text-white" : "text-navy/70 hover:text-navy"}`}
                >
                  {filter === f && <motion.span layoutId="svc-pill" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>
        <p className="mt-6 text-sm text-muted lg:text-right" aria-live="polite">{filterHint[filter]} · {list.length} serviços</p>

        <motion.ul layout className="mt-6 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((s) => (
              <motion.li
                key={s.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="bg-white"
              >
                <ServiceCard service={s} index={services.indexOf(s) + 1} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/servicos/${service.slug}`}
      className="group relative flex h-full min-h-[17rem] flex-col p-7 transition-colors duration-300 hover:bg-[linear-gradient(180deg,#fff,var(--color-cyan-50))] focus-visible:z-10"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-cyan to-brand transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-2xl border border-cyan/25 bg-cyan-50 text-brand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan group-hover:bg-cyan group-hover:text-white">
          <Icon className="size-[22px]" strokeWidth={1.6} aria-hidden />
        </span>
        <span className="font-display text-sm text-muted/70 tabular-nums">{String(index).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-6 text-xl leading-snug">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
        Saiba mais
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
