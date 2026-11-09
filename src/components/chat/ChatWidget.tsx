"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { ClauAvatar } from "./ClauAvatar";
import { scriptedProvider, type ChatAction, type ChatMessage, type ChatProvider } from "./engine";

const INTRO_KEY = "cet_clau_intro_dismissed";

export function ChatWidget({ provider = scriptedProvider }: { provider?: ChatProvider }) {
  const [open, setOpen] = useState(false);
  const [intro, setIntro] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const reduce = useReducedMotion();

  // Balão de apresentação (uma vez por sessão).
  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(INTRO_KEY) === "1"; } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setIntro(true), 2600);
    return () => clearTimeout(t);
  }, []);

  const dismissIntro = () => {
    setIntro(false);
    try { sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
  };

  useEffect(() => {
    if (open && messages.length === 0) setMessages(provider.greet());
    if (open) {
      dismissIntro();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); buttonRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || typing) return;
    const userMsg: ChatMessage = { id: `u${Date.now()}`, from: "user", text: clean };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setTyping(true);
    try {
      const replies = await provider.reply(clean, history);
      setMessages((m) => [...m, ...replies]);
    } finally {
      setTyping(false);
    }
  }

  function run(action: ChatAction) {
    if (action.type === "reply") return send(action.text);
    if (action.type === "scroll") {
      setOpen(false);
      if (location.pathname !== "/") router.push(`/#${action.target}`);
      else document.getElementById(action.target)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      return;
    }
    if (action.external || /^(tel:|mailto:)/.test(action.href)) {
      if (action.href.startsWith("tel:")) location.href = action.href;
      else window.open(action.href, "_blank", "noopener,noreferrer");
      return;
    }
    setOpen(false);
    router.push(action.href);
  }

  const lastBot = [...messages].reverse().find((m) => m.from === "bot");

  return (
    <div className="chat-root fixed bottom-4 right-4 z-[60] flex flex-col items-end sm:bottom-6 sm:right-6">
      {/* Janela de conversa */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Conversa com a Cláu, assistente virtual"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="mb-3 flex h-[min(36rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-navy-900 shadow-[0_30px_80px_-24px_rgb(16_42_67/0.45)] sm:w-[23rem]"
          >
            <div className="relative flex items-center gap-3 border-b border-white/10 bg-navy-950 px-5 py-4 text-white">
              <div aria-hidden className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_90%_0%,#17aed2,transparent_55%)]" />
              <div className="relative">
                <ClauAvatar className="size-11 rounded-full ring-2 ring-white/80" title="" />
                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-navy-950 bg-emerald-400" />
              </div>
              <div className="relative flex-1">
                <p className="font-display text-lg font-semibold leading-tight">Cláu</p>
                <p className="text-xs text-white/55">Assistente virtual · respostas automáticas</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="relative grid size-9 place-items-center rounded-full hover:bg-white/10" aria-label="Fechar conversa">
                <X className="size-5" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(120%_60%_at_100%_0%,rgb(23_174_210/0.12),transparent_60%)] px-4 py-5" aria-live="polite">
              {messages.map((m) => (
                <motion.div key={m.id} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={m.from === "user" ? "flex justify-end" : "flex items-end gap-2"}>
                  {m.from === "bot" && <ClauAvatar className="size-7 shrink-0 rounded-full" title="" />}
                  <div className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "rounded-br-md bg-cyan text-white" : "rounded-bl-md border border-white/10 bg-white/[0.06] text-white/85"}`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {lastBot?.quickReplies && !typing && (
                <div className="flex flex-wrap gap-2 pl-9">
                  {lastBot.quickReplies.map((q) => (
                    <button key={q.label} type="button" onClick={() => run(q.action)} className="rounded-full border border-cyan/50 bg-cyan/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 transition hover:-translate-y-0.5 hover:bg-cyan hover:text-white">
                      {q.label}
                    </button>
                  ))}
                </div>
              )}
              {typing && (
                <div className="flex items-end gap-2" aria-label="Cláu está digitando">
                  <ClauAvatar className="size-7 shrink-0 rounded-full" title="" />
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="size-1.5 rounded-full bg-cyan" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-white/10 bg-navy-950 p-3">
              <label htmlFor="clau-input" className="sr-only">Digite sua mensagem</label>
              <input
                id="clau-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={300}
                autoComplete="off"
                placeholder="Digite sua dúvida…"
                className="flex-1 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-cyan focus:outline-none"
              />
              <button type="submit" disabled={!input.trim() || typing} className="grid size-10 place-items-center rounded-full bg-cyan text-white transition hover:bg-cyan-600 disabled:opacity-40" aria-label="Enviar mensagem">
                <SendHorizontal className="size-4" />
              </button>
            </form>
            <p className="bg-navy-950 px-4 pb-3 text-center text-[0.65rem] text-white/40">Não compartilhe dados sensíveis nesta conversa.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Balão de apresentação */}
      <AnimatePresence>
        {intro && !open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ transformOrigin: "bottom right" }}
            className="relative mb-4 mr-1 w-[18rem] rounded-2xl border border-cyan/50 bg-navy-950/95 p-4 pr-9 text-white shadow-[0_0_0_1px_rgb(23_174_210/0.15),0_24px_60px_-20px_rgb(0_0_0/0.7),0_0_40px_-10px_rgb(23_174_210/0.5)] backdrop-blur-xl"
            role="status"
          >
            <button type="button" onClick={dismissIntro} className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-navy" aria-label="Fechar apresentação da Cláu">
              <X className="size-4" />
            </button>
            <div className="flex gap-3">
              <motion.div animate={reduce ? undefined : { rotate: [0, -6, 6, 0] }} transition={{ duration: 1.2, delay: 0.4 }}>
                <ClauAvatar className="size-14 shrink-0 rounded-full ring-2 ring-cyan/60" />
              </motion.div>
              <button type="button" onClick={() => setOpen(true)} className="text-left text-sm leading-snug text-white/75">
                <span className="font-display font-semibold text-white">Olá, eu sou a Cláu!</span> Estou aqui para te ajudar. Fale com um de nossos consultores!
              </button>
            </div>
            {/* Seta */}
            <span aria-hidden className="absolute -bottom-[8px] right-6 size-4 rotate-45 border-b border-r border-cyan/50 bg-navy-950" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão flutuante */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Fechar conversa com a Cláu" : "Abrir conversa com a Cláu, assistente virtual"}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative grid size-16 place-items-center rounded-full bg-[linear-gradient(160deg,#3cc6e6,#17aed2_50%,#0f93b4)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_14px_30px_-8px_rgb(23_174_210/0.9)] ring-4 ring-white/10"
      >
        {!open && !reduce && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-cyan/40 [animation-duration:2.6s]" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "x" : "chat"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
            {open ? <X className="size-7" /> : <MessageCircle className="size-7" strokeWidth={2} />}
          </motion.span>
        </AnimatePresence>
        {!open && (
          <span aria-hidden className="absolute -left-1 -top-1 rounded-full ring-2 ring-white">
            <ClauAvatar className="size-6 rounded-full" title="" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
