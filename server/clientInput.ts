/** Leitura e validação dos dados enviados pelo formulário do painel. */

export const MAX_LOGO_BYTES = 400 * 1024;
const LOGO_TYPES = ["image/webp", "image/png", "image/jpeg"];

export type ClientInput = {
  name: string;
  segment: string;
  city: string;
  published: boolean;
  consent: boolean;
  logo: { bytes: ArrayBuffer; type: string } | null;
  removeLogo: boolean;
};

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";

/** Confere a assinatura do arquivo, sem confiar só no tipo informado pelo navegador. */
function sniff(bytes: Uint8Array): string | null {
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP") return "image/webp";
  return null;
}

export async function readClientForm(request: Request): Promise<{ ok: true; data: ClientInput } | { ok: false; message: string }> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return { ok: false, message: "Envio inválido." };
  }

  const name = clean(form.get("name"), 120);
  const segment = clean(form.get("segment"), 60);
  const city = clean(form.get("city"), 80);
  if (name.length < 2) return { ok: false, message: "Informe o nome do cliente." };
  if (segment.length < 2) return { ok: false, message: "Informe o segmento." };
  if (city.length < 2) return { ok: false, message: "Informe a cidade." };

  let logo: ClientInput["logo"] = null;
  const file = form.get("logo");
  if (file && typeof file !== "string" && file.size > 0) {
    if (file.size > MAX_LOGO_BYTES) return { ok: false, message: "A logo deve ter no máximo 400 KB." };
    const bytes = await file.arrayBuffer();
    const type = sniff(new Uint8Array(bytes.slice(0, 12)));
    if (!type || !LOGO_TYPES.includes(type)) return { ok: false, message: "A logo deve ser PNG, JPG ou WebP." };
    logo = { bytes, type };
  }

  return {
    ok: true,
    data: {
      name,
      segment,
      city,
      published: form.get("published") === "true",
      consent: form.get("consent") === "true",
      logo,
      removeLogo: form.get("removeLogo") === "true",
    },
  };
}
