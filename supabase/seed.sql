-- =====================================================================
-- Seed data: imports the 18 existing artworks into the new artworks table.
-- Idempotent: uses ON CONFLICT (slug) DO NOTHING.
-- Run AFTER schema.sql.
-- =====================================================================

insert into public.artworks
  (slug, title, year, technique, theme, dimensions, description, image_url, saatchi_url, sort_order, featured)
values
  ('happiness', 'Happiness', 2022, 'Oil on Canvas', 'Neapolitan Culture', '80 x 60 cm',
   'This artwork is a celebration of the rich and colorful tradition of Naples, drawing inspiration from the iconic figure of Pulcinella and the vibrant folklore that permeates the city. The lively and whimsical nature of Neapolitan culture served as a wellspring of creative influence, infusing this painting with a sense of joy and playfulness.',
   '/paintings/1.webp',
   'https://www.saatchiart.com/art/Painting-Happiness/2284565/10999217/view', 10, false),

  ('zeus-wrath', 'Zeus''s Wrath', 2020, 'Oil on Canvas', 'Mythology', '50 x 40 cm',
   'This artwork is a testament to the powerful influence of nature and mythology on my creative journey. Inspired by the tumultuous beauty of stormy seas and the timeless tales of ancient gods, this painting seeks to transport viewers to a world where the elements of the natural world merge with the realm of mythology.',
   '/paintings/zeus_wrath.webp',
   'https://www.saatchiart.com/en-it/art/Painting-Zeus-s-Wrath/2284565/10942645/view', 20, false),

  ('homage-dali', 'Homage to Salvador Dalí', 2018, 'Oil on Canvas', 'Surrealism', '50 x 70 cm',
   'This artwork stands as a testament to my fascination with the enigmatic and surreal world of Salvador Dalí. Depicting Christ in the unmistakable style of the great surrealist, the painting emerges from the canvas like a dream.',
   '/paintings/3.webp',
   'https://www.saatchiart.com/art/Painting-Homage-to-Salvador-Dal/2284565/10907877/view', 30, false),

  ('reminiscence', 'Reminiscence', 2020, 'Oil on Canvas', 'Metaphysical Art', '50 x 50 cm',
   'Creating this artwork was an exploration of the surreal and enigmatic, inspired by the works of Giorgio De Chirico. It''s one of my first forays into the realm of metaphysical art, a style that has always fascinated me for its ability to evoke a sense of mystery and intrigue.',
   '/paintings/4.webp',
   'https://www.saatchiart.com/art/Painting-Reminiscence/2284565/10875147/view', 40, false),

  ('wine-grapes-sea', 'Wine, Grapes, Sea', 2021, 'Oil on Canvas', 'Photorealism', '80 x 60 cm',
   'This painting is a testament to mastery in photorealistic painting. With details so sharp and lifelike that they seem to emerge from the canvas, it captures the beauty and essence of a serene and fulfilling moment.',
   '/paintings/5.webp',
   'https://www.saatchiart.com/art/Painting-Wine-grapes-sea/2284565/10875148/view', 50, false),

  ('high-altitude-passion', 'High Altitude Passion', 2023, 'Oil on Canvas', 'Aviation', '100 x 70 cm',
   'This is the painting I made for the centennial of the Italian Air Force.',
   '/paintings/6.webp',
   'https://www.saatchiart.com/art/Painting-High-altitude-passion/2284565/10875149/view', 60, false),

  ('ethereal-reverence', 'Ethereal Reverence', 2022, 'Oil on Canvas', 'Landscape', '60 x 60 cm',
   'This is one of my most introspective works and is one of my son''s favorites. He has always told me he considers it an extremely relaxing painting, probably because of the dark tones and the sunset light that dominates the landscape.',
   '/paintings/7.webp',
   'https://www.saatchiart.com/art/Painting-Ethereal-Reverence/2284565/10859161/view', 70, false),

  ('meditation', 'Meditation', 2017, 'Oil on Canvas', 'Classical Art', '40 x 30 cm',
   'The inspiration for this work flowed from the depths of my soul, ignited by the eternal beauty of Michelangelo''s David. Standing before this masterpiece, I was struck by the timeless elegance and profound grace emanating from the statue.',
   '/paintings/8.webp',
   'https://www.saatchiart.com/art/Painting-Meditation/2284565/10875150/view', 80, false),

  ('seasonal-freshness', 'Seasonal Freshness', 2021, 'Oil on Canvas', 'Still Life', '30 x 30 cm',
   'This painting is the culmination of my experiments with photorealistic painting. Fruit is always a fascinating subject, and the nuances of the cherries convey a sense of calm and serenity to anyone who sees them.',
   '/paintings/9.webp',
   'https://www.saatchiart.com/art/Painting-Seasonal-Freshness/2284565/10875151/view', 90, true),

  ('warriors-rest', 'Warrior''s Rest', 2022, 'Oil on Canvas', 'Figurative', '100 x 100 cm',
   'This painting depicts a warrior finding solace after battle, symbolizing the quest for inner peace following life''s challenges.',
   '/paintings/10.webp',
   'https://www.saatchiart.com/en-it/account/profile/2284565', 100, false),

  ('whispers-firelight', 'Whispers of Firelight Painting', 2024, 'Oil on Canvas', 'Figurative', '70 x 80 cm',
   'An exploration of the nuances between spoken words and unspoken thoughts, encouraging viewers to look beyond the surface.',
   '/paintings/11.webp',
   'https://www.saatchiart.com/en-it/art/Painting-Whispers-of-Firelight/2284565/12859855/view', 110, false),

  ('citrus', 'Citrus', 2020, 'Oil on Canvas', 'Still Life', '100 x 100 cm',
   'A vibrant composition capturing the zest and freshness of citrus fruits, evoking feelings of vitality and rejuvenation.',
   '/paintings/12.webp',
   'https://www.saatchiart.com/en-it/account/profile/2284565', 120, false),

  ('caring-eye', 'Caring Eye', 2015, 'Oil on Canvas', 'Portrait', '100 x 100 cm',
   'Focusing on the expressive power of a compassionate gaze, this piece highlights the importance of empathy and human connection.',
   '/paintings/13.webp',
   'https://www.saatchiart.com/en-it/account/profile/2284565', 130, false),

  ('the-phoenix', 'The Phoenix', 2024, 'Oil on Canvas', 'Mythology', '100 x 100 cm',
   'Drawing inspiration from the mythical bird, this artwork represents rebirth and hope, illustrating a creature rising anew from its ashes.',
   '/paintings/14.webp',
   'https://www.saatchiart.com/en-it/account/profile/2284565', 140, true),

  ('resonance-stars', 'Resonance Under the Stars', 2024, 'Oil on Canvas', 'Portraiture', '80 x 60 cm',
   'This work was inspired by the captivating union between architecture, memory, and sound. Set in a quiet, historic Italian town square at night, the piece reflects on how music can transform and elevate familiar spaces into places of wonder.',
   '/paintings/15.webp',
   'https://www.saatchiart.com/en-it/art/Painting-Resonance-Under-the-Stars/2284565/12868851/view', 150, true),

  ('release', 'Release', 2017, 'Oil on Canvas', 'Mythology', '30 x 40 cm',
   'Two weathered hands gently open, releasing a butterfly into the air. The cracked eggshell symbolizes rebirth, while the vibrant wings speak of transformation, fragility, and freedom. This piece was inspired by the quiet courage required to let go — of fear, of sorrow, or of someone you love — and to trust in what comes next.',
   '/paintings/16.webp',
   'https://www.saatchiart.com/en-it/art/Painting-Release/2284565/12859935/view', 160, false),

  ('spirit-savannah', 'Spirit of the Savannah', 2020, 'Oil on Canvas', 'Surrealism', '50 x 50 cm',
   'This painting was born from a deep reverence for both African heritage and the natural world. The central figure, a serene Black woman with eyes closed, becomes one with the landscape, her profile blending seamlessly into the silhouettes of majestic elephants walking through a sunlit savannah. This symbolizes the spiritual bond between humans and nature, and the quiet strength found in both.',
   '/paintings/17.webp',
   'https://www.saatchiart.com/en-it/art/Painting-Spirit-of-the-Savannah/2284565/12868881/view', 170, false),

  ('dunes-of-her', 'Dunes of Her', 2024, 'Oil on Canvas', 'Surrealism', '120 x 45 cm',
   'In this dreamlike sunset, rolling dunes stretch into the horizon — but a second glance reveals their true nature: the soft, sensual contours of a woman''s body merging with the earth. This painting is inspired by the surreal connection between nature and the feminine, the sacred landscape of the human form.',
   '/paintings/18.webp',
   'https://www.saatchiart.com/en-it/art/Painting-Dunes-of-Her/2284565/12862119/view', 180, false)
