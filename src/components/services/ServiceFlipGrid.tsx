"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, RotateCcw, Plus } from "lucide-react";
import { services, type Service } from "@/data/services";
import { serviceGroups } from "@/data/content";

type Props = {
  /** Filtra por grupo fixo (página de serviços). */
  group?: Service["category"];
  /** Exibe as abas de grupo (página inicial). */
  withTabs?: boolean;
  tone?: "dark" | "light";
};

export function ServiceFlipGrid({ group, withTabs = false, tone = "dark" }: Props) {
  const [tab, setTab] = useState<"Todos" | Service["category"]>("Todos");
  const [flipped, setFlipped] = useState<string | null>(null);
  const filter = group ?? (tab === "Todos" ? null : tab);
  const list = filter ? services.filter((s) => s.category === filter) : services;
  const dark = tone === "dark";

  return (
    <div>
      {withTabs && (
        <LayoutGroup>
          <div role="tablist" aria-label="Filtrar serviços por grupo" className={`mb-10 flex w-full gap-1 overflow-x-auto rounded-full border p-1 sm:w-auto sm:inline-flex ${dark ? "border-white/10 bg-white/[0.03]" : "border-line bg-mist"}`}>
            {(["Todos", ...serviceGroups.map((g) => g.id)] as const).map((t) => {
              const label = t === "Todos" ? "Todos" : serviceGroups.find((g) => g.id === t)!.title;
              const sel = tab === t;
              return (
                <button
                  key={t}
                  role="tab"
                  type="button"
                  aria-selected={sel}
                  onClick={() => { setTab(t); setFlipped(null); }}
                  className={`relative flex-1 whitespace-nowrap rounded-full px-4 py-2.5 font-display text-[0.8rem] font-medium transition-colors sm:flex-none ${sel ? "text-white" : dark ? "text-white/55 hover:text-white" : "text-navy/60 hover:text-navy"}`}
                >
                  {sel && <motion.span layoutId={`svc-tab-${tone}`} className="absolute inset-0 rounded-full bg-gradient-to-b from-cyan to-cyan-600 shadow-[0_8px_20px_-8px_rgb(23_174_210/0.8)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      )}

      <motion.ul layout className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((s, i) => (
            <motion.li
              key={s.slug}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, delay: i * 0.025, ease: [0.22, 1, 0.36, 1] }}
              className="flip-scene aspect-[4/5] sm:aspect-[5/4.6] lg:aspect-[5/4.3]"
            >
              <FlipCard
                service={s}
                index={services.indexOf(s) + 1}
                dark={dark}
                flipped={flipped === s.slug}
                onToggle={() => setFlipped((f) => (f === s.slug ? null : s.slug))}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function FlipCard({ service, index, dark, flipped, onToggle }: { service: Service; index: number; dark: boolean; flipped: boolean; onToggle: () => void }) {
  const Icon = service.icon;
  const num = String(index).padStart(2, "0");
  const backId = `svc-back-${service.slug}`;
  return (
    <div className="flip-inner" data-flipped={flipped}>
      {/* Frente */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={flipped}
        aria-controls={backId}
        aria-hidden={flipped}
        tabIndex={flipped ? -1 : 0}
        className={`flip-face group flex flex-col overflow-hidden rounded-[1.25rem] border p-4 text-left transition-[border-color,box-shadow] duration-300 sm:p-6 ${
          dark
            ? "border-white/10 bg-[linear-gradient(160deg,rgb(255_255_255/0.06),rgb(255_255_255/0.015))] hover:border-cyan/50 hover:shadow-[0_0_0_1px_rgb(23_174_210/0.3),0_20px_50px_-20px_rgb(23_174_210/0.5)]"
            : "border-line bg-white shadow-[var(--shadow-soft)] hover:border-cyan/60 hover:shadow-[var(--shadow-lift)]"
        }`}
      >
        <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-cyan/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        <Icon aria-hidden strokeWidth={0.8} className={`pointer-events-none absolute -bottom-6 -right-6 size-36 transition-all duration-700 group-hover:-rotate-12 group-hover:scale-110 ${dark ? "text-white/[0.035] group-hover:text-cyan/[0.12]" : "text-navy/[0.04] group-hover:text-cyan/[0.15]"}`} />
        <div className="flex items-start justify-between">
          <span className={`relative grid size-12 place-items-center rounded-2xl transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg] sm:size-14 ${dark ? "bg-cyan/10 text-cyan ring-1 ring-cyan/25 group-hover:bg-cyan group-hover:text-white" : "bg-cyan-50 text-brand ring-1 ring-cyan/25 group-hover:bg-navy group-hover:text-cyan"}`}>
            <Icon className="size-6 sm:size-7" strokeWidth={1.5} aria-hidden />
          </span>
          <span className={`font-display text-xs tabular-nums ${dark ? "text-white/30" : "text-navy/30"}`}>{num}</span>
        </div>
        <h3 className={`mt-auto font-display text-[0.95rem] font-semibold leading-snug sm:text-lg ${dark ? "text-white" : "text-navy-900"}`}>{service.title}</h3>
        <span className={`mt-3 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${dark ? "text-cyan-300/80" : "text-brand/80"}`}>
          <Plus className="size-3.5 transition-transform duration-300 group-hover:rotate-90" aria-hidden /> Detalhes
        </span>
      </button>

      {/* Verso */}
      <div
        id={backId}
        aria-hidden={!flipped}
        className="flip-face flip-back flex flex-col overflow-hidden rounded-[1.25rem] bg-[linear-gradient(155deg,#17aed2,#0b6fa3_55%,#075a91)] p-4 text-white shadow-[0_24px_50px_-20px_rgb(23_174_210/0.7)] sm:p-6"
      >
        <span aria-hidden className="absolute -bottom-16 -right-16 size-48 rounded-full border border-white/20" />
        <span aria-hidden className="absolute -bottom-8 -right-8 size-28 rounded-full border border-white/20" />
        <div className="flex items-center justify-between">
          <span className="font-display text-xs tabular-nums text-white/70">{num}</span>
          <button type="button" onClick={onToggle} tabIndex={flipped ? 0 : -1} className="grid size-8 place-items-center rounded-full bg-white/15 transition hover:bg-white/25" aria-label={`Voltar ao cartão ${service.title}`}>
            <RotateCcw className="size-3.5" />
          </button>
        </div>
        <p className="mt-3 font-display text-sm font-semibold leading-snug sm:text-base">{service.title}</p>
        <p className="mt-2 line-clamp-5 text-[0.78rem] leading-relaxed text-white/85 sm:text-sm">{service.summary}</p>
        <Link
          href={`/servicos/${service.slug}`}
          tabIndex={flipped ? 0 : -1}
          className="relative mt-auto inline-flex items-center justify-between gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-navy transition hover:bg-navy hover:text-white sm:text-sm"
        >
          Saiba mais <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
