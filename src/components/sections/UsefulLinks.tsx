"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Building, Calculator, Info, Landmark, Search, Store, University, type LucideIcon } from "lucide-react";
import { linkCategories } from "@/data/useful-links";
import { SectionHeading } from "@/components/ui/primitives";

const icons: Record<string, LucideIcon> = {
  federal: Landmark,
  contabeis: Calculator,
  estaduais: University,
  municipais: Building,
  apoio: Store,
};

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function UsefulLinks() {
  const [category, setCategory] = useState<string>("todos");
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = normalize(query.trim());
    return linkCategories
      .filter((c) => category === "todos" || c.id === category)
      .map((c) => ({ ...c, links: c.links.filter((l) => !q || normalize(`${l.name} ${l.description}`).includes(q)) }))
      .filter((c) => c.links.length > 0);
  }, [category, query]);

  const count = groups.reduce((n, g) => n + g.links.length, 0);

  return (
    <section id="links-uteis" aria-labelledby="links-titulo" className="relative bg-mist py-24 lg:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Central de Links Úteis"
          id="links-titulo"
          title={<>Os portais que empresários e contadores mais acessam, em um só lugar.</>}
          text="Atalhos para os serviços oficiais da Receita Federal, do Estado da Paraíba, das prefeituras e dos órgãos contábeis."
        />

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtrar por categoria">
            {[{ id: "todos", title: "Todos" }, ...linkCategories].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  category === c.id ? "border-navy bg-navy text-white" : "border-line bg-white text-navy/75 hover:border-navy hover:text-navy"
                }`}
              >
                {c.id === "todos" ? "Todos" : c.title.replace("Receita Federal e serviços federais", "Federais").replace("Órgãos estaduais da Paraíba", "Estaduais (PB)").replace("Serviços municipais", "Municipais").replace("Órgãos contábeis", "Contábeis").replace("Apoio empresarial", "Apoio")}
              </button>
            ))}
          </div>
          <label className="relative block lg:w-80">
            <span className="sr-only">Buscar portal</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar: Simples, NFS-e, JUCEP…"
              className="w-full rounded-full border border-line bg-white py-2.5 pl-11 pr-4 text-sm text-navy placeholder:text-muted/70 focus:border-cyan focus:outline-none focus:ring-4 focus:ring-cyan/15"
            />
          </label>
        </div>
        <p className="sr-only" aria-live="polite">{count} portais encontrados</p>

        <div className="mt-10 space-y-12">
          <AnimatePresence mode="popLayout">
            {groups.map((g) => {
              const Icon = icons[g.id] ?? Landmark;
              return (
                <motion.div key={g.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                    <h3 className="text-xl">{g.title}</h3>
                    <p className="hidden text-sm text-muted sm:block">{g.description}</p>
                  </div>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {g.links.map((l) => (
                      <motion.li key={l.href} layout>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:shadow-[var(--shadow-soft)]"
                        >
                          <div className="flex items-start gap-3">
                            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan-50 text-brand transition group-hover:bg-cyan group-hover:text-white">
                              <Icon className="size-[18px]" strokeWidth={1.7} aria-hidden />
                            </span>
                            <div>
                              <p className="font-semibold leading-snug text-navy">{l.name}</p>
                              <p className="mt-1 text-xs text-muted">{new URL(l.href).hostname.replace(/^www\./, "")}</p>
                            </div>
                          </div>
                          <p className="mt-4 text-sm leading-relaxed text-muted">{l.description}</p>
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand">
                            Acessar portal
                            <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                            <span className="sr-only">(abre em nova aba)</span>
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {count === 0 && <p className="rounded-2xl border border-dashed border-line bg-white p-8 text-center text-sm text-muted">Nenhum portal encontrado para “{query}”.</p>}
        </div>

        <p className="mt-12 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          Os serviços acessados por estes links são prestados pelos respectivos órgãos e entidades externos. A C&T não
          se responsabiliza pelo conteúdo, disponibilidade ou políticas de privacidade desses portais.
        </p>
      </div>
    </section>
  );
}
