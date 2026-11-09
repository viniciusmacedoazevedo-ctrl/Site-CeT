import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a C&T Consultores e Associados: telefones, WhatsApp e formulário de contato das unidades de Campina Grande e João Pessoa.",
  alternates: { canonical: "/contato" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contato" crumbs={[{ label: "Contato" }]} title={<>Vamos conversar sobre <span className="accent-serif text-cyan-300">a sua empresa?</span></>} text="Envie sua mensagem ou fale direto com uma das unidades." />
      <Contact />
    </>
  );
}
