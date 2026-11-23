/** Cliente do portfólio, como devolvido por /api/clientes. */
export type PortfolioClient = { id: string; name: string; segment: string; city: string; logo: string | null };

export type AdminClient = PortfolioClient & {
  published: boolean;
  consentAt: string | null;
  consentBy: string | null;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
};

export type LoadState<T> = { status: "loading" } | { status: "ready"; data: T } | { status: "error"; message: string };

/**
 * Busca os clientes publicados. Em `npm run dev` não há API (as funções só rodam na
 * Cloudflare ou com `npm run preview`), então o resultado é tratado como indisponível.
 */
export async function fetchPortfolio(signal?: AbortSignal): Promise<PortfolioClient[]> {
  const res = await fetch("/api/clientes", { signal, headers: { Accept: "application/json" } });
  if (!res.ok || !res.headers.get("Content-Type")?.includes("application/json")) throw new Error("Portfólio indisponível no momento.");
  const body = (await res.json()) as { clients: PortfolioClient[] };
  return body.clients;
}

export const segmentSuggestions = [
  "Agronegócio", "Alimentação", "Comércio", "Construção civil", "Educação", "Indústria",
  "Saúde", "Serviços", "Tecnologia", "Terceiro setor", "Transporte e logística",
];

export const citySuggestions = ["Campina Grande - PB", "João Pessoa - PB"];
