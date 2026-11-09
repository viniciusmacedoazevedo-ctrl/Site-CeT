import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({ url: `${SITE_URL}/servicos/${s.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/politica-de-cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/direitos-do-titular`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
