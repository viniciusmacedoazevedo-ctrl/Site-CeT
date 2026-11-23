"use client";

import Link from "next/link";
import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

export function Logo({ className = "", priority = false, variant = "full", onDark = false }: { className?: string; priority?: boolean; variant?: "full" | "symbol"; onDark?: boolean }) {
  const fx = onDark ? "logo-3d-dark" : "logo-3d";
  if (variant === "symbol") {
    return <Image src="/images/branding/simbolo-cet.png" alt="C&T" width={658} height={658} className={`${fx} ${className}`} priority={priority} />;
  }
  return <Image src="/images/branding/logo-cet.webp" alt="C&T Consultores e Associados" width={1000} height={383} className={`${fx} ${className}`} priority={priority} />;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className, y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Título de seção com índice numerado — fio condutor visual entre as seções. */
export function SectionHeader({
  index,
  kicker,
  title,
  text,
  tone = "light",
  align = "left",
  id,
  className = "",
}: {
  index?: string;
  kicker: string;
  title: ReactNode;
  text?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  id?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <p className={`kicker ${dark ? "text-cyan-300" : "text-brand"} ${align === "center" ? "justify-center" : ""}`}>
        {index && <span className="kicker-index">{index}</span>}
        {kicker}
      </p>
      <h2 id={id} className={`mt-5 text-[2rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem] ${dark ? "text-white" : "text-navy-900"}`}>
        {title}
      </h2>
      {text && <p className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${align === "center" ? "mx-auto" : ""} ${dark ? "text-white/65" : "text-muted"}`}>{text}</p>}
    </Reveal>
  );
}

type BtnProps = { variant?: "cyan" | "navy" | "outline-light" | "outline-dark"; arrow?: boolean } & ComponentProps<typeof Link>;

export function ButtonLink({ variant = "cyan", arrow, className = "", children, ...props }: BtnProps) {
  return (
    <Link {...props} className={`btn btn-${variant} group ${className}`}>
      {children}
      {arrow && (
        <span className="relative grid size-5 place-items-center overflow-hidden">
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-5" aria-hidden />
          <ArrowRight className="absolute size-4 -translate-x-5 transition-transform duration-300 group-hover:translate-x-0" aria-hidden />
        </span>
      )}
    </Link>
  );
}

/** Inclinação 3D suave que acompanha o cursor. */
export function Tilt({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(x, (v) => `${v * 100}%`);
  const glowY = useTransform(y, (v) => `${v * 100}%`);
  const glow = useTransform([glowX, glowY], ([gx, gy]) => `radial-gradient(240px circle at ${gx} ${gy}, rgb(23 174 210 / 0.18), transparent 60%)`);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => { x.set(0.5); y.set(0.5); }}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
        style={{ background: glow }}
      />
    </motion.div>
  );
}

/** Número que conta ao entrar na tela. */
export function Counter({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const from = to > 1000 ? to - 40 : 0;
    const c = animate(from, to, { duration: 1.6, ease, onUpdate: (v) => setValue(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref} className={className}>{value}</span>;
}
