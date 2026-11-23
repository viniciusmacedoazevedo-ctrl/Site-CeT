import type { AdminData, Env } from "../../../../server/types";
import { CLIENT_COLUMNS, ensureSchema, toAdmin, type ClientRow } from "../../../../server/db";
import { readClientForm } from "../../../../server/clientInput";
import { error, json } from "../../../../server/http";

/** PUT /api/admin/clientes/:id — altera um cliente (a logo só muda se outra for enviada). */
export const onRequestPut: PagesFunction<Env, string, AdminData> = async ({ env, request, params, data }) => {
  await ensureSchema(env);
  const id = String(params.id);
  const current = await env.DB.prepare(`SELECT ${CLIENT_COLUMNS} FROM clients WHERE id = ?`).bind(id).first<ClientRow>();
  if (!current) return error(404, "Cliente não encontrado.");

  const parsed = await readClientForm(request);
  if (!parsed.ok) return error(400, parsed.message);
  const c = parsed.data;
  const hasConsent = Boolean(current.consent_at) || c.consent;
  if (c.published && !hasConsent) return error(400, "Para publicar, confirme que o cliente autorizou a exibição do nome e da logo.");

  const now = new Date().toISOString();
  const stmts = [
    env.DB.prepare("UPDATE clients SET name = ?, segment = ?, city = ?, published = ?, updated_at = ?, updated_by = ? WHERE id = ?")
      .bind(c.name, c.segment, c.city, c.published ? 1 : 0, now, data.email, id),
  ];
  if (c.consent && !current.consent_at) stmts.push(env.DB.prepare("UPDATE clients SET consent_at = ?, consent_by = ? WHERE id = ?").bind(now, data.email, id));
  if (c.logo) stmts.push(env.DB.prepare("UPDATE clients SET logo = ?, logo_type = ? WHERE id = ?").bind(c.logo.bytes, c.logo.type, id));
  else if (c.removeLogo) stmts.push(env.DB.prepare("UPDATE clients SET logo = NULL, logo_type = NULL WHERE id = ?").bind(id));
  await env.DB.batch(stmts);

  const row = await env.DB.prepare(`SELECT ${CLIENT_COLUMNS} FROM clients WHERE id = ?`).bind(id).first<ClientRow>();
  return json({ client: toAdmin(row!) });
};

/** DELETE /api/admin/clientes/:id — exclui o cliente e a logo de forma definitiva. */
export const onRequestDelete: PagesFunction<Env, string, AdminData> = async ({ env, params }) => {
  await ensureSchema(env);
  const res = await env.DB.prepare("DELETE FROM clients WHERE id = ?").bind(String(params.id)).run();
  if (!res.meta.changes) return error(404, "Cliente não encontrado.");
  return json({ ok: true });
};
