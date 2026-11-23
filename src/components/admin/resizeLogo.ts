/**
 * Reduz a logo no navegador antes do envio: no máximo 800×400 px, em WebP
 * (com transparência) ou PNG quando o navegador não gera WebP. Arquivos SVG
 * também são aceitos e convertidos em imagem, o que elimina scripts embutidos.
 */
const MAX_W = 800;
const MAX_H = 400;
const MAX_BYTES = 380 * 1024;

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Não foi possível ler a imagem. Use PNG, JPG, WebP ou SVG."));
    img.src = url;
  });
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality?: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function resizeLogo(file: File): Promise<File> {
  if (!/^image\/(png|jpeg|webp|svg\+xml)$/.test(file.type)) throw new Error("Formato não aceito. Use PNG, JPG, WebP ou SVG.");
  if (file.size > 10 * 1024 * 1024) throw new Error("Arquivo muito grande (máximo de 10 MB).");
  const img = await loadImage(file);
  const w0 = img.naturalWidth || 600;
  const h0 = img.naturalHeight || 300;
  const scale = Math.min(1, MAX_W / w0, MAX_H / h0);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w0 * scale));
  canvas.height = Math.max(1, Math.round(h0 * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Seu navegador não conseguiu processar a imagem.");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(img.src);

  for (const q of [0.92, 0.85, 0.75, 0.6]) {
    const blob = await toBlob(canvas, "image/webp", q);
    if (blob && blob.type === "image/webp" && blob.size <= MAX_BYTES) return new File([blob], "logo.webp", { type: "image/webp" });
  }
  const png = await toBlob(canvas, "image/png");
  if (png && png.size <= MAX_BYTES) return new File([png], "logo.png", { type: "image/png" });
  throw new Error("Mesmo reduzida, a imagem ficou grande demais. Tente uma logo mais simples.");
}
