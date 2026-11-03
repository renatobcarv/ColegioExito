-- =============================================================
-- Colégio Êxito — conteúdo editável do site
-- Rode uma vez em: Supabase → SQL Editor → New query → Run
-- Depois, edite tudo em: Supabase → Table Editor
-- =============================================================

-- ---------- tabelas ----------

create table if not exists public.unidades (
  id              text primary key,                 -- usado no link do site (ex.: novo-gama)
  ordem           int  not null default 0,
  publicado       boolean not null default true,
  rotulo          text not null,                    -- "Unidade I"
  cidade          text not null,                    -- "Novo Gama"
  endereco_linha1 text not null,
  endereco_linha2 text,
  cep             text,
  uf              text not null default 'GO',
  horario         text,                             -- "Seg a sex · 7h30–11h30 e 13h30–17h30"
  telefone1       text,                             -- só números com DDD: 6136281707
  telefone2       text,
  whatsapp        text,                             -- só números com DDI e DDD: 5561986262137
  mapa_url        text not null,
  foto            text,                             -- caminho no bucket "fotos" ou URL completa
  atualizado_em   timestamptz not null default now()
);

create table if not exists public.segmentos (
  id            bigint generated always as identity primary key,
  ordem         int  not null default 0,
  publicado     boolean not null default true,
  nome          text not null,                      -- "Fundamental I"
  faixa_etaria  text,                               -- "1º ao 5º ano"
  texto         text not null,
  foto          text,
  cor           text not null default 'dourado' check (cor in ('vermelho', 'dourado')),
  destaque      boolean not null default false,
  atualizado_em timestamptz not null default now()
);

create table if not exists public.depoimentos (
  id            bigint generated always as identity primary key,
  ordem         int  not null default 0,
  publicado     boolean not null default true,
  -- LGPD: o depoimento só aparece no site com autorização registrada.
  autorizado    boolean not null default false,
  texto         text not null,
  nome          text not null,                      -- "Ana Souza"
  papel         text not null,                      -- "mãe de aluno do Fundamental I"
  atualizado_em timestamptz not null default now()
);

create table if not exists public.perguntas (
  id            bigint generated always as identity primary key,
  ordem         int  not null default 0,
  publicado     boolean not null default true,
  pergunta      text not null,
  resposta      text not null,
  atualizado_em timestamptz not null default now()
);

-- atualiza "atualizado_em" a cada edição
create or replace function public.tocar_atualizado_em() returns trigger
language plpgsql as $$ begin new.atualizado_em = now(); return new; end $$;

do $$
declare t text;
begin
  foreach t in array array['unidades', 'segmentos', 'depoimentos', 'perguntas'] loop
    execute format('drop trigger if exists tocar on public.%I', t);
    execute format('create trigger tocar before update on public.%I for each row execute function public.tocar_atualizado_em()', t);
  end loop;
end $$;

-- ---------- segurança (RLS) ----------
-- O site só LÊ o que está publicado. Ninguém de fora escreve.
-- Edição: pelo painel do Supabase (que ignora estas regras).

alter table public.unidades    enable row level security;
alter table public.segmentos   enable row level security;
alter table public.depoimentos enable row level security;
alter table public.perguntas   enable row level security;

drop policy if exists "site le publicados" on public.unidades;
create policy "site le publicados" on public.unidades    for select to anon, authenticated using (publicado);
drop policy if exists "site le publicados" on public.segmentos;
create policy "site le publicados" on public.segmentos   for select to anon, authenticated using (publicado);
drop policy if exists "site le autorizados" on public.depoimentos;
create policy "site le autorizados" on public.depoimentos for select to anon, authenticated using (publicado and autorizado);
drop policy if exists "site le publicados" on public.perguntas;
create policy "site le publicados" on public.perguntas   for select to anon, authenticated using (publicado);

-- ---------- fotos ----------
-- Bucket público "fotos": suba as imagens em Storage → fotos
-- e coloque o nome do arquivo (ex.: segmentos/bercario.jpg) na coluna "foto".
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do update set public = true;

-- ---------- conteúdo inicial (o que está no site hoje) ----------

insert into public.unidades (id, ordem, rotulo, cidade, endereco_linha1, endereco_linha2, cep, horario, telefone1, telefone2, whatsapp, mapa_url) values
  ('novo-gama', 1, 'Unidade I', 'Novo Gama',
   'Qd 578, Lt 10/12, Rua 102, Pq. Estrela Dalva VI (Pedregal)', 'Novo Gama – GO · CEP 72860-541', '72860-541',
   'Seg a sex · 7h30–11h30 e 13h30–17h30', '6136281707', '6136086195', '5561986262137',
   'https://share.google/vttkJEW57ycWue5fw'),
  ('valparaiso', 2, 'Unidade II', 'Valparaíso de Goiás',
   'Quadra 122 Lote 09/14, Jardim Céu Azul', 'Valparaíso de Goiás – GO', null,
   null, '6136241735', '6136244062', null,
   'https://share.google/XqeIMQirPjSmhgo65')
on conflict (id) do nothing;

insert into public.segmentos (ordem, nome, faixa_etaria, texto, cor, destaque)
select * from (values
  (1, 'Berçário',          null,             'Cuidado, segurança e rotina para os primeiros passos, com uma equipe que você conhece pelo nome.', 'vermelho', false),
  (2, 'Educação Infantil', null,             'Rotina, afeto e as primeiras descobertas num ambiente seguro. Onde a curiosidade vira hábito.', 'dourado', false),
  (3, 'Fundamental I',     '1º ao 5º ano',   'Alfabetização firme e base sólida em leitura e matemática, a fundação de tudo que vem depois.', 'dourado', false),
  (4, 'Fundamental II',    '6º ao 9º ano',   'A fase em que muitos se perdem. Aqui o acompanhamento aperta: método de estudo e responsabilidade.', 'vermelho', false),
  (5, 'Ensino Médio',      '1ª a 3ª série',  'ENEM e vestibular com foco no depois: uma escolha de carreira consciente.', 'dourado', false),
  (6, 'Polo Unopar',       'Graduação',      'Diploma reconhecido nacionalmente, conceito 4 no MEC, e o Canal Conecta para vagas de emprego.', 'vermelho', true)
) as v(ordem, nome, faixa_etaria, texto, cor, destaque)
where not exists (select 1 from public.segmentos);

insert into public.perguntas (ordem, pergunta, resposta)
select * from (values
  (1, 'Como funciona a matrícula?', 'Agende uma visita, conheça a unidade e converse com a coordenação. Na visita, a secretaria explica documentos, valores e prazos para a sua série.'),
  (2, 'Como acompanho notas e frequência?', 'Pelo portal Conexão Êxito e pelo contato direto com a coordenação, que avisa a família assim que percebe alguma dificuldade.'),
  (3, 'Posso visitar antes de decidir?', 'Sim, e recomendamos. As visitas acontecem de segunda a sexta, das 7h30 às 11h30 e das 13h30 às 17h30. Agende pelo WhatsApp.')
) as v(ordem, pergunta, resposta)
where not exists (select 1 from public.perguntas);
