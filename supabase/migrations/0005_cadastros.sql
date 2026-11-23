-- =====================================================================
-- Cadastro de estudante TEC Mais (/tec-mais/cadastro) + painel da equipe (/admin/cadastros)
-- Rode no Supabase → SQL Editor (uma vez). Depois:
--   1. Authentication → Users → Add user para cada pessoa da equipe ("Auto Confirm User")
--   2. Table Editor → tec_equipe → Insert row com o mesmo e-mail
--
-- Segurança:
--   - O formulário público NÃO grava direto na tabela: ele chama a função tec_cadastrar(),
--     que valida os campos e só insere. Ninguém de fora consegue ler, alterar ou apagar cadastros.
--   - Só e-mails da tabela tec_equipe enxergam os cadastros (RLS) e podem mudar status/observação.
-- =====================================================================

create table if not exists public.tec_equipe (
  email text primary key,
  nome text,
  criado_em timestamptz not null default now()
);

create or replace function public.tec_e_equipe() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.tec_equipe e where lower(e.email) = lower(auth.jwt() ->> 'email'));
$$;
revoke all on function public.tec_e_equipe() from public, anon;
grant execute on function public.tec_e_equipe() to authenticated;

create table if not exists public.tec_cadastros (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  curso text not null check (char_length(curso) between 2 and 120),
  -- dados pessoais
  nome text not null check (char_length(nome) between 3 and 150),
  cpf text check (cpf is null or cpf ~ '^\d{11}$'),
  nascimento date,
  nome_mae text check (char_length(nome_mae) <= 150),
  genero text check (char_length(genero) <= 40),
  grau_instrucao text check (char_length(grau_instrucao) <= 60),
  estado_civil text check (char_length(estado_civil) <= 30),
  estado_natal text check (char_length(estado_natal) <= 40),
  cidade_natal text check (char_length(cidade_natal) <= 80),
  -- endereço
  cep text check (cep is null or cep ~ '^\d{8}$'),
  numero text check (char_length(numero) <= 20),
  rua text check (char_length(rua) <= 150),
  bairro text check (char_length(bairro) <= 100),
  complemento text check (char_length(complemento) <= 100),
  cidade text check (char_length(cidade) <= 80),
  estado text check (char_length(estado) <= 40),
  -- contato
  email text check (char_length(email) <= 150),
  celular text not null check (celular ~ '^\d{10,11}$'),
  celular_whatsapp boolean not null default true,
  fixo text check (fixo is null or fixo ~ '^\d{10,11}$'),
  -- origem e LGPD
  origem text check (char_length(origem) <= 300),
  consentimento_em timestamptz not null,
  -- uso da equipe
  status text not null default 'Novo' check (status in ('Novo', 'Em contato', 'Matriculado', 'Não fechou')),
  observacao text check (char_length(observacao) <= 2000),
  atualizado_em timestamptz,
  atualizado_por text
);
create index if not exists tec_cadastros_criado_em on public.tec_cadastros (criado_em desc);
create index if not exists tec_cadastros_cpf on public.tec_cadastros (cpf);

-- grava quem mexeu por último
create or replace function public.tec_cadastros_carimbo() returns trigger
language plpgsql as $$
begin
  new.atualizado_em := now();
  new.atualizado_por := auth.jwt() ->> 'email';
  return new;
end $$;
drop trigger if exists tec_cadastros_carimbo on public.tec_cadastros;
create trigger tec_cadastros_carimbo before update on public.tec_cadastros
  for each row execute function public.tec_cadastros_carimbo();

-- ---------------------------------------------------------------------
-- Entrada pública: valida e insere. Devolve só o id (nada é lido de volta).
-- ---------------------------------------------------------------------
create or replace function public.tec_cadastrar(p jsonb) returns uuid
language plpgsql security definer set search_path = public as $$
declare
  v_id uuid;
  v_nasc date;
  d text := '';
  txt text;
  so_digitos text;
