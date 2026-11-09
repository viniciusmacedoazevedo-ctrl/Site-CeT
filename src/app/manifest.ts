import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "C&T Consultores e Associados",
    short_name: "C&T",
    description: "Contabilidade em Campina Grande e João Pessoa - PB",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#075a91",
    lang: "pt-BR",
    icons: [
      { src: "/images/branding/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/branding/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
