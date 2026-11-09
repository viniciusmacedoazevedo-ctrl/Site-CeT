import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { company, socialLinks } from "@/data/company";
import { units } from "@/data/units";
import { footerLinks } from "@/data/useful-links";
import { Logo } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CookiePreferencesButton } from "@/components/privacy/CookieBanner";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white" aria-labelledby="rodape-titulo">
      <h2 id="rodape-titulo" className="sr-only">Rodapé</h2>
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full border border-white/5" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-[22rem] rounded-full border border-cyan/15" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

      <div className="container-site relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_1fr_0.9fr] lg:gap-10 lg:py-20">
        <div>
          <div className="inline-block rounded-2xl bg-white px-5 py-4 shadow-[0_20px_40px_-24px_rgb(0_0_0/0.6)]">
            <Logo className="h-auto w-[170px]" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
            Assessoria contábil, fiscal, trabalhista e financeira para empresas e pessoas físicas na Paraíba desde{" "}
            {company.foundingYear}.
          </p>
        </div>

        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] !text-cyan">Unidades</h3>
          <ul className="mt-5 space-y-6">
            {units.map((u) => (
              <li key={u.id} className="text-sm">
                <p className="font-display text-lg text-white">{u.city}</p>
                <p className="mt-1.5 flex gap-2 text-white/65">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />
                  <span>
                    {u.street}, {u.number} — {u.district}
                    <br />
                    {u.city} - {u.state}, CEP {u.postalCode}
                  </span>
                </p>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-white/65">
                  <Phone className="size-4 shrink-0 text-cyan" aria-hidden />
                  {u.phones.map((p, i) => (
                    <span key={p.tel}>
                      <a href={`tel:${p.tel}`} className="hover:text-white">{p.display}</a>
                      {i < u.phones.length - 1 && " / "}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] !text-cyan">Links úteis</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-white/70 transition hover:text-white">
                  {l.name}
                  <ArrowUpRight className="size-3.5 opacity-50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </li>
            ))}
            <li>
              <Link href="/#links-uteis" className="text-cyan hover:text-white">Ver central completa</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] !text-cyan">Redes sociais</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {socialLinks.map((s) => (
              <li key={s.network}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-white/70 transition hover:text-white">
                  <span className="grid size-9 place-items-center rounded-full border border-white/15 transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-white">
                    <SocialIcon network={s.network} className="size-4" />
                  </span>
                  {s.label}
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
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
