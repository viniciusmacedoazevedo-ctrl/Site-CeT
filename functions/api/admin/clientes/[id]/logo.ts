import type { AdminData, Env } from "../../../../../server/types";
import { ensureSchema } from "../../../../../server/db";
import { error } from "../../../../../server/http";

/** GET /api/admin/clientes/:id/logo — logo de qualquer cliente, inclusive ocultos (só no painel). */
export const onRequestGet: PagesFunction<Env, string, AdminData> = async ({ env, params }) => {
  await ensureSchema(env);
  const row = await env.DB.prepare("SELECT logo, logo_type FROM clients WHERE id = ?").bind(String(params.id)).first<{ logo: ArrayBuffer | number[] | null; logo_type: string | null }>();
  if (!row?.logo || !row.logo_type) return error(404, "Logo não encontrada.");
  const body = row.logo instanceof ArrayBuffer ? row.logo : new Uint8Array(row.logo);
  return new Response(body, { headers: { "Content-Type": row.logo_type, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "default-src 'none'" } });
};
