"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useConsent } from "./ConsentProvider";

const categories = [
  {
    id: "necessary" as const,
    title: "Estritamente necessários",
    text: "Garantem o funcionamento do site e guardam a sua escolha sobre cookies. Não podem ser desativados.",
    locked: true,
  },
  {
    id: "analytics" as const,
    title: "Análise",
    text: "Ajudariam a entender, de forma agregada, como o site é utilizado. Atualmente nenhuma ferramenta de análise está instalada.",
    locked: false,
  },
  {
    id: "marketing" as const,
    title: "Marketing",
    text: "Permitiriam medir campanhas e exibir conteúdo personalizado. Atualmente nenhuma ferramenta de marketing está instalada.",
    locked: false,
  },
];

export function CookieBanner() {
  const { consent, ready, preferencesOpen, openPreferences, closePreferences, save } = useConsent();
  const showBanner = ready && !consent && !preferencesOpen;

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.section
            role="region"
            aria-label="Aviso de cookies"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-md"
          >
            <div className="rounded-2xl border border-white/10 bg-navy-950/95 p-5 text-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                  <Cookie className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold">Sua privacidade importa</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">
                    Usamos apenas cookies necessários para o funcionamento do site. Cookies opcionais só são ativados com a
                    sua autorização.{" "}
                    <Link href="/politica-de-cookies" className="font-medium text-cyan-300 underline underline-offset-2">Política de Cookies</Link>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => save({ analytics: true, marketing: true })} className="rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600">
                  Aceitar todos
                </button>
                <button type="button" onClick={() => save({ analytics: false, marketing: false })} className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white">
                  Rejeitar não essenciais
                </button>
                <button type="button" onClick={openPreferences} className="rounded-full px-3 py-2 text-sm font-semibold text-cyan-300 underline-offset-2 hover:underline">
                  Personalizar
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>{preferencesOpen && <PreferencesDialog onClose={closePreferences} />}</AnimatePresence>
    </>
  );
}

function PreferencesDialog({ onClose }: { onClose: () => void }) {
  const { consent, save } = useConsent();
  const [state, setState] = useState({ analytics: consent?.analytics ?? false, marketing: consent?.marketing ?? false });
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("button, input")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const els = dialogRef.current.querySelectorAll<HTMLElement>("button, input, a[href]");
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); prev?.focus(); };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[80] grid place-items-end bg-navy/40 p-3 backdrop-blur-[2px] sm:place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[1.5rem] border border-line bg-white p-6 shadow-[var(--shadow-lift)] sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-semibold text-navy-900">Preferências de cookies</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-muted hover:bg-mist hover:text-navy" aria-label="Fechar preferências">
            <X className="size-5" />
          </button>
        </div>
        <p className="mt-2 text-sm text-muted">
          Escolha quais categorias deseja permitir. Você pode alterar sua escolha a qualquer momento pelo link
          “Preferências de Cookies” no rodapé.
        </p>
        <ul className="mt-5 divide-y divide-line rounded-xl border border-line">
          {categories.map((c) => {
            const checked = c.locked ? true : state[c.id as "analytics" | "marketing"];
            return (
              <li key={c.id} className="flex items-start justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold text-navy">{c.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{c.text}</p>
                </div>
                <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                  <span className="sr-only">{c.title}</span>
                  <input
                    type="checkbox"
                    role="switch"
                    className="peer sr-only"
                    checked={checked}
                    disabled={c.locked}
                    onChange={(e) => setState((s) => ({ ...s, [c.id]: e.target.checked }))}
                  />
                  <span className="h-6 w-11 rounded-full bg-line transition peer-checked:bg-cyan peer-disabled:opacity-60 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan" />
                  <span className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
                </label>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={() => save({ analytics: false, marketing: false })} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy hover:border-navy">
            Rejeitar não essenciais
          </button>
          <button type="button" onClick={() => save(state)} className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-brand">
            Salvar preferências
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CookiePreferencesButton({ className }: { className?: string }) {
  const { openPreferences } = useConsent();
  return (
    <button type="button" onClick={openPreferences} className={className}>
      Preferências de Cookies
    </button>
  );
}
