import type { Env } from "../../../../server/types";
import { ensureSchema } from "../../../../server/db";
import { error } from "../../../../server/http";

/** GET /api/clientes/:id/logo — logo de um cliente publicado (público). */
export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  await ensureSchema(env);
  const row = await env.DB.prepare("SELECT logo, logo_type FROM clients WHERE id = ? AND published = 1").bind(String(params.id)).first<{ logo: ArrayBuffer | number[] | null; logo_type: string | null }>();
  if (!row?.logo || !row.logo_type) return error(404, "Logo não encontrada.");
  const body = row.logo instanceof ArrayBuffer ? row.logo : new Uint8Array(row.logo);
  return new Response(body, {
    headers: {
      "Content-Type": row.logo_type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'",
    },
  });
};
