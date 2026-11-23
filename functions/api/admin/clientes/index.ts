import type { AdminData, Env } from "../../../../server/types";
import { CLIENT_COLUMNS, ensureSchema, toAdmin, type ClientRow } from "../../../../server/db";
import { readClientForm } from "../../../../server/clientInput";
import { error, json } from "../../../../server/http";

/** GET /api/admin/clientes — todos os clientes, inclusive os ocultos. */
export const onRequestGet: PagesFunction<Env, string, AdminData> = async ({ env }) => {
  await ensureSchema(env);
  const { results } = await env.DB.prepare(`SELECT ${CLIENT_COLUMNS} FROM clients ORDER BY name COLLATE NOCASE`).all<ClientRow>();
  return json({ clients: results.map(toAdmin) });
};

/** POST /api/admin/clientes — cadastra um cliente. */
export const onRequestPost: PagesFunction<Env, string, AdminData> = async ({ env, request, data }) => {
  await ensureSchema(env);
  const parsed = await readClientForm(request);
  if (!parsed.ok) return error(400, parsed.message);
  const c = parsed.data;
  if (c.published && !c.consent) return error(400, "Para publicar, confirme que o cliente autorizou a exibição do nome e da logo.");

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO clients (id, name, segment, city, logo, logo_type, published, consent_at, consent_by, created_at, updated_at, updated_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    id, c.name, c.segment, c.city, c.logo?.bytes ?? null, c.logo?.type ?? null, c.published ? 1 : 0,
    c.consent ? now : null, c.consent ? data.email : null, now, now, data.email,
  ).run();

  const row = await env.DB.prepare(`SELECT ${CLIENT_COLUMNS} FROM clients WHERE id = ?`).bind(id).first<ClientRow>();
  return json({ client: toAdmin(row!) }, { status: 201 });
};
