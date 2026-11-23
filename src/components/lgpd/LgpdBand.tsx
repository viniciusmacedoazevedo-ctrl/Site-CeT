import { Check } from "lucide-react";
import { ButtonLink, Reveal } from "@/components/ui/primitives";
import { LgpdSeal } from "./LgpdSeal";

/** Faixa da página inicial que apresenta a conformidade com a LGPD. */
export function LgpdBand() {
  return (
    <section aria-labelledby="lgpd-faixa" className="relative overflow-hidden bg-cyan-50 py-20 lg:py-24">
      <div aria-hidden className="hairline-grid-light absolute inset-0 [mask-image:radial-gradient(70%_80%_at_20%_50%,black,transparent)]" />
      <div className="container-site relative grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
        <Reveal className="mx-auto md:mx-0">
          <LgpdSeal tone="light" className="size-44 drop-shadow-[0_20px_30px_rgb(7_90_145/0.25)] sm:size-52" />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="kicker text-brand">Proteção de dados</p>
          <h2 id="lgpd-faixa" className="mt-4 max-w-2xl text-[1.9rem] font-semibold leading-[1.1] text-navy-900 sm:text-[2.6rem]">
            Em conformidade com a LGPD. <span className="accent-serif text-brand">Mais segurança para você.</span>
          </h2>
          <ul className="mt-6 grid gap-3 text-navy sm:grid-cols-3">
            {["Sigilo em todos os serviços", "Acesso restrito por equipe", "Canal direto para seus direitos"].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[0.95rem]">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cyan text-white"><Check className="size-3.5" aria-hidden /></span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8"><ButtonLink href="/lgpd" variant="navy" arrow>Como protegemos seus dados</ButtonLink></div>
        </Reveal>
      </div>
    </section>
  );
}
