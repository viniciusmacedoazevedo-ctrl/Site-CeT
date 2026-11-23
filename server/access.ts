import type { Env } from "./types";

/**
 * Confere o token que o Cloudflare Access coloca em cada requisição depois do login
 * (cabeçalho Cf-Access-Jwt-Assertion). Sem as variáveis configuradas, o painel fica
 * bloqueado: nunca liberamos acesso por padrão.
 */

type Jwk = JsonWebKey & { kid: string };
let certCache: { domain: string; keys: Jwk[]; at: number } | null = null;

async function getKeys(domain: string, force = false): Promise<Jwk[]> {
  if (!force && certCache && certCache.domain === domain && Date.now() - certCache.at < 3600_000) return certCache.keys;
  const res = await fetch(`https://${domain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`Não foi possível obter as chaves do Cloudflare Access (${res.status}).`);
  const body = (await res.json()) as { keys: Jwk[] };
  certCache = { domain, keys: body.keys, at: Date.now() };
  return body.keys;
}

function b64urlToBytes(s: string) {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=");
  const bin = atob(b64);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

function decodePart<T>(s: string): T {
  return JSON.parse(new TextDecoder().decode(b64urlToBytes(s))) as T;
}

export type AuthResult = { ok: true; email: string } | { ok: false; status: number; message: string };

export async function authenticate(request: Request, env: Env): Promise<AuthResult> {
  const url = new URL(request.url);
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (env.ADMIN_DEV_BYPASS === "true" && local) return { ok: true, email: "teste@localhost" };

  const domain = env.CF_ACCESS_TEAM_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const aud = env.CF_ACCESS_AUD;
  if (!domain || !aud) {
    return { ok: false, status: 503, message: "Painel ainda não configurado: defina CF_ACCESS_TEAM_DOMAIN e CF_ACCESS_AUD (veja docs/area-administrativa.md)." };
  }

  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) return { ok: false, status: 401, message: "Faça login pelo Cloudflare Access para acessar o painel." };

  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, status: 401, message: "Sessão inválida." };

  try {
    const header = decodePart<{ alg: string; kid: string }>(parts[0]);
    const payload = decodePart<{ aud: string | string[]; exp: number; nbf?: number; iss: string; email?: string }>(parts[1]);
    if (header.alg !== "RS256") return { ok: false, status: 401, message: "Sessão inválida." };

    let jwk = (await getKeys(domain)).find((k) => k.kid === header.kid);
    if (!jwk) jwk = (await getKeys(domain, true)).find((k) => k.kid === header.kid);
    if (!jwk) return { ok: false, status: 401, message: "Sessão inválida." };

    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlToBytes(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
    if (!valid) return { ok: false, status: 401, message: "Sessão inválida." };

    const now = Math.floor(Date.now() / 1000);
    const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!auds.includes(aud)) return { ok: false, status: 403, message: "Sessão de outro aplicativo." };
    if (payload.exp < now || (payload.nbf && payload.nbf > now + 60)) return { ok: false, status: 401, message: "Sessão expirada. Entre novamente." };
    if (payload.iss !== `https://${domain}`) return { ok: false, status: 401, message: "Sessão inválida." };
    if (!payload.email) return { ok: false, status: 403, message: "Login sem e-mail." };

    return { ok: true, email: payload.email.toLowerCase() };
  } catch {
    return { ok: false, status: 401, message: "Sessão inválida." };
  }
}
