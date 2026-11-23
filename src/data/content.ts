import type { LucideIcon } from "lucide-react";
import { Compass, Headset, Layers, LineChart, ShieldCheck, Workflow } from "lucide-react";

export type Partner = { name: string; description: string; href: string; logo: string; width: number; height: number };

/** Parceiros e logos originais publicados no site atual. */
export const partners: Partner[] = [
  { name: "C&T Digital", description: "Tecnologia e soluções digitais", href: "http://www.cetdigital.com.br/", logo: "/images/partners/cet-digital.webp", width: 389, height: 150 },
  { name: "GETRA", description: "Gestão em Segurança do Trabalho", href: "https://getra.com.br/", logo: "/images/partners/getra.webp", width: 800, height: 279 },
  { name: "Toledo Publicidade", description: "Comunicação e publicidade", href: "https://www.agenciasstoledo.com.br/", logo: "/images/partners/toledo-publicidade.webp", width: 265, height: 90 },
];

export type Differential = { title: string; text: string; icon: LucideIcon };

/**
 * Temas de diferenciais sugeridos no briefing. Textos descritivos,
 * sem afirmações quantitativas. Validar com a empresa.
 */
export const differentials: Differential[] = [
  { title: "Atendimento especializado", icon: Headset, text: "Equipes dedicadas por área — contábil, fiscal, pessoal, financeiro e legalização — para que cada demanda chegue a quem entende do assunto." },
  { title: "Soluções integradas", icon: Layers, text: "Contabilidade, tributos, pessoal e gestão tratados de forma conectada, com uma visão única da sua empresa." },
  { title: "Assessoria empresarial", icon: Compass, text: "Mais do que cumprir obrigações: orientação para estruturar, regularizar e fazer o negócio crescer." },
  { title: "Organização e planejamento", icon: Workflow, text: "Calendário de obrigações, rotinas definidas e comunicação clara, inclusive pelo App C&T." },
  { title: "Acompanhamento contábil", icon: ShieldCheck, text: "Registros acompanhados de perto, com atenção às mudanças da legislação que afetam a sua operação." },
  { title: "Apoio à tomada de decisões", icon: LineChart, text: "Números traduzidos em informação gerencial para decisões de preço, investimento e expansão." },
];

export type Moment = { title: string; date: string; image: string; caption: string };

/**
 * Publicações institucionais reais (eventos do site atual). Para exibir as
 * postagens mais recentes do Instagram automaticamente, ver docs/integracoes.md.
 */
export const moments: Moment[] = [
  { title: "Arraiá da C&T", date: "2023-06-06", image: "/images/events/arraia-da-cet.webp", caption: "Que o São João chegue renovando nossos corações e os enchendo de paz, alegria, força e esperança!" },
  { title: "Dia do Contador", date: "2023-06-02", image: "/images/events/dia-do-contador.webp", caption: "Brindes e um momento de relaxamento e bem-estar com a prática do Yoga para os colaboradores." },
  { title: "Dia da Mulher", date: "2023-05-30", image: "/images/events/dia-da-mulher.webp", caption: "Toda a admiração para elas que, sem perder o encanto, são a maior força do mundo." },
  { title: "Confraternização C&T", date: "2022-12-31", image: "/images/events/confraternizacao-2022.webp", caption: "O importante é mantermos o espírito de união e a sintonia para continuarmos indo longe." },
  { title: "Conexão C&T 2.0", date: "2022-03-24", image: "/images/events/conexao-cet-2.webp", caption: "Tema “Vida Saudável”: doações para o IPESQ, a FAP e o IPCCAN." },
  { title: "Conexão C&T 1.0", date: "2021-06-22", image: "/images/events/conexao-cet-1.webp", caption: "Quase 2 toneladas de alimentos arrecadadas e doadas a instituições de caridade." },
];

export const contactSectors = [
  "Administrativo",
  "Contábil",
  "Financeiro",
  "Fiscal",
  "Legalização Comercial",
  "Pessoal",
] as const;

export type NavChild = { href: string; label: string; description?: string };
export type NavItem = { href: string; label: string; children?: NavChild[]; mega?: "services" };

export const navItems: NavItem[] = [
  { href: "/", label: "Início" },
  {
    href: "/sobre",
    label: "A C&T",
    children: [
      { href: "/sobre", label: "Quem somos", description: "História, missão, visão e valores" },
      { href: "/sobre#diferenciais", label: "Diferenciais", description: "Como trabalhamos ao seu lado" },
      { href: "/sobre#parceiros", label: "Parceiros", description: "Empresas que caminham com a C&T" },
      { href: "/sobre#momentos", label: "Momentos", description: "Eventos, ações sociais e Instagram" },
    ],
  },
  { href: "/servicos", label: "Serviços", mega: "services" },
  { href: "/unidades", label: "Unidades" },
  { href: "/links-uteis", label: "Links Úteis" },
  { href: "/contato", label: "Contato" },
];

export const serviceGroups = [
  { id: "Rotina", title: "Rotina empresarial", description: "Contabilidade, tributos e pessoal em dia." },
  { id: "Gestão", title: "Gestão e controle", description: "Informação confiável para gerir melhor." },
  { id: "Estratégia", title: "Estratégia e projetos", description: "Decisões, projetos e defesa técnica." },
] as const;
