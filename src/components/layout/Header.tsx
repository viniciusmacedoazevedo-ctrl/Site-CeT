"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { navItems } from "@/data/content";
import { units } from "@/data/units";
import { mainWhatsApp, socialLinks, whatsappLink } from "@/data/company";
import { Logo } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = navItems.map((n) => n.href.split("#")[1]);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.toggleAttribute("data-menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || !isHome || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "border-b border-line/80 bg-white/85 shadow-[0_8px_30px_-20px_rgb(16_42_67/0.35)] backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className={`container-site flex items-center justify-between gap-6 transition-all duration-500 ${solid ? "h-[4.5rem]" : "h-20 lg:h-24"}`}>
        <Link href="/#inicio" className="shrink-0" aria-label="C&T Consultores e Associados — página inicial" onClick={() => setOpen(false)}>
          <Logo priority className={`h-auto transition-all duration-500 ${solid ? "w-[136px]" : "w-[150px] lg:w-[176px]"}`} />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const id = item.href.split("#")[1];
              const isActive = isHome && active === id;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3 py-2 text-[0.84rem] font-semibold transition-colors ${isActive ? "text-brand" : "text-navy/75 hover:text-navy"}`}
                  >
                    {item.label}
                    <span className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-cyan transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contato"
            className="hidden rounded-full bg-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgb(23_174_210/0.9)] transition hover:bg-cyan-600 sm:inline-flex"
          >
            Fale com um especialista
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-navy xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4.5rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto border-t border-line bg-white xl:hidden"
          >
            <nav aria-label="Menu móvel" className="container-site flex min-h-full flex-col py-6">
              <ul className="divide-y divide-line">
                {navItems.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i + 0.1 }}>
                    <Link href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 font-display text-2xl text-navy">
                      {item.label}
                      <span className="text-xs font-sans font-semibold tracking-widest text-cyan">{String(i + 1).padStart(2, "0")}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link href="/#contato" onClick={() => setOpen(false)} className="mt-6 rounded-full bg-cyan py-3.5 text-center font-semibold text-white">
                Fale com um especialista
              </Link>
              <div className="mt-8 grid gap-3 text-sm text-muted">
                {units.map((u) => (
                  <a key={u.id} href={`tel:${u.phones[0].tel}`} className="flex items-center gap-2">
                    <Phone className="size-4 text-cyan" aria-hidden /> {u.city}: {u.phones[0].display}
                  </a>
                ))}
                <a href={whatsappLink(mainWhatsApp.number)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <SocialIcon network="whatsapp" className="size-4 text-cyan" /> WhatsApp: {mainWhatsApp.display}
                </a>
              </div>
              <div className="mt-auto flex gap-3 pt-8">
                {socialLinks.map((s) => (
                  <a key={s.network} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid size-10 place-items-center rounded-full border border-line text-navy">
                    <SocialIcon network={s.network} className="size-[18px]" />
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
