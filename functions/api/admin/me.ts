import type { AdminData, Env } from "../../../server/types";
import { json } from "../../../server/http";

/** GET /api/admin/me — quem está logado no painel. */
export const onRequestGet: PagesFunction<Env, string, AdminData> = async ({ data }) => json({ email: data.email });
