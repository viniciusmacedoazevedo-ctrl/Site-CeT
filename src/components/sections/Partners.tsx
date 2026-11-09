"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { partners } from "@/data/content";
import { SectionHeading } from "@/components/ui/primitives";

function useVisibleCount() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const md = window.matchMedia("(min-width: 640px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => setN(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    md.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => { md.removeEventListener("change", update); lg.removeEventListener("change", update); };
  }, []);
  return n;
}

export function Partners() {
  const visible = useVisibleCount();
  const reduce = useReducedMotion();
  const total = partners.length;
  // Lista triplicada para laço contínuo.
  const items = [...partners, ...partners, ...partners];
  const [index, setIndex] = useState(total);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: 1 | -1) => { setAnimate(true); setIndex((i) => i + dir); }, []);

  // Reposiciona sem animação ao sair da faixa central.
  const onTransitionEnd = () => {
    if (index >= total * 2 || index < total) {
      setAnimate(false);
      setIndex((i) => ((i - total) % total + total) % total + total);
    }
  };
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(1), 4200);
    return () => clearInterval(t);
  }, [paused, reduce, go]);

  const current = ((index - total) % total + total) % total;

  return (
    <section id="parceiros" aria-labelledby="parceiros-titulo" className="py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Parceiros" id="parceiros-titulo" title="Empresas que caminham com a C&T." text="Parcerias que ampliam as soluções oferecidas aos nossos clientes." />
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Parceiro anterior" className="grid size-12 place-items-center rounded-full border border-line text-navy transition hover:border-navy hover:bg-navy hover:text-white">
              <ArrowLeft className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Próximo parceiro" className="grid size-12 place-items-center rounded-full border border-line text-navy transition hover:border-navy hover:bg-navy hover:text-white">
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={regionRef}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Parceiros"
          className="relative mt-12 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ul
            className="flex"
            style={{
              transform: `translate3d(-${(index * 100) / visible}%,0,0)`,
              transition: animate ? "transform 700ms cubic-bezier(0.22,1,0.36,1)" : "none",
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {items.map((p, i) => {
              const inView = i >= index && i < index + visible;
              return (
                <li key={`${p.name}-${i}`} className="shrink-0 px-2.5" style={{ width: `${100 / visible}%` }} aria-hidden={!inView} aria-roledescription="slide" aria-label={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={inView ? 0 : -1}
                    className="group flex h-full flex-col rounded-[1.25rem] border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="grid h-36 place-items-center rounded-xl bg-mist px-8">
                      <Image
                        src={p.logo}
                        alt={`Logo ${p.name}`}
                        width={p.width}
                        height={p.height}
                        className="max-h-20 w-auto object-contain grayscale-[35%] transition duration-500 group-hover:grayscale-0"
                      />
                    </div>
                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="font-display text-lg text-navy">{p.name}</p>
                        <p className="text-sm text-muted">{p.description}</p>
                      </div>
                      <ArrowUpRight className="size-5 shrink-0 text-cyan transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex justify-center gap-2" aria-hidden>
          {partners.map((p, i) => (
            <span key={p.name} className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-cyan" : "w-1.5 bg-line"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
