"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle, Check, Eye, EyeOff, ImagePlus, Loader2, LogOut, Pencil, Plus, Search, ShieldCheck, Trash2, X,
} from "lucide-react";
import { citySuggestions, segmentSuggestions, type AdminClient } from "@/lib/clients";
import { resizeLogo } from "./resizeLogo";

const HEADERS = { "X-Requested-With": "cet-admin", Accept: "application/json" };

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(path, { ...init, headers: { ...HEADERS, ...(init.headers ?? {}) }, credentials: "same-origin" });
  const isJson = res.headers.get("Content-Type")?.includes("application/json");
  const body = isJson ? await res.json() : null;
  if (!res.ok || !isJson) {
    const err = new Error((body as { error?: string } | null)?.error ?? (res.status === 404 ? "API não encontrada. O painel só funciona no site publicado na Cloudflare ou com `npm run preview`." : `Erro ${res.status}.`));
    (err as Error & { status?: number }).status = res.status;
    throw err;
  }
  return body as T;
}

const adminLogo = (c: AdminClient) => (c.logo ? `/api/admin/clientes/${c.id}/logo?v=${encodeURIComponent(c.updatedAt)}` : null);
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

type Session = { status: "loading" } | { status: "in"; email: string } | { status: "blocked"; message: string; code?: number };