on conflict (slug) do nothing;

-- Default about content (you can edit this from the admin panel later)
update public.about_content
set content = jsonb_build_object(
  'portrait_url', '/paintings/artist.webp',
  'sections', jsonb_build_array(
    jsonb_build_object(
      'key', 'biography',
      'title_en', 'Biography', 'title_it', 'Biografia', 'title_es', 'Biografía', 'title_zh', '简介',
      'body_en', 'Annibale Pace is a contemporary artist whose work explores the intersection of tradition and innovation in visual art.',
      'body_it', 'Annibale Pace è un artista contemporaneo la cui opera esplora l''intersezione tra tradizione e innovazione nell''arte visiva.',
      'body_es', 'Annibale Pace es un artista contemporáneo cuya obra explora la intersección entre tradición e innovación en el arte visual.',
      'body_zh', 'Annibale Pace 是一位当代艺术家，其作品探索视觉艺术中传统与创新的交汇。'
    )
  )
)
where id = 1;

-- Default site settings
update public.site_settings
set settings = jsonb_build_object(
  'hero_image_url',       '/paintings/9-1600.webp',
  'hero_image_thumb_url', '/paintings/9-thumb.webp',
  'hero_srcset',          '/paintings/9-thumb.webp 600w, /paintings/9-1600.webp 1600w',
  'hero_sizes',           '(max-width: 768px) 100vw, 1600px'
)
where id = 1;
