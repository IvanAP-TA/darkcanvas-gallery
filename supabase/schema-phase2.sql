-- =====================================================================
-- Phase 2 migration: multilingual artwork descriptions + richer About
-- =====================================================================
-- Run in Supabase SQL Editor AFTER schema.sql + seed.sql.
-- Idempotent.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Multilingual descriptions on artworks
-- ---------------------------------------------------------------------
-- Shape: { "en": "...", "it": "...", "es": "...", "zh": "..." }
-- The legacy single-language `description` column stays as a fallback.
alter table public.artworks
  add column if not exists descriptions jsonb not null default '{}'::jsonb;

-- Backfill descriptions.en from the existing description column if empty
update public.artworks
set descriptions = jsonb_build_object('en', description)
where descriptions = '{}'::jsonb
  and description <> '';

-- ---------------------------------------------------------------------
-- 2. Expand About content with list-type sections
-- ---------------------------------------------------------------------
-- The new section shape supports two `kind`s:
--
--   kind: 'text'  → uses title_xx / body_xx (already existed)
--   kind: 'list'  → uses title_xx + items[] where each item is
--                   { en?, it?, es?, zh? } (one localized string per lang)
--
-- This update REPLACES the about_content default seeded in Phase 1
-- (only if it still has the placeholder single biography section).
update public.about_content
set content = jsonb_build_object(
  'portrait_url', coalesce(content->>'portrait_url', '/paintings/artist.webp'),
  'sections', jsonb_build_array(
    -- 1) Biography (text)
    jsonb_build_object(
      'kind', 'text',
      'key', 'biography',
      'title_en', 'About the Artist',
      'title_it', 'L''Artista',
      'title_es', 'El Artista',
      'title_zh', '关于艺术家',
      'body_en',  'Annibale Pace is a contemporary artist whose work explores the intersection of tradition and innovation in visual art.',
      'body_it',  'Annibale Pace è un artista contemporaneo la cui opera esplora l''intersezione tra tradizione e innovazione nell''arte visiva.',
      'body_es',  'Annibale Pace es un artista contemporáneo cuya obra explora la intersección entre tradición e innovación en el arte visual.',
      'body_zh',  'Annibale Pace 是一位当代艺术家，其作品探索视觉艺术中传统与创新的交汇。'
    ),
    -- 2) Artistic approach (text)
    jsonb_build_object(
      'kind', 'text',
      'key', 'approach',
      'title_en', 'Artistic Approach',
      'title_it', 'Approccio Artistico',
      'title_es', 'Enfoque Artístico',
      'title_zh', '艺术方法',
      'body_en',  '',
      'body_it',  '',
      'body_es',  '',
      'body_zh',  ''
    ),
    -- 3) Education (list)
    jsonb_build_object(
      'kind', 'list',
      'key', 'education',
      'title_en', 'Education',
      'title_it', 'Formazione',
      'title_es', 'Formación',
      'title_zh', '教育背景',
      'items', jsonb_build_array(
        jsonb_build_object('en', 'Maestra Antonella Micocci - Fundamentals of artistic interpretation'),
        jsonb_build_object('en', 'Maestro Paolo Tagliaferro - Hyperrealistic technique'),
        jsonb_build_object('en', 'Maestro E. G. Solferino, Centro Artistico "La Casaccia"'),
        jsonb_build_object('en', 'Bottega Artemisia')
      )
    ),
    -- 4) Events (list)
    jsonb_build_object(
      'kind', 'list',
      'key', 'events',
      'title_en', 'Notable Events',
      'title_it', 'Eventi Importanti',
      'title_es', 'Eventos Destacados',
      'title_zh', '重要活动',
      'items', jsonb_build_array(
        jsonb_build_object('en', 'Carousell Du Louvre, Louvre, Parigi, 2013'),
        jsonb_build_object('en', 'Premio Nazionale di Pittura, Grottaglie, 2015'),
        jsonb_build_object('en', '100 Artisti per l''EXPO (EXPO 2015, Milano), Bergamo, 2015')
      )
    ),
    -- 5) Exhibitions (list)
    jsonb_build_object(
      'kind', 'list',
      'key', 'exhibitions',
      'title_en', 'Exhibitions',
      'title_it', 'Mostre',
      'title_es', 'Exposiciones',
      'title_zh', '展览',
      'items', jsonb_build_array(
        jsonb_build_object('en', 'Carousell Du Louvre, Louvre, Parigi, 2013'),
        jsonb_build_object('en', 'Paestum Arte, Paestum, 2013'),
        jsonb_build_object('en', 'Premio Nazionale di Pittura, Grottaglie, 2015'),
        jsonb_build_object('en', '100 Artisti per l''EXPO (EXPO 2015, Milano), Bergamo, 2015'),
        jsonb_build_object('en', 'Paolo Tagliaferro e i suoi allievi, Vicenza, 2018'),
        jsonb_build_object('en', 'Art''Arete'', Grottaglie (TA), 2019'),
        jsonb_build_object('en', 'Dalla grisaglia al colore, Laterza, 2019'),
        jsonb_build_object('en', 'Arte in fiera Dolomiti, Treviso, 2022'),
        jsonb_build_object('en', 'Giganti di Puglia, Francavilla Fontana (BR), 2022'),
        jsonb_build_object('en', 'Cubiamo, Francavilla Fontana (BR), 2022'),
        jsonb_build_object('en', 'Natale degli artisti, Brindisi, 2022'),
        jsonb_build_object('en', 'Colors of Fashion – Biennale di Venezia, Venezia, 2022'),
        jsonb_build_object('en', 'Mesagnesi, Mesagne (BR), 2023'),
        jsonb_build_object('en', 'A Carnevale ogni scherzo vale, Francavilla Fontana (BR), 2023'),
        jsonb_build_object('en', 'Chi può esser lieto sia, Mesagne (BR), 2023'),
        jsonb_build_object('en', 'L''abbraccio delle donne, Villa Castelli (BR), 2023'),
        jsonb_build_object('en', 'Mostra d''arte per il centenario dell''aeronautica Militare, Francavilla Fontana (BR), 2023')
      )
    )
  )
)
where id = 1;
