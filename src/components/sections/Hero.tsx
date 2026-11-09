"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { CalendarCheck2, Check, ChevronDown, ShieldCheck, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { units } from "@/data/units";
import { ButtonLink, Counter, Logo } from "@/components/ui/primitives";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  return (
    <section
      id="topo"
      aria-labelledby="hero-titulo"
      className="noise relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <HeroBackground />

      <div className="container-site relative z-10 grid flex-1 items-center gap-12 pb-12 pt-36 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pt-40">
        <div>
          <motion.p className="kicker text-cyan-300" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-cyan" /></span>
            Contabilidade · Campina Grande & João Pessoa
          </motion.p>

          <h1 id="hero-titulo" className="mt-7 text-[2.2rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[3.9rem] xl:text-[4.3rem]">
            {["Inteligência contábil", "para decisões que"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}>
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease }}>
                <span className="accent-serif bg-gradient-to-r from-cyan-300 to-cyan bg-clip-text pr-2 text-transparent">impulsionam</span> resultados.
              </motion.span>
            </span>
          </h1>

          <motion.p className="mt-7 max-w-lg text-lg leading-relaxed text-white/65" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }}>
            Há anos oferecendo soluções contábeis, fiscais, trabalhistas e financeiras para empresas e pessoas físicas.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease }}>
            <ButtonLink href="/servicos" arrow>Conheça nossos serviços</ButtonLink>
            <ButtonLink href="/contato" variant="outline-light">Entre em contato</ButtonLink>
          </motion.div>

          <motion.dl className="mt-14 flex max-w-md divide-x divide-white/10 border-t border-white/10 pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
            {[
              { k: "Fundação", v: company.foundingYear },
              { k: "Unidades na PB", v: units.length },
              { k: "Serviços", v: services.length },
            ].map((s) => (
              <div key={s.k} className="flex flex-1 flex-col-reverse gap-1 px-5 first:pl-0">
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/45">{s.k}</dt>
                <dd className="font-display text-3xl font-semibold tabular-nums"><Counter to={s.v} /></dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <HeroVisual sx={sx} sy={sy} />
      </div>

      <a href="#a-cet" className="group relative z-10 mx-auto mb-6 hidden flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-white/40 transition hover:text-white sm:flex" aria-label="Rolar para a próxima seção">
        Explore
        <span className="grid h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
          <motion.span className="h-1.5 w-1 rounded-full bg-cyan" animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </span>
        <ChevronDown className="sr-only" />
      </a>

      <ServiceTicker />
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_75%_35%,rgb(23_174_210/0.20),transparent_60%),radial-gradient(60%_60%_at_10%_90%,rgb(7_90_145/0.45),transparent_65%)]" />
      {/* Piso em perspectiva */}
      <div className="absolute inset-x-[-30%] bottom-[-10%] h-[60%] [perspective:600px]">
        <div className="hairline-grid size-full origin-bottom animate-[grid-move_6s_linear_infinite] [transform:rotateX(62deg)] [mask-image:linear-gradient(to_top,black_20%,transparent_85%)]" />
      </div>
      {/* Linhas verticais finas, em preto e ciano */}
      <div className="absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-y-0 right-[38%] hidden w-px bg-gradient-to-b from-transparent via-cyan/25 to-transparent lg:block" />
      <style>{`@keyframes grid-move { from { background-position: 0 0; } to { background-position: 0 64px; } }`}</style>
    </div>
  );
}

function useDepth(v: MotionValue<number>, amount: number) {
  return useTransform(v, (n) => n * amount);
}

