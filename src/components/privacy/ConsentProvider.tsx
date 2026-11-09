"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * Gerenciamento de consentimento de cookies (LGPD).
 *
 * - Cookies estritamente necessários não dependem de consentimento.
 * - Categorias opcionais (análise e marketing) começam DESLIGADAS e nenhum
 *   script dessas categorias é carregado antes de uma escolha afirmativa.
 * - Para adicionar uma ferramenta (ex.: Google Analytics), envolva-a em
 *   <ConsentGate category="analytics">…</ConsentGate>.
 */

export type ConsentCategory = "analytics" | "marketing";
export type ConsentState = {
  version: number;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

const COOKIE = "cet_consent";
const VERSION = 1;
const MAX_AGE_DAYS = 180;

function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw.slice(COOKIE.length + 1))) as ConsentState;
    return parsed.version === VERSION ? parsed : null;
  } catch {
    return null;
  }
}

function writeConsent(state: ConsentState) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(state))}; Max-Age=${
    MAX_AGE_DAYS * 86400
  }; Path=/; SameSite=Lax${secure}`;
}

type Ctx = {
  consent: ConsentState | null;
  ready: boolean;
  preferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  save: (choice: Pick<ConsentState, "analytics" | "marketing">) => void;
  has: (c: ConsentCategory) => boolean;
};

const ConsentContext = createContext<Ctx | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  const save = useCallback((choice: Pick<ConsentState, "analytics" | "marketing">) => {
    const next: ConsentState = { version: VERSION, ...choice, decidedAt: new Date().toISOString() };
    writeConsent(next);
    setConsent(next);
    setPreferencesOpen(false);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      consent,
      ready,
      preferencesOpen,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      save,
      has: (c) => Boolean(consent?.[c]),
    }),
    [consent, ready, preferencesOpen, save],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent deve ser usado dentro de <ConsentProvider>");
  return ctx;
}

/** Renderiza o conteúdo somente após consentimento para a categoria. */
export function ConsentGate({ category, children }: { category: ConsentCategory; children: React.ReactNode }) {
  const { has } = useConsent();
  return has(category) ? <>{children}</> : null;
}
