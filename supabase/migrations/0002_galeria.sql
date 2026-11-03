-- =============================================================
-- Colégio Êxito — galeria de atividades (carrossel da página inicial)
-- Rode uma vez em: Supabase → SQL Editor → New query → Run
--
-- Como usar:
--   1. Suba as fotos em Storage → fotos → pasta "galeria" (ex.: galeria/festa-junina-2026-1.jpg)
--   2. Em Table Editor → galeria, crie uma linha por foto com o caminho na coluna "foto"
-- A galeria só aparece no site quando houver pelo menos uma foto publicada.
-- =============================================================

create table if not exists public.galeria (
  id            bigint generated always as identity primary key,
  ordem         int  not null default 0,          -- menor aparece primeiro
  publicado     boolean not null default true,
  titulo        text not null,                    -- "Festa Junina 2026"
  legenda       text,                             -- "Apresentação do Fundamental I"
  data          date,                             -- dia da atividade (opcional)
  foto          text not null,                    -- caminho no bucket "fotos" ou URL completa
  atualizado_em timestamptz not null default now()
);

drop trigger if exists tocar on public.galeria;
create trigger tocar before update on public.galeria
  for each row execute function public.tocar_atualizado_em();

alter table public.galeria enable row level security;
drop policy if exists "site le publicados" on public.galeria;
create policy "site le publicados" on public.galeria for select to anon, authenticated using (publicado);
