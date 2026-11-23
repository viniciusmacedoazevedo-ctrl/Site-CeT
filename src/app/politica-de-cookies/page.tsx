import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { CookiePreferencesButton } from "@/components/privacy/CookieBanner";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Quais cookies o site da C&T Consultores e Associados utiliza, suas finalidades e como gerenciar suas preferências.",
  alternates: { canonical: "/politica-de-cookies" },
};

export default function CookiePolicy() {
  return (
    <LegalPage
      title="Política de Cookies"
      updated="novembro de 2026"
      intro="Esta página explica o que são cookies, quais utilizamos e como você pode controlar suas preferências."
    >
      <h2>O que são cookies</h2>
      <p>
        Cookies são pequenos arquivos que um site grava no seu navegador para lembrar informações entre uma página e
        outra. Tecnologias semelhantes, como o armazenamento local do navegador (sessionStorage), cumprem funções
        parecidas e são tratadas da mesma forma nesta política.
      </p>

      <h2>Categorias</h2>
      <h3>Estritamente necessários</h3>
      <p>Indispensáveis para o funcionamento do site e para registrar sua escolha sobre cookies. Não dependem de consentimento e não podem ser desativados.</p>
      <h3>Análise</h3>
      <p>Medem, de forma agregada, como o site é utilizado. <strong>Não utilizamos ferramentas de análise atualmente.</strong> Se forem adotadas, só serão ativadas com o seu consentimento.</p>
      <h3>Marketing</h3>
      <p>Medem campanhas e personalizam anúncios. <strong>Não utilizamos ferramentas de marketing atualmente.</strong> Se forem adotadas, só serão ativadas com o seu consentimento.</p>

      <h2>Cookies e tecnologias em uso</h2>
      <table>
        <thead>
          <tr><th>Nome</th><th>Categoria</th><th>Finalidade</th><th>Duração</th></tr>
        </thead>
        <tbody>
          <tr><td><code>cet_consent</code></td><td>Necessário</td><td>Guardar sua escolha sobre cookies opcionais</td><td>180 dias</td></tr>
          <tr><td><code>cet_clau_intro_dismissed</code> (sessionStorage)</td><td>Necessário</td><td>Não repetir a apresentação da assistente Cláu durante a visita</td><td>Até fechar a aba</td></tr>
        </tbody>
      </table>
      <p>
        Os mapas das unidades são carregados a partir do OpenFreeMap, que não grava cookies no seu navegador. Ao clicar
        em links externos (Google Maps, WhatsApp, redes sociais, portais públicos), você passa a estar sujeito às
        políticas de cookies desses sites.
      </p>

      <h2>Como gerenciar suas preferências</h2>
      <p>
        Você pode revisar sua escolha a qualquer momento:{" "}
        <CookiePreferencesButton className="font-semibold text-brand underline underline-offset-2" />. Também é possível
        apagar ou bloquear cookies nas configurações do seu navegador; bloquear cookies necessários pode afetar o
        funcionamento do site.
      </p>
      <p>Para mais informações sobre o tratamento de dados, consulte a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</p>
    </LegalPage>
  );
}
