import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { company, socialLinks } from "@/data/company";
import { navItems } from "@/data/content";
import { units } from "@/data/units";
import { footerLinks } from "@/data/useful-links";
import { Logo } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CookiePreferencesButton } from "@/components/privacy/CookieBanner";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="noise relative overflow-hidden bg-ink-950 text-white" aria-labelledby="rodape-titulo">
      <h2 id="rodape-titulo" className="sr-only">Rodapé</h2>
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
      <div aria-hidden className="absolute left-1/2 top-0 h-40 w-[50rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(23_174_210/0.18),transparent)]" />

      <div className="container-site relative">
        <div className="flex flex-col gap-8 border-b border-white/10 py-14 lg:flex-row lg:items-center lg:justify-between">
          <Logo onDark className="h-auto w-[200px]" />
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 font-display text-sm text-white/70">
              {navItems.map((n) => (
                <li key={n.href}><Link href={n.href} className="transition hover:text-cyan">{n.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1.3fr_1fr_0.9fr] lg:gap-10">
          <div>
            <h3 className="kicker text-cyan-300">C&T Consultores e Associados</h3>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Assessoria contábil, fiscal, trabalhista e financeira para empresas e pessoas físicas na Paraíba desde {company.foundingYear}.
            </p>
          </div>

          <div>
            <h3 className="kicker text-cyan-300">Unidades</h3>
            <ul className="mt-5 space-y-6">
              {units.map((u) => (
                <li key={u.id} className="text-sm">
                  <Link href={`/unidades#${u.id}`} className="font-display text-base font-semibold text-white hover:text-cyan">{u.city}</Link>
                  <p className="mt-1.5 flex gap-2 text-white/55">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />
                    <span>{u.street}, {u.number} — {u.district}<br />{u.city} - {u.state}, CEP {u.postalCode}</span>
                  </p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-white/55">
                    <Phone className="size-4 shrink-0 text-cyan" aria-hidden />
                    {u.phones.map((p, i) => (
                      <span key={p.tel}><a href={`tel:${p.tel}`} className="hover:text-white">{p.display}</a>{i < u.phones.length - 1 && " / "}</span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="kicker text-cyan-300">Links úteis</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-white/60 transition hover:text-white">
                    {l.name}
                    <ArrowUpRight className="size-3.5 opacity-40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan group-hover:opacity-100" aria-hidden />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                </li>
              ))}
              <li><Link href="/links-uteis" className="text-cyan hover:text-white">Central completa →</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="kicker text-cyan-300">Redes sociais</h3>
            <ul className="mt-5 grid grid-cols-5 gap-2 lg:grid-cols-3">
              {socialLinks.map((s) => (
                <li key={s.network}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (abre em nova aba)`} className="grid aspect-square place-items-center rounded-xl border border-white/10 text-white/70 transition hover:-translate-y-1 hover:border-cyan hover:bg-cyan hover:text-white hover:shadow-[var(--shadow-glow)]">
                    <SocialIcon network={s.network} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {year} {company.legalName} Todos os direitos reservados.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/politica-de-privacidade" className="hover:text-white">Política de Privacidade</Link></li>
            <li><Link href="/politica-de-cookies" className="hover:text-white">Política de Cookies</Link></li>
            <li><CookiePreferencesButton className="hover:text-white" /></li>
            <li><Link href="/direitos-do-titular" className="hover:text-white">Direitos do Titular</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
