import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { instagramProfile } from "@/data/company";
import { moments } from "@/data/content";
import { Reveal, SectionHeading } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/SocialIcon";

const fmt = new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric", timeZone: "UTC" });

/**
 * Publicações institucionais administráveis em src/data/content.ts.
 * Integração automática com o Instagram depende da API oficial da Meta
 * (ver docs/integracoes.md).
 */
export function Instagram() {
  return (
    <section id="instagram" aria-labelledby="instagram-titulo" className="bg-mist py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Instagram"
            id="instagram-titulo"
            title={<>Momentos que contam a nossa história.</>}
            text="Datas comemorativas, ações sociais e a rotina de quem faz a C&T acontecer."
          />
          <a
            href={instagramProfile.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-line bg-white py-2 pl-2 pr-5 text-sm font-semibold text-navy transition hover:border-navy md:self-auto"
          >
            <span className="grid size-9 place-items-center rounded-full bg-[conic-gradient(from_200deg,#17AED2,#075A91,#102A43,#17AED2)] text-white">
              <SocialIcon network="instagram" className="size-4" />
            </span>
            Seguir {instagramProfile.handle}
            <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {moments.map((m, i) => (
            <li key={m.title}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <a
                  href={instagramProfile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-full overflow-hidden rounded-2xl bg-white"
                  aria-label={`${m.title} — ver no Instagram (abre em nova aba)`}
                >
                  <Image
                    src={m.image}
                    alt=""
                    width={720}
                    height={720}
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="aspect-square size-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/90 via-navy/20 to-transparent p-4 opacity-100 transition duration-500 sm:p-5 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan-100">{fmt.format(new Date(m.date))}</p>
                    <p className="mt-1 font-display text-base text-white sm:text-lg">{m.title}</p>
                    <p className="mt-1 hidden text-xs leading-relaxed text-white/80 sm:line-clamp-2">{m.caption}</p>
                  </div>
                  <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition group-hover:opacity-100">
                    <SocialIcon network="instagram" className="size-4" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
