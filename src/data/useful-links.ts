export type UsefulLink = {
  name: string;
  description: string;
  href: string;
};

export type LinkCategory = {
  id: string;
  title: string;
  description: string;
  links: UsefulLink[];
};

/**
 * Central de Links Úteis — somente portais oficiais.
 * Endereços verificados em nov/2026. Revisar periodicamente.
 */
export const linkCategories: LinkCategory[] = [
  {
    id: "federal",
    title: "Receita Federal e serviços federais",
    description: "Tributos, declarações e obrigações federais.",
    links: [
      { name: "Receita Federal", description: "Portal oficial com orientações, legislação e notícias.", href: "https://www.gov.br/receitafederal/pt-br" },
      { name: "Serviços Digitais da Receita", description: "CPF, CNPJ, certidões, parcelamentos e mais.", href: "https://servicos.receitafederal.gov.br/" },
      { name: "Simples Nacional", description: "Apuração (PGDAS-D), opção e consultas do regime.", href: "https://www8.receita.fazenda.gov.br/SimplesNacional/" },
      { name: "eSocial", description: "Escrituração das obrigações trabalhistas e previdenciárias.", href: "https://www.gov.br/esocial" },
      { name: "FGTS Digital", description: "Recolhimento e gestão do FGTS pelo empregador.", href: "https://www.gov.br/trabalho-e-emprego/pt-br/servicos/empregador/fgtsdigital" },
      { name: "Portal Nacional da NFS-e", description: "Emissão e consulta da Nota Fiscal de Serviço eletrônica.", href: "https://www.gov.br/nfse" },
      { name: "SPED", description: "Sistema Público de Escrituração Digital.", href: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/sped-sistema-publico-de-escrituracao-digital" },
    ],
  },
  {
    id: "contabeis",
    title: "Órgãos contábeis",
    description: "Conselhos que regulamentam a profissão.",
    links: [
      { name: "Conselho Federal de Contabilidade", description: "Normas, legislação e serviços ao profissional contábil.", href: "https://cfc.org.br/" },
      { name: "CRC-PB", description: "Conselho Regional de Contabilidade da Paraíba.", href: "https://crcpb.org.br/" },
    ],
  },
  {
    id: "estaduais",
    title: "Órgãos estaduais da Paraíba",
    description: "ICMS, registro empresarial e licenciamento.",
    links: [
      { name: "SEFAZ-PB", description: "Secretaria de Estado da Fazenda da Paraíba.", href: "https://sefaz.pb.gov.br/" },
      { name: "SEFAZ Virtual", description: "Serviços on-line da Receita Estadual da Paraíba.", href: "https://portal.sefaz.pb.gov.br/servirtual" },
      { name: "JUCEP", description: "Junta Comercial do Estado da Paraíba.", href: "https://jucep.pb.gov.br/jucep" },
      { name: "REDESIM Paraíba", description: "Abertura, alteração e baixa de empresas integradas.", href: "https://www.redesim.pb.gov.br/home/" },
    ],
  },
  {
    id: "municipais",
    title: "Serviços municipais",
    description: "ISS, notas fiscais de serviço e tributos municipais.",
    links: [
      { name: "Prefeitura de Campina Grande", description: "Portal oficial do município.", href: "https://campinagrande.pb.gov.br/" },
      { name: "NFS-e Campina Grande", description: "Emissão de notas fiscais de serviço do município.", href: "https://campinagrandepb.webiss.com.br/" },
      { name: "Prefeitura de João Pessoa", description: "Portal oficial do município.", href: "https://www.joaopessoa.pb.gov.br/" },
      { name: "Portal do Contribuinte — JP", description: "Serviços tributários da Prefeitura de João Pessoa.", href: "https://receita.joaopessoa.pb.gov.br/portal-serem" },
    ],
  },
  {
    id: "apoio",
    title: "Apoio empresarial",
    description: "Capacitação e orientação para empreendedores.",
    links: [
      { name: "SEBRAE", description: "Cursos, consultorias e conteúdos para pequenos negócios.", href: "https://sebrae.com.br/" },
    ],
  },
];

/** Atalhos exibidos no rodapé. */
export const footerLinks: UsefulLink[] = [
  linkCategories[0].links[0],
  linkCategories[2].links[0],
  linkCategories[2].links[2],
  linkCategories[1].links[1],
  linkCategories[1].links[0],
  linkCategories[0].links[2],
].map((l) => ({ ...l, name: l.name === "Conselho Federal de Contabilidade" ? "CFC" : l.name }));
