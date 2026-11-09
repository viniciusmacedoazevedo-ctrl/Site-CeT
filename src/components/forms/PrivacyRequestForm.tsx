"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2, ShieldCheck, TriangleAlert } from "lucide-react";
import { parsePrivacyRequest, privacyRequestTypes, type FieldErrors } from "@/lib/forms";
import { Honeypot, SelectField, submitJson, TextAreaField, TextField, type SubmitState } from "./fields";

export function PrivacyRequestForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const { errors: errs } = parsePrivacyRequest(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setState({ kind: "sending" });
    const { status, json } = await submitJson("/api/privacidade", { ...values, startedAt: startedAt.current });
    if (status === 200) { setState({ kind: "success", protocol: json.protocol }); form.reset(); }
    else if (status === 422 && json.errors) { setErrors(json.errors); setState({ kind: "idle" }); }
    else if (status === 503) setState({ kind: "error", reason: "not_configured" });
    else if (status === 429) setState({ kind: "error", reason: "rate_limited" });
    else if (status === 0) setState({ kind: "error", reason: "network" });
    else setState({ kind: "error", reason: "failed" });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card relative space-y-5 p-6 sm:p-8">
      <Honeypot />
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-cyan-50 text-brand"><ShieldCheck className="size-5" aria-hidden /></span>
        <p className="font-display text-xl text-navy">Solicitação de titular</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nome completo" name="name" required autoComplete="name" error={errors.name} maxLength={120} />
        <TextField label="E-mail para resposta" name="email" type="email" required autoComplete="email" error={errors.email} maxLength={160} />
      </div>
      <SelectField label="Tipo de solicitação" name="requestType" required options={privacyRequestTypes} error={errors.requestType} />
      <TextAreaField label="Detalhes da solicitação" name="details" required maxLength={4000} error={errors.details} hint="Não inclua documentos ou dados sensíveis neste campo." />
      <p className="text-xs leading-relaxed text-muted">
        Os dados deste formulário serão usados exclusivamente para atender e registrar a sua solicitação (art. 7º, II, LGPD).
      </p>
      <button type="submit" disabled={state.kind === "sending"} className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-brand disabled:opacity-60">
        {state.kind === "sending" && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {state.kind === "sending" ? "Enviando…" : "Enviar solicitação"}
      </button>
      <div aria-live="polite">
        {state.kind === "success" && (
          <p className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <CheckCircle2 className="size-5 shrink-0" aria-hidden />
            Solicitação registrada{state.protocol ? ` com o protocolo ${state.protocol}` : ""}. Responderemos pelo e-mail informado.
          </p>
        )}
        {state.kind === "error" && (
          <p role="alert" className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <TriangleAlert className="size-5 shrink-0" aria-hidden />
            {state.reason === "not_configured"
              ? "O envio on-line deste canal ainda não está ativado e sua solicitação não foi enviada. Entre em contato por telefone com uma de nossas unidades."
              : state.reason === "rate_limited"
                ? "Muitas tentativas. Aguarde alguns minutos e tente novamente."
                : "Não foi possível enviar agora. Tente novamente mais tarde."}
          </p>
        )}
      </div>
    </form>
  );
}
