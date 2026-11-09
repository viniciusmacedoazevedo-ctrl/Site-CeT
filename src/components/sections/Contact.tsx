"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Phone, Send, TriangleAlert } from "lucide-react";
import { contactSubjects, formatPhone, parseContact, type FieldErrors } from "@/lib/forms";
import { mainWhatsApp, whatsappLink } from "@/data/company";
import { units } from "@/data/units";
import { SectionHeading } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Honeypot, SelectField, TextAreaField, TextField, type SubmitState } from "@/components/forms/fields";
import { deliverForm } from "@/lib/formDelivery";

export function Contact() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [phone, setPhone] = useState("");
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

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
    <section id="contato" aria-labelledby="contato-titulo" className="relative py-24 lg:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contato"
            id="contato-titulo"
            title={<>Vamos conversar sobre a sua empresa?</>}
            text="Envie sua mensagem e um de nossos consultores retornará. Se preferir, fale diretamente com a unidade mais próxima."
          />

          <div className="mt-10 space-y-4">
            {units.map((u) => (
              <div key={u.id} className="rounded-2xl border border-line p-5">
                <p className="font-display text-lg text-navy">{u.city}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {u.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-sm font-semibold text-navy transition hover:bg-cyan-50 hover:text-brand">
                      <Phone className="size-4 text-cyan" aria-hidden /> {p.display}
                    </a>
                  ))}
                  <a
                    href={whatsappLink(u.whatsapp ?? mainWhatsApp.number, `Olá! Gostaria de falar com a unidade ${u.city} da C&T.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#e7f8ee] px-4 py-2 text-sm font-semibold text-[#14713d] transition hover:bg-[#d3f2df]"
                  >
                    <SocialIcon network="whatsapp" className="size-4" /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute -inset-3 -z-10 rounded-[2rem] bg-[linear-gradient(135deg,var(--color-cyan-50),transparent_60%)]" />
          <form ref={formRef} onSubmit={onSubmit} noValidate className="card relative p-6 sm:p-9" aria-describedby="aviso-privacidade-contato">
            <Honeypot />
            <div className="grid gap-5 sm:grid-cols-2">
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
              <div className="sm:col-span-2">
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
              <button
                type="submit"
                disabled={state.kind === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-brand disabled:opacity-60"
              >
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
                      {state.reason === "network" && "Sem conexão com o servidor. Verifique sua internet e tente novamente."}
                      {state.reason === "failed" && "Não foi possível enviar agora. Tente novamente ou fale conosco por telefone ou WhatsApp."}{" "}
                      <a href={whatsappLink(mainWhatsApp.number)} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Abrir WhatsApp</a>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
