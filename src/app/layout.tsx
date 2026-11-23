import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL, company } from "@/data/company";
import { organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConsentProvider } from "@/components/privacy/ConsentProvider";
import { CookieBanner } from "@/components/privacy/CookieBanner";
import { ChatWidget } from "@/components/chat/ChatWidget";

const description =
  "Escritório de contabilidade em Campina Grande e João Pessoa - PB. Assessoria contábil, fiscal, trabalhista, planejamento tributário e consultoria empresarial desde 1998.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "C&T Consultores e Associados | Contabilidade em Campina Grande e João Pessoa",
    template: "%s | C&T Consultores e Associados",
  },
  description,
  applicationName: company.name,
  keywords: [
    "contabilidade em Campina Grande",
    "escritório de contabilidade em João Pessoa",
    "assessoria contábil",
    "assessoria fiscal",
    "planejamento tributário",
    "consultoria empresarial",
    "contador Paraíba",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: company.name,
    title: "C&T Consultores e Associados — Inteligência contábil",
    description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="sr-only z-[100] rounded-full bg-navy px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Pular para o conteúdo
        </a>
        <ConsentProvider>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <ChatWidget />
          <CookieBanner />
        </ConsentProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
      </body>
    </html>
  );
}
