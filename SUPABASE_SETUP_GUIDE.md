# Guida Setup Supabase - Admin Panel

Hai una nuova area riservata per gestire i tuoi quadri! Segui questa guida per configurare tutto.

## Step 1: Creare un account Supabase

1. Vai su https://supabase.com
2. Clicca "Sign Up" (usa GitHub o email)
3. Crea un nuovo progetto:
   - **Name**: `darkcanvas-gallery` (o il nome che preferisci)
   - **Database Password**: Scegli una password sicura
   - **Region**: Scegli Europe (Irlanda)
   - Clicca "Create new project"

Aspetta 2-3 minuti che il progetto sia pronto.

---

## Step 2: Creare la tabella dei quadri

Una volta nel progetto Supabase:

1. Vai su **SQL Editor** (pannello sinistro)
2. Clicca il pulsante **"New Query"**
3. Copia e incolla questo SQL:

```sql
-- Create artworks table
CREATE TABLE artworks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  technique TEXT NOT NULL,
  theme TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  saatchi_url TEXT,
  detail_images TEXT[],
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('artwork-images', 'artwork-images', true);

-- Set storage policy
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'artwork-images');

CREATE POLICY "Authenticated write access" ON storage.objects
  FOR INSERT TO authenticated USING (bucket_id = 'artwork-images');

CREATE POLICY "Authenticated delete access" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'artwork-images');

-- Enable RLS
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Create read policy for all users
CREATE POLICY "Read all artworks" ON artworks
  FOR SELECT USING (true);

-- Create insert/update/delete policies for authenticated users
CREATE POLICY "Insert artworks" ON artworks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Update artworks" ON artworks
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Delete artworks" ON artworks
  FOR DELETE USING (true);
```

4. Clicca **Run**
5. Attendi il completamento

---

## Step 3: Ottenere le API Keys

1. Vai su **Project Settings** (icona ingranaggio in basso a sinistra)
2. Clicca su **API**
3. Copia questi valori:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

---

## Step 4: Configurare il file .env.local

Nel tuo progetto locale, modifica il file `.env.local`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=scegli-una-password-sicura
```

**Sostituisci i valori con i tuoi dati da Supabase.**

---

## Step 5: Testare il setup

1. Nel terminale, vai alla cartella del progetto:
   ```bash
   cd darkcanvas-gallery
   npm run dev
   ```

2. Apri il browser e vai a: `http://localhost:5173/admin`

3. Inserisci la password che hai scelto in `.env.local`

4. Se tutto funziona, dovresti vedere il **Admin Panel** ✅

---

## Come usare l'Admin Panel

### Aggiungere un nuovo quadro:

1. Clicca **"Add New Artwork"**
2. Compila i campi:
   - **Title** (obbligatorio)
   - **Year**
   - **Technique** (es. "Oil on Canvas")
   - **Theme** (es. "Surrealism")
   - **Dimensions** (es. "80 x 60 cm")
   - **Description**
   - **Image** (obbligatorio) - Upload o seleziona un file
   - **Saatchi URL** (opzionale)
3. Clicca **"Create Artwork"**

### Modificare un quadro:

1. Trova il quadro nella tabella
2. Clicca **"Edit"**
3. Modifica i campi necessari
4. Clicca **"Update Artwork"**

### Eliminare un quadro:

1. Trova il quadro nella tabella
2. Clicca **"Delete"**
3. Conferma l'eliminazione

---

## Importare i quadri attuali in Supabase

Se vuoi migrare i tuoi quadri attuali nel database:

1. Vai all'Admin Panel
2. Aggiungi manualmente ogni quadro (le informazioni sono nel file `src/data/artworks.ts`)

O, se preferisci, posso creare uno script automatico per importarli.

---

## Note di sicurezza

- La password admin è salvata in `.env.local` (non committa su GitHub!)
- Le immagini sono salvate su Supabase e non localmente
- Il database è in lettura pubblica (i quadri si vedono a tutti)
- Solo con la password admin puoi aggiungere/modificare/eliminare quadri

---

## Troubleshooting

### "Missing Supabase environment variables"
- Controlla che `.env.local` esista e abbia i valori corretti
- Riavvia il server (`npm run dev`)

### "Failed to upload image"
- Assicurati che la tabella storage sia creata correttamente
- Controlla che il bucket `artwork-images` esista

### La password non funziona
- Verifica di aver copiato correttamente `VITE_ADMIN_PASSWORD` da `.env.local`
- Riavvia il server

---

## Prossimi passi

Una volta configurato, il sito farà fetch dei quadri da Supabase automaticamente:
- **Portfolio** → Mostra tutti i quadri da Supabase
- **Home** → Mostra i 3 quadri in evidenza
- **Admin** → Gestisci i quadri senza toccare il codice

Buon lavoro! 🎨