export function AdminPanel() {
  const [session, setSession] = useState<Session>({ status: "loading" });
  const [clients, setClients] = useState<AdminClient[] | null>(null);
  const [editing, setEditing] = useState<AdminClient | "new" | null>(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const notify = useCallback((kind: "ok" | "error", text: string) => {
    setToast({ kind, text });
    setTimeout(() => setToast((t) => (t?.text === text ? null : t)), 4500);
  }, []);

  const load = useCallback(async () => {
    const { clients } = await api<{ clients: AdminClient[] }>("/api/admin/clientes");
    setClients(clients);
  }, []);

  useEffect(() => {
    api<{ email: string }>("/api/admin/me")
      .then(async ({ email }) => { setSession({ status: "in", email }); await load(); })
      .catch((e: Error & { status?: number }) => setSession({ status: "blocked", message: e.message, code: e.status }));
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("pt-BR");
    return (clients ?? []).filter((c) => !q || `${c.name} ${c.segment} ${c.city}`.toLocaleLowerCase("pt-BR").includes(q));
  }, [clients, query]);

  const counts = useMemo(() => ({
    total: clients?.length ?? 0,
    published: clients?.filter((c) => c.published).length ?? 0,
  }), [clients]);

  async function togglePublished(c: AdminClient) {
    if (!c.published && !c.consentAt) { setEditing(c); notify("error", "Registre a autorização do cliente antes de publicar."); return; }
    setBusyId(c.id);
    try {
      const fd = new FormData();
      fd.set("name", c.name); fd.set("segment", c.segment); fd.set("city", c.city);
      fd.set("published", String(!c.published)); fd.set("consent", "false");
      const { client } = await api<{ client: AdminClient }>(`/api/admin/clientes/${c.id}`, { method: "PUT", body: fd });
      setClients((list) => list?.map((x) => (x.id === client.id ? client : x)) ?? null);
      notify("ok", client.published ? `${client.name} está visível no site.` : `${client.name} foi ocultado do site.`);
    } catch (e) { notify("error", (e as Error).message); } finally { setBusyId(null); }
  }

  async function remove(c: AdminClient) {
    if (!window.confirm(`Excluir "${c.name}" de forma definitiva? A logo também será apagada.`)) return;
    setBusyId(c.id);
    try {
      await api(`/api/admin/clientes/${c.id}`, { method: "DELETE" });
      setClients((list) => list?.filter((x) => x.id !== c.id) ?? null);
      notify("ok", `${c.name} foi excluído.`);
    } catch (e) { notify("error", (e as Error).message); } finally { setBusyId(null); }
  }

  if (session.status === "loading") {
    return <div className="grid min-h-[40vh] place-items-center text-muted"><Loader2 className="size-6 animate-spin" aria-label="Carregando" /></div>;
  }

  if (session.status === "blocked") {
    return (
      <div className="mx-auto max-w-xl rounded-[1.75rem] border border-line bg-white p-8 text-center shadow-[var(--shadow-soft)]">
        <ShieldCheck className="mx-auto size-10 text-brand" aria-hidden />
        <h2 className="mt-5 text-2xl font-semibold text-navy-900">Área restrita</h2>
        <p className="mt-3 text-muted">{session.message}</p>
        {session.code === 401 && <a href="/admin" className="btn btn-navy mt-6">Entrar</a>}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-[1.5rem] bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white/60">Conectado como</p>
          <p className="font-display font-semibold">{session.email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Stat label="Clientes" value={counts.total} />
          <Stat label="No site" value={counts.published} />
          <Stat label="Ocultos" value={counts.total - counts.published} />
          <a href="/cdn-cgi/access/logout" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
            <LogOut className="size-4" aria-hidden /> Sair
          </a>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block sm:w-80">
          <span className="sr-only">Buscar cliente</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome, segmento ou cidade" className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-4 text-sm focus:border-cyan focus:outline-none focus:ring-4 focus:ring-cyan/15" />
        </label>
        <button type="button" onClick={() => setEditing("new")} className="btn btn-cyan">
          <Plus className="size-4" aria-hidden /> Novo cliente
        </button>
      </div>

      {clients === null ? (
        <div className="mt-10 grid place-items-center text-muted"><Loader2 className="size-6 animate-spin" aria-label="Carregando clientes" /></div>
      ) : clients.length === 0 ? (
        <div className="mt-8 rounded-[1.5rem] border border-dashed border-line bg-mist px-6 py-14 text-center">
          <p className="font-display text-lg font-semibold text-navy-900">Nenhum cliente cadastrado ainda</p>
          <p className="mt-1 text-sm text-muted">Clique em &quot;Novo cliente&quot; para começar o portfólio.</p>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-line overflow-hidden rounded-[1.5rem] border border-line bg-white">
          {filtered.map((c) => (
            <li key={c.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="grid h-16 w-28 shrink-0 place-items-center rounded-xl bg-mist px-3">
                {adminLogo(c) ? (
                  // eslint-disable-next-line @next/next/no-img-element -- logo servida pela API
                  <img src={adminLogo(c)!} alt="" className="max-h-11 max-w-full object-contain" />
                ) : <span className="text-xs text-muted">sem logo</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display font-semibold text-navy-900">{c.name}</p>
                <p className="text-sm text-muted">{c.segment} · {c.city}</p>
                <p className="mt-1 text-xs text-muted">
                  {c.consentAt ? <>Autorização registrada em {fmtDate(c.consentAt)}</> : <span className="font-medium text-amber-700">Sem autorização registrada</span>}
                  {" · "}Alterado em {fmtDate(c.updatedAt)} por {c.updatedBy}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.published ? "bg-emerald-50 text-emerald-700" : "bg-mist text-muted"}`}>{c.published ? "No site" : "Oculto"}</span>
                <IconButton label={c.published ? "Ocultar do site" : "Publicar no site"} onClick={() => togglePublished(c)} disabled={busyId === c.id}>
                  {busyId === c.id ? <Loader2 className="size-4 animate-spin" /> : c.published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </IconButton>
                <IconButton label="Editar" onClick={() => setEditing(c)} disabled={busyId === c.id}><Pencil className="size-4" /></IconButton>
                <IconButton label="Excluir" onClick={() => remove(c)} disabled={busyId === c.id} danger><Trash2 className="size-4" /></IconButton>
              </div>
            </li>
          ))}
          {filtered.length === 0 && <li className="p-6 text-center text-sm text-muted">Nenhum cliente encontrado para &quot;{query}&quot;.</li>}
        </ul>
      )}

      <AnimatePresence>
        {editing && (
          <ClientForm
            key={editing === "new" ? "new" : editing.id}
            client={editing === "new" ? null : editing}
            segments={Array.from(new Set([...segmentSuggestions, ...(clients ?? []).map((c) => c.segment)])).sort((a, b) => a.localeCompare(b, "pt-BR"))}
            cities={Array.from(new Set([...citySuggestions, ...(clients ?? []).map((c) => c.city)]))}
            onClose={() => setEditing(null)}
            onSaved={(client, created) => {
              setClients((list) => {
                const rest = (list ?? []).filter((x) => x.id !== client.id);
                return [...rest, client].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
              });
              setEditing(null);
              notify("ok", created ? `${client.name} foi cadastrado.` : `${client.name} foi atualizado.`);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className={`fixed bottom-6 left-1/2 z-[70] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-lift)] ${toast.kind === "ok" ? "bg-navy" : "bg-red-600"}`}
          >
            {toast.kind === "ok" ? <Check className="size-4" aria-hidden /> : <AlertTriangle className="size-4" aria-hidden />}
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold leading-none">{value}</p>
      <p className="mt-1 text-xs text-white/60">{label}</p>
    </div>
  );
}

function IconButton({ label, children, danger, ...props }: { label: string; danger?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" aria-label={label} title={label} {...props} className={`grid size-10 place-items-center rounded-full border border-line text-navy transition hover:border-current disabled:opacity-40 ${danger ? "hover:bg-red-50 hover:text-red-600" : "hover:bg-cyan-50 hover:text-brand"}`}>
      {children}
    </button>
  );
}

const inputCls = "w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-navy focus:border-cyan focus:outline-none focus:ring-4 focus:ring-cyan/15";

function ClientForm({ client, segments, cities, onClose, onSaved }: {
  client: AdminClient | null;
  segments: string[];
  cities: string[];
  onClose: () => void;
  onSaved: (c: AdminClient, created: boolean) => void;
}) {
  const [name, setName] = useState(client?.name ?? "");
  const [segment, setSegment] = useState(client?.segment ?? "");
  const [city, setCity] = useState(client?.city ?? "");
  const [published, setPublished] = useState(client?.published ?? true);
  const [consent, setConsent] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(client ? adminLogo(client) : null);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const hadConsent = Boolean(client?.consentAt);
  const needsConsent = published && !hadConsent;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  useEffect(() => () => { if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview); }, [preview]);

  async function pick(file: File | undefined) {
    if (!file) return;
    setErr(null);
    setProcessing(true);
    try {
      const small = await resizeLogo(file);
      setLogo(small);
      setRemoveLogo(false);
      setPreview(URL.createObjectURL(small));
    } catch (e) { setErr((e as Error).message); } finally { setProcessing(false); if (fileRef.current) fileRef.current.value = ""; }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (needsConsent && !consent) { setErr("Para publicar, confirme a autorização do cliente ou desmarque \"Mostrar no site\"."); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.set("name", name); fd.set("segment", segment); fd.set("city", city);
      fd.set("published", String(published)); fd.set("consent", String(consent));
      fd.set("removeLogo", String(removeLogo));
      if (logo) fd.set("logo", logo);
      const res = client
        ? await api<{ client: AdminClient }>(`/api/admin/clientes/${client.id}`, { method: "PUT", body: fd })
        : await api<{ client: AdminClient }>("/api/admin/clientes", { method: "POST", body: fd });
      onSaved(res.client, !client);
    } catch (e) { setErr((e as Error).message); } finally { setSaving(false); }
  }

  return (
    <motion.div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-cliente-titulo"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[1.75rem] bg-white p-6 shadow-[var(--shadow-lift)] sm:rounded-[1.75rem] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="form-cliente-titulo" className="text-2xl font-semibold text-navy-900">{client ? "Editar cliente" : "Novo cliente"}</h2>
          <button type="button" onClick={onClose} aria-label="Fechar" className="grid size-10 place-items-center rounded-full hover:bg-mist"><X className="size-5" /></button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_13rem]">
          <div className="space-y-4">
            <Field label="Nome da empresa" htmlFor="c-nome">
              <input id="c-nome" required minLength={2} maxLength={120} value={name} onChange={(e) => setName(e.target.value)} className={inputCls} autoFocus />
            </Field>
            <Field label="Segmento" htmlFor="c-seg">
              <input id="c-seg" required minLength={2} maxLength={60} list="segmentos" value={segment} onChange={(e) => setSegment(e.target.value)} placeholder="Ex.: Comércio" className={inputCls} />
              <datalist id="segmentos">{segments.map((s) => <option key={s} value={s} />)}</datalist>
            </Field>
            <Field label="Cidade" htmlFor="c-cid">
              <input id="c-cid" required minLength={2} maxLength={80} list="cidades" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex.: Campina Grande - PB" className={inputCls} />
              <datalist id="cidades">{cities.map((s) => <option key={s} value={s} />)}</datalist>
            </Field>
          </div>

          <div>
            <p className="mb-1.5 text-sm font-semibold text-navy">Logo</p>
            <button type="button" onClick={() => fileRef.current?.click()} className="group relative grid h-40 w-full place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-line bg-mist p-4 transition hover:border-cyan">
              {processing ? <Loader2 className="size-6 animate-spin text-brand" aria-label="Processando imagem" /> : preview ? (
                // eslint-disable-next-line @next/next/no-img-element -- prévia local
                <img src={preview} alt="Prévia da logo" className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="flex flex-col items-center gap-2 text-sm text-muted"><ImagePlus className="size-7 text-brand" aria-hidden />Escolher imagem</span>
              )}
            </button>
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="sr-only" tabIndex={-1} onChange={(e) => pick(e.target.files?.[0])} />
            <p className="mt-1.5 text-xs text-muted">PNG, JPG, WebP ou SVG. De preferência com fundo transparente.</p>
            {preview && (
              <button type="button" onClick={() => { setLogo(null); setPreview(null); setRemoveLogo(true); }} className="mt-1 text-xs font-medium text-red-600 hover:underline">Remover logo</button>
            )}
          </div>
        </div>

        <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-line p-4">
          <span>
            <span className="block font-semibold text-navy">Mostrar no site</span>
            <span className="text-sm text-muted">Desmarque para guardar o cadastro sem exibir no portfólio.</span>
          </span>
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="size-5 accent-[var(--color-cyan)]" />
        </label>

        {hadConsent ? (
          <p className="mt-4 flex items-start gap-2 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
            Autorização do cliente registrada em {fmtDate(client!.consentAt!)} por {client!.consentBy}.
          </p>
        ) : (
          <label className={`mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm ${needsConsent ? "border-amber-300 bg-amber-50 text-amber-900" : "border-line text-navy"}`}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[var(--color-cyan)]" />
            <span>
              <strong>LGPD:</strong> confirmo que o cliente autorizou, por escrito, a exibição do nome e da logo no site da C&T, e que a autorização está arquivada.
              {needsConsent && <span className="mt-1 block text-xs">Obrigatório para mostrar no site.</span>}
            </span>
          </label>
        )}

        {err && <p role="alert" className="mt-4 flex items-start gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-700"><AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />{err}</p>}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="btn btn-outline-dark">Cancelar</button>
          <button type="submit" disabled={saving || processing} className="btn btn-cyan disabled:opacity-60">
            {saving ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Check className="size-4" aria-hidden />}
            {client ? "Salvar alterações" : "Cadastrar cliente"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-navy">{label} <span className="text-cyan" aria-hidden>*</span></label>
      {children}
    </div>
  );
}
