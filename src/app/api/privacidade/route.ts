import { NextResponse } from "next/server";
import { parsePrivacyRequest } from "@/lib/forms";
import { clientIp, deliver, looksLikeSpam, NotConfiguredError, rateLimited, sameOrigin } from "@/lib/server/forms";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (rateLimited(clientIp(req))) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  if (looksLikeSpam(body)) return NextResponse.json({ ok: true });

  const { data, errors } = parsePrivacyRequest(body);
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", errors }, { status: 422 });

  const protocol = `LGPD-${Date.now().toString(36).toUpperCase()}`;
  try {
    await deliver(
      "privacidade",
      `[LGPD] ${data.requestType} — ${protocol}`,
      { Protocolo: protocol, Nome: data.name, "E-mail": data.email, Solicitação: data.requestType, Detalhes: data.details },
      data.email,
    );
    return NextResponse.json({ ok: true, protocol });
  } catch (err) {
    if (err instanceof NotConfiguredError) return NextResponse.json({ error: "not_configured" }, { status: 503 });
    console.error("Falha ao entregar solicitação LGPD:", (err as Error).message);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
