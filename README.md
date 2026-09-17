# Ramos Store

Catálogo online de camisas de time (single-seller, B2C, Brasil). Sem checkout online: o
carrinho vira um Order Request e uma mensagem pré-preenchida de WhatsApp — veja
[CONTEXT.md](./CONTEXT.md) e [docs/adr/](./docs/adr/) para o domínio e as decisões de arquitetura.

Stack: Next.js + TypeScript, Payload CMS 3 (embutido no mesmo app Next), Postgres, MUI +
SASS Modules. Detalhes em [ADR-0002](./docs/adr/0002-payload-embedded-in-nextjs-on-vercel.md)
e [ADR-0003](./docs/adr/0003-mui-with-sass-modules-for-bespoke-ui.md).

## Setup local

1. `cp .env.example .env` e preencha:
   - `DATABASE_URL`: uma connection string Postgres. Duas opções:
     - **Docker**: `docker compose up -d postgres`, então use
       `postgres://postgres:postgres@127.0.0.1:5432/ramos-store` (já é o valor padrão).
     - **Neon**: crie um projeto em [neon.tech](https://neon.tech) e cole a connection string
       fornecida.
   - `PAYLOAD_SECRET`: qualquer string aleatória (já vem preenchida para dev).
   - `NEXT_PUBLIC_SELLER_WHATSAPP_NUMBER`: número do vendedor em E.164 sem "+" (ex:
     `5531999999999`). Usado para montar o link de "Completar pedido".
   - `BLOB_READ_WRITE_TOKEN`: deixe em branco em dev — uploads de imagem caem para disco local.
     Só é necessário em produção na Vercel (ver ADR-0002).
2. `npm install`
3. `npm run dev`
4. Acesse `http://localhost:3000/admin` para criar o primeiro usuário admin, e
   `http://localhost:3000` para a loja.

## Coleções (Payload)

- **Users**: autenticação do admin (só o vendedor, sem contas de cliente).
- **Media**: imagens das Jerseys.
- **Clubs**: nome + `league` (Serie A, Premier League, etc.) — ver [CONTEXT.md](./CONTEXT.md#language).
- **Jerseys**: catálogo — Club, Fit Line, edição, temporada, tamanhos, preço, imagens.
- **OrderRequests** (`order-requests`): snapshot do Cart + status (Pending → Contacted →
  Completed/Cancelled). Criado publicamente pelo storefront ao completar um pedido; só o
  admin lê/atualiza.

## Estrutura do frontend

- `/` — home
- `/catalogo` — catálogo filtrável por Club, Fit Line e League, e busca por texto, tudo via
  query params na mesma rota (ver ADR de filtragem discutido na sessão de grilling).
- `/jerseys/[id]` — página de produto, escolha de tamanho/quantidade.
- `/carrinho` — carrinho (estado client-side/localStorage), cria o Order Request e
  redireciona para o WhatsApp do vendedor.

## Notas de implementação pendentes

- As páginas ainda estão com um layout funcional básico (MUI default) — o próximo passo é
  uma passada de design visual (plugin `frontend-design`) na home, catálogo e PDP.
- Sem Docker/Postgres local disponível neste ambiente, o build/dev ainda não foi validado
  ponta a ponta contra um banco real — validar assim que houver uma connection string.
