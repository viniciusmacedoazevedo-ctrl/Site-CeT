import type { NextConfig } from "next";

/**
 * Site 100% estático (pasta `out/`), hospedável gratuitamente no
 * Cloudflare Pages, Netlify ou GitHub Pages.
 * Cabeçalhos de segurança: public/_headers. Redirecionamentos: public/_redirects.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  poweredByHeader: false,
  // As imagens já são entregues otimizadas em WebP; não há servidor de imagens no modo estático.
  images: { unoptimized: true },
};

export default nextConfig;
