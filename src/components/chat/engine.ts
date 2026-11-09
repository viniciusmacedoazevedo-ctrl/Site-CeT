/**
 * Motor de conversa da Cláu.
 *
 * Arquitetura preparada para IA: o widget conversa com um `ChatProvider`.
 * Hoje usamos o `scriptedProvider` (respostas automáticas, sem IA e sem
 * envio de dados a terceiros). Para integrar um atendimento inteligente,
 * implemente um provider que chame uma rota do servidor (ex.: /api/chat),
 * que por sua vez acessa o modelo de IA com a chave guardada no servidor.
 */

import { services } from "@/data/services";
import { units } from "@/data/units";
import { mainWhatsApp, whatsappLink } from "@/data/company";

export type ChatAction =
  | { type: "scroll"; target: string }
  | { type: "link"; href: string; external?: boolean }
  | { type: "reply"; text: string };

export type QuickReply = { label: string; action: ChatAction };

export type ChatMessage = {
  id: string;
  from: "bot" | "user";
  text: string;
  quickReplies?: QuickReply[];
};

export interface ChatProvider {
  greet(): ChatMessage[];
  reply(input: string, history: ChatMessage[]): Promise<ChatMessage[]>;
}

let seq = 0;
const id = () => `m${Date.now().toString(36)}${(seq++).toString(36)}`;
const bot = (text: string, quickReplies?: QuickReply[]): ChatMessage => ({ id: id(), from: "bot", text, quickReplies });

export const mainMenu: QuickReply[] = [
  { label: "Conhecer serviços", action: { type: "reply", text: "Conhecer serviços" } },
  { label: "Nossas unidades", action: { type: "reply", text: "Nossas unidades" } },
  { label: "Links úteis", action: { type: "reply", text: "Links úteis" } },
  { label: "Falar com um consultor", action: { type: "reply", text: "Falar com um consultor" } },
];

const consultantReplies: QuickReply[] = [
  { label: "WhatsApp", action: { type: "link", href: whatsappLink(mainWhatsApp.number, "Olá! Vim pelo site da C&T e gostaria de falar com um consultor."), external: true } },
  ...units.map((u) => ({ label: `Ligar — ${u.city}`, action: { type: "link" as const, href: `tel:${u.phones[0].tel}` } })),
  { label: "Enviar mensagem", action: { type: "scroll", target: "contato" } },
];

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

type Rule = { test: RegExp; respond: (input: string) => ChatMessage[] };

const rules: Rule[] = [
  {
    test: /consultor|atendente|humano|falar com|whats|telefone|ligar|contato/,
    respond: () => [bot("Claro! Escolha o canal que preferir para falar com um de nossos consultores:", consultantReplies)],
  },
  {
    test: /unidade|endereco|onde fica|localiza|mapa|campina|joao pessoa|rota|chegar/,
    respond: () => [
      bot(
        units.map((u) => `${u.city}: ${u.street}, ${u.number} — ${u.district}. Tel. ${u.phones.map((p) => p.display).join(" / ")}`).join("\n\n"),
        [{ label: "Ver mapas 3D", action: { type: "scroll", target: "unidades" } }, { label: "Falar com um consultor", action: { type: "reply", text: "Falar com um consultor" } }],
      ),
    ],
  },
  {
    test: /link|portal|receita|sefaz|jucep|simples|esocial|nfs|nota fiscal|crc|cfc|sebrae|prefeitura/,
    respond: () => [
      bot("Reunimos os principais portais oficiais (Receita Federal, SEFAZ-PB, JUCEP, prefeituras e mais) na nossa Central de Links Úteis.", [
        { label: "Abrir Central de Links", action: { type: "scroll", target: "links-uteis" } },
      ]),
    ],
  },
  {
    test: /servico|o que voces fazem|ajuda com|contab|fiscal|imposto|tribut|folha|trabalhist|auditoria|abrir empresa|abertura|legaliza|custo|financ|incentivo|infrac/,
    respond: (input) => {
      const n = norm(input);
      const match = services.find((s) => norm(s.title).split(/\s+/).some((w) => w.length > 5 && n.includes(w.slice(0, 6))));
      if (match) {
        return [
          bot(`${match.title}: ${match.summary}`, [
            { label: "Saiba mais", action: { type: "link", href: `/servicos/${match.slug}` } },
            { label: "Falar com um consultor", action: { type: "reply", text: "Falar com um consultor" } },
          ]),
        ];
      }
      return [
        bot(`Atuamos em ${services.length} frentes. Algumas das mais procuradas:`, [
          ...services.slice(0, 4).map((s) => ({ label: s.title, action: { type: "link" as const, href: `/servicos/${s.slug}` } })),
          { label: "Ver todos os serviços", action: { type: "scroll", target: "servicos" } },
        ]),
      ];
    },
  },
  {
    test: /^(oi|ola|bom dia|boa tarde|boa noite|e ai|hey)/,
    respond: () => [bot("Olá! 😊 Como posso te ajudar hoje?", mainMenu)],
  },
  {
    test: /obrigad|valeu|agradec/,
    respond: () => [bot("Eu que agradeço! Se precisar, é só chamar.", mainMenu)],
  },
];

export const scriptedProvider: ChatProvider = {
  greet: () => [
    bot("Olá, eu sou a Cláu! Estou aqui para te ajudar. 👋"),
    bot("Sobre o que você gostaria de saber?", mainMenu),
  ],
  async reply(input) {
    const n = norm(input);
    const rule = rules.find((r) => r.test.test(n));
    await new Promise((r) => setTimeout(r, 450 + Math.random() * 350));
    if (rule) return rule.respond(input);
    return [
      bot("Ainda estou aprendendo e não sei responder isso. Um de nossos consultores pode te ajudar:", [
        ...consultantReplies.slice(0, 1),
        { label: "Ver opções", action: { type: "reply", text: "Falar com um consultor" } },
      ]),
    ];
  },
};
