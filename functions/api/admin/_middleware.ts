import type { AdminData, Env } from "../../../server/types";
import { authenticate } from "../../../server/access";
import { error } from "../../../server/http";

/**
 * Protege todas as rotas /api/admin/*: exige login válido do Cloudflare Access e,
 * nas alterações, uma requisição vinda do próprio painel (proteção contra CSRF).
 */
export const onRequest: PagesFunction<Env, string, AdminData> = async (ctx) => {
  const { request, env } = ctx;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const origin = request.headers.get("Origin");
    if (request.headers.get("X-Requested-With") !== "cet-admin" || (origin && origin !== new URL(request.url).origin)) {
      return error(403, "Requisição não permitida.");
    }
  }
  const auth = await authenticate(request, env);
  if (!auth.ok) return error(auth.status, auth.message);
  ctx.data.email = auth.email;
  const res = await ctx.next();
  const out = new Response(res.body, res);
  out.headers.set("Cache-Control", "no-store");
  out.headers.set("X-Robots-Tag", "noindex");
  return out;
};
