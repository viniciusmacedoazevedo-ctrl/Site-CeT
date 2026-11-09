/**
 * Envio de formulários sem servidor próprio, via Web3Forms (gratuito).
 *
 * - Cadastre o e-mail que receberá as mensagens em https://web3forms.com
 *   e copie a "Access Key" para NEXT_PUBLIC_WEB3FORMS_KEY.
 * - A Access Key é PÚBLICA por natureza: ela só permite enviar mensagens
 *   para o e-mail cadastrado, não dá acesso a nada. Por isso pode ficar no navegador.
 * - Sem a chave, o envio não acontece e o site avisa o visitante.
 */

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export type DeliveryResult = "ok" | "not_configured" | "network" | "failed";

export async function deliverForm(opts: {
  subject: string;
  fields: Record<string, string>;
  replyTo?: string;
  /** Valor do campo isca: preenchido = robô. */
  honeypot?: string;
  /** Momento em que o formulário foi exibido. */
  startedAt: number;
}): Promise<DeliveryResult> {
  // Robôs: resposta neutra, sem envio.
  if (opts.honeypot || Date.now() - opts.startedAt < 2500) return "ok";
  if (!ACCESS_KEY) return "not_configured";

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: opts.subject,
        from_name: "Site C&T Consultores",
        ...(opts.replyTo ? { replyto: opts.replyTo } : {}),
        botcheck: false,
        ...opts.fields,
      }),
      signal: AbortSignal.timeout(15000),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean };
    return res.ok && json.success ? "ok" : "failed";
  } catch {
    return "network";
  }
}
