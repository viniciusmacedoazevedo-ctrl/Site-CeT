"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Building, Calculator, Landmark, Plus, Search, Store, University, type LucideIcon } from "lucide-react";
import { linkCategories } from "@/data/useful-links";

const icons: Record<string, LucideIcon> = { federal: Landmark, contabeis: Calculator, estaduais: University, municipais: Building, apoio: Store };
const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const ease = [0.22, 1, 0.36, 1] as const;

/** Categorias expansíveis. Com `searchable`, inclui busca (página completa). */
export function LinksAccordion({ tone = "dark", searchable = false, defaultOpen = null }: { tone?: "dark" | "light"; searchable?: boolean; defaultOpen?: string | null }) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const [query, setQuery] = useState("");
  const dark = tone === "dark";

  const groups = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return linkCategories;
    return linkCategories
      .map((c) => ({ ...c, links: c.links.filter((l) => normalize(`${l.name} ${l.description}`).includes(q)) }))
      .filter((c) => c.links.length);
  }, [query]);
  const searching = query.trim().length > 0;

  return (
    <div>
      {searchable && (
        <label className="relative mb-6 block">
          <span className="sr-only">Buscar portal</span>
          <Search className={`pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 ${dark ? "text-white/40" : "text-muted"}`} aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar portal: Simples, NFS-e, JUCEP, eSocial…"
            className={`w-full rounded-2xl border py-4 pl-14 pr-5 text-base focus:outline-none focus:ring-4 ${dark ? "border-white/10 bg-white/[0.04] text-white placeholder:text-white/35 focus:border-cyan focus:ring-cyan/20" : "border-line bg-white text-navy placeholder:text-muted/70 focus:border-cyan focus:ring-cyan/15"}`}
          />
        </label>
      )}
      <p className="sr-only" aria-live="polite">{groups.reduce((n, g) => n + g.links.length, 0)} portais</p>

      <ul className={`overflow-hidden rounded-[1.5rem] border ${dark ? "divide-y divide-white/10 border-white/10" : "divide-y divide-line border-line bg-white"}`}>
        {groups.map((c) => {
          const Icon = icons[c.id] ?? Landmark;
          const isOpen = searching || open === c.id;
          const panelId = `links-${c.id}`;
          return (
            <li key={c.id} className={`transition-colors ${isOpen ? (dark ? "bg-white/[0.04]" : "bg-mist/60") : ""}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen((o) => (o === c.id ? null : c.id))}
                  className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <span className={`grid size-12 shrink-0 place-items-center rounded-2xl transition-all duration-300 ${isOpen ? "bg-cyan text-white shadow-[var(--shadow-glow)]" : dark ? "bg-white/[0.06] text-cyan group-hover:bg-white/10" : "bg-cyan-50 text-brand group-hover:bg-cyan-100"}`}>
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className={`block font-display text-base font-semibold sm:text-lg ${dark ? "text-white" : "text-navy-900"}`}>{c.title}</span>
                    <span className={`block text-sm ${dark ? "text-white/50" : "text-muted"}`}>{c.description}</span>
                  </span>
                  <span className={`hidden rounded-full px-2.5 py-1 font-display text-xs sm:inline ${dark ? "bg-white/[0.06] text-white/60" : "bg-mist text-navy/60"}`}>{c.links.length} {c.links.length === 1 ? "portal" : "portais"}</span>
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? "rotate-45 border-cyan text-cyan" : dark ? "border-white/15 text-white/70" : "border-line text-navy/70"}`}>
                    <Plus className="size-4" aria-hidden />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={panelId} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                    <ul className="grid gap-2 px-5 pb-6 sm:grid-cols-2 sm:px-7 lg:grid-cols-3">
                      {c.links.map((l, i) => (
                        <motion.li key={l.href} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex h-full items-start justify-between gap-3 rounded-xl border p-4 transition duration-300 hover:-translate-y-0.5 ${dark ? "border-white/10 bg-navy-950/40 hover:border-cyan/60 hover:bg-navy-950/70" : "border-line bg-white hover:border-cyan hover:shadow-[var(--shadow-soft)]"}`}
                          >
                            <span>
                              <span className={`block font-semibold ${dark ? "text-white" : "text-navy"}`}>{l.name}</span>
                              <span className={`mt-1 block text-xs leading-relaxed ${dark ? "text-white/50" : "text-muted"}`}>{l.description}</span>
                              <span className={`mt-2 block font-display text-[0.68rem] ${dark ? "text-cyan-300/70" : "text-brand/70"}`}>{new URL(l.href).hostname.replace(/^www\./, "")}</span>
                            </span>
                            <ArrowUpRight className="size-4 shrink-0 text-cyan transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                            <span className="sr-only">(abre em nova aba)</span>
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
        {groups.length === 0 && <li className={`p-8 text-center text-sm ${dark ? "text-white/60" : "text-muted"}`}>Nenhum portal encontrado para “{query}”.</li>}
      </ul>
    </div>
  );
}
