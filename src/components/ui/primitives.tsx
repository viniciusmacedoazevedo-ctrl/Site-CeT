"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function Logo({ className = "", priority = false, variant = "full" }: { className?: string; priority?: boolean; variant?: "full" | "symbol" }) {
  if (variant === "symbol") {
    return (
      <Image src="/images/branding/simbolo-cet.png" alt="C&T" width={658} height={658} className={`logo-3d ${className}`} priority={priority} />
    );
  }
  return (
    <Image
      src="/images/branding/logo-cet.webp"
      alt="C&T Consultores e Associados"
      width={1000}
      height={383}
      className={`logo-3d ${className}`}
      priority={priority}
    />
  );
}

export function Reveal({ children, delay = 0, className, y = 18 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  id,
  invert = false,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  id?: string;
  invert?: boolean;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${invert ? "!text-cyan-100" : ""}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-4 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem] ${invert ? "!text-white" : ""}`}>
        {title}
      </h2>
      {text && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${invert ? "text-white/75" : "text-muted"}`}>{text}</p>}
    </Reveal>
  );
}

type BtnProps = { variant?: "primary" | "secondary" | "ghost" | "light"; arrow?: boolean } & ComponentProps<typeof Link>;

export function ButtonLink({ variant = "primary", arrow, className = "", children, ...props }: BtnProps) {
  const styles = {
    primary: "bg-cyan text-white shadow-[0_10px_24px_-10px_rgb(23_174_210/0.7)] hover:bg-cyan-600",
    secondary: "bg-navy text-white hover:bg-brand",
    ghost: "border border-line bg-white/70 text-navy backdrop-blur hover:border-navy",
    light: "bg-white text-navy hover:bg-cyan-50",
  }[variant];
  return (
    <Link
      {...props}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 ${styles} ${className}`}
    >
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />}
    </Link>
  );
}
