"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, MapPin, Phone, Send, TriangleAlert } from "lucide-react";
import { contactSubjects, formatPhone, parseContact, type FieldErrors } from "@/lib/forms";
import { mainWhatsApp, whatsappLink } from "@/data/company";
import { units } from "@/data/units";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Honeypot, SelectField, TextAreaField, TextField, type SubmitState } from "@/components/forms/fields";
import { deliverForm } from "@/lib/formDelivery";

const steps = ["Seus dados", "Sua mensagem"] as const;

export function Contact() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [phone, setPhone] = useState("");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const { errors: errs } = parseContact(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setState({ kind: "sending" });
    const result = await deliverForm({
      subject: `[Site] ${values.subject} — ${values.name}`,
      fields: { Nome: values.name, "E-mail": values.email, Telefone: values.phone, Assunto: values.subject, Mensagem: values.message },
      replyTo: values.email,
      honeypot: values.website,
      startedAt: startedAt.current,
    });
    if (result === "ok") {
      setState({ kind: "success" });
      form.reset();
      setPhone("");
    } else setState({ kind: "error", reason: result });
  }

  const clearError = (name: string) => {
    if (errors[name]) setErrors((prev) => Object.fromEntries(Object.entries(prev).filter(([k]) => k !== name)));
  };

  return (
    <section aria-label="Formulário e canais de contato" className="relative bg-mist py-16 lg:py-24">
      <div className="container-site grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="surface-dark noise relative overflow-hidden rounded-[1.75rem] p-7 sm:p-9">
          <p className="kicker text-cyan-300">Atendimento direto</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Fale com a unidade mais próxima.</h2>
          <div className="mt-8 space-y-4">
            {units.map((u) => (
              <div key={u.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="font-display text-lg font-semibold">{u.city}</p>
                <p className="mt-2 flex gap-2 text-sm text-white/60"><MapPin className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />{u.street}, {u.number} — {u.district}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {u.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-sm font-semibold transition hover:border-cyan hover:text-cyan">
                      <Phone className="size-4 text-cyan" aria-hidden /> {p.display}
                    </a>
                  ))}
                  <a href={whatsappLink(u.whatsapp ?? mainWhatsApp.number, `Olá! Gostaria de falar com a unidade ${u.city} da C&T.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cyan px-3.5 py-2 text-sm font-semibold transition hover:bg-cyan-600">
                    <SocialIcon network="whatsapp" className="size-4" /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
          <Link href="/unidades" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-white">Ver as unidades no mapa 3D →</Link>
        </aside>

        <form onSubmit={onSubmit} noValidate className="relative rounded-[1.75rem] border border-line bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10" aria-describedby="aviso-privacidade-contato">
          <Honeypot />
          <div className="flex items-center gap-3">
            {steps.map((s, i) => (
              <span key={s} className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                <span className="grid size-7 place-items-center rounded-full bg-navy font-display text-[0.7rem] text-white">{i + 1}</span>
                {s}
                {i === 0 && <span className="h-px w-8 bg-line" aria-hidden />}
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <TextField label="Nome" name="name" required autoComplete="name" error={errors.name} onChange={() => clearError("name")} maxLength={120} />
            </div>
            <TextField label="E-mail" name="email" type="email" required autoComplete="email" inputMode="email" error={errors.email} onChange={() => clearError("email")} maxLength={160} />
            <TextField
              label="Telefone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="(83) 00000-0000"
              value={phone}
              onChange={(e) => { setPhone(formatPhone(e.target.value)); clearError("phone"); }}
              error={errors.phone}
            />
            <div className="border-t border-dashed border-line pt-5 sm:col-span-2">
              <SelectField label="Assunto" name="subject" required options={contactSubjects} error={errors.subject} onChange={() => clearError("subject")} />
            </div>
            <div className="sm:col-span-2">
              <TextAreaField label="Mensagem" name="message" required maxLength={4000} error={errors.message} onChange={() => clearError("message")} placeholder="Conte brevemente como podemos ajudar." />
            </div>
          </div>

          <p id="aviso-privacidade-contato" className="mt-5 text-xs leading-relaxed text-muted">
            Usaremos seus dados apenas para responder a esta solicitação. Não enviamos comunicações de marketing sem
            autorização específica. Saiba mais na <Link href="/politica-de-privacidade" className="font-semibold text-brand underline underline-offset-2">Política de Privacidade</Link>.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={state.kind === "sending"} className="btn btn-navy disabled:opacity-60">
              {state.kind === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
              {state.kind === "sending" ? "Enviando…" : "Enviar solicitação"}
            </button>
            <p className="text-xs text-muted"><span className="text-cyan">*</span> Campos obrigatórios</p>
          </div>

          <div aria-live="polite" className="mt-5">
            <AnimatePresence mode="wait">
              {state.kind === "success" && (
                <motion.div key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  <CheckCircle2 className="size-5 shrink-0" aria-hidden />
                  Mensagem enviada! Em breve um consultor entrará em contato.
                </motion.div>
              )}
              {state.kind === "error" && (
                <motion.div key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <TriangleAlert className="size-5 shrink-0" aria-hidden />
                  <span>
                    {state.reason === "not_configured" && "O envio on-line ainda não está ativado. Sua mensagem não foi enviada — fale conosco por telefone ou WhatsApp."}
                    {state.reason === "network" && "Sem conexão. Verifique sua internet e tente novamente."}
                    {state.reason === "failed" && "Não foi possível enviar agora. Tente novamente ou fale conosco por telefone ou WhatsApp."}{" "}
                    <a href={whatsappLink(mainWhatsApp.number)} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Abrir WhatsApp</a>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </section>
  );
}
