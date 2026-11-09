"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck2, Check, MapPin, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { units } from "@/data/units";
import { ButtonLink, Logo } from "@/components/ui/primitives";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  return (
    <section id="inicio" ref={ref} aria-labelledby="hero-titulo" className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44">
      {/* Fundo */}
      <div aria-hidden className="grid-paper absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
      <div aria-hidden className="absolute -right-48 -top-40 size-[44rem] rounded-full bg-[radial-gradient(circle,rgb(23_174_210/0.16),transparent_65%)]" />
      <div aria-hidden className="absolute -left-40 bottom-0 size-[30rem] rounded-full bg-[radial-gradient(circle,rgb(7_90_145/0.08),transparent_65%)]" />

      <div className="container-site relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            Contabilidade em Campina Grande e João Pessoa
          </motion.p>
          <motion.h1
            id="hero-titulo"
            className="mt-6 text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.1rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            Inteligência contábil para decisões que{" "}
            <span className="relative whitespace-nowrap italic text-brand">
              impulsionam
              <svg aria-hidden viewBox="0 0 300 24" className="absolute -bottom-2 left-0 h-3 w-full text-cyan" preserveAspectRatio="none">
                <motion.path
                  d="M4 16 C 80 4, 200 4, 296 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 0.7, ease }}
                />
              </svg>
            </span>{" "}
            resultados.
          </motion.h1>
          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
          >
            Há anos oferecendo soluções contábeis, fiscais, trabalhistas e financeiras para empresas e pessoas físicas.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease }}>
            <ButtonLink href="/#servicos" arrow>Conheça nossos serviços</ButtonLink>
            <ButtonLink href="/#contato" variant="ghost">Entre em contato</ButtonLink>
          </motion.div>

          <motion.dl
            className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-line border-y border-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            {[
              { k: "Desde", v: String(company.foundingYear) },
              { k: "Unidades na PB", v: String(units.length) },
              { k: "Frentes de atuação", v: String(services.length) },
            ].map((s) => (
              <div key={s.k} className="flex flex-col-reverse gap-1 px-4 py-4 first:pl-0">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">{s.k}</dt>
                <dd className="font-display text-3xl text-navy">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div style={{ y: yVisual }} className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

/** Composição: o símbolo C&T no centro, órbitas inspiradas no traço da logo e cartões de gestão. */
function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative size-full" aria-hidden>
      {/* Órbitas */}
      <svg viewBox="0 0 500 500" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="orbit" x1="0" x2="1">
            <stop offset="0" stopColor="#17AED2" stopOpacity="0" />
            <stop offset="0.5" stopColor="#17AED2" stopOpacity="0.9" />
            <stop offset="1" stopColor="#075A91" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <circle cx="250" cy="250" r="236" fill="none" stroke="#E3E9EF" />
        <circle cx="250" cy="250" r="172" fill="none" stroke="#E3E9EF" strokeDasharray="2 6" />
        <motion.g
          style={{ originX: "250px", originY: "250px" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <ellipse cx="250" cy="250" rx="238" ry="118" fill="none" stroke="url(#orbit)" strokeWidth="2.5" transform="rotate(-18 250 250)" />
          <circle cx="474" cy="190" r="5" fill="#17AED2" />
        </motion.g>
        <motion.g
          style={{ originX: "250px", originY: "250px" }}
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <ellipse cx="250" cy="250" rx="200" ry="70" fill="none" stroke="#075A91" strokeOpacity="0.18" transform="rotate(32 250 250)" />
          <circle cx="80" cy="150" r="3.5" fill="#102A43" />
        </motion.g>
      </svg>

      {/* Símbolo */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease }}
      >
        <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgb(23_174_210/0.22),transparent_70%)] blur-xl" />
        <Logo variant="symbol" priority className="relative h-auto w-full" />
      </motion.div>

      {/* Cartão: gráfico */}
      <FloatCard className="left-0 top-[6%] w-[52%] sm:w-[46%]" delay={0.5}>
        <div className="flex items-center justify-between">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">Gestão financeira</p>
          <TrendingUp className="size-4 text-cyan" />
        </div>
        <svg viewBox="0 0 200 70" className="mt-3 w-full">
          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#17AED2" stopOpacity="0.28" />
              <stop offset="1" stopColor="#17AED2" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[18, 36, 54].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#E3E9EF" />)}
          <path d="M0 58 C 25 54, 35 40, 60 42 S 100 30, 120 26 S 165 14, 200 8 V70 H0Z" fill="url(#area)" />
          <motion.path
            d="M0 58 C 25 54, 35 40, 60 42 S 100 30, 120 26 S 165 14, 200 8"
            fill="none"
            stroke="#075A91"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.9, ease }}
          />
          <circle cx="200" cy="8" r="3.5" fill="#17AED2" />
        </svg>
      </FloatCard>

      {/* Cartão: obrigações */}
      <FloatCard className="bottom-[4%] right-0 w-[56%] sm:w-[48%]" delay={0.7} floatDelay={1.5}>
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-cyan-50 text-brand"><CalendarCheck2 className="size-4" /></span>
          <p className="text-xs font-semibold text-navy">Obrigações do mês</p>
        </div>
        <ul className="mt-3 space-y-2">
          {["PGDAS-D", "DCTFWeb", "eSocial"].map((o, i) => (
            <motion.li key={o} className="flex items-center gap-2 text-xs text-muted" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + i * 0.18 }}>
              <span className="grid size-4 place-items-center rounded-full bg-cyan text-white"><Check className="size-2.5" strokeWidth={3} /></span>
              {o}
              <span className="ml-auto h-1.5 w-10 rounded-full bg-mist" />
            </motion.li>
          ))}
        </ul>
      </FloatCard>

      {/* Cartão: regimes */}
      <FloatCard className="right-[2%] top-[18%] hidden w-[34%] sm:block" delay={0.9} floatDelay={3}>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">Regime tributário</p>
        <div className="mt-3 flex h-16 items-end gap-2">
          {[0.55, 0.85, 0.4].map((h, i) => (
            <motion.span
              key={i}
              className={`flex-1 rounded-t-md ${i === 1 ? "bg-brand" : "bg-cyan-100"}`}
              initial={{ height: 0 }}
              animate={{ height: `${h * 100}%` }}
              transition={{ duration: 0.9, delay: 1.1 + i * 0.12, ease }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[0.55rem] font-semibold text-muted"><span>SN</span><span>LP</span><span>LR</span></div>
      </FloatCard>

      {/* Selo: unidades */}
      <FloatCard className="bottom-[22%] left-[2%] hidden sm:block" delay={1.1} floatDelay={2.2}>
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-navy text-white"><MapPin className="size-4" /></span>
          <div className="text-[0.7rem] leading-tight">
            <p className="font-semibold text-navy">Campina Grande</p>
            <p className="text-muted">João Pessoa</p>
          </div>
        </div>
      </FloatCard>
    </div>
  );
}

function FloatCard({ children, className, delay = 0, floatDelay = 0 }: { children: React.ReactNode; className: string; delay?: number; floatDelay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      <motion.div
        className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[var(--shadow-lift)] backdrop-blur-md"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 7, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
