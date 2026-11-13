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

### No Supabase (dia a dia da secretaria)

**Unidades, segmentos, depoimentos e perguntas** são editados no painel do Supabase, em **Table Editor**:

| Tabela | O que tem |
| --- | --- |
| `unidades` | endereço, horário, telefones, WhatsApp, link do mapa, foto da fachada |
| `segmentos` | Berçário ao Polo Unopar: nome, faixa etária, texto, foto |
| `depoimentos` | só aparece no site com `autorizado` = true (LGPD) |
| `perguntas` | perguntas frequentes |
| `galeria` | fotos das atividades (carrossel "Vida no Êxito"); aparece quando houver pelo menos uma |

- `publicado` = false esconde a linha sem apagar.
- `ordem` define a sequência no site.
- **Fotos:** suba em **Storage → fotos** (ex.: `segmentos/bercario.jpg`) e escreva esse caminho na coluna `foto`.
- Telefones: só números ou com máscara, tanto faz.

O site lê o Supabase **na publicação**. Com o webhook abaixo configurado, cada edição publica o site sozinha em ~1 minuto.

#### Configurar uma vez

1. **Criar as tabelas:** Supabase → **SQL Editor** → rode `supabase/migrations/0001_conteudo.sql` e depois `0002_galeria.sql` (um de cada vez, botão **Run**). O primeiro já vem com o conteúdo atual do site.
2. **Variáveis na Vercel** (Settings → Environment Variables): `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (a integração Supabase da Vercel já cria essas).
3. **Atualização automática:**
   - Vercel → Settings → Git → **Deploy Hooks** → crie um hook para a branch `main` e copie a URL.
   - Supabase → Database → **Webhooks** → Create: tabelas `unidades`, `segmentos`, `depoimentos`, `perguntas`; eventos Insert/Update/Delete; tipo HTTP Request, método POST, URL = a do Deploy Hook. Um webhook por tabela.

Segurança: a chave pública só consegue **ler** o que está publicado (regras RLS no SQL). Editar, só pelo painel do Supabase.
Se o Supabase estiver fora do ar na hora da publicação, o build falha e a Vercel mantém a versão anterior no ar.

### No código (muda raramente)

`src/data/site.ts`: nome, slogan, WhatsApp principal, horário de visitas, redes sociais, números do hero, links de serviços e os textos do manifesto e do "como funciona". Também é o conteúdo de reserva quando o Supabase não está configurado.

| O que | Onde |
| --- | --- |
| Unidades, segmentos, FAQ, depoimentos, fotos | Supabase (Table Editor / Storage) |
| Textos fixos, WhatsApp principal, redes, reel em destaque | `src/data/site.ts` |
| Páginas Unopar e TEC Mais (cursos, contatos) | `formacoes` em `src/data/site.ts` |
| Proposta pedagógica e quadro comparativo | `metodo` em `src/data/site.ts` |
| Cores e fontes | `src/styles/global.css` (topo do arquivo) |
| Cada seção da página | `src/components/` |

## Conteúdo pendente (antes de divulgar)

- [ ] Rodar `0002_galeria.sql` no Supabase e subir as primeiras fotos de atividades.
- [ ] Configurar o webhook do Supabase → Vercel (passos acima).
- [ ] **TEC Mais**: confirmar WhatsApp, endereço e carga horária dos cursos (`formacoes` em `src/data/site.ts`).

- [ ] **Fotos reais**: hero, os 6 segmentos e as 2 fachadas (hoje aparecem blocos azuis com legenda).
- [ ] **Depoimentos** de pais e ex-alunos, com autorização por escrito (a seção aparece quando houver pelo menos um).
- [ ] **WhatsApp da Unidade II** (tabela `unidades`).
- [ ] **Horário da Unidade II** (tabela `unidades`).
- [ ] **Faixa etária** do Berçário e da Educação Infantil (tabela `segmentos`).
- [ ] **Links**: Conexão Êxito, Unicollege, Matrícula, Webmail e Blog (`school.services`).
- [ ] **Perguntas frequentes** sobre turnos e adaptação de alunos transferidos.
- [ ] **Domínio final**: definir `SITE_URL` na Vercel.
- [ ] Revisar os números do hero (anos, avaliações no Google, seguidores).

## Rastreamento (Google e Meta)

As tags só rodam depois do consentimento do visitante (banner de cookies + Google Consent Mode v2).

1. Na Vercel, em **Settings → Environment Variables**, crie as que for usar:
   - `PUBLIC_GTM_ID` (ex.: `GTM-XXXXXXX`), recomendado: GA4, Google Ads e demais tags ficam dentro do GTM.
   - `PUBLIC_GA4_ID` (ex.: `G-XXXXXXXXXX`), só se não usar GTM.
   - `PUBLIC_META_PIXEL_ID` (ex.: `123456789012345`).
2. Faça um novo deploy.
3. No GTM, ative o **Consent Mode** nas tags (o site já envia `consent default` e `consent update`).

Eventos enviados ao `dataLayer`: `whatsapp_click`, `phone_click`, `generate_lead` (formulários) e `consent_update`. No Pixel: `Lead` e `Contact`.
As UTMs (`utm_source`, `utm_medium`, `utm_campaign`) entram no fim da mensagem do WhatsApp: *(origem: instagram / cpc / matriculas2027)*.

## Portal do Aluno TEC Mais (área restrita)

Endereço: `/tec-mais/academy`. Sem link no site, fora do sitemap e com `noindex`.
Os arquivos originais ficam em `academy-src/`. No build, eles são **criptografados** (AES-256) com a senha da variável
**`ACADEMY_PASSWORD`** (Vercel → Settings → Environment Variables) e só uma tela de senha vai ao ar.
Sem a variável, o portal aparece como "indisponível". Para trocar a senha: altere a variável e faça um novo deploy.

## Publicar (Vercel)

A Vercel publica sozinha a cada push na `main` (e gera uma prévia para cada branch/PR).

- Framework: **Astro** (detectado automaticamente) · Build: `npm run build` · Saída: `dist`
- Em **Settings → Environment Variables**, defina `SITE_URL` com o domínio final (ex.: `https://colegioexito.com.br`).
- Domínio próprio: **Settings → Domains**.

## O que já vem pronto

- Layout responsivo (celular, tablet, desktop) com menu mobile.
- SEO: título, descrição, Open Graph (prévia bonita no WhatsApp e no Instagram), sitemap, robots.txt e dados estruturados do Google (escola com duas unidades + FAQ).
- Acessibilidade: navegação por teclado, link "pular para o conteúdo", contraste de cores conferido, respeito à opção "reduzir movimento".
- Botões de WhatsApp com mensagem já preenchida.
- Página 404.
