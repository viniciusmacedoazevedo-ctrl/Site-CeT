import Link from "next/link";
import type { ReactNode } from "react";

/** Destaca informações que dependem de confirmação da empresa. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <span className="pending" title="Informação pendente de confirmação pela empresa">
      [{children}]
    </span>
  );
}

export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro: ReactNode; children: ReactNode }) {
  return (
    <>
      <section className="border-b border-line bg-mist pb-14 pt-32 lg:pt-40">
        <div className="container-site max-w-4xl">
          <nav aria-label="Trilha de navegação" className="text-sm text-muted">
            <Link href="/" className="hover:text-navy">Início</Link> <span aria-hidden>/</span> <span aria-current="page" className="font-semibold text-navy">{title}</span>
          </nav>
          <h1 className="mt-8 text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted">Última atualização: {updated}</p>
          <div className="mt-6 text-lg leading-relaxed text-muted">{intro}</div>
        </div>
      </section>
      <div className="container-site max-w-4xl py-14 lg:py-20">
        <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
          <strong>Documento em revisão.</strong> Este texto é uma base estruturada e deve ser revisado pela assessoria
          jurídica da C&T antes da publicação. Trechos destacados entre colchetes dependem de confirmação.
        </div>
        <article className="prose-legal">{children}</article>
      </div>
    </>
  );
}
