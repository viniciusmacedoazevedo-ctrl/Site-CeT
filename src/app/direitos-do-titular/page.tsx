import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { PrivacyRequestForm } from "@/components/forms/PrivacyRequestForm";

export const metadata: Metadata = {
  title: "Direitos do Titular (LGPD)",
  description: "Canal para exercer seus direitos de titular de dados pessoais perante a C&T Consultores e Associados.",
  alternates: { canonical: "/direitos-do-titular" },
};

export default function DataSubjectRights() {
  return (
    <LegalPage
      title="Direitos do Titular"
      updated="novembro de 2026"
      intro={<>Use este canal para fazer solicitações sobre seus dados pessoais, conforme o art. 18 da LGPD. Leia também a <Link href="/politica-de-privacidade" className="text-brand underline">Política de Privacidade</Link>.</>}
    >
      <p>
        Responderemos no prazo legal aplicável. Para proteger seus dados, poderemos pedir informações adicionais para
        confirmar a sua identidade antes de atender a solicitação.
      </p>
      <div className="not-prose mt-8">
        <PrivacyRequestForm />
      </div>
    </LegalPage>
  );
}