function HeroVisual({ sx, sy }: { sx: MotionValue<number>; sy: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const x1 = useDepth(sx, -24), y1 = useDepth(sy, -24);
  const x2 = useDepth(sx, 36), y2 = useDepth(sy, 36);
  const x3 = useDepth(sx, 60), y3 = useDepth(sy, 60);
  const rotX = useDepth(sy, -10), rotY = useDepth(sx, 14);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[36rem]" aria-hidden>
      {/* Órbitas em 3D */}
      <motion.div className="absolute inset-0 [perspective:1000px]" style={{ x: x1, y: y1 }}>
        <motion.div className="relative size-full [transform-style:preserve-3d]" style={{ rotateX: rotX, rotateY: rotY }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-[6%] rounded-full border"
              style={{
                borderColor: i === 1 ? "rgb(23 174 210 / 0.55)" : "rgb(255 255 255 / 0.12)",
                transform: `rotateX(${68 + i * 6}deg) rotateY(${i * 22 - 20}deg)`,
                boxShadow: i === 1 ? "0 0 40px rgb(23 174 210 / 0.25), inset 0 0 40px rgb(23 174 210 / 0.15)" : undefined,
              }}
              animate={reduce ? undefined : { rotateZ: i % 2 ? -360 : 360 }}
              transition={{ duration: 40 + i * 18, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute -top-1.5 left-1/2 size-3 rounded-full bg-cyan shadow-[0_0_16px_#17aed2]" style={{ opacity: i === 1 ? 1 : 0.4 }} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Símbolo */}
      <motion.div className="absolute left-1/2 top-1/2 w-[42%] -translate-x-1/2 -translate-y-1/2" style={{ x: x2, y: y2 }}>
        <motion.div initial={{ opacity: 0, scale: 0.7, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.2, delay: 0.3, ease }}>
          <motion.div animate={reduce ? undefined : { y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="relative">
            <div className="absolute inset-[-25%] rounded-full bg-[radial-gradient(circle,rgb(23_174_210/0.45),transparent_65%)] blur-2xl" />
            <Logo variant="symbol" priority onDark className="relative h-auto w-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Cartões de vidro */}
      <motion.div className="absolute left-[-2%] top-[8%] w-[50%] sm:w-[44%]" style={{ x: x3, y: y3 }}>
        <GlassCard delay={0.7}><ChartCard /></GlassCard>
      </motion.div>
      <motion.div className="absolute bottom-[6%] right-[-2%] w-[54%] sm:w-[46%]" style={{ x: x2, y: y2 }}>
        <GlassCard delay={0.85} float={2}><ObligationsCard /></GlassCard>
      </motion.div>
      <motion.div className="absolute right-[0%] top-[14%] hidden w-[32%] sm:block" style={{ x: x3, y: y3 }}>
        <GlassCard delay={1} float={1}><BarsCard /></GlassCard>
      </motion.div>
      <motion.div className="absolute bottom-[20%] left-[4%] hidden sm:block" style={{ x: x1, y: y1 }}>
        <GlassCard delay={1.15} float={3}>
          <div className="flex items-center gap-2.5 pr-1">
            <span className="grid size-8 place-items-center rounded-full bg-cyan/15 text-cyan"><ShieldCheck className="size-4" /></span>
            <div className="text-[0.7rem] leading-tight">
              <p className="font-semibold text-white">Conformidade</p>
              <p className="text-white/50">fiscal e trabalhista</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

function GlassCard({ children, delay = 0, float = 0 }: { children: React.ReactNode; delay?: number; float?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay, ease }}>
      <motion.div
        className="glass-dark rounded-2xl p-4 shadow-[0_30px_60px_-24px_rgb(0_0_0/0.8)]"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6 + float, delay: float, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ChartCard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/50">Gestão financeira</p>
        <TrendingUp className="size-4 text-cyan" />
      </div>
      <svg viewBox="0 0 200 70" className="mt-3 w-full">
        <defs>
          <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#17AED2" stopOpacity="0.45" />
            <stop offset="1" stopColor="#17AED2" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[18, 36, 54].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgb(255 255 255 / 0.08)" />)}
        <motion.path d="M0 58 C 25 54, 35 40, 60 42 S 100 30, 120 26 S 165 14, 200 8 V70 H0Z" fill="url(#hero-area)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} />
        <motion.path d="M0 58 C 25 54, 35 40, 60 42 S 100 30, 120 26 S 165 14, 200 8" fill="none" stroke="#5fd0ec" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 1, ease }} />
        <motion.circle cx="200" cy="8" r="4" fill="#17AED2" initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ delay: 2.6 }} />
      </svg>
    </>
  );
}

const obligations = ["PGDAS-D", "DCTFWeb", "eSocial", "EFD-Reinf"];
function ObligationsCard() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(reduce ? obligations.length : 0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setDone((d) => (d >= obligations.length + 2 ? 0 : d + 1)), 900);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-lg bg-cyan/15 text-cyan"><CalendarCheck2 className="size-4" /></span>
        <p className="text-xs font-semibold">Obrigações do mês</p>
        <span className="ml-auto text-[0.6rem] tabular-nums text-white/50">{Math.min(done, obligations.length)}/{obligations.length}</span>
      </div>
      <ul className="mt-3 space-y-2">
        {obligations.map((o, i) => {
          const ok = i < done;
          return (
            <li key={o} className="flex items-center gap-2 text-xs text-white/70">
              <span className={`grid size-4 place-items-center rounded-full transition-all duration-300 ${ok ? "bg-cyan text-white" : "border border-white/25"}`}>
                {ok && <Check className="size-2.5" strokeWidth={3} />}
              </span>
              <span className={ok ? "text-white" : ""}>{o}</span>
              <span className="ml-auto h-1 w-12 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full rounded-full bg-cyan transition-all duration-700" style={{ width: ok ? "100%" : "0%" }} />
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function BarsCard() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setTick((n) => n + 1), 2400);
    return () => clearInterval(t);
  }, [reduce]);
  const sets = [[0.55, 0.85, 0.4], [0.7, 0.6, 0.45], [0.5, 0.9, 0.35]];
  const h = sets[tick % sets.length];
  return (
    <>
      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/50">Regime tributário</p>
      <div className="mt-3 flex h-16 items-end gap-2">
        {h.map((v, i) => (
          <motion.span key={i} className={`flex-1 rounded-t-md ${i === 1 ? "bg-gradient-to-t from-brand to-cyan" : "bg-white/15"}`} animate={{ height: `${v * 100}%` }} transition={{ duration: 0.9, ease }} />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[0.55rem] font-semibold text-white/45"><span>SN</span><span>LP</span><span>LR</span></div>
    </>
  );
}

/** Faixa preta com os serviços em movimento — conecta a abertura à próxima seção. */
function ServiceTicker() {
  const items = [...services, ...services];
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/10 bg-ink-950 py-4" aria-hidden>
      <div className="flex w-max animate-[ticker_60s_linear_infinite] items-center gap-8 whitespace-nowrap motion-reduce:animate-none">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-sm text-white/55">
            {s.title}
            <span className="size-1.5 rotate-45 bg-cyan" />
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
