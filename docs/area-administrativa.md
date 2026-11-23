# Área administrativa e portfólio de clientes

O painel fica em **/admin** e alimenta a página pública **/clientes** e a faixa de logos da
página inicial. Tudo roda no plano gratuito da Cloudflare:

| Peça | O que faz |
|---|---|
| Pages Functions (`functions/`) | A API do portfólio (`/api/clientes` e `/api/admin/...`) |
| D1 (banco de dados) | Guarda nome, segmento, cidade, logo e o registro da autorização de cada cliente |
| Cloudflare Access (Zero Trust) | Login do painel por código enviado ao e-mail, só para e-mails autorizados |

A tabela do banco é criada sozinha na primeira chamada, não é preciso rodar SQL.

## Configuração (uma vez só)

Faça na conta Cloudflare onde o site está publicado (veja "Publicar" no README).

### 1. Criar o banco de dados
1. Painel da Cloudflare → **Storage & Databases → D1 SQL Database → Create**.
2. Nome: `cet-portfolio`. Clique em **Create**.

### 2. Ligar o banco ao site
1. **Workers & Pages** → projeto do site → **Settings → Bindings → Add → D1 database**.
2. Variable name: `DB` (exatamente assim). Database: `cet-portfolio`. Salve.

### 3. Criar o login do painel (Cloudflare Access)
1. No painel, abra **Zero Trust**. Na primeira vez, escolha um nome de equipe (ex.: `cetconsultores`)
   e o plano **Free** (até 50 usuários, sem custo).
2. **Access → Applications → Add an application → Self-hosted**.
3. Application name: `Painel C&T`. Session duration: `24 hours`.
4. Em **Destinations / Application domain**, adicione dois caminhos para cada domínio do site
   (o domínio próprio e o `*.pages.dev`):
   - `www.cetconsultores.com.br` com caminho `admin`
   - `www.cetconsultores.com.br` com caminho `api/admin`
5. Crie uma **Policy**: Action `Allow`, regra **Include → Emails** com os e-mails de quem pode
   cadastrar clientes. O método de login padrão (**One-time PIN**, código por e-mail) já serve.
6. Salve. Na tela da aplicação, copie o **Application Audience (AUD) Tag**.
7. Anote o domínio da equipe, em **Settings → Custom Pages / Team domain**
   (ex.: `cetconsultores.cloudflareaccess.com`).

### 4. Informar o login ao site
1. **Workers & Pages** → projeto → **Settings → Variables and Secrets → Add** (ambiente Production):
   - `CF_ACCESS_TEAM_DOMAIN` = `cetconsultores.cloudflareaccess.com`
   - `CF_ACCESS_AUD` = a AUD Tag copiada
2. Faça um novo deploy (**Deployments → Retry deployment**).

### 5. Testar
Abra `https://www.cetconsultores.com.br/admin`, informe um e-mail autorizado e digite o código
recebido. Cadastre um cliente e confira em `/clientes`.

## Como usar o painel
- **Novo cliente**: nome, segmento, cidade e logo (PNG, JPG, WebP ou SVG). A logo é reduzida
  automaticamente antes do envio.
- **Mostrar no site**: só é possível depois de marcar que o cliente **autorizou por escrito** a
  exibição do nome e da logo. A data e o e-mail de quem registrou ficam salvos. Guarde a
  autorização assinada (e-mail ou documento) nos arquivos da C&T.
- **Ocultar** (ícone de olho) tira o cliente do site sem apagar o cadastro.
- **Excluir** apaga o cadastro e a logo de forma definitiva. Use quando o cliente revogar a autorização.
- O site atualiza em até 1 minuto.
- Para dar ou tirar acesso de alguém, edite a lista de e-mails da Policy no Zero Trust.

## Segurança
- Sem `CF_ACCESS_TEAM_DOMAIN` e `CF_ACCESS_AUD`, o painel fica **bloqueado** (nunca aberto por padrão).
- Cada chamada do painel confere a assinatura do login do Cloudflare Access, a validade e o aplicativo.
- Alterações exigem um cabeçalho que só o próprio painel envia (proteção contra CSRF).
- Logos são conferidas pelo conteúdo do arquivo (não só pela extensão) e servidas sem permissão de script.
- Clientes ocultos não aparecem na API pública, nem as logos deles.

## Testar no computador
O `npm run dev` não roda a API. Para ver o portfólio e o painel funcionando:

```bash
cp .dev.vars.example .dev.vars
```

```bash
npm run preview
```

Abra http://localhost:8788. O arquivo `.dev.vars` libera o painel sem login **apenas em localhost**,
com um banco de testes local (pasta `.wrangler/`, fora do Git). Nunca crie a variável
`ADMIN_DEV_BYPASS` na Cloudflare.
