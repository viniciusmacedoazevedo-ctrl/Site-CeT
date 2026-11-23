import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="surface-dark relative grid min-h-[80vh] place-items-center overflow-hidden pb-20 pt-40">
      <div aria-hidden className="hairline-grid absolute inset-0 [mask-image:radial-gradient(ellipse,black,transparent_70%)]" />
      <div className="container-site relative max-w-xl text-center">
        <p className="font-display text-8xl font-semibold text-cyan/80">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Página não encontrada</h1>
        <p className="mt-4 text-white/65">O endereço pode ter mudado. Volte para o início ou fale com a nossa equipe.</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/" arrow>Ir para o início</ButtonLink>
          <ButtonLink href="/contato" variant="outline-light">Contato</ButtonLink>
        </div>
      </div>
    </section>
  );
}
