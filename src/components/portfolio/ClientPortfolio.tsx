"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MapPin, ShieldCheck } from "lucide-react";
import { fetchPortfolio, type LoadState, type PortfolioClient } from "@/lib/clients";
import { ButtonLink } from "@/components/ui/primitives";

const ALL = "Todos";

export function ClientPortfolio() {
  const [state, setState] = useState<LoadState<PortfolioClient[]>>({ status: "loading" });
  const [segment, setSegment] = useState(ALL);
  const [city, setCity] = useState(ALL);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchPortfolio(ctrl.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch((e: Error) => { if (e.name !== "AbortError") setState({ status: "error", message: e.message }); });
    return () => ctrl.abort();
  }, []);

  const clients = useMemo(() => (state.status === "ready" ? state.data : []), [state]);
  const segments = useMemo(() => [ALL, ...Array.from(new Set(clients.map((c) => c.segment))).sort((a, b) => a.localeCompare(b, "pt-BR"))], [clients]);
  const cities = useMemo(() => [ALL, ...Array.from(new Set(clients.map((c) => c.city))).sort((a, b) => a.localeCompare(b, "pt-BR"))], [clients]);
  const visible = clients.filter((c) => (segment === ALL || c.segment === segment) && (city === ALL || c.city === city));

  if (state.status === "loading") {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" aria-busy="true" aria-label="Carregando portfólio">
        {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-56 animate-pulse rounded-[1.5rem] bg-mist" />)}
      </div>
    );
  }

  if (state.status === "error" || clients.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-line bg-mist px-6 py-16 text-center">
        <Building2 className="mx-auto size-10 text-brand" aria-hidden />
        <p className="mt-5 font-display text-xl font-semibold text-navy-900">Portfólio em atualização</p>
        <p className="mx-auto mt-2 max-w-md text-muted">Em breve você verá aqui as empresas que confiam na C&T. Quer fazer parte dessa lista?</p>
        <ButtonLink href="/contato" variant="navy" arrow className="mt-7">Fale com a C&T</ButtonLink>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-label="Filtrar por segmento" className="flex flex-wrap gap-2">
          {segments.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={segment === s}
              onClick={() => setSegment(s)}
              className={`rounded-full border px-4 py-2 font-display text-sm font-medium transition ${segment === s ? "border-navy bg-navy text-white" : "border-line text-navy hover:border-cyan hover:text-brand"}`}
            >
              {s}
            </button>
          ))}
        </div>
        {cities.length > 2 && (
          <label className="flex items-center gap-3 text-sm font-semibold text-navy">
            <MapPin className="size-4 text-cyan" aria-hidden /> Cidade
            <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-full border border-line bg-white px-4 py-2 font-normal focus:border-cyan focus:outline-none focus:ring-4 focus:ring-cyan/15">
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        )}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">{visible.length} {visible.length === 1 ? "cliente" : "clientes"}</p>

      <motion.ul layout className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((c) => (
            <motion.li
              key={c.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col rounded-[1.5rem] border border-line bg-white p-3 transition hover:-translate-y-1 hover:border-cyan hover:shadow-[var(--shadow-lift)]"
            >
              <div className="grid h-32 place-items-center rounded-[1.1rem] bg-mist px-6 transition-colors group-hover:bg-cyan-50 sm:h-36">
                {c.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- logo servida pela API, sem otimização estática
                  <img src={c.logo} alt={`Logo ${c.name}`} loading="lazy" className="max-h-20 max-w-full object-contain transition duration-500 group-hover:scale-105" />
                ) : (
                  <span className="font-display text-3xl font-semibold text-brand/60">{c.name.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div className="px-2 pb-1 pt-4">
                <p className="font-display font-semibold leading-snug text-navy-900">{c.name}</p>
                <p className="mt-1 text-xs text-muted">{c.segment} · {c.city}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <p className="mt-10 flex items-start gap-2 text-xs text-muted">
        <ShieldCheck className="size-4 shrink-0 text-cyan" aria-hidden />
        Nomes e logos publicados com autorização de cada cliente, em conformidade com a LGPD.
      </p>
    </div>
  );
}
