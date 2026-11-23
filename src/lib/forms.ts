/**
 * Validação compartilhada entre navegador e servidor.
 * O servidor SEMPRE revalida: a validação no navegador é só para UX.
 */

import { contactSectors } from "@/data/content";

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";

export const contactSubjects = [...contactSectors, "Outro assunto"] as const;

export type ContactData = { name: string; email: string; phone: string; subject: string; message: string };

export function parseContact(input: Record<string, unknown>): { data: ContactData; errors: FieldErrors } {
  const data: ContactData = {
    name: clean(input.name, 120),
    email: clean(input.email, 160).toLowerCase(),
    phone: clean(input.phone, 30),
    subject: clean(input.subject, 60),
    message: clean(input.message, 4000),
  };
  const errors: FieldErrors = {};
  if (data.name.length < 3) errors.name = "Informe seu nome completo.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Informe um e-mail válido.";
  const digits = data.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) errors.phone = "Informe um telefone com DDD.";
  if (!(contactSubjects as readonly string[]).includes(data.subject)) errors.subject = "Selecione um assunto.";
  if (data.message.length < 10) errors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
  return { data, errors };
}

export const privacyRequestTypes = [
  "Confirmação da existência de tratamento",
  "Acesso aos dados",
  "Correção de dados incompletos, inexatos ou desatualizados",
  "Anonimização, bloqueio ou eliminação",
  "Informação sobre compartilhamento",
  "Revogação do consentimento",
  "Outra solicitação",
] as const;

export type PrivacyRequestData = { name: string; email: string; requestType: string; details: string };

export function parsePrivacyRequest(input: Record<string, unknown>): { data: PrivacyRequestData; errors: FieldErrors } {
  const data: PrivacyRequestData = {
    name: clean(input.name, 120),
    email: clean(input.email, 160).toLowerCase(),
    requestType: clean(input.requestType, 120),
    details: clean(input.details, 4000),
  };
  const errors: FieldErrors = {};
  if (data.name.length < 3) errors.name = "Informe seu nome completo.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Informe um e-mail válido.";
  if (!(privacyRequestTypes as readonly string[]).includes(data.requestType)) errors.requestType = "Selecione o tipo de solicitação.";
  if (data.details.length < 10) errors.details = "Descreva sua solicitação (mínimo de 10 caracteres).";
  return { data, errors };
}

export function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
