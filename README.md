# Site institucional — C&T Consultores e Associados

Novo site da C&T Consultores e Associados Ltda., escritório de contabilidade com unidades em
Campina Grande e João Pessoa (PB).

## Tecnologias

| Camada | Escolha |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Estilo | Tailwind CSS 4, tokens de marca em `src/app/globals.css` |
| Animações | Framer Motion (respeita "reduzir movimento") |
| Ícones | Lucide + ícones de redes sociais próprios (`SocialIcon`) |
| Fontes | Fraunces (títulos) e Manrope (texto), servidas pelo próprio site via Fontsource |
| Mapas 3D | MapLibre GL JS 5 + tiles vetoriais do OpenFreeMap (dados OpenStreetMap), sem chave de API |

## Estrutura

```
src/
  app/
    page.tsx                    Página inicial (todas as seções)
    servicos/[slug]/page.tsx    Página de cada um dos 12 serviços
    politica-de-privacidade/    Política de Privacidade (LGPD)
    politica-de-cookies/        Política de Cookies
    direitos-do-titular/        Formulário de direitos do titular (art. 18 LGPD)
    api/contato/route.ts        Recebe o formulário de contato (validação no servidor)
    api/privacidade/route.ts    Recebe solicitações de titulares
    sitemap.ts, robots.ts, manifest.ts, opengraph-image.png, icon.png
  components/
    layout/      Header, Footer
    sections/    Hero, About, Services, Differentials, Partners, Instagram,
                 Locations, UsefulLinks, Contact
    locations/   UnitMap (mapa 3D)
    chat/        ChatWidget, ClauAvatar, engine (motor de conversa da Cláu)
    privacy/     ConsentProvider, CookieBanner
    forms/       Campos acessíveis e formulário LGPD
    legal/       Layout das páginas legais
    ui/          Logo, botões, títulos de seção, animação de entrada
  data/          TODO o conteúdo editável: empresa, unidades, serviços, links, parceiros
  lib/           Validação compartilhada, SEO (schema.org), infraestrutura de formulários
public/images/   branding, partners, units, events
public/referencias/  Logo original enviada pelo cliente
docs/            Levantamento do site antigo, pendências e integrações
```

**Para editar textos, telefones, links ou serviços, altere apenas os arquivos em `src/data/`.**

## Executar localmente

Requisitos: Node.js 20 ou superior.

```bash
npm install
```

```bash
npm run dev
```

Acesse http://localhost:3000. Para testar a versão de produção:

```bash
npm run build && npm run start
```

## Publicar

O site precisa de um servidor Node.js por causa dos formulários (rotas `/api`). Opções:

1. **Vercel** (recomendado): importe o repositório do GitHub em vercel.com, configure as
   variáveis de ambiente (veja `.env.example`) e aponte o domínio `cetconsultores.com.br`.
   O plano gratuito (Hobby) é para uso não comercial; para empresa, use o plano Pro.
2. **Qualquer hospedagem Node** (VPS, Render, Railway, cPanel com Node): `npm run build`
   e `npm run start` atrás de HTTPS.

Antes de publicar:

- Defina `NEXT_PUBLIC_SITE_URL` com o domínio final.
- Configure o envio dos formulários (`docs/integracoes.md`). Sem isso, o site avisa o
  visitante de que o envio on-line não está ativo e oferece telefone e WhatsApp.
- Resolva as pendências de `docs/pendencias.md` e peça a revisão jurídica das políticas.
- Os endereços antigos (`/sobre`, `/servicos`, `/contato` etc.) já redirecionam para as
  novas seções (`next.config.ts`).

## Custos externos previstos

| Item | Custo |
|---|---|
| Mapas (MapLibre + OpenFreeMap) | Gratuito, sem chave e sem limite contratual. É um serviço comunitário sem SLA; para garantia contratual, troque `NEXT_PUBLIC_MAP_STYLE_URL` por um provedor pago (ex.: MapTiler, a partir de ~US$ 25/mês). |
| Hospedagem | Vercel Pro ~US$ 20/mês por membro, ou VPS a partir de ~R$ 30/mês. |
| E-mail dos formulários (Resend) | Gratuito até 3.000 e-mails/mês. Alternativa: webhook para um sistema próprio. |
| Domínio `.com.br` | ~R$ 40/ano (Registro.br), já pertencente ao cliente. |
| Instagram automático (opcional) | API oficial da Meta, gratuita, mas exige app e token renovável. |

## Qualidade

```bash
npm run lint
```

```bash
npx tsc --noEmit
```

Testado em Chromium (desktop 1440 px e iPhone 13): sem erros no console, sem rolagem
horizontal, menu móvel, Cláu, banner de cookies, validação do formulário e mapas 3D das duas
unidades funcionando.
