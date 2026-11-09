import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Política de segurança de conteúdo. Ao adicionar ferramentas de terceiros
// (ex.: analytics após consentimento), inclua seus domínios aqui.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://tiles.openfreemap.org",
  "font-src 'self' data:",
  "connect-src 'self' https://tiles.openfreemap.org",
  "worker-src 'self' blob:",
  "child-src blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
        ],
      },
    ];
  },
  async redirects() {
    // Endereços do site antigo
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/sobre", destination: "/#empresa", permanent: true },
      { source: "/servicos", destination: "/#servicos", permanent: true },
      { source: "/unidades", destination: "/#unidades", permanent: true },
      { source: "/contato", destination: "/#contato", permanent: true },
      { source: "/eventos", destination: "/#instagram", permanent: true },
      { source: "/eventos/:path*", destination: "/#instagram", permanent: true },
      { source: "/baixe-o-app", destination: "/#empresa", permanent: true },
      { source: "/trabalhe-conosco", destination: "/#contato", permanent: false },
    ];
  },
};

export default nextConfig;
