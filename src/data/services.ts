import type { LucideIcon } from "lucide-react";
import {
  BadgePercent,
  BookOpenCheck,
  Building2,
  Calculator,
  FileSearch,
  FileText,
  Gavel,
  HandCoins,
  Landmark,
  LineChart,
  Scale,
  Users,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  /** Frase curta usada nos cartões. */
  summary: string;
  /** Texto de abertura da página do serviço. */
  intro: string;
  /** Principais frentes de trabalho. */
  scope: string[];
  /** Perfil de cliente a quem o serviço normalmente se destina. */
  audience: string;
  category: "Rotina" | "Gestão" | "Estratégia";
  seoDescription: string;
};

/**
 * Os 12 serviços publicados pela C&T. As descrições partem dos textos do
 * site atual e foram ampliadas sem prometer resultados.
 */
export const services: Service[] = [
  {
    slug: "assessoria-fiscal",
    title: "Assessoria Fiscal",
    icon: FileText,
    category: "Rotina",
    summary:
      "Levantamento e acompanhamento dos registros fiscais e dos tributos municipais, estaduais e federais da sua empresa.",
    intro:
      "Mantemos a rotina fiscal da sua empresa organizada, com acompanhamento dos registros e das obrigações perante os fiscos municipal, estadual e federal.",
    scope: [
      "Levantamento dos registros fiscais e dos tributos incidentes sobre a atividade",
      "Apuração de impostos e acompanhamento do calendário de obrigações acessórias",
      "Escrituração fiscal e envio de declarações aos órgãos competentes",
      "Orientação sobre emissão de notas fiscais e enquadramento de operações",
    ],
    audience:
      "Empresas de todos os portes que precisam de segurança no cumprimento das obrigações fiscais.",
    seoDescription:
      "Assessoria fiscal em Campina Grande e João Pessoa: apuração de tributos, obrigações acessórias e acompanhamento fiscal com a C&T Consultores.",
  },
  {
    slug: "assessoria-contabil",
    title: "Assessoria Contábil",
    icon: BookOpenCheck,
    category: "Rotina",
    summary:
      "Serviços de contabilidade sob medida para as necessidades e o momento da sua empresa.",
    intro:
      "Cuidamos da contabilidade da sua empresa de acordo com as suas necessidades, transformando registros em informação útil para a gestão.",
    scope: [
      "Escrituração contábil e conciliação de contas",
      "Elaboração de balancetes e demonstrações contábeis",
      "Atendimento às exigências legais e societárias",
      "Relatórios gerenciais para apoiar a tomada de decisão",
    ],
    audience:
      "Empresas que buscam uma contabilidade organizada, próxima e alinhada à realidade do negócio.",
    seoDescription:
      "Escritório de contabilidade em Campina Grande e João Pessoa - PB. Assessoria contábil completa com a C&T Consultores e Associados.",
  },
  {
    slug: "assessoria-trabalhista-e-previdenciaria",
    title: "Assessoria Trabalhista e Previdenciária",
    icon: Users,
    category: "Rotina",
    summary:
      "Orientação para aplicar a legislação trabalhista e previdenciária de forma eficiente e preventiva.",
    intro:
      "Orientamos sua empresa na aplicação da legislação trabalhista e previdenciária, com foco em prevenção e na correta gestão das rotinas de pessoal.",
    scope: [
      "Rotinas de admissão, folha de pagamento, férias e rescisões",
      "Envio de informações ao eSocial e ao FGTS Digital",
      "Cálculo e apuração de encargos trabalhistas e previdenciários",
      "Orientação preventiva sobre obrigações e convenções coletivas",
    ],
    audience:
      "Empresas com colaboradores que desejam reduzir riscos e manter as rotinas de pessoal em dia.",
    seoDescription:
      "Assessoria trabalhista e previdenciária na Paraíba: folha de pagamento, eSocial, FGTS Digital e orientação preventiva com a C&T Consultores.",
  },
  {
    slug: "imposto-de-renda-pessoa-fisica",
    title: "Imposto de Renda Pessoa Física",
    icon: Calculator,
    category: "Rotina",
    summary:
      "Apoio na organização de documentos e na elaboração da declaração anual de Imposto de Renda.",
    intro:
      "Auxiliamos você em todas as etapas da declaração de Imposto de Renda, da organização dos documentos à transmissão para a Receita Federal.",
    scope: [
      "Conferência de informes de rendimentos, bens, direitos e dívidas",
      "Análise das deduções permitidas pela legislação",
      "Escolha do modelo de declaração mais adequado ao seu caso",
      "Transmissão da declaração e acompanhamento de pendências",
    ],
    audience:
      "Pessoas físicas, profissionais liberais e sócios de empresas obrigados a declarar.",
    seoDescription:
      "Declaração de Imposto de Renda Pessoa Física em Campina Grande e João Pessoa com apoio especializado da C&T Consultores.",
  },
  {
    slug: "analise-de-custos",
    title: "Análise de Custos",
    icon: LineChart,
    category: "Gestão",
    summary:
      "Leitura dos custos da empresa para apoiar a precificação e o posicionamento no mercado.",
    intro:
      "Analisamos a estrutura de custos da sua empresa para que você tenha informações confiáveis na hora de precificar produtos e serviços e de definir como se posicionar no mercado.",
    scope: [
      "Mapeamento de custos fixos, variáveis, diretos e indiretos",
      "Cálculo de margem de contribuição e ponto de equilíbrio",
      "Apoio à formação de preço de venda",
      "Relatórios comparativos para acompanhamento periódico",
    ],
    audience:
      "Empresas que querem entender a própria estrutura de custos para tomar decisões com mais segurança.",
    seoDescription:
      "Análise de custos e formação de preço para empresas na Paraíba com a C&T Consultores e Associados.",
  },
  {
    slug: "auditoria",
    title: "Auditoria",
    icon: FileSearch,
    category: "Gestão",
    summary:
      "Verificação da aderência das demonstrações contábeis à situação econômica, patrimonial e financeira.",
    intro:
      "Verificamos se as demonstrações contábeis da sua empresa refletem adequadamente a sua situação econômica, patrimonial e financeira.",
    scope: [
      "Exame de demonstrações contábeis e registros de suporte",
      "Avaliação de controles internos e procedimentos",
      "Identificação de inconsistências e pontos de melhoria",
      "Relatório com constatações e recomendações",
    ],
    audience:
      "Empresas, sócios e investidores que precisam de informações contábeis confiáveis.",
    seoDescription:
      "Auditoria contábil e revisão de demonstrações financeiras na Paraíba com a C&T Consultores e Associados.",
  },
  {
    slug: "consultorias-financeiras-e-gerenciais",
    title: "Consultorias Financeiras e/ou Gerenciais",
    icon: HandCoins,
    category: "Gestão",
    summary:
      "Boas práticas financeiras e gerenciais para organizar e fortalecer a gestão do seu negócio.",
    intro:
      "Apoiamos a adoção de boas práticas financeiras e gerenciais, para que a gestão do seu negócio conte com informações claras e processos bem definidos.",
    scope: [
      "Organização do fluxo de caixa e da rotina financeira",
      "Indicadores gerenciais e acompanhamento de desempenho",
      "Apoio ao planejamento orçamentário",
      "Leitura dos números para decisões de investimento e crescimento",
    ],
    audience:
      "Empreendedores e gestores que desejam profissionalizar a gestão financeira.",
    seoDescription:
      "Consultoria financeira e gerencial para empresas em Campina Grande e João Pessoa com a C&T Consultores.",
  },
  {
    slug: "defesa-de-autos-de-infracao",
    title: "Defesa de Autos de Infração",
    icon: Gavel,
    category: "Estratégia",
    summary:
      "Elaboração de estratégias de defesa técnica para autos de infração recebidos pela empresa.",
    intro:
      "Quando a sua empresa recebe um auto de infração, analisamos o caso e estruturamos a defesa técnica dentro dos prazos e instâncias cabíveis.",
    scope: [
      "Análise técnica do auto de infração e da documentação",
      "Levantamento de fundamentos e provas",
      "Elaboração de impugnações e recursos administrativos",
      "Acompanhamento do processo junto ao órgão autuante",
    ],
    audience:
      "Empresas autuadas por órgãos fiscais que precisam de uma defesa técnica fundamentada.",
    seoDescription:
      "Defesa de autos de infração fiscais na Paraíba: análise técnica, impugnação e recursos com a C&T Consultores.",
  },
  {
    slug: "projetos-de-incentivo-fiscal",
    title: "Projetos de Incentivo Fiscal",
    icon: BadgePercent,
    category: "Estratégia",
    summary:
      "Estruturação de projetos para enquadramento em programas e leis de incentivo fiscal.",
    intro:
      "Ajudamos sua empresa a estruturar projetos que possam ser enquadrados em programas e leis de incentivo fiscal, observando os requisitos de cada legislação.",
    scope: [
      "Identificação de programas de incentivo aplicáveis à atividade",
      "Levantamento de requisitos e documentação",
      "Elaboração e acompanhamento do projeto",
      "Controle das contrapartidas e obrigações após a concessão",
    ],
    audience:
      "Empresas em expansão ou implantação que podem se beneficiar de programas de incentivo.",
    seoDescription:
      "Projetos de incentivo fiscal para empresas na Paraíba com a C&T Consultores e Associados.",
  },
  {
    slug: "projetos-de-financiamento",
    title: "Projetos de Financiamento",
    icon: Landmark,
    category: "Estratégia",
    summary:
      "Construção de projetos de financiamento adequados às necessidades da sua empresa.",
    intro:
      "Assessoramos sua empresa na construção de projetos de financiamento que se adequem da melhor forma possível às suas necessidades.",
    scope: [
      "Diagnóstico da necessidade de recursos",
      "Organização das informações contábeis e financeiras exigidas",
      "Elaboração do projeto e das projeções",
      "Apoio no relacionamento com instituições financeiras",
    ],
    audience:
      "Empresas que planejam investir, expandir ou reorganizar seu capital.",
    seoDescription:
      "Elaboração de projetos de financiamento para empresas em Campina Grande e João Pessoa com a C&T Consultores.",
  },
  {
    slug: "legalizacao-empresarial",
    title: "Legalização Empresarial",
    icon: Building2,
    category: "Rotina",
    summary:
      "Abertura, alteração e regularização de empresas junto aos órgãos competentes.",
    intro:
      "Cuidamos da legalização da sua empresa, da abertura às alterações contratuais. Uma empresa regular tem mais condições de acessar crédito e oportunidades junto a instituições financeiras.",
    scope: [
      "Abertura, alteração e baixa de empresas",
      "Registros na Junta Comercial (JUCEP) e na REDESIM",
      "Inscrições municipais, estaduais e federais",
      "Alvarás, licenças e regularização cadastral",
    ],
    audience:
      "Quem vai abrir um negócio ou precisa regularizar ou alterar uma empresa existente.",
    seoDescription:
      "Abertura e legalização de empresas na Paraíba: JUCEP, REDESIM, inscrições e alvarás com a C&T Consultores.",
  },
  {
    slug: "planejamento-tributario",
    title: "Planejamento Tributário",
    icon: Scale,
    category: "Estratégia",
    summary:
      "Análise do regime tributário mais adequado para buscar uma carga fiscal justa, dentro da lei.",
    intro:
      "O planejamento tributário busca reduzir a carga fiscal de forma lícita. Analisamos a sua operação para definir o regime tributário mais adequado e o valor mais justo de tributos a pagar.",
    scope: [
      "Comparativo entre Simples Nacional, Lucro Presumido e Lucro Real",
      "Simulações com base na operação e no faturamento da empresa",
      "Avaliação de impactos de mudanças na legislação tributária",
      "Revisão periódica do enquadramento",
    ],
    audience:
      "Empresas que querem entender e otimizar sua carga tributária dentro da legalidade.",
    seoDescription:
      "Planejamento tributário em Campina Grande e João Pessoa: escolha do regime tributário ideal com a C&T Consultores e Associados.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
