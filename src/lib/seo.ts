import { company, SITE_URL, socialLinks } from "@/data/company";
import { services } from "@/data/services";
import { units } from "@/data/units";

/** Dados estruturados (schema.org) para SEO local das duas unidades. */
export function organizationJsonLd() {
  const sameAs = socialLinks.filter((s) => s.network !== "whatsapp").map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organizacao`,
        name: company.name,
        legalName: company.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/images/branding/logo-cet.png`,
        foundingDate: String(company.foundingYear),
        sameAs,
        subOrganization: units.map((u) => ({ "@id": `${SITE_URL}/#unidade-${u.id}` })),
      },
      ...units.map((u) => ({
        "@type": "AccountingService",
        "@id": `${SITE_URL}/#unidade-${u.id}`,
        name: `${company.name} — ${u.city}`,
        parentOrganization: { "@id": `${SITE_URL}/#organizacao` },
        url: `${SITE_URL}/#unidades`,
        image: `${SITE_URL}${u.photos[0].src}`,
        telephone: u.phones[0].tel,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${u.street}, ${u.number}`,
          addressLocality: u.city,
          addressRegion: u.state,
          postalCode: u.postalCode,
          addressCountry: "BR",
        },
        geo: { "@type": "GeoCoordinates", latitude: u.coordinates[1], longitude: u.coordinates[0] },
        areaServed: [u.city, "Paraíba"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços contábeis",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, url: `${SITE_URL}/servicos/${s.slug}` },
          })),
        },
      })),
    ],
  };
}
