# Colégio Êxito — site institucional

Landing page de matrículas do Colégio Êxito (Novo Gama e Valparaíso de Goiás).
Site estático feito com [Astro](https://astro.build): carrega rápido, é bem indexado pelo Google e pode ser hospedado de graça.

## Rodar no computador

Precisa do Node.js 22 ou mais novo.

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera a versão final em dist/
```

## Onde editar o conteúdo

**Quase tudo fica em `src/data/site.ts`**: telefones, WhatsApp, endereços, horários, segmentos, perguntas frequentes, depoimentos e links de serviços.
Um campo `null` ou uma lista vazia some do site sozinho, então nada quebrado vai ao ar.

| O que | Onde |
| --- | --- |
| Textos, telefones, unidades, FAQ, depoimentos | `src/data/site.ts` |
| Fotos | coloque em `public/img/fotos/` e preencha o campo `photo` (ex.: `"/img/fotos/bercario.jpg"`) |
| Cores e fontes | `src/styles/global.css` (topo do arquivo) |
| Cada seção da página | `src/components/` |

## Conteúdo pendente (antes de divulgar)

- [ ] **Fotos reais**: hero, os 6 segmentos e as 2 fachadas (hoje aparecem blocos azuis com legenda).
- [ ] **Depoimentos** de pais e ex-alunos, com autorização por escrito (a seção aparece quando houver pelo menos um).
- [ ] **WhatsApp da Unidade II** (`units[1].whatsapp`).
- [ ] **Horário da Unidade II** (`units[1].hours`).
- [ ] **Faixa etária** do Berçário e da Educação Infantil (`age`).
- [ ] **Links**: Conexão Êxito, Unicollege, Matrícula, Webmail e Blog (`school.services`).
- [ ] **Perguntas frequentes** sobre turnos e adaptação de alunos transferidos.
- [ ] **Domínio final**: confirmar `SITE_URL` em `astro.config.mjs`.
- [ ] Revisar os números do hero (anos, avaliações no Google, seguidores).

## Publicar

O workflow `.github/workflows/deploy.yml` publica no **GitHub Pages** a cada push na `main`.

1. No GitHub: **Settings → Pages → Source: GitHub Actions**.
2. Sem domínio próprio, o site fica em `https://<usuario>.github.io/ColegioExito`.
3. Com domínio próprio: em **Settings → Secrets and variables → Actions → Variables**, crie `SITE_URL` (ex.: `https://colegioexito.com.br`) e `BASE_PATH` = `/`, e configure o domínio em Settings → Pages.

Também funciona sem mudanças na Netlify, Vercel ou Cloudflare Pages (comando `npm run build`, pasta `dist`).

## O que já vem pronto

- Layout responsivo (celular, tablet, desktop) com menu mobile.
- SEO: título, descrição, Open Graph (prévia bonita no WhatsApp e no Instagram), sitemap, robots.txt e dados estruturados do Google (escola com duas unidades + FAQ).
- Acessibilidade: navegação por teclado, link "pular para o conteúdo", contraste de cores conferido, respeito à opção "reduzir movimento".
- Botões de WhatsApp com mensagem já preenchida.
- Página 404.
