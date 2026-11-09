"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Abertura escura e compacta das páginas internas. */
export function PageHero({ kicker, title, text, crumbs, children }: { kicker: string; title: ReactNode; text?: ReactNode; crumbs: { href?: string; label: string }[]; children?: ReactNode }) {
  return (
    <section className="noise relative overflow-hidden bg-navy-950 pb-16 pt-36 text-white lg:pb-20 lg:pt-44">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgb(23_174_210/0.22),transparent_60%),radial-gradient(50%_60%_at_0%_100%,rgb(7_90_145/0.4),transparent_65%)]" />
      <div aria-hidden className="hairline-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <svg aria-hidden viewBox="0 0 600 300" className="absolute -right-24 top-10 w-[40rem] max-w-none opacity-30">
        <ellipse cx="300" cy="150" rx="290" ry="110" fill="none" stroke="#17aed2" strokeWidth="1.5" transform="rotate(-12 300 150)" />
      </svg>
      <div className="container-site relative">
        <motion.nav aria-label="Trilha de navegação" className="text-sm text-white/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-white">Início</Link></li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden className="size-1 rotate-45 bg-cyan" />
                {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </motion.nav>
        <motion.p className="kicker mt-10 text-cyan-300" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease }}>{kicker}</motion.p>
        <h1 className="mt-5 max-w-4xl overflow-hidden text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[4rem]">
          <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease }}>{title}</motion.span>
        </h1>
        {text && <motion.p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }}>{text}</motion.p>}
        {children && <motion.div className="mt-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}>{children}</motion.div>}
      </div>
    </section>
  );
}
