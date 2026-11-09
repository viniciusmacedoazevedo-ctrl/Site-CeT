import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { units } from "@/data/units";
import { LegalPage, Pending } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a C&T Consultores e Associados trata os dados pessoais coletados neste site, conforme a Lei nº 13.709/2018 (LGPD).",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Política de Privacidade"
      updated="novembro de 2026"
      intro={<>Esta política explica como a {company.name} trata os dados pessoais de quem visita este site e utiliza seus canais de atendimento, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).</>}
    >
      <h2>1. Quem é o controlador</h2>
      <p>
        O controlador dos dados pessoais tratados neste site é a {company.legalName}, inscrita no CNPJ sob o nº{" "}
        {company.cnpj ?? <Pending>CNPJ a confirmar</Pending>}, com sede em <Pending>endereço da sede/matriz a confirmar</Pending>.
      </p>
      <p>Unidades de atendimento:</p>
      <ul>
        {units.map((u) => (
          <li key={u.id}>{u.city}: {u.street}, {u.number} — {u.district}, {u.city} - {u.state}, CEP {u.postalCode}.</li>
        ))}
      </ul>

      <h2>2. Encarregado pelo tratamento de dados (DPO)</h2>
      <p>
        Encarregado: <Pending>nome do encarregado a confirmar</Pending>. Contato:{" "}
        {company.privacyEmail ?? <Pending>e-mail do canal de privacidade a confirmar</Pending>}. Você também pode utilizar o{" "}
        <Link href="/direitos-do-titular">formulário de direitos do titular</Link>.
      </p>

      <h2>3. Quais dados coletamos e para quê</h2>
      <table>
        <thead>
          <tr><th>Situação</th><th>Dados</th><th>Finalidade</th><th>Base legal (LGPD)</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Formulário de contato</td>
            <td>Nome, e-mail, telefone, assunto e mensagem</td>
            <td>Responder à sua solicitação e, se for o caso, apresentar propostas de serviço</td>
            <td>Procedimentos preliminares a contrato a pedido do titular (art. 7º, V) e legítimo interesse (art. 7º, IX)</td>
          </tr>
          <tr>
            <td>Formulário de direitos do titular</td>
            <td>Nome, e-mail, tipo de solicitação e descrição</td>
            <td>Atender aos direitos previstos no art. 18 da LGPD</td>
            <td>Cumprimento de obrigação legal (art. 7º, II)</td>
          </tr>
          <tr>
            <td>Preferências de cookies</td>
            <td>Registro da sua escolha e data</td>
            <td>Respeitar e comprovar sua escolha sobre cookies</td>
            <td>Cumprimento de obrigação legal (art. 7º, II) e legítimo interesse (art. 7º, IX)</td>
          </tr>
          <tr>
            <td>Cookies opcionais (análise e marketing)</td>
            <td>Identificadores de navegação, quando houver</td>
            <td>Estatísticas de uso e campanhas — <strong>atualmente não utilizados</strong></td>
            <td>Consentimento (art. 7º, I)</td>
          </tr>
          <tr>
            <td>Registros técnicos de acesso</td>
            <td>Endereço IP, data e hora, navegador</td>
            <td>Segurança, prevenção a fraudes e guarda exigida pelo Marco Civil da Internet</td>
            <td>Obrigação legal (art. 7º, II; Lei nº 12.965/2014, art. 15) e legítimo interesse</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Assistente virtual Cláu:</strong> nesta versão, as respostas são automáticas e geradas no seu próprio
        navegador. As mensagens digitadas não são armazenadas nem enviadas aos nossos servidores. Recomendamos não
        informar dados sensíveis na conversa.
      </p>
      <p>
        Coletamos apenas os dados necessários para cada finalidade. Não solicitamos dados pessoais sensíveis por meio
        deste site. Não enviamos comunicações de marketing sem autorização específica e separada.
      </p>

      <h2>4. Compartilhamento</h2>
      <p>Os dados podem ser compartilhados, na medida do necessário, com:</p>
      <ul>
        <li>Provedor de hospedagem do site: Cloudflare Pages (Cloudflare, Inc.);</li>
        <li>Serviço que encaminha os formulários ao nosso e-mail: Web3Forms;</li>
        <li>Autoridades públicas, quando houver obrigação legal ou ordem judicial.</li>
      </ul>
      <p>
        <strong>Serviços de terceiros acionados pela sua navegação:</strong> ao exibir os mapas das unidades, seu navegador
        solicita imagens de mapa ao OpenFreeMap (dados © OpenStreetMap), que recebe tecnicamente o seu endereço IP. Os
        botões “Abrir no Google Maps”, “Como chegar”, WhatsApp, redes sociais e links de órgãos públicos levam a sites
        de terceiros, que possuem políticas de privacidade próprias.
      </p>
      <p>
        Esses fornecedores podem tratar dados fora do Brasil. Nesses casos, adotamos as salvaguardas previstas no
        art. 33 da LGPD. <Pending>Confirmar com a assessoria jurídica</Pending>
      </p>

      <h2>5. Armazenamento e prazo de retenção</h2>
      <ul>
        <li>Mensagens de contato: pelo tempo necessário ao atendimento e por até <Pending>prazo a definir, ex.: 12 meses</Pending> após o último contato, salvo se houver contratação.</li>
        <li>Solicitações de titulares: pelo prazo necessário para comprovar o atendimento <Pending>prazo a definir</Pending>.</li>
        <li>Registros de acesso: 6 meses, conforme o art. 15 do Marco Civil da Internet.</li>
        <li>Preferência de cookies: até 180 dias, quando a escolha é solicitada novamente.</li>
      </ul>
      <p>Encerrado o prazo, os dados são eliminados ou anonimizados, exceto quando a lei exigir sua conservação.</p>

      <h2>6. Segurança</h2>
      <p>
        Adotamos medidas técnicas e administrativas para proteger os dados, incluindo conexão criptografada (HTTPS),
        validação dos formulários, proteção contra spam e acesso restrito às informações recebidas.
        Nenhuma medida é infalível; em caso de incidente de segurança relevante, comunicaremos a ANPD e os titulares
        afetados, nos termos do art. 48 da LGPD.
      </p>

      <h2>7. Seus direitos</h2>
      <p>Nos termos do art. 18 da LGPD, você pode solicitar:</p>
      <ul>
        <li>confirmação da existência de tratamento;</li>
        <li>acesso aos dados;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade;</li>
        <li>portabilidade, observados os segredos comercial e industrial;</li>
        <li>eliminação dos dados tratados com base no consentimento, quando aplicável;</li>
        <li>informação sobre entidades com as quais os dados foram compartilhados;</li>
        <li>informação sobre a possibilidade de não fornecer consentimento e suas consequências;</li>
        <li>revogação do consentimento.</li>
      </ul>
      <p>
        Para exercer seus direitos, utilize o <Link href="/direitos-do-titular">formulário de direitos do titular</Link>.
        Poderemos solicitar informações para confirmar sua identidade. Você também pode apresentar reclamação à
        Autoridade Nacional de Proteção de Dados (ANPD).
      </p>

      <h2>8. Cookies</h2>
      <p>
        Detalhes sobre os cookies utilizados estão na <Link href="/politica-de-cookies">Política de Cookies</Link>. Você pode
        alterar suas preferências a qualquer momento pelo link “Preferências de Cookies” no rodapé.
      </p>

      <h2>9. Alterações desta política</h2>
      <p>Esta política pode ser atualizada. A data da última atualização está indicada no topo desta página.</p>
    </LegalPage>
  );
}
