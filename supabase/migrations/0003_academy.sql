-- =====================================================================
-- TEC Mais Academy · login individual e liberação de bônus aluno por aluno
-- Rode no Supabase → SQL Editor (uma vez). Depois:
--   1. Authentication → Users → Add user (e-mail + senha, marque "Auto Confirm User")
--   2. Table Editor → academy_acessos → uma linha por aluno e módulo liberado
-- Cada módulo do portal é cifrado com uma chave desta tabela. O aluno logado só
-- consegue ler as chaves dos módulos liberados para o e-mail dele.
-- =====================================================================
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.academy_chaves (
  modulo text primary key,
  descricao text,
  chave text not null default encode(extensions.gen_random_bytes(32), 'base64'),
  criado_em timestamptz not null default now()
);

insert into public.academy_chaves (modulo, descricao) values
  ('calculo', 'Injetáveis · Guia de Cálculo de Medicamentos'),
  ('visual', 'Injetáveis · Guia Visual da Prática'),
  ('carreira', 'Injetáveis · Guia de Oportunidades'),
  ('aph-peconhentos', 'APH · Bônus 1 · Animais Peçonhentos'),
  ('aph-rcp', 'APH · Bônus 2 · RCP por Fase da Vida'),
  ('aph-domesticas', 'APH · Bônus 3 · Emergências Domésticas'),
  ('aph-curriculo', 'APH · Bônus 4 · APH no Currículo')
on conflict (modulo) do nothing;

create table if not exists public.academy_acessos (
  id bigint generated always as identity primary key,
  email text not null,
  modulo text not null references public.academy_chaves (modulo) on delete cascade,
  libera_em timestamptz not null default now(),
  observacao text,
  criado_em timestamptz not null default now(),
  unique (email, modulo)
);
create index if not exists academy_acessos_email on public.academy_acessos (lower(email));

alter table public.academy_chaves enable row level security;
alter table public.academy_acessos enable row level security;

-- o aluno só lê a chave de um módulo liberado para ele (e já na data de liberação)
drop policy if exists "aluno le chaves liberadas" on public.academy_chaves;
create policy "aluno le chaves liberadas" on public.academy_chaves
  for select to authenticated
  using (exists (
    select 1 from public.academy_acessos a
    where a.modulo = academy_chaves.modulo
      and lower(a.email) = lower(auth.jwt() ->> 'email')
      and a.libera_em <= now()
  ));

-- o aluno vê os próprios acessos (para mostrar "libera em 20/11")
drop policy if exists "aluno ve os proprios acessos" on public.academy_acessos;
create policy "aluno ve os proprios acessos" on public.academy_acessos
  for select to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

-- ninguém com a chave pública escreve nessas tabelas: só pelo painel do Supabase
revoke insert, update, delete on public.academy_chaves, public.academy_acessos from anon, authenticated;

-- ---------------------------------------------------------------------
-- Exemplos (troque o e-mail):
-- Liberar o kit de Injetáveis inteiro:
--   insert into academy_acessos (email, modulo)
--   select 'aluna@email.com', unnest(array['calculo','visual','carreira']);
-- APH com a liberação recomendada (1 e 3 na matrícula, 2 em 7 dias, 4 no fim do curso):
--   insert into academy_acessos (email, modulo, libera_em) values
--     ('aluno@email.com', 'aph-peconhentos', now()),
--     ('aluno@email.com', 'aph-domesticas', now()),
--     ('aluno@email.com', 'aph-rcp', now() + interval '7 days'),
--     ('aluno@email.com', 'aph-curriculo', '2026-12-20');
-- Bloquear de novo: apague a linha do aluno naquele módulo.
-- ---------------------------------------------------------------------
