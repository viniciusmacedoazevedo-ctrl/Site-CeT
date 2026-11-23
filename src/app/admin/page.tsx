import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "Área administrativa",
  robots: { index: false, follow: false },
};

/** Painel de cadastro de clientes do portfólio. Protegido pelo Cloudflare Access (docs/area-administrativa.md). */
export default function AdminPage() {
  return (
    <>
      <section className="bg-navy-950 pb-12 pt-32 text-white lg:pt-36">
        <div className="container-site max-w-5xl">
          <p className="kicker text-cyan-300">Área administrativa</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Portfólio de clientes</h1>
          <p className="mt-2 max-w-2xl text-white/65">Cadastre, edite, oculte ou exclua os clientes exibidos na página <a href="/clientes" className="text-cyan-300 underline">Clientes</a>. As mudanças aparecem no site em até 1 minuto.</p>
        </div>
      </section>
      <section className="min-h-[60vh] bg-mist pb-24 pt-10">
        <div className="container-site max-w-5xl"><AdminPanel /></div>
      </section>
    </>
  );
}
