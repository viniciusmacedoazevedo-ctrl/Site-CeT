# Site institucional — C&T Consultores e Associados

Novo site da C&T Consultores e Associados Ltda., escritório de contabilidade com unidades em
Campina Grande e João Pessoa (PB).

## Tecnologias

| Camada | Escolha |
|---|---|
| Framework | Next.js 15 (App Router, exportação estática) + React 19 + TypeScript |
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
  lib/           Validação, envio de formulários (Web3Forms) e SEO (schema.org)
public/images/   branding, partners, units, events
public/_headers, public/_redirects   Segurança e redirecionamentos na hospedagem
public/referencias/  Logo original enviada pelo cliente
docs/            Levantamento do site antigo, pendências e integrações
```

**Para editar textos, telefones, links ou serviços, altere apenas os arquivos em `src/data/`.**

## Executar localmente

Requisitos: Node.js 20 ou superior. O código está na branch `claude/bold-planck-pytlap`:

```bash
git fetch origin && git checkout claude/bold-planck-pytlap
```

```bash
npm install
```

```bash
npm run dev
```

Acesse http://localhost:3000.

## Publicar de graça (Cloudflare Pages)

O site é **100% estático**: `npm run build` gera a pasta `out/`, sem servidor. O Cloudflare
Pages hospeda de graça, com uso comercial permitido, HTTPS automático, banda ilimitada e
domínio próprio.

1. Crie uma conta gratuita em https://dash.cloudflare.com → Workers & Pages → Create → Pages →
   Connect to Git e escolha este repositório.
2. Configuração de build:
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Variáveis de ambiente: `NEXT_PUBLIC_WEB3FORMS_KEY`, `NEXT_PUBLIC_SITE_URL` e `NODE_VERSION=20`
3. Em Custom domains, adicione `www.cetconsultores.com.br` e siga as instruções de DNS.

Os arquivos `public/_headers` (cabeçalhos de segurança) e `public/_redirects` (endereços do
site antigo) são aplicados automaticamente pelo Cloudflare Pages e também pelo Netlify.
Alternativas gratuitas: Netlify (plano Free) ou GitHub Pages; o GitHub Pages ignora
`_headers` e `_redirects`.

Antes de publicar:

- Crie a Access Key gratuita dos formulários (`docs/integracoes.md`). Sem ela, o site avisa o
  visitante de que o envio on-line não está ativo e oferece telefone e WhatsApp.
- Resolva as pendências de `docs/pendencias.md` e peça a revisão jurídica das políticas.

## Custos

| Item | Solução | Custo |
|---|---|---|
| Hospedagem | Cloudflare Pages (site estático) | Gratuito |
| Formulários | Web3Forms (250 envios/mês no plano grátis) | Gratuito |
| Mapas 3D | MapLibre + OpenFreeMap, sem chave de API | Gratuito |
| Fontes e ícones | Fraunces, Manrope e Lucide (licenças livres, servidas pelo próprio site) | Gratuito |
| Assistente Cláu | Respostas automáticas no navegador | Gratuito |
| Instagram | Publicações cadastradas em `src/data/content.ts` | Gratuito |
| Domínio `cetconsultores.com.br` | Já registrado pela C&T | Renovação anual no Registro.br, que a empresa já paga hoje |

O único custo que continua existindo é a renovação do domínio, que a C&T já tem. Se quiser
custo absolutamente zero, o site funciona no endereço gratuito `*.pages.dev` do Cloudflare.

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
