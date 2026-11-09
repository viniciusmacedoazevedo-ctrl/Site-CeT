# Integrações

## 1. Formulários (contato e LGPD) — pendente de configuração

As rotas `/api/contato` e `/api/privacidade` validam os dados no servidor, aplicam proteção
anti-spam (campo isca, tempo mínimo de preenchimento, limite de 5 envios a cada 10 minutos por IP,
verificação de origem) e entregam a mensagem por **um** destes meios:

**Opção A — e-mail via Resend** (resend.com):

```
RESEND_API_KEY=re_...
FORMS_TO_EMAIL=contato@cetconsultores.com.br
FORMS_FROM_EMAIL=Site C&T <site@cetconsultores.com.br>
```

O domínio do remetente precisa ser verificado no Resend (registros DNS).

**Opção B — webhook** (CRM, Zapier, n8n, sistema próprio):

```
FORMS_WEBHOOK_URL=https://...
FORMS_WEBHOOK_SECRET=um-segredo-longo
```

O site envia `POST` com JSON `{ kind, subject, fields, receivedAt }` e o cabeçalho `X-Webhook-Secret`.

Sem nenhuma das opções, a API responde 503 e o site informa o visitante de que o envio não
está ativo, oferecendo telefone e WhatsApp. Nenhum envio é simulado.

Com o site hospedado em várias instâncias, substitua o limite em memória
(`src/lib/server/forms.ts`) por um armazenamento compartilhado (ex.: Upstash Redis). Para
reforçar a proteção contra robôs, é possível adicionar o Cloudflare Turnstile (gratuito).

## 2. Mapas 3D

- MapLibre GL JS 5 (código aberto) + estilo "positron" do OpenFreeMap, recolorido com a paleta da C&T.
- Prédios em 3D extrudados a partir da altura cadastrada no OpenStreetMap. A cobertura em
  Campina Grande e João Pessoa é parcial: só aparecem prédios que existem na base, nada é inventado.
- Não exige chave de API. Para usar outro provedor, defina `NEXT_PUBLIC_MAP_STYLE_URL` e
  adicione o domínio dele em `connect-src` e `img-src` no `next.config.ts`.
- O mapa só é carregado quando a seção de unidades se aproxima da tela.

## 3. Instagram

A seção mostra publicações institucionais reais (eventos do site antigo), editáveis em
`src/data/content.ts` → `moments`. Para exibir automaticamente os posts mais recentes:

1. Converter o perfil @cetconsultores em conta profissional vinculada a uma Página do Facebook.
2. Criar um app na Meta for Developers com a Instagram Graph API.
3. Guardar o token **no servidor** (`INSTAGRAM_TOKEN`) e criar uma rota que busque os posts com cache.
4. Adicionar `*.cdninstagram.com` em `img-src` no `next.config.ts`.

## 4. Assistente virtual Cláu

O widget (`src/components/chat/ChatWidget.tsx`) conversa com um `ChatProvider`
(`src/components/chat/engine.ts`). Hoje é usado o `scriptedProvider`: respostas automáticas
no próprio navegador, sem IA e sem envio de dados.

Para integrar uma IA:

1. Criar a rota `src/app/api/chat/route.ts`, que chama o modelo com a chave guardada no servidor.
2. Implementar um `ChatProvider` cujo `reply()` faça `fetch("/api/chat")`.
3. Passar o novo provider ao widget: `<ChatWidget provider={aiProvider} />` em `src/app/layout.tsx`.
4. Atualizar a Política de Privacidade (as mensagens passarão a ser enviadas ao servidor).

## 5. Cookies e analytics

Nenhuma ferramenta de análise ou marketing está instalada. Para adicionar uma (ex.: Google
Analytics), envolva o script em `<ConsentGate category="analytics">` (`src/components/privacy/ConsentProvider.tsx`),
inclua o domínio na CSP do `next.config.ts` e atualize a tabela da Política de Cookies.
