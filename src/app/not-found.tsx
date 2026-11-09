import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center pb-20 pt-40">
      <div className="container-site max-w-xl text-center">
        <p className="eyebrow justify-center">Erro 404</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Página não encontrada</h1>
        <p className="mt-4 text-muted">O endereço pode ter mudado. Volte para o início ou fale com a nossa equipe.</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/" arrow>Ir para o início</ButtonLink>
          <ButtonLink href="/#contato" variant="ghost">Contato</ButtonLink>
        </div>
      </div>
    </section>
  );
}
