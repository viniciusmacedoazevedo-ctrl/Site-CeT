import type { LucideIcon } from "lucide-react";
import {
  BellRing, Building2, Eye, FileCheck2, FileLock2, GraduationCap, KeyRound, ListChecks, Lock, RefreshCcw,
  ScrollText, Server, ShieldCheck, Trash2, UserCheck, Users,
} from "lucide-react";

/**
 * Conteúdo da página LGPD.
 *
 * O site afirma que a C&T está EM CONFORMIDADE com a LGPD, sem citar certificação
 * (a ANPD não certifica empresas). PENDENTE: a C&T deve validar que cada medida
 * listada em `measures` é de fato adotada antes da publicação (docs/pendencias.md).
 */

export type Item = { title: string; text: string; icon: LucideIcon };

/** O que a conformidade significa para quem é cliente. */
export const clientBenefits: Item[] = [
  { icon: Lock, title: "Sigilo do início ao fim", text: "Documentos fiscais, folha de pagamento e dados bancários tratados com confidencialidade, como exige a profissão contábil." },
  { icon: ListChecks, title: "Só o necessário", text: "Pedimos e guardamos apenas os dados que o serviço e a legislação exigem, sempre com uma finalidade definida." },
  { icon: UserCheck, title: "Acesso controlado", text: "Cada informação é acessada apenas pela equipe responsável pelo seu atendimento." },
  { icon: Eye, title: "Transparência", text: "Você sabe quais dados tratamos, por quê e por quanto tempo, e tem um canal direto para exercer seus direitos." },
];

/** Medidas de proteção. PENDENTE: validar com a C&T. */
export const measures: Item[] = [
  { icon: FileCheck2, title: "Finalidade e necessidade", text: "Mapeamos os dados usados em cada serviço e coletamos somente o indispensável para prestar a assessoria e cumprir obrigações legais." },
  { icon: KeyRound, title: "Acesso restrito", text: "Permissões por área e por cliente, para que cada colaborador acesse apenas o que precisa no seu trabalho." },
  { icon: FileLock2, title: "Sigilo profissional", text: "O sigilo é dever do profissional da contabilidade pelo Código de Ética (NBC PG 01) e é reforçado em contrato com a equipe." },
  { icon: Server, title: "Segurança da informação", text: "Medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, perdas e vazamentos (art. 46 da LGPD)." },
  { icon: Building2, title: "Fornecedores avaliados", text: "Sistemas e serviços que tratam dados em nosso nome são escolhidos com critério e se comprometem com a proteção desses dados." },
  { icon: Trash2, title: "Guarda e descarte", text: "Documentos guardados pelos prazos legais (fiscais, trabalhistas e previdenciários) e descartados de forma segura depois disso." },
  { icon: BellRing, title: "Resposta a incidentes", text: "Procedimento para avaliar qualquer incidente e comunicar a ANPD e os titulares quando houver risco relevante (art. 48)." },
  { icon: GraduationCap, title: "Equipe orientada", text: "Colaboradores orientados sobre proteção de dados e boas práticas no dia a dia do escritório." },
];

/** Direitos do titular (art. 18 da LGPD). */
export const rights: string[] = [
  "Confirmar se tratamos seus dados",
  "Acessar os seus dados",
  "Corrigir dados incompletos, inexatos ou desatualizados",
  "Pedir anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos",
  "Pedir a portabilidade a outro fornecedor",
  "Saber com quem compartilhamos seus dados",
  "Revogar o consentimento, quando ele for a base do tratamento",
  "Se opor a um tratamento feito sem o seu consentimento, quando irregular",
];

/** Papéis na LGPD — relevante para empresas clientes que têm funcionários. */
export const roles: Item[] = [
  { icon: ShieldCheck, title: "C&T como controladora", text: "Para os dados de quem nos contata e dos responsáveis pelas empresas clientes, a C&T decide como tratar os dados e responde por eles." },
  { icon: Users, title: "C&T como operadora", text: "Nos serviços de folha de pagamento e obrigações trabalhistas, tratamos os dados dos seus colaboradores em seu nome, seguindo as suas instruções e a lei." },
  { icon: ScrollText, title: "Bases legais", text: "Na contabilidade, o tratamento se apoia principalmente no cumprimento de obrigação legal, na execução do contrato e no exercício regular de direitos (art. 7º)." },
  { icon: RefreshCcw, title: "Melhoria contínua", text: "Nossas práticas são revisadas à medida que a legislação, as orientações da ANPD e os nossos serviços evoluem." },
];