begin
  -- campo-isca: robôs preenchem, pessoas não veem
  if coalesce(p ->> 'site', '') <> '' then return gen_random_uuid(); end if;
  if coalesce((p ->> 'consentimento')::boolean, false) is not true then raise exception 'consentimento obrigatório'; end if;
  -- freio contra enxurrada: no máximo 30 cadastros por minuto no total
  if (select count(*) from public.tec_cadastros where criado_em > now() - interval '1 minute') >= 30 then
    raise exception 'muitos cadastros agora, tente em 1 minuto';
  end if;
  if nullif(p ->> 'nascimento', '') is not null then
    v_nasc := to_date(p ->> 'nascimento', 'YYYY-MM-DD');
    if v_nasc < date '1920-01-01' or v_nasc > current_date then raise exception 'data de nascimento inválida'; end if;
  end if;

  insert into public.tec_cadastros (
    curso, nome, cpf, nascimento, nome_mae, genero, grau_instrucao, estado_civil, estado_natal, cidade_natal,
    cep, numero, rua, bairro, complemento, cidade, estado,
    email, celular, celular_whatsapp, fixo, origem, consentimento_em
  ) values (
    left(trim(p ->> 'curso'), 120),
    trim(p ->> 'nome'),
    nullif(regexp_replace(coalesce(p ->> 'cpf', ''), '\D', '', 'g'), ''),
    v_nasc,
    nullif(trim(p ->> 'nome_mae'), ''),
    nullif(trim(p ->> 'genero'), ''),
    nullif(trim(p ->> 'grau_instrucao'), ''),
    nullif(trim(p ->> 'estado_civil'), ''),
    nullif(trim(p ->> 'estado_natal'), ''),
    nullif(trim(p ->> 'cidade_natal'), ''),
    nullif(regexp_replace(coalesce(p ->> 'cep', ''), '\D', '', 'g'), ''),
    nullif(trim(p ->> 'numero'), ''),
    nullif(trim(p ->> 'rua'), ''),
    nullif(trim(p ->> 'bairro'), ''),
    nullif(trim(p ->> 'complemento'), ''),
    nullif(trim(p ->> 'cidade'), ''),
    nullif(trim(p ->> 'estado'), ''),
    nullif(lower(trim(p ->> 'email')), ''),
    regexp_replace(coalesce(p ->> 'celular', ''), '\D', '', 'g'),
    coalesce((p ->> 'celular_whatsapp')::boolean, true),
    nullif(regexp_replace(coalesce(p ->> 'fixo', ''), '\D', '', 'g'), ''),
    left(nullif(trim(p ->> 'origem'), ''), 300),
    now()
  ) returning id into v_id;
  return v_id;
end $$;
revoke all on function public.tec_cadastrar(jsonb) from public;
grant execute on function public.tec_cadastrar(jsonb) to anon, authenticated;

-- ---------------------------------------------------------------------
-- Regras de acesso (RLS)
-- ---------------------------------------------------------------------
alter table public.tec_equipe enable row level security;
alter table public.tec_cadastros enable row level security;

revoke all on public.tec_equipe, public.tec_cadastros from anon;
revoke insert, update, delete on public.tec_equipe from authenticated;
revoke insert, update on public.tec_cadastros from authenticated;
grant select, delete on public.tec_cadastros to authenticated;
grant update (status, observacao) on public.tec_cadastros to authenticated;

drop policy if exists "equipe ve a si mesma" on public.tec_equipe;
create policy "equipe ve a si mesma" on public.tec_equipe for select to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

drop policy if exists "equipe le cadastros" on public.tec_cadastros;
create policy "equipe le cadastros" on public.tec_cadastros for select to authenticated using (public.tec_e_equipe());
drop policy if exists "equipe atualiza cadastros" on public.tec_cadastros;
create policy "equipe atualiza cadastros" on public.tec_cadastros for update to authenticated
  using (public.tec_e_equipe()) with check (public.tec_e_equipe());
drop policy if exists "equipe apaga cadastros" on public.tec_cadastros;
create policy "equipe apaga cadastros" on public.tec_cadastros for delete to authenticated using (public.tec_e_equipe());

-- ---------------------------------------------------------------------
-- Exemplos
-- ---------------------------------------------------------------------
-- Liberar alguém da equipe (a pessoa também precisa existir em Authentication → Users):
--   insert into public.tec_equipe (email, nome) values ('secretaria@exemplo.com', 'Secretaria TEC Mais');
-- Tirar o acesso:
--   delete from public.tec_equipe where email = 'fulano@exemplo.com';
-- Pedido de exclusão de dados (LGPD): no painel, abra o cadastro e use "Apagar cadastro".
