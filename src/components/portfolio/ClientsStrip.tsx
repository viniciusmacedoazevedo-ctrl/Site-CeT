"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { fetchPortfolio, type PortfolioClient } from "@/lib/clients";

/** Faixa com as logos dos clientes na página inicial. Some se não houver clientes publicados. */
export function ClientsStrip() {
  const [clients, setClients] = useState<PortfolioClient[]>([]);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchPortfolio(ctrl.signal).then((c) => setClients(c.filter((x) => x.logo))).catch(() => setClients([]));
    return () => ctrl.abort();
  }, []);

  if (clients.length === 0) return null;
  // Repete a lista para o letreiro rodar sem emendas, mesmo com poucos clientes.
  const loop = Array.from({ length: Math.max(2, Math.ceil(12 / clients.length) * 2) }, () => clients).flat();

  return (
    <section aria-labelledby="clientes-faixa" className="relative overflow-hidden border-y border-line bg-white py-14">
      <div className="container-site flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker text-brand">Portfólio</p>
          <h2 id="clientes-faixa" className="mt-3 text-2xl font-semibold text-navy-900 sm:text-3xl">Empresas que confiam <span className="accent-serif text-brand">na C&T.</span></h2>
        </div>
        <Link href="/clientes" className="group inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand hover:text-cyan">
          Ver portfólio completo <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
      <div className="marquee mt-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="marquee-track" style={{ animationDuration: `${loop.length * 3}s` }}>
          {loop.map((c, i) => (
            <li key={`${c.id}-${i}`} aria-hidden={i >= clients.length} className="grid h-20 w-44 shrink-0 place-items-center rounded-2xl bg-mist px-6">
              {/* eslint-disable-next-line @next/next/no-img-element -- logo servida pela API */}
              <img src={c.logo!} alt={i < clients.length ? `Logo ${c.name}` : ""} loading="lazy" className="max-h-12 max-w-full object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
