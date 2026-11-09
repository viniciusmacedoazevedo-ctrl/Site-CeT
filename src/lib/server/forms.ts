import "server-only";

/**
 * Infraestrutura de formulários no servidor:
 * - proteção anti-spam (honeypot, tempo mínimo de preenchimento, limite por IP);
 * - entrega por webhook ou e-mail (Resend), configurada por variáveis de ambiente.
 *
 * Nenhuma chave é exposta ao navegador. Sem configuração, o envio responde
 * 503 e o site informa o visitante com transparência (sem simular sucesso).
 */

export class NotConfiguredError extends Error {}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/** Limite simples em memória. Em produção com várias instâncias, prefira um store compartilhado (ex.: Upstash). */
export function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "desconhecido";
}

/** Retorna true quando o envio parece automatizado. */
export function looksLikeSpam(body: Record<string, unknown>) {
  if (typeof body.website === "string" && body.website.length > 0) return true; // honeypot
  const started = Number(body.startedAt);
  if (!Number.isFinite(started)) return true;
  const elapsed = Date.now() - started;
  return elapsed < 2500 || elapsed > 1000 * 60 * 60 * 6;
}

/** Garante que o pedido veio do próprio site (mitiga CSRF entre origens). */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export function deliveryConfigured() {
  return Boolean(process.env.FORMS_WEBHOOK_URL || (process.env.RESEND_API_KEY && process.env.FORMS_TO_EMAIL));
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function deliver(kind: "contato" | "privacidade", subject: string, fields: Record<string, string>, replyTo?: string) {
  const payload = { kind, subject, fields, receivedAt: new Date().toISOString() };

  if (process.env.FORMS_WEBHOOK_URL) {
    const res = await fetch(process.env.FORMS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.FORMS_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.FORMS_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`);
    return;
  }

  if (process.env.RESEND_API_KEY && process.env.FORMS_TO_EMAIL) {
    const rows = Object.entries(fields)
      .map(([k, v]) => `<tr><th align="left" style="padding:6px 12px;background:#f5f7f9">${escapeHtml(k)}</th><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
      .join("");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.FORMS_FROM_EMAIL ?? "Site C&T <onboarding@resend.dev>",
        to: process.env.FORMS_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: replyTo,
        subject,
        html: `<h2 style="font-family:Arial">${escapeHtml(subject)}</h2><table style="font-family:Arial;font-size:14px;border-collapse:collapse">${rows}</table>`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Resend respondeu ${res.status}`);
    return;
  }

  throw new NotConfiguredError("Envio de formulários não configurado");
}
