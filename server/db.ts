import type { Env } from "./types";

/**
 * Estrutura do banco. É criada automaticamente na primeira chamada,
 * então não é preciso rodar nenhum comando no painel da Cloudflare.
 * O mesmo SQL está em migrations/0001_clientes.sql para referência.
 */
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    segment TEXT NOT NULL,
    city TEXT NOT NULL,
    logo BLOB,
    logo_type TEXT,
    published INTEGER NOT NULL DEFAULT 1,
    consent_at TEXT,
    consent_by TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS clients_published_name ON clients (published, name)`,
];

let ready: Promise<void> | null = null;

export function ensureSchema(env: Env) {
  if (!env.DB) throw new Error("Banco D1 não configurado (binding DB).");
  ready ??= env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s))).then(() => undefined).catch((e) => { ready = null; throw e; });
  return ready;
}

export type ClientRow = {
  id: string;
  name: string;
  segment: string;
  city: string;
  logo_type: string | null;
  published: number;
  consent_at: string | null;
  consent_by: string | null;
  created_at: string;
  updated_at: string;
  updated_by: string;
};

export const CLIENT_COLUMNS = "id, name, segment, city, logo_type, published, consent_at, consent_by, created_at, updated_at, updated_by";

export function logoUrl(row: Pick<ClientRow, "id" | "updated_at" | "logo_type">) {
  return row.logo_type ? `/api/clientes/${row.id}/logo?v=${encodeURIComponent(row.updated_at)}` : null;
}

export function toPublic(row: ClientRow) {
  return { id: row.id, name: row.name, segment: row.segment, city: row.city, logo: logoUrl(row) };
}

export function toAdmin(row: ClientRow) {
  return {
    ...toPublic(row),
    published: row.published === 1,
    consentAt: row.consent_at,
    consentBy: row.consent_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
  };
}
