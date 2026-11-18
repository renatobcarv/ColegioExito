-- =====================================================================
-- Cofre de senhas da escola (/admin/cofre)
-- Rode no Supabase → SQL Editor (uma vez). Depois:
--   1. Authentication → Users → Add user (e-mail + senha forte, marque "Auto Confirm User")
--   2. Table Editor → cofre_admins → Insert row com o e-mail de cada pessoa autorizada
--   3. Abra /admin/cofre, entre e crie a senha mestra (só na primeira vez)
--
-- Como funciona a segurança:
--   - Tudo é cifrado NO NAVEGADOR (AES-256-GCM, chave derivada da senha mestra com PBKDF2-SHA256).
--   - O Supabase guarda só texto embaralhado: nem o nome da conta fica legível aqui.
--   - A senha mestra nunca sai do navegador. Se ela for perdida, NINGUÉM recupera o cofre
--     (use o botão "Baixar backup" e guarde a senha mestra num lugar físico seguro).
--   - Só e-mails da tabela cofre_admins conseguem ler ou gravar (RLS).
-- =====================================================================
create extension if not exists pgcrypto with schema extensions;

-- quem pode abrir o cofre
create table if not exists public.cofre_admins (
  email text primary key,
  nome text,
  criado_em timestamptz not null default now()
);

create or replace function public.cofre_e_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.cofre_admins a where lower(a.email) = lower(auth.jwt() ->> 'email'));
$$;
revoke all on function public.cofre_e_admin() from public, anon;
grant execute on function public.cofre_e_admin() to authenticated;

-- parâmetros da senha mestra (uma linha só). O verificador é um texto conhecido cifrado:
-- se decifrar, a senha mestra está certa.
create table if not exists public.cofre_config (
  id smallint primary key default 1 check (id = 1),
  salt text not null,
  iteracoes integer not null check (iteracoes >= 300000),
  verificador text not null,
  atualizado_em timestamptz not null default now(),
  atualizado_por text default (auth.jwt() ->> 'email')
);

-- cada conta guardada: um bloco cifrado (iv + texto cifrado, em base64)
create table if not exists public.cofre_itens (
  id uuid primary key default gen_random_uuid(),
  dados text not null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  atualizado_por text default (auth.jwt() ->> 'email')
);

-- histórico: quem criou, alterou, apagou ou desbloqueou (sem nenhum dado da conta)
create table if not exists public.cofre_log (
  id bigint generated always as identity primary key,
  email text not null default coalesce(auth.jwt() ->> 'email', '?'),
  acao text not null check (acao in ('criou', 'alterou', 'apagou', 'desbloqueou', 'trocou senha mestra', 'baixou backup')),
  item uuid,
  em timestamptz not null default now()
);
create index if not exists cofre_log_em on public.cofre_log (em desc);

create or replace function public.cofre_registra() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'UPDATE' then new.atualizado_em := now(); new.atualizado_por := auth.jwt() ->> 'email'; end if;
  insert into public.cofre_log (acao, item) values (
    case tg_op when 'INSERT' then 'criou' when 'UPDATE' then 'alterou' else 'apagou' end,
    coalesce(new.id, old.id)
  );
  return coalesce(new, old);
end $$;

drop trigger if exists cofre_itens_log_ins on public.cofre_itens;
drop trigger if exists cofre_itens_log_upd on public.cofre_itens;
drop trigger if exists cofre_itens_log_del on public.cofre_itens;
create trigger cofre_itens_log_ins after insert on public.cofre_itens for each row execute function public.cofre_registra();
create trigger cofre_itens_log_upd before update on public.cofre_itens for each row execute function public.cofre_registra();
create trigger cofre_itens_log_del after delete on public.cofre_itens for each row execute function public.cofre_registra();

