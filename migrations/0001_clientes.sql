-- Referência: o próprio site cria esta tabela na primeira chamada (server/db.ts).
CREATE TABLE IF NOT EXISTS clients (
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
);
CREATE INDEX IF NOT EXISTS clients_published_name ON clients (published, name);
