# Informações que precisam ser confirmadas pela C&T

Nada abaixo foi inventado. Onde faltava informação, o site usa um campo destacado ou um
texto neutro. Os arquivos indicados ficam em `src/data/`.

## Obrigatórias antes da publicação

| Item | Situação | Onde editar |
|---|---|---|
| CNPJ | Não publicado no site antigo | `company.ts` → `cnpj` |
| Endereço da sede/matriz (controlador LGPD) | Não informado | `politica-de-privacidade/page.tsx` |
| Encarregado de dados (DPO) e e-mail de privacidade | Não informado | `company.ts` → `privacyEmail` e a política |
| E-mail institucional | O site antigo não publica e-mail | `company.ts` → `email` |
| Destino dos formulários | Precisa de e-mail ou webhook | `.env` (veja `docs/integracoes.md`) |
| Prazos de retenção dos dados | Sugestão de 12 meses para contatos | Política de Privacidade |
| Fornecedores (hospedagem, e-mail) | A definir | Política de Privacidade |
| Revisão jurídica das políticas | Obrigatória | — |

## Conferir

| Item | Observação |
|---|---|
| **CEP de Campina Grande** | O briefing informa 58108-590, mas os CEPs de Campina Grande começam em 584xx. O OpenStreetMap indica 58416-221 / 58400-515 para a rua. Confirmar. |
| CEP de João Pessoa | 58030-080 (briefing). O OpenStreetMap indica 58030-060 e 58030-330 para trechos da avenida. Confirmar. |
| Coordenadas das unidades | Derivadas do mapa do site antigo e ajustadas sobre a rua. Conferir a posição do marcador no mapa 3D (`units.ts` → `coordinates`). Os botões "Como chegar" e "Abrir no Google Maps" usam o endereço por extenso, não as coordenadas. |
| WhatsApp | Só existe um número no site antigo: (83) 99168-2550. Confirmar se atende as duas unidades ou preencher `whatsapp` em cada unidade (`units.ts`). |
| Redes sociais | Links copiados do rodapé do site antigo (`company.ts` → `socialLinks`). Confirmar se ainda estão ativos. |
| Imposto de Renda | O site antigo dizia "Pessoa Física" na home e "Pessoa Jurídica" na página de serviços. O novo site segue o briefing (Pessoa Física). Se a C&T atender os dois, incluir um 13º serviço. |
| Números do site antigo | "+80 profissionais", "+400 clientes" e "26 anos" **não** foram usados (estão desatualizados). Informar os números atuais se quiser exibi-los. |
| Frase "A empresa contábil mais premiada da Paraíba" | Não usada, por ser uma afirmação comparativa. Usar somente com comprovação. |
| Diferenciais | São temas do briefing descritos de forma qualitativa. Validar a redação. |
| Texto "A Empresa" | Texto provisório. Missão, visão e valores vieram do site antigo. |
| Parceiros | C&T Digital, GETRA e Toledo Publicidade, com as logos originais. Os links são do site antigo; o da Toledo aponta para `agenciasstoledo.com.br`. |

## Materiais desejáveis

- Fotos atuais em alta resolução das fachadas, recepções e equipe (as atuais são de 2023).
- Certificados e prêmios em boa resolução: os do site antigo têm 240×160 px e não foram usados.
- Logos dos parceiros em SVG ou PNG de alta resolução (a da Toledo tem 265×90 px).
- Versão vetorial (SVG/PDF) da logo C&T.
