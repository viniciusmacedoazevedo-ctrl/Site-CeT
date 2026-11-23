/** Variáveis e bindings disponíveis nas Pages Functions (configurados no painel da Cloudflare). */
export interface Env {
  /** Banco D1 com o cadastro de clientes do portfólio. */
  DB: D1Database;
  /** Domínio da equipe no Cloudflare Zero Trust, ex.: "cetconsultores.cloudflareaccess.com". */
  CF_ACCESS_TEAM_DOMAIN?: string;
  /** "Application Audience (AUD) Tag" do aplicativo do Cloudflare Access que protege /admin. */
  CF_ACCESS_AUD?: string;
  /** Somente para testes no computador (arquivo .dev.vars): libera o painel em localhost sem login. */
  ADMIN_DEV_BYPASS?: string;
}

export type AdminData = { email: string };
