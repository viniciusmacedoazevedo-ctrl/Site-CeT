/**
 * Dados institucionais da C&T Consultores e Associados.
 *
 * Fonte: site atual (cetconsultores.com.br) e briefing do cliente.
 * Itens marcados com `PENDENTE` precisam ser confirmados pela empresa
 * antes da publicação. Veja também docs/pendencias.md.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.cetconsultores.com.br";

export const company = {
  name: "C&T Consultores e Associados",
  legalName: "C&T Consultores e Associados Ltda.",
  shortName: "C&T",
  foundingYear: 1998,
  /** PENDENTE: CNPJ não publicado no site atual. Preencher após confirmação. */
  cnpj: null as string | null,
  directors: ["Sidney Toledo", "Cláudia Toledo"],
  /** Missão, visão e valores conforme publicados no site atual. */
  mission:
    "Oferecer aos clientes um serviço de consultoria e assessoria com segurança, qualidade e confiabilidade.",
  vision:
    "Expandir além das fronteiras da Paraíba e do Nordeste, sempre tendo em vista a qualidade e a excelência no nosso segmento.",
  values: ["Ética", "Profissionalismo", "Agilidade", "Responsabilidade"],
  /** PENDENTE: o site atual não publica e-mail. Necessário para o canal de privacidade. */
  email: null as string | null,
  privacyEmail: null as string | null,
} as const;

/**
 * WhatsApp publicado no site atual (botão flutuante).
 * PENDENTE: confirmar se o número atende as duas unidades ou se cada uma
 * possui um número próprio (preencher `whatsapp` em cada unidade).
 */
export const mainWhatsApp = {
  number: "5583991682550",
  display: "(83) 99168-2550",
};

export function whatsappLink(number: string, text?: string) {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export type SocialNetwork =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "youtube"
  | "whatsapp";

/** Perfis publicados no rodapé do site atual. Confirmar antes da publicação. */
export const socialLinks: { network: SocialNetwork; label: string; href: string }[] = [
  { network: "instagram", label: "Instagram", href: "https://www.instagram.com/cetconsultores/" },
  { network: "facebook", label: "Facebook", href: "https://www.facebook.com/CeTConsultoresEAssociados/" },
  { network: "linkedin", label: "LinkedIn", href: "https://br.linkedin.com/company/cetconsultores" },
  { network: "youtube", label: "YouTube", href: "https://www.youtube.com/channel/UC2Lj2cLbC3sjfnlqfwO8MKQ" },
  { network: "whatsapp", label: "WhatsApp", href: whatsappLink(mainWhatsApp.number) },
];

export const instagramProfile = {
  handle: "@cetconsultores",
  href: "https://www.instagram.com/cetconsultores/",
};

export const appLinks = {
  android: "https://play.google.com/store/apps/details?id=com.appcet",
  ios: "https://apps.apple.com/br/app/app-c-t/id6451313194",
};
