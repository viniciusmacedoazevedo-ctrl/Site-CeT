"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { navItems, serviceGroups, type NavItem } from "@/data/content";
import { services } from "@/data/services";
import { units } from "@/data/units";
import { mainWhatsApp, socialLinks, whatsappLink } from "@/data/company";
import { Logo } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(null); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.toggleAttribute("data-menu-open", open);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setDropdown(null); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (item: NavItem) => (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));
  const openDrop = (label: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setDropdown(label); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setDropdown(null), 160); };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex max-w-[82rem] items-center justify-between gap-4 rounded-2xl border px-3 transition-all duration-500 sm:px-5 ${
          scrolled || open
            ? "h-16 border-white/10 bg-navy-950/90 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl"
            : "h-[4.5rem] border-white/5 bg-navy-950/30 backdrop-blur-md"
        }`}
      >
        <Link href="/" className="shrink-0 rounded-lg" aria-label="C&T Consultores e Associados — página inicial">
          <Logo priority onDark className={`h-auto transition-all duration-500 ${scrolled ? "w-[124px]" : "w-[140px]"}`} />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const hasMenu = Boolean(item.children || item.mega);
              const active = isActive(item);
              return (
                <li key={item.label} className="relative" onMouseEnter={() => hasMenu && openDrop(item.label)} onMouseLeave={() => hasMenu && scheduleClose()}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative rounded-full px-3.5 py-2 font-display text-[0.82rem] font-medium transition-colors ${active ? "text-white" : "text-white/65 hover:text-white"}`}
                    >
                      {active && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                      <span className="relative">{item.label}</span>
                    </Link>
                    {hasMenu && (
                      <button
                        type="button"
                        aria-expanded={dropdown === item.label}
                        aria-label={`Abrir submenu ${item.label}`}
                        onClick={() => setDropdown((d) => (d === item.label ? null : item.label))}
                        className="-ml-2.5 grid size-6 place-items-center rounded-full text-white/50 hover:text-white"
                      >
                        <ChevronDown className={`size-3.5 transition-transform duration-300 ${dropdown === item.label ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {dropdown === item.label && hasMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.22, ease }}
                        className={`absolute top-full pt-3 ${item.mega ? "left-1/2 w-[46rem] -translate-x-1/2" : "left-0 w-80"}`}
                      >
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-950 p-2 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl">
                          {item.mega ? <ServicesMega /> : (
                            <ul>
                              {item.children!.map((c) => (
                                <li key={c.href}>
                                  <Link href={c.href} className="group flex items-start justify-between gap-3 rounded-xl px-4 py-3 transition hover:bg-white/[0.06]">
                                    <span>
                                      <span className="block font-display text-sm font-medium text-white">{c.label}</span>
                                      <span className="mt-0.5 block text-xs text-white/50">{c.description}</span>
                                    </span>
                                    <ArrowUpRight className="mt-0.5 size-4 text-cyan opacity-0 transition group-hover:opacity-100" aria-hidden />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contato" className="btn btn-cyan hidden !py-2.5 !text-[0.8rem] sm:inline-flex">
            Fale com um especialista
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-white/15 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>{open && <MobileMenu onNavigate={() => setOpen(false)} />}</AnimatePresence>
    </header>
  );
}

function ServicesMega() {
  return (
    <div className="grid grid-cols-3 gap-1 p-2">
      {serviceGroups.map((g) => (
        <div key={g.id} className="rounded-xl p-3">
          <p className="kicker !text-[0.62rem] text-cyan-300">{g.title}</p>
          <ul className="mt-3 space-y-0.5">
            {services.filter((s) => s.category === g.id).map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <Link href={`/servicos/${s.slug}`} className="group -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-2 text-[0.82rem] text-white/75 transition hover:bg-white/[0.06] hover:text-white">
                    <Icon className="size-4 shrink-0 text-cyan/70 transition group-hover:text-cyan" strokeWidth={1.7} aria-hidden />
                    {s.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Link href="/servicos" className="col-span-3 mt-1 flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-white/80 transition hover:bg-cyan hover:text-white">
        <span>Ver todos os 12 serviços</span>
        <ArrowUpRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <motion.div
      id="menu-mobile"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease }}
      className="mx-auto mt-2 max-h-[calc(100dvh-6.5rem)] max-w-[82rem] overflow-y-auto rounded-2xl border border-white/10 bg-navy-950/95 p-5 text-white shadow-2xl backdrop-blur-xl lg:hidden"
    >
      <nav aria-label="Menu móvel">
        <ul className="divide-y divide-white/10">
          {navItems.map((item, i) => {
            const sub = item.mega
              ? services.map((s) => ({ href: `/servicos/${s.slug}`, label: s.title }))
              : item.children?.map((c) => ({ href: c.href, label: c.label }));
            return (
              <motion.li key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i + 0.05 }}>
                <div className="flex items-center justify-between">
                  <Link href={item.href} onClick={onNavigate} className="flex flex-1 items-center gap-4 py-4 font-display text-xl">
                    <span className="text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                  {sub && (
                    <button type="button" onClick={() => setExpanded((e) => (e === item.label ? null : item.label))} aria-expanded={expanded === item.label} aria-label={`Mostrar submenu ${item.label}`} className="grid size-10 place-items-center rounded-full border border-white/10">
                      <ChevronDown className={`size-4 transition-transform ${expanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                <AnimatePresence initial={false}>
                  {sub && expanded === item.label && (
                    <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} className="overflow-hidden pl-8">
                      {sub.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} onClick={onNavigate} className="block py-2 text-sm text-white/65 hover:text-white">{c.label}</Link>
                        </li>
                      ))}
                      <li className="h-3" />
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </nav>
      <Link href="/contato" onClick={onNavigate} className="btn btn-cyan mt-5 w-full">Fale com um especialista</Link>
      <div className="mt-6 grid gap-2.5 text-sm text-white/65">
        {units.map((u) => (
          <a key={u.id} href={`tel:${u.phones[0].tel}`} className="flex items-center gap-2"><Phone className="size-4 text-cyan" aria-hidden /> {u.city}: {u.phones[0].display}</a>
        ))}
        <a href={whatsappLink(mainWhatsApp.number)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2"><SocialIcon network="whatsapp" className="size-4 text-cyan" /> WhatsApp: {mainWhatsApp.display}</a>
      </div>
      <div className="mt-6 flex gap-2.5">
        {socialLinks.map((s) => (
          <a key={s.network} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 hover:border-cyan hover:text-cyan">
            <SocialIcon network={s.network} className="size-[18px]" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
