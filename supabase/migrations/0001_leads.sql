create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  store_url text not null,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on leads (created_at desc);
