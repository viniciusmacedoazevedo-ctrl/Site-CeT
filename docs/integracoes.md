# Integrações

## 1. Formulários (contato e LGPD) — Web3Forms, gratuito

O site é estático, então os formulários enviam direto do navegador para o Web3Forms, que
repassa a mensagem para o e-mail da C&T. Plano gratuito: 250 envios por mês.

1. Acesse https://web3forms.com, informe o e-mail que vai receber as mensagens
   (ex.: contato@cetconsultores.com.br) e clique em "Create Access Key".
2. A chave chega por e-mail. Coloque-a na variável `NEXT_PUBLIC_WEB3FORMS_KEY`, no painel do
   Cloudflare Pages ou num arquivo `.env.local` para testes.
3. Faça um novo deploy.

A Access Key é pública por natureza: ela só permite enviar mensagens para o e-mail
cadastrado. Validação, campo isca e tempo mínimo de preenchimento acontecem no navegador, e
o Web3Forms aplica o filtro de spam dele. Sem a chave, o site avisa o visitante de que o
envio não está ativo e oferece telefone e WhatsApp. Nenhum envio é simulado.

Alternativa também gratuita: FormSubmit (formsubmit.co).

## 2. Mapas 3D

- MapLibre GL JS 5 (código aberto) + estilo "positron" do OpenFreeMap, recolorido com a paleta da C&T.
- Prédios em 3D extrudados a partir da altura cadastrada no OpenStreetMap. A cobertura em
  Campina Grande e João Pessoa é parcial: só aparecem prédios que existem na base, nada é inventado.
- Gratuito e sem chave de API. Para usar outro estilo, defina `NEXT_PUBLIC_MAP_STYLE_URL` e
  adicione o domínio dele em `connect-src` e `img-src` no `public/_headers`.
- O mapa só é carregado quando a seção de unidades se aproxima da tela.

## 3. Instagram

A seção mostra publicações institucionais reais (eventos do site antigo), editáveis em
`src/data/content.ts` → `moments`. Para exibir automaticamente os posts mais recentes:

1. Converter o perfil @cetconsultores em conta profissional vinculada a uma Página do Facebook.
2. Criar um app na Meta for Developers com a Instagram Graph API.
3. Como o site é estático, a busca dos posts precisa de um backend que guarde o token em
   segredo, como um Cloudflare Worker (plano gratuito). Nunca coloque o token no navegador.
4. Adicionar `*.cdninstagram.com` em `img-src` no `public/_headers`.

Opção sem nenhuma integração: atualizar manualmente a lista `moments`.

## 4. Assistente virtual Cláu

O widget (`src/components/chat/ChatWidget.tsx`) conversa com um `ChatProvider`
(`src/components/chat/engine.ts`). Hoje é usado o `scriptedProvider`: respostas automáticas
no próprio navegador, sem IA e sem envio de dados.

Para integrar uma IA:

1. Criar um backend que guarde a chave da IA em segredo, como um Cloudflare Worker (plano gratuito).
2. Implementar um `ChatProvider` cujo `reply()` chame esse backend.
3. Passar o novo provider ao widget: `<ChatWidget provider={aiProvider} />` em `src/app/layout.tsx`.
4. Atualizar a Política de Privacidade (as mensagens passarão a ser enviadas ao servidor).

## 5. Cookies e analytics

Nenhuma ferramenta de análise ou marketing está instalada. Para adicionar uma (ex.: Google
Analytics), envolva o script em `<ConsentGate category="analytics">` (`src/components/privacy/ConsentProvider.tsx`),
inclua o domínio na CSP do `public/_headers` e atualize a tabela da Política de Cookies.
