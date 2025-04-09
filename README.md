# Dark Canvas Gallery

Un'esperienza immersiva nel mondo dell'arte contemporanea di Annibale Pace, realizzata con tecnologie moderne e un focus sulla performance e l'accessibilità.

## 🎨 Il Progetto

Dark Canvas Gallery è una galleria d'arte digitale che presenta le opere di Annibale Pace, un artista contemporaneo italiano. Il sito è stato progettato per offrire un'esperienza fluida e coinvolgente, mantenendo al contempo un focus sulla qualità delle immagini e sulla performance.

### Caratteristiche Principali

- 🖼️ Galleria d'arte interattiva con lazy loading delle immagini
- 📱 Design responsive ottimizzato per tutti i dispositivi
- 🔍 Sistema di filtro per le opere d'arte
- 📝 Form di contatto integrato con EmailJS
- 🌐 SEO ottimizzato con meta tag e sitemap
- 📊 Integrazione con Google Analytics
- 🎯 Performance ottimizzata con lazy loading e code splitting

## 🛠️ Stack Tecnologico

- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Build Tool**: Vite
- **Form Handling**: EmailJS
- **Analytics**: Google Analytics
- **Deployment**: Vercel
- **Version Control**: Git + GitHub

## 🚀 Performance

Il sito è stato ottimizzato per garantire:
- Caricamento rapido delle immagini con lazy loading
- Code splitting per ridurre il bundle size
- Caching efficiente delle risorse statiche
- Ottimizzazione delle immagini per il web

## 🔒 Sicurezza

- Protezione CSRF per il form di contatto
- Headers di sicurezza configurati
- Rate limiting implementato
- Gestione sicura delle variabili d'ambiente

## 🌐 SEO

- Meta tag ottimizzati
- Sitemap dinamica
- Schema markup per le opere d'arte
- URL semantici e SEO-friendly

## 🚀 Come Iniziare

1. Clona il repository:
   ```bash
   git clone https://github.com/IvanAP-TA/darkcanvas-gallery.git
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Crea il file `.env` basandoti su `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

## 📦 Build per Produzione

```bash
npm run build
```

## 🔧 Configurazione

Il progetto utilizza variabili d'ambiente per le configurazioni sensibili. Crea un file `.env` con le seguenti variabili:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_SITE_URL=https://annibalepace.com
VITE_GA_MEASUREMENT_ID=your_ga_id
```

## 📝 Licenza

Questo progetto è privato e tutti i diritti sono riservati.

## 👥 Contributi

Per contribuire al progetto, contatta il proprietario del repository.

---

Realizzato con ❤️ per Annibale Pace
