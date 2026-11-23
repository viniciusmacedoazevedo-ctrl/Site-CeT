import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";

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
      <PageHero kicker={`Privacidade · atualizado em ${updated}`} crumbs={[{ label: title }]} title={title} text={intro} />
      <div className="bg-white">
        <div className="container-site max-w-4xl py-14 lg:py-20">
          <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
            <strong>Documento em revisão.</strong> Este texto é uma base estruturada e deve ser revisado pela assessoria
            jurídica da C&T antes da publicação. Trechos destacados entre colchetes dependem de confirmação.
          </div>
          <article className="prose-legal">{children}</article>
        </div>
      </div>
    </>
  );
}
