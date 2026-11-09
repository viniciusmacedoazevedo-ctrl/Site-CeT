"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { differentials } from "@/data/content";
import { SectionHeader } from "@/components/ui/primitives";

/** Seletor interativo: um diferencial em destaque por vez, com troca automática até o visitante interagir. */
export function Differentials({ index = "04" }: { index?: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!auto || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % differentials.length), 5000);
    return () => clearInterval(t);
  }, [auto, reduce]);

  const d = differentials[active];
  const Icon = d.icon;
  const choose = (i: number) => { setActive(i); setAuto(false); };

  return (
    <section id="diferenciais" aria-labelledby="diferenciais-titulo" className="relative overflow-hidden bg-mist py-24 lg:py-32">
      <div aria-hidden className="hairline-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_50%,black,transparent_70%)]" />
      <div className="container-site relative">
        <SectionHeader index={index} kicker="Diferenciais" id="diferenciais-titulo" title={<>Como trabalhamos para estar <span className="accent-serif text-brand">ao seu lado.</span></>} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <ol className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0" role="tablist" aria-label="Diferenciais">
            {differentials.map((item, i) => {
              const sel = i === active;
              return (
                <li key={item.title} className="shrink-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={sel}
                    aria-controls="diferencial-painel"
                    onClick={() => choose(i)}
                    className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-xl px-4 py-3.5 text-left transition-colors lg:px-5 lg:py-4 ${sel ? "bg-navy text-white" : "text-navy/70 hover:bg-white hover:text-navy"}`}
                  >
                    <span className={`font-display text-xs tabular-nums ${sel ? "text-cyan" : "text-navy/35"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="whitespace-nowrap font-display text-sm font-medium lg:text-base">{item.title}</span>
                    {sel && auto && !reduce && (
                      <motion.span key={`p-${active}`} className="absolute bottom-0 left-0 h-[2px] bg-cyan" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }} />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <div id="diferencial-painel" role="tabpanel" className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-navy-900 p-8 text-white shadow-[var(--shadow-lift)] sm:p-12">
            <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-cyan/20 blur-3xl" />
            <div aria-hidden className="hairline-grid absolute inset-0 opacity-60" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative flex h-full flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-cyan to-brand shadow-[0_20px_40px_-12px_rgb(23_174_210/0.7)]"
                  initial={{ rotate: -12, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                >
                  <Icon className="size-9" strokeWidth={1.5} aria-hidden />
                </motion.span>
                <p className="mt-10 font-display text-sm text-cyan-300">{String(active + 1).padStart(2, "0")} / {String(differentials.length).padStart(2, "0")}</p>
                <h3 className="mt-2 text-3xl font-semibold sm:text-4xl">{d.title}</h3>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">{d.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
