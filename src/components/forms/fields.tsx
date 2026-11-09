"use client";

import { AlertCircle } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const base =
  "w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-navy shadow-[inset_0_1px_2px_rgb(16_42_67/0.04)] transition placeholder:text-muted/60 focus:outline-none focus:ring-4";
const ok = "border-line focus:border-cyan focus:ring-cyan/15";
const bad = "border-red-400 focus:border-red-500 focus:ring-red-500/10";

type Common = { label: string; name: string; error?: string; hint?: ReactNode; required?: boolean };

function Wrapper({ label, name, error, hint, required, children }: Common & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required ? <span className="text-cyan" aria-hidden>*</span> : <span className="font-normal text-muted">(opcional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${name}-erro`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
          <AlertCircle className="size-3.5" aria-hidden /> {error}
        </p>
      ) : hint ? (
        <p id={`${name}-dica`} className="mt-1.5 text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

const describedBy = (name: string, error?: string, hint?: ReactNode) => (error ? `${name}-erro` : hint ? `${name}-dica` : undefined);

export function TextField({ label, name, error, hint, required, ...props }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper {...{ label, name, error, hint, required }}>
      <input id={name} name={name} required={required} aria-invalid={Boolean(error)} aria-describedby={describedBy(name, error, hint)} className={`${base} ${error ? bad : ok}`} {...props} />
    </Wrapper>
  );
}

export function SelectField({ label, name, error, hint, required, options, ...props }: Common & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[] }) {
  return (
    <Wrapper {...{ label, name, error, hint, required }}>
      <select id={name} name={name} required={required} aria-invalid={Boolean(error)} aria-describedby={describedBy(name, error, hint)} className={`${base} ${error ? bad : ok} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%235b6b7b' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`} {...props}>
        <option value="">Selecione…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Wrapper>
  );
}

export function TextAreaField({ label, name, error, hint, required, ...props }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper {...{ label, name, error, hint, required }}>
      <textarea id={name} name={name} required={required} aria-invalid={Boolean(error)} aria-describedby={describedBy(name, error, hint)} className={`${base} ${error ? bad : ok} min-h-36 resize-y`} {...props} />
    </Wrapper>
  );
}

/** Campo invisível para humanos; robôs costumam preenchê-lo. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Não preencha este campo</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export type SubmitState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; protocol?: string }
  | { kind: "error"; reason: "not_configured" | "rate_limited" | "network" | "failed" };

export async function submitJson(url: string, body: Record<string, unknown>) {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Record<string, string>; protocol?: string };
    return { status: res.status, json };
  } catch {
    return { status: 0, json: {} as { error?: string; errors?: Record<string, string>; protocol?: string } };
  }
}
