import { NextResponse } from "next/server";
import { parseContact } from "@/lib/forms";
import { clientIp, deliver, looksLikeSpam, NotConfiguredError, rateLimited, sameOrigin } from "@/lib/server/forms";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: "rate_limited", message: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Robôs recebem resposta neutra, sem entrega.
  if (looksLikeSpam(body)) return NextResponse.json({ ok: true });

  const { data, errors } = parseContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", errors }, { status: 422 });

  try {
    await deliver(
      "contato",
      `[Site] ${data.subject} — ${data.name}`,
      { Nome: data.name, "E-mail": data.email, Telefone: data.phone, Assunto: data.subject, Mensagem: data.message },
      data.email,
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof NotConfiguredError) {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.error("Falha ao entregar contato:", (err as Error).message);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
