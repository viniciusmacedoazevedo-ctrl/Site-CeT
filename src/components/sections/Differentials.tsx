import { differentials } from "@/data/content";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

export function Differentials() {
  return (
    <section id="diferenciais" aria-labelledby="diferenciais-titulo" className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
      <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />
      <svg aria-hidden viewBox="0 0 800 400" className="absolute -right-40 top-10 w-[56rem] max-w-none opacity-40">
        <ellipse cx="400" cy="200" rx="390" ry="150" fill="none" stroke="#17AED2" strokeWidth="1.5" transform="rotate(-12 400 200)" />
        <ellipse cx="400" cy="200" rx="300" ry="100" fill="none" stroke="#ffffff" strokeOpacity="0.25" transform="rotate(-12 400 200)" />
      </svg>

      <div className="container-site relative grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            invert
            eyebrow="Diferenciais"
            id="diferenciais-titulo"
            title={<>Como trabalhamos para estar ao seu lado.</>}
            text="Uma assessoria que vai além das obrigações: organização, proximidade e informação para decidir com segurança."
          />
        </div>

        <ol className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-2">
          {differentials.map((d, i) => {
            const Icon = d.icon;
            return (
              <li key={d.title} className="bg-navy">
                <Reveal delay={i * 0.06} className="group h-full p-7 transition-colors duration-300 hover:bg-white/[0.04] sm:p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="size-7 text-cyan transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} aria-hidden />
                    <span className="font-display text-sm text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-xl !text-white">{d.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{d.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