-- troca da senha mestra: grava a nova configuração e TODOS os itens recifrados de uma vez
-- (ou tudo ou nada). Recebe [{ "id": "...", "dados": "..." }, ...].
create or replace function public.cofre_trocar_mestra(p_salt text, p_iteracoes integer, p_verificador text, p_itens jsonb)
returns void language plpgsql security invoker set search_path = public as $$
declare n_banco integer; n_novos integer;
begin
  if not public.cofre_e_admin() then raise exception 'sem permissão'; end if;
  select count(*) into n_banco from public.cofre_itens;
  select count(*) into n_novos from public.cofre_itens c join jsonb_array_elements(p_itens) j on c.id = (j ->> 'id')::uuid;
  if n_banco <> n_novos or jsonb_array_length(p_itens) <> n_banco then
    raise exception 'o cofre mudou durante a troca: recarregue a página e tente de novo';
  end if;
  update public.cofre_itens c set dados = j ->> 'dados'
    from jsonb_array_elements(p_itens) j where c.id = (j ->> 'id')::uuid;
  update public.cofre_config set salt = p_salt, iteracoes = p_iteracoes, verificador = p_verificador,
    atualizado_em = now(), atualizado_por = auth.jwt() ->> 'email' where id = 1;
  insert into public.cofre_log (acao) values ('trocou senha mestra');
end $$;
revoke all on function public.cofre_trocar_mestra(text, integer, text, jsonb) from public, anon;
grant execute on function public.cofre_trocar_mestra(text, integer, text, jsonb) to authenticated;

-- ---------------------------------------------------------------------
-- Regras de acesso (RLS)
-- ---------------------------------------------------------------------
alter table public.cofre_admins enable row level security;
alter table public.cofre_config enable row level security;
alter table public.cofre_itens enable row level security;
alter table public.cofre_log enable row level security;

revoke all on public.cofre_admins, public.cofre_config, public.cofre_itens, public.cofre_log from anon;
-- a lista de admins só se edita pelo painel do Supabase
revoke insert, update, delete on public.cofre_admins from authenticated;
-- o histórico não se altera nem se apaga pelo site
revoke update, delete on public.cofre_log from authenticated;

drop policy if exists "admin ve a si mesmo" on public.cofre_admins;
create policy "admin ve a si mesmo" on public.cofre_admins for select to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

drop policy if exists "admin le config" on public.cofre_config;
create policy "admin le config" on public.cofre_config for select to authenticated using (public.cofre_e_admin());
drop policy if exists "admin cria config" on public.cofre_config;
create policy "admin cria config" on public.cofre_config for insert to authenticated with check (public.cofre_e_admin());
drop policy if exists "admin altera config" on public.cofre_config;
create policy "admin altera config" on public.cofre_config for update to authenticated
  using (public.cofre_e_admin()) with check (public.cofre_e_admin());

drop policy if exists "admin usa itens" on public.cofre_itens;
create policy "admin usa itens" on public.cofre_itens for all to authenticated
  using (public.cofre_e_admin()) with check (public.cofre_e_admin());

drop policy if exists "admin le historico" on public.cofre_log;
create policy "admin le historico" on public.cofre_log for select to authenticated using (public.cofre_e_admin());
drop policy if exists "admin registra evento" on public.cofre_log;
create policy "admin registra evento" on public.cofre_log for insert to authenticated
  with check (public.cofre_e_admin() and item is null and acao in ('desbloqueou', 'baixou backup')
              and email = coalesce(auth.jwt() ->> 'email', '?'));

-- ---------------------------------------------------------------------
-- Exemplos (rode só o que precisar)
-- ---------------------------------------------------------------------
-- Autorizar uma pessoa (ela também precisa existir em Authentication → Users):
--   insert into public.cofre_admins (email, nome) values ('direcao@exemplo.com', 'Direção');
-- Tirar o acesso de alguém que saiu da equipe (depois TROQUE a senha mestra no cofre
-- e as senhas das contas que essa pessoa conhecia):
--   delete from public.cofre_admins where email = 'fulano@exemplo.com';
-- Ver o histórico:
--   select * from public.cofre_log order by em desc limit 100;
