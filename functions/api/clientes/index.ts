import type { Env } from "../../../server/types";
import { CLIENT_COLUMNS, ensureSchema, toPublic, type ClientRow } from "../../../server/db";
import { error, json } from "../../../server/http";

/** GET /api/clientes — clientes publicados no portfólio (público). */
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    await ensureSchema(env);
    const { results } = await env.DB.prepare(`SELECT ${CLIENT_COLUMNS} FROM clients WHERE published = 1 ORDER BY name COLLATE NOCASE`).all<ClientRow>();
    return json({ clients: results.map(toPublic) }, { headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } });
  } catch (e) {
    console.error(e);
    return error(503, "Portfólio indisponível no momento.");
  }
};
