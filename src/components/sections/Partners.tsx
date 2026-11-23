"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react";
import { partners } from "@/data/content";
import { SectionHeader } from "@/components/ui/primitives";

/** Carrossel em perspectiva: o parceiro central gira ao ser clicado e revela os detalhes. */
export function Partners({ index = "05" }: { index?: string }) {
  const n = partners.length;
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((dir: number) => { setFlipped(false); setCurrent((c) => (c + dir + n) % n); }, [n]);

  useEffect(() => {
    if (paused || flipped || reduce) return;
    const t = setInterval(() => go(1), 4500);
    return () => clearInterval(t);
  }, [paused, flipped, reduce, go]);

  return (
    <section id="parceiros" aria-labelledby="parceiros-titulo" className="noise relative overflow-hidden bg-ink-950 py-24 text-white lg:py-32">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[30rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(23_174_210/0.16),transparent)]" />
      <div className="container-site relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader tone="dark" index={index} kicker="Parceiros" id="parceiros-titulo" title={<>Empresas que caminham <span className="accent-serif text-cyan-300">com a C&T.</span></>} />
          <div className="flex gap-2">
            {[-1, 1].map((d) => (
              <button key={d} type="button" onClick={() => go(d)} aria-label={d < 0 ? "Parceiro anterior" : "Próximo parceiro"} className="grid size-12 place-items-center rounded-full border border-white/15 transition hover:border-cyan hover:bg-cyan hover:shadow-[var(--shadow-glow)]">
                {d < 0 ? <ArrowLeft className="size-5" /> : <ArrowRight className="size-5" />}
              </button>
            ))}
          </div>
        </div>

        <div
          className="relative mt-16 h-[22rem] [perspective:1400px] sm:h-[24rem]"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Parceiros"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {partners.map((p, i) => {
            let offset = i - current;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            const isCenter = offset === 0;
            return (
              <motion.div
                key={p.name}
                className="absolute left-1/2 top-0 h-full w-[17rem] sm:w-[22rem]"
                style={{ zIndex: 10 - Math.abs(offset), transformStyle: "preserve-3d" }}
                animate={{
                  x: `${-50 + offset * 72}%`,
                  rotateY: offset * -32,
                  scale: isCenter ? 1 : 0.8,
                  opacity: Math.abs(offset) > 1 ? 0 : isCenter ? 1 : 0.45,
                  filter: isCenter ? "blur(0px)" : "blur(1px)",
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 60) go(info.offset.x < 0 ? 1 : -1); }}
                aria-hidden={!isCenter}
              >
                <motion.div className="relative size-full [transform-style:preserve-3d]" animate={{ rotateY: isCenter && flipped ? 180 : 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                  {/* Frente */}
                  <button
                    type="button"
                    tabIndex={isCenter && !flipped ? 0 : -1}
                    onClick={() => (isCenter ? setFlipped(true) : go(offset))}
                    className="group absolute inset-0 flex flex-col rounded-[1.75rem] border border-white/10 bg-white p-6 text-left shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] [backface-visibility:hidden]"
                    aria-label={`${p.name}: ver detalhes`}
                  >
                    <div className="grid flex-1 place-items-center rounded-2xl bg-mist px-8 transition-colors duration-500 group-hover:bg-cyan-50">
                      <Image src={p.logo} alt={`Logo ${p.name}`} width={p.width} height={p.height} className="max-h-24 w-auto object-contain transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="font-display text-lg font-semibold text-navy-900">{p.name}</p>
                        <p className="text-sm text-muted">Clique para conhecer</p>
                      </div>
                      <span className="grid size-10 place-items-center rounded-full bg-navy text-white transition group-hover:bg-cyan"><ArrowUpRight className="size-4" /></span>
                    </div>
                  </button>
                  {/* Verso */}
                  <div className="absolute inset-0 flex flex-col rounded-[1.75rem] bg-[linear-gradient(155deg,#17aed2,#075a91)] p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <button type="button" tabIndex={isCenter && flipped ? 0 : -1} onClick={() => setFlipped(false)} aria-label="Voltar" className="ml-auto grid size-9 place-items-center rounded-full bg-white/15 hover:bg-white/25">
                      <RotateCcw className="size-4" />
                    </button>
                    <p className="kicker mt-4 text-white/70">Parceiro C&T</p>
                    <p className="mt-3 font-display text-3xl font-semibold">{p.name}</p>
                    <p className="mt-3 text-white/85">{p.description}</p>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" tabIndex={isCenter && flipped ? 0 : -1} className="btn mt-auto bg-white text-navy hover:bg-navy hover:text-white">
                      Visitar site <ArrowUpRight className="size-4" aria-hidden /><span className="sr-only">(abre em nova aba)</span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {partners.map((p, i) => (
            <button key={p.name} type="button" onClick={() => { setFlipped(false); setCurrent(i); }} aria-label={`Ir para ${p.name}`} aria-current={i === current} className="p-1.5">
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-cyan" : "w-1.5 bg-white/25"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
