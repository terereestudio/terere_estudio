-- Ejecutar una vez en Supabase (SQL Editor).
create table if not exists public.registros (
  col  text not null,
  id   text not null,
  data jsonb not null default '{}'::jsonb,
  primary key (col, id)
);
alter table public.registros enable row level security;
-- Acceso solo para usuarios autenticados (ver README). Sin esto, cualquiera con el link podría leer y escribir.
create policy "solo autenticados" on public.registros for all to authenticated using (true) with check (true);
alter publication supabase_realtime add table public.registros;
