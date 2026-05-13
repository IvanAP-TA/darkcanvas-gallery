-- =====================================================================
-- Annibale Pace — CMS schema for Supabase
-- =====================================================================
-- Run this entire file in the Supabase SQL Editor (Project → SQL Editor → New).
-- Idempotent: re-running it will not duplicate or destroy existing data.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Helper: auto-update updated_at
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- ARTWORKS
-- ---------------------------------------------------------------------
create table if not exists public.artworks (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique,                                -- optional URL slug (falls back to id)
  title         text not null,
  year          int  not null,
  technique     text not null default '',
  theme         text not null default '',
  dimensions    text not null default '',
  description   text not null default '',
  image_url     text not null,                              -- main thumbnail / cover
  detail_images jsonb not null default '[]'::jsonb,         -- array of strings
  saatchi_url   text,
  featured      boolean not null default false,             -- shows on home "Featured Works"
  sort_order    int not null default 0,                     -- lower = earlier
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists artworks_featured_idx on public.artworks (featured);
create index if not exists artworks_sort_idx     on public.artworks (sort_order);

drop trigger if exists artworks_set_updated_at on public.artworks;
create trigger artworks_set_updated_at
before update on public.artworks
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- GALLERY PHOTOS  (the /gallery page — studio shots, process photos)
-- ---------------------------------------------------------------------
create table if not exists public.gallery_photos (
  id           uuid primary key default gen_random_uuid(),
  image_url    text not null,
  title        text not null default '',
  description  text not null default '',
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists gallery_sort_idx on public.gallery_photos (sort_order);

drop trigger if exists gallery_set_updated_at on public.gallery_photos;
create trigger gallery_set_updated_at
before update on public.gallery_photos
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- ABOUT CONTENT  (single-row table; jsonb for flexibility)
-- ---------------------------------------------------------------------
-- The `content` jsonb shape (suggested):
-- {
--   "portrait_url": "/paintings/artist.webp",
--   "sections": [
--     { "key": "biography", "title_en": "...", "body_en": "...",
--       "title_it": "...", "body_it": "...", ... },
--     ...
--   ]
-- }
create table if not exists public.about_content (
  id          int primary key default 1 check (id = 1), -- enforce singleton
  content     jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

drop trigger if exists about_set_updated_at on public.about_content;
create trigger about_set_updated_at
before update on public.about_content
for each row execute function public.set_updated_at();

insert into public.about_content (id, content)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- SITE SETTINGS  (single-row table; jsonb for flexibility)
-- ---------------------------------------------------------------------
-- The `settings` jsonb shape (suggested):
-- {
--   "hero_image_url": "/paintings/9-1600.webp",
--   "hero_image_thumb_url": "/paintings/9-thumb.webp",
--   "home_intro": { "en": "...", "it": "...", ... }
-- }
create table if not exists public.site_settings (
  id          int primary key default 1 check (id = 1),
  settings    jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

drop trigger if exists settings_set_updated_at on public.site_settings;
create trigger settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

insert into public.site_settings (id, settings)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
-- Public (anon) can READ everything. Only authenticated users can WRITE.
-- This means: anyone visiting the site sees content, but only the admin
-- (logged in via Supabase Auth) can mutate it.
-- =====================================================================

alter table public.artworks       enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.about_content  enable row level security;
alter table public.site_settings  enable row level security;

-- Drop and recreate policies idempotently
drop policy if exists "public read artworks"       on public.artworks;
drop policy if exists "auth write artworks"        on public.artworks;
drop policy if exists "public read gallery"        on public.gallery_photos;
drop policy if exists "auth write gallery"         on public.gallery_photos;
drop policy if exists "public read about"          on public.about_content;
drop policy if exists "auth write about"           on public.about_content;
drop policy if exists "public read settings"       on public.site_settings;
drop policy if exists "auth write settings"        on public.site_settings;

create policy "public read artworks"
  on public.artworks for select
  using (true);

create policy "auth write artworks"
  on public.artworks for all
  to authenticated
  using (true) with check (true);

create policy "public read gallery"
  on public.gallery_photos for select
  using (true);

create policy "auth write gallery"
  on public.gallery_photos for all
  to authenticated
  using (true) with check (true);

create policy "public read about"
  on public.about_content for select
  using (true);

create policy "auth write about"
  on public.about_content for all
  to authenticated
  using (true) with check (true);

create policy "public read settings"
  on public.site_settings for select
  using (true);

create policy "auth write settings"
  on public.site_settings for all
  to authenticated
  using (true) with check (true);

-- =====================================================================
-- STORAGE BUCKET (for image uploads from the admin panel)
-- =====================================================================
-- Public read, authenticated write. Run this only if the bucket does
-- not yet exist; the INSERT is idempotent thanks to ON CONFLICT.
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('artwork-images', 'artwork-images', true)
on conflict (id) do nothing;

-- Policies on storage.objects (drop+recreate to stay idempotent)
drop policy if exists "public read artwork images"  on storage.objects;
drop policy if exists "auth write artwork images"   on storage.objects;
drop policy if exists "auth update artwork images"  on storage.objects;
drop policy if exists "auth delete artwork images"  on storage.objects;

create policy "public read artwork images"
  on storage.objects for select
  using (bucket_id = 'artwork-images');

create policy "auth write artwork images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'artwork-images');

create policy "auth update artwork images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'artwork-images');

create policy "auth delete artwork images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'artwork-images');
