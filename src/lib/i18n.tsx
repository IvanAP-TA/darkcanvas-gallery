import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'it' | 'zh';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',    // Home Page
    'home.title': 'Contemporary Artist',
    'home.subtitle': 'Discover the artistic world of Annibale Pace',
    'home.hero.description': 'Explore the official portfolio of Annibale Pace: works, biography, exhibitions, and contacts. Oil painting, figurative and contemporary art from Taranto, Puglia.',
    'home.hero.viewPortfolio': 'View Portfolio',
    'home.hero.aboutArtist': 'About the Artist',    'home.featured': 'Featured Works',
    'home.featured.description': 'A selection of recent and significant works from the artist\'s portfolio that showcase the depth and breadth of his artistic vision.',
    'home.featured.viewAll': 'View All Works',
    'home.followJourney': 'Follow the artistic journey','home.intro.title': 'About the Artist',
    'home.intro.text': 'Annibale Pace is a contemporary artist whose work explores the intersection of tradition and innovation in visual art.',
    'home.intro.bio1': 'Born in Grottaglie in 1963, Annibale Pace\'s artistic journey began with his passion for art nurtured since youth. His formal training started under Maestra Antonella Micocci, where he learned the fundamentals of artistic interpretation.',
    'home.intro.bio2': 'His artistic evolution continued through apprenticeships with Maestro Paolo Tagliaferro, where he developed his hyperrealistic technique, and later with Maestro E. G. Solferino at the Artistic Center "La Casaccia." Today, his work combines technical precision with contemporary artistic sensibilities, creating pieces that bridge tradition and innovation.',
    'home.intro.readMore': 'Read Full Biography',    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.filter.all': 'All',
    'portfolio.filter.technique': 'Technique',
    'portfolio.filter.theme': 'Theme',
    'portfolio.filter.year': 'Year',
    'portfolio.filter.by': 'Filter by',
    'portfolio.filter.clearAll': 'Clear all filters',
    'portfolio.noResults': 'No artworks found matching your criteria.',
      // Artwork Detail
    'artwork.technique': 'Technique',
    'artwork.dimensions': 'Dimensions',
    'artwork.year': 'Year',
    'artwork.theme': 'Theme',
    'artwork.backToPortfolio': 'Back to Portfolio',
    'artwork.nextArtwork': 'Next Artwork',
    'artwork.prevArtwork': 'Previous Artwork',
    'artwork.inquire': 'Inquire about this artwork',
    'artwork.inquireText': 'Interested in acquiring this piece or learning more about it? Contact us for availability and pricing details.',
    'artwork.contactGallery': 'Contact Gallery',
    'artwork.viewOnSaatchi': 'View on Saatchi Art',
    'artwork.notFound': 'Artwork Not Found',
    'artwork.notFoundText': 'The artwork you\'re looking for doesn\'t exist or has been moved.',
    'artwork.returnToPortfolio': 'Return to Portfolio',
      // About Page
    'about.title': 'About',
    'about.subtitle': 'Discover the story behind my artistic journey and creative process.',
    'about.biography': 'Biography',
    'about.approach': 'Artistic Approach',
    'about.exhibitions': 'Exhibitions & Recognition',
    'about.artist.title': 'About Annibale Pace',
    'about.artist.bio1': 'Born in Grottaglie in 1963, Annibale Pace\'s artistic journey began with his passion for art nurtured since youth. His formal training started under Maestra Antonella Micocci, where he learned the fundamentals of artistic interpretation.',
    'about.artist.bio2': 'His artistic evolution continued through apprenticeships with Maestro Paolo Tagliaferro, where he developed his hyperrealistic technique, and later with Maestro E. G. Solferino at the Artistic Center "La Casaccia." Today, his work combines technical precision with contemporary artistic sensibilities, creating pieces that bridge tradition and innovation.',
    'about.approach.text1': 'My artistic journey is driven by a deep exploration of form, color, and emotion. Through various media and techniques, I seek to create works that resonate with viewers on both an intellectual and emotional level.',
    'about.approach.text2': 'Each piece is a reflection of my ongoing dialogue with contemporary art, drawing inspiration from both classical traditions and modern innovations.',
    'about.approach.text3': 'Based in Taranto, Italy, my studio serves as a laboratory for artistic experimentation and creative expression.',
    'about.education.title': 'Education',
    'about.events.title': 'Notable Events',
    'about.exhibitions.title': 'Exhibitions',
      // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch with the artist',
    'contact.info.title': 'Info',
    'contact.info.studio': 'Studio Location',
    'contact.info.details': 'Contact Details',
    'contact.info.representation': 'Representation',
    'contact.info.representationText': 'For sales and exhibition inquiries, please contact me at annibalepaceart@gmail.com',
    'contact.form.title': 'Send a Message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.selectSubject': 'Select a subject',
    'contact.form.subjects.artwork': 'Artwork Inquiry',
    'contact.form.subjects.commission': 'Commission Request',
    'contact.form.subjects.exhibition': 'Exhibition Opportunity',
    'contact.form.subjects.press': 'Press/Media',
    'contact.form.subjects.other': 'Other',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'Error sending message. Please try again.',
    
    // Gallery
    'gallery.title': 'Photo Gallery',
    'gallery.subtitle': 'Behind the scenes and artistic process',
      // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.navigation': 'Navigation',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow Me',
    'footer.about': 'Contemporary artist exploring the boundaries between form, color, and emotion through various media and techniques.',
      // Techniques
    'technique.oil': 'Oil on Canvas',
    'technique.acrylic': 'Acrylic',
    'technique.watercolor': 'Watercolor',
    'technique.mixed': 'Mixed Media',
    'technique.Oil on Canvas': 'Oil on Canvas',
      // Themes
    'theme.portrait': 'Portrait',
    'theme.landscape': 'Landscape',
    'theme.abstract': 'Abstract',
    'theme.figurative': 'Figurative',
    'theme.still-life': 'Still Life',
    'theme.Neapolitan Culture': 'Neapolitan Culture',
    'theme.Mythology': 'Mythology',
    'theme.Surrealism': 'Surrealism',
    'theme.Metaphysical Art': 'Metaphysical Art',
    'theme.Landscape': 'Landscape',
    'theme.Portrait': 'Portrait',
    'theme.Still Life': 'Still Life',
    'theme.Photorealism': 'Photorealism',
    'theme.Aviation': 'Aviation',
    'theme.Classical Art': 'Classical Art',
    'theme.Figurative': 'Figurative',
    'theme.Portraiture': 'Portraiture',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.next': 'Next',
    'common.previous': 'Previous',
    
    // SEO
    'seo.home.title': 'Annibale Pace - Contemporary Artist',
    'seo.home.description': 'Official website of Annibale Pace, Italian contemporary artist. Discover artworks, biography, portfolio, exhibitions and contacts.',
    'seo.portfolio.title': 'Portfolio - Annibale Pace',
    'seo.portfolio.description': 'Explore the complete portfolio of contemporary artworks by Annibale Pace.',
    'seo.about.title': 'About - Annibale Pace',
    'seo.about.description': 'Learn about Annibale Pace\'s artistic journey, influences, and creative process.',
    'seo.contact.title': 'Contact - Annibale Pace',
    'seo.contact.description': 'Get in touch with contemporary artist Annibale Pace.',
    'seo.gallery.title': 'Gallery - Annibale Pace',
    'seo.gallery.description': 'Photo gallery showing the artistic process and behind the scenes.',
      // Artwork Titles
    'artwork.title.1': 'Happiness',
    'artwork.title.2': 'Zeus\'s Wrath',
    'artwork.title.3': 'Homage to Salvador Dalí',
    'artwork.title.4': 'Reminiscence',
    'artwork.title.5': 'Wine, grapes, sea',
    'artwork.title.6': 'High altitude passion',
    'artwork.title.7': 'Ethereal Reverence',
    'artwork.title.8': 'Meditation',
    'artwork.title.9': 'Seasonal Freshness',
    'artwork.title.10': 'Warrior\'s Rest',
    'artwork.title.11': 'Whispers of Firelight Painting',
    'artwork.title.12': 'Citrus',
    'artwork.title.13': 'Caring Eye',
    'artwork.title.14': 'The Phoenix',
    'artwork.title.15': 'Resonance Under the Stars',
    'artwork.title.16': 'Release',
    'artwork.title.17': 'Spirit of the Savannah',
    'artwork.title.18': 'Dunes of Her',
      // Artwork Descriptions
    'artwork.desc.1': 'This artwork is a celebration of the rich and colorful tradition of Naples, drawing inspiration from the iconic figure of Pulcinella and the vibrant folklore that permeates the city.',
    'artwork.desc.2': 'This artwork is a testament to the powerful influence of nature and mythology on my creative journey. Inspired by the tumultuous beauty of stormy seas and the timeless tales of ancient gods.',
    'artwork.desc.3': 'This artwork stands as a testament to my fascination with the enigmatic and surreal world of Salvador Dalí. Depicting Christ in the unmistakable style of the great surrealist.',
    'artwork.desc.4': 'Creating this artwork was an exploration of the surreal and enigmatic, inspired by the works of Giorgio De Chirico. It\'s one of my first forays into the realm of metaphysical art.',
    'artwork.desc.5': 'This painting is a testament to mastery in photorealistic painting. With details so sharp and lifelike that they seem to emerge from the canvas.',
    'artwork.desc.6': 'This is the painting I made for the centennial of the Italian Air Force.',
    'artwork.desc.7': 'This is one of my most introspective works and is one of my son\'s favorites. He has always told me he considers it an extremely relaxing painting.',
    'artwork.desc.8': 'The inspiration for this work flowed from the depths of my soul, ignited by the eternal beauty of Michelangelo\'s David.',
    'artwork.desc.9': 'This painting is the culmination of my experiments with photorealistic painting. Fruit is always a fascinating subject.',
    'artwork.desc.10': 'This painting depicts a warrior finding solace after battle, symbolizing the quest for inner peace following life\'s challenges.',
    'artwork.desc.11': 'An exploration of the nuances between spoken words and unspoken thoughts, encouraging viewers to look beyond the surface.',
    'artwork.desc.12': 'A vibrant composition capturing the zest and freshness of citrus fruits, evoking feelings of vitality and rejuvenation.',
    'artwork.desc.13': 'Focusing on the expressive power of a compassionate gaze, this piece highlights the importance of empathy and human connection.',
    'artwork.desc.14': 'Drawing inspiration from the mythical bird, this artwork represents rebirth and hope, illustrating a creature rising anew from its ashes.',
    'artwork.desc.15': 'This work was inspired by the captivating union between architecture, memory, and sound. Set in a quiet, historic Italian town square at night.',
    'artwork.desc.16': 'Two weathered hands gently open, releasing a butterfly into the air. The cracked eggshell symbolizes rebirth, while the vibrant wings speak of transformation.',
    'artwork.desc.17': 'This painting was born from a deep reverence for both African heritage and the natural world. The central figure becomes one with the landscape.',
    'artwork.desc.18': 'In this dreamlike sunset, rolling dunes stretch into the horizon — but a second glance reveals the soft contours of a woman\'s body merging with the earth.',
    
    // Photo Gallery Titles
    'photo.title.artist': 'The Artist',
    'photo.title.mg_6406': 'In Detail',
    'photo.title.mg_6414': 'Technical Mastery',
    'photo.title.mg_6416': 'Concentration',
    'photo.title.mg_6428': 'The Studio',
    'photo.title.mg_6432': 'Birth of a Painting',
    'photo.title.mg_6446': 'Passion and Dedication',
    'photo.title.mg_6450': 'Artistic Vision',
    'photo.title.mg_6467': 'Creative Space',
    'photo.title.mg_4202': 'Art in Progress',
    'photo.title.mg_4203': 'Artistic Expression',
    'photo.title.img_7113': 'Tools of the Trade',
    'photo.title.img_7122': 'Work Environment',
    
    // Photo Gallery Descriptions
    'photo.desc.artist': 'Annibale Pace in his studio, where emotions and visions become art',
    'photo.desc.mg_6406': 'Perfection hidden in small details, each brushstroke tells a story',
    'photo.desc.mg_6414': 'The artistic gesture that merges technical precision with emotional expression',
    'photo.desc.mg_6416': 'Immersed in the creative process, where every decision influences the final work',
    'photo.desc.mg_6428': 'The atelier: a place of inspiration, experimentation and continuous creation',
    'photo.desc.mg_6432': 'The dialogue between artist and canvas evolves constantly until completion',
    'photo.desc.mg_6446': 'Hours of meticulous work guided by the love for art and beauty',
    'photo.desc.mg_6450': 'The eye that transforms the ordinary into extraordinary through artistic sensibility',
    'photo.desc.mg_6467': 'Among canvases, colors and brushes: the environment where ideas become reality',
    'photo.desc.mg_4202': 'The artistic process captured at the moment of its highest intensity',
    'photo.desc.mg_4203': 'The hand that gives form to thoughts, transforming color into pure emotion',
    'photo.desc.img_7113': 'The materials and tools the artist masters to bring his visions to life',
    'photo.desc.img_7122': 'The creative order of the atelier, where every object has its precise meaning',
  },
  it: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.gallery': 'Galleria',
    'nav.about': 'Chi Sono',
    'nav.contact': 'Contatti',    // Home Page
    'home.title': 'Artista Contemporaneo',
    'home.subtitle': 'Scopri il mondo artistico di Annibale Pace',
    'home.hero.description': 'Esplora il portfolio ufficiale di Annibale Pace: opere, biografia, mostre e contatti. Pittura ad olio, arte figurativa e contemporanea da Taranto, Puglia.',
    'home.hero.viewPortfolio': 'Vedi Portfolio',
    'home.hero.aboutArtist': 'L\'Artista',    'home.featured': 'Opere in Evidenza',
    'home.featured.description': 'Una selezione di opere recenti e significative dal portfolio dell\'artista che mostrano la profondità e l\'ampiezza della sua visione artistica.',
    'home.featured.viewAll': 'Vedi Tutte le Opere',
    'home.followJourney': 'Segui il viaggio artistico','home.intro.title': 'L\'Artista',
    'home.intro.text': 'Annibale Pace è un artista contemporaneo che esplora l\'intersezione tra tradizione e innovazione nell\'arte visiva.',
    'home.intro.bio1': 'Nato a Grottaglie nel 1963, il percorso artistico di Annibale Pace è iniziato con la sua passione per l\'arte coltivata fin dalla giovinezza. La sua formazione formale è iniziata sotto la Maestra Antonella Micocci, dove ha appreso i fondamenti dell\'interpretazione artistica.',
    'home.intro.bio2': 'La sua evoluzione artistica è continuata attraverso apprendistati con il Maestro Paolo Tagliaferro, dove ha sviluppato la sua tecnica iperrealistica, e successivamente con il Maestro E. G. Solferino presso il Centro Artistico "La Casaccia." Oggi, il suo lavoro combina precisione tecnica con sensibilità artistiche contemporanee, creando opere che collegano tradizione e innovazione.',
    'home.intro.readMore': 'Leggi la Biografia Completa',    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.filter.all': 'Tutte',
    'portfolio.filter.technique': 'Tecnica',
    'portfolio.filter.theme': 'Tema',
    'portfolio.filter.year': 'Anno',
    'portfolio.filter.by': 'Filtra per',
    'portfolio.filter.clearAll': 'Rimuovi tutti i filtri',
    'portfolio.noResults': 'Nessuna opera trovata per i criteri selezionati.',
      // Artwork Detail
    'artwork.technique': 'Tecnica',
    'artwork.dimensions': 'Dimensioni',
    'artwork.year': 'Anno',
    'artwork.theme': 'Tema',
    'artwork.backToPortfolio': 'Torna al Portfolio',
    'artwork.nextArtwork': 'Opera Successiva',
    'artwork.prevArtwork': 'Opera Precedente',
    'artwork.inquire': 'Richiedi informazioni su quest\'opera',
    'artwork.inquireText': 'Interessato ad acquisire questo pezzo o saperne di più? Contattaci per disponibilità e dettagli sui prezzi.',
    'artwork.contactGallery': 'Contatta la Galleria',
    'artwork.viewOnSaatchi': 'Vedi su Saatchi Art',
    'artwork.notFound': 'Opera Non Trovata',
    'artwork.notFoundText': 'L\'opera che stai cercando non esiste o è stata spostata.',
    'artwork.returnToPortfolio': 'Ritorna al Portfolio',
      // About Page
    'about.title': 'Chi Sono',
    'about.subtitle': 'Scopri la storia dietro il mio percorso artistico e processo creativo.',
    'about.biography': 'Biografia',
    'about.approach': 'Approccio Artistico',
    'about.exhibitions': 'Mostre e Riconoscimenti',
    'about.artist.title': 'Chi è Annibale Pace',
    'about.artist.bio1': 'Nato a Grottaglie nel 1963, il percorso artistico di Annibale Pace è iniziato con la sua passione per l\'arte coltivata fin dalla giovinezza. La sua formazione formale è iniziata sotto la Maestra Antonella Micocci, dove ha appreso i fondamenti dell\'interpretazione artistica.',
    'about.artist.bio2': 'La sua evoluzione artistica è continuata attraverso apprendistati con il Maestro Paolo Tagliaferro, dove ha sviluppato la sua tecnica iperrealistica, e successivamente con il Maestro E. G. Solferino presso il Centro Artistico "La Casaccia." Oggi, il suo lavoro combina precisione tecnica con sensibilità artistiche contemporanee, creando opere che collegano tradizione e innovazione.',
    'about.approach.text1': 'Il mio percorso artistico è guidato da una profonda esplorazione di forma, colore ed emozione. Attraverso varie tecniche e media, cerco di creare opere che risuonino con gli spettatori sia a livello intellettuale che emotivo.',
    'about.approach.text2': 'Ogni pezzo è un riflesso del mio dialogo continuo con l\'arte contemporanea, traendo ispirazione sia dalle tradizioni classiche che dalle innovazioni moderne.',
    'about.approach.text3': 'Con sede a Taranto, Italia, il mio studio funge da laboratorio per la sperimentazione artistica e l\'espressione creativa.',
    'about.education.title': 'Formazione',
    'about.events.title': 'Eventi Significativi',
    'about.exhibitions.title': 'Mostre',
      // Contact Page
    'contact.title': 'Contatti',
    'contact.subtitle': 'Entra in contatto con l\'artista',
    'contact.info.title': 'Informazioni',
    'contact.info.studio': 'Ubicazione Studio',
    'contact.info.details': 'Dettagli di Contatto',
    'contact.info.representation': 'Rappresentanza',
    'contact.info.representationText': 'Per vendite e opportunità espositive, contattami all\'indirizzo annibalepaceart@gmail.com',
    'contact.form.title': 'Invia un Messaggio',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Oggetto',
    'contact.form.selectSubject': 'Seleziona un oggetto',
    'contact.form.subjects.artwork': 'Richiesta Opera',
    'contact.form.subjects.commission': 'Richiesta Commissione',
    'contact.form.subjects.exhibition': 'Opportunità Espositiva',
    'contact.form.subjects.press': 'Stampa/Media',
    'contact.form.subjects.other': 'Altro',
    'contact.form.message': 'Messaggio',
    'contact.form.send': 'Invia Messaggio',
    'contact.form.sending': 'Invio in corso...',
    'contact.form.success': 'Messaggio inviato con successo!',
    'contact.form.error': 'Errore nell\'invio del messaggio. Riprova.',
    
    // Gallery
    'gallery.title': 'Galleria Fotografica',
    'gallery.subtitle': 'Dietro le quinte e processo artistico',
      // Footer
    'footer.rights': 'Tutti i diritti riservati.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Termini di Servizio',
    'footer.navigation': 'Navigazione',
    'footer.contact': 'Contatti',
    'footer.follow': 'Seguimi',
    'footer.about': 'Artista contemporaneo che esplora i confini tra forma, colore ed emozione attraverso varie tecniche e media.',
      // Techniques
    'technique.oil': 'Olio su Tela',
    'technique.acrylic': 'Acrilico',
    'technique.watercolor': 'Acquerello',
    'technique.mixed': 'Tecnica Mista',
    'technique.Oil on Canvas': 'Olio su Tela',
      // Themes
    'theme.portrait': 'Ritratto',
    'theme.landscape': 'Paesaggio',
    'theme.abstract': 'Astratto',
    'theme.figurative': 'Figurativo',
    'theme.still-life': 'Natura Morta',
    'theme.Neapolitan Culture': 'Cultura Napoletana',
    'theme.Mythology': 'Mitologia',
    'theme.Surrealism': 'Surrealismo',
    'theme.Metaphysical Art': 'Arte Metafisica',
    'theme.Landscape': 'Paesaggio',
    'theme.Portrait': 'Ritratto',
    'theme.Still Life': 'Natura Morta',
    'theme.Photorealism': 'Fotorealismo',
    'theme.Aviation': 'Aviazione',
    'theme.Classical Art': 'Arte Classica',
    'theme.Figurative': 'Figurativo',
    'theme.Portraiture': 'Ritrattistica',
    
    // Common
    'common.loading': 'Caricamento...',
    'common.error': 'Errore',
    'common.retry': 'Riprova',
    'common.close': 'Chiudi',
    'common.next': 'Successivo',
    'common.previous': 'Precedente',
    
    // SEO
    'seo.home.title': 'Annibale Pace - Artista Contemporaneo',
    'seo.home.description': 'Sito ufficiale di Annibale Pace, artista contemporaneo italiano. Scopri opere, biografia, portfolio, mostre e contatti.',
    'seo.portfolio.title': 'Portfolio - Annibale Pace',
    'seo.portfolio.description': 'Esplora il portfolio completo delle opere contemporanee di Annibale Pace.',
    'seo.about.title': 'Chi Sono - Annibale Pace',
    'seo.about.description': 'Scopri il percorso artistico, le influenze e il processo creativo di Annibale Pace.',
    'seo.contact.title': 'Contatti - Annibale Pace',
    'seo.contact.description': 'Entra in contatto con l\'artista contemporaneo Annibale Pace.',
    'seo.gallery.title': 'Galleria - Annibale Pace',
    'seo.gallery.description': 'Galleria fotografica che mostra il processo artistico e dietro le quinte.',
      // Artwork Titles
    'artwork.title.1': 'Felicità',
    'artwork.title.2': 'L\'ira di Zeus',
    'artwork.title.3': 'Omaggio a Salvador Dalí',
    'artwork.title.4': 'Reminiscenza',
    'artwork.title.5': 'Vino, uva, mare',
    'artwork.title.6': 'Passione ad alta quota',
    'artwork.title.7': 'Riverenza Eterea',
    'artwork.title.8': 'Meditazione',
    'artwork.title.9': 'Freschezza Stagionale',
    'artwork.title.10': 'Il Riposo del Guerriero',
    'artwork.title.11': 'Sussurri di Luce di Fuoco',
    'artwork.title.12': 'Agrumi',
    'artwork.title.13': 'Occhio Premuroso',
    'artwork.title.14': 'La Fenice',
    'artwork.title.15': 'Risonanza Sotto le Stelle',
    'artwork.title.16': 'Liberazione',
    'artwork.title.17': 'Spirito della Savana',
    'artwork.title.18': 'Dune di Lei',
      // Artwork Descriptions
    'artwork.desc.1': 'Quest\'opera è una celebrazione della ricca e colorata tradizione di Napoli, traendo ispirazione dall\'iconica figura di Pulcinella e dal folklore vibrante che permea la città.',
    'artwork.desc.2': 'Quest\'opera testimonia la potente influenza della natura e della mitologia sul mio percorso creativo. Ispirata dalla bellezza tumultuosa dei mari tempestosi e dai racconti senza tempo degli antichi dei.',
    'artwork.desc.3': 'Quest\'opera rappresenta una testimonianza del mio fascino per il mondo enigmatico e surreale di Salvador Dalí. Raffigurando Cristo nell\'inconfondibile stile del grande surrealista.',
    'artwork.desc.4': 'Creare quest\'opera è stata un\'esplorazione del surreale e dell\'enigmatico, ispirata dalle opere di Giorgio De Chirico. È una delle mie prime incursioni nel regno dell\'arte metafisica.',
    'artwork.desc.5': 'Questo dipinto è una testimonianza della maestria nella pittura fotorealistica. Con dettagli così nitidi e realistici che sembrano emergere dalla tela.',
    'artwork.desc.6': 'Questo è il dipinto che ho realizzato per il centenario dell\'Aeronautica Militare Italiana.',
    'artwork.desc.7': 'Questa è una delle mie opere più introspettive ed è una delle preferite di mio figlio. Mi ha sempre detto che la considera un dipinto estremamente rilassante.',
    'artwork.desc.8': 'L\'ispirazione per quest\'opera è sgorgata dalle profondità della mia anima, accesa dall\'eterna bellezza del David di Michelangelo.',
    'artwork.desc.9': 'Questo dipinto è il culmine dei miei esperimenti con la pittura fotorealistica. La frutta è sempre un soggetto affascinante.',
    'artwork.desc.10': 'Questo dipinto raffigura un guerriero che trova consolazione dopo la battaglia, simboleggiando la ricerca della pace interiore dopo le sfide della vita.',
    'artwork.desc.11': 'Un\'esplorazione delle sfumature tra parole pronunciate e pensieri non espressi, incoraggiando gli spettatori a guardare oltre la superficie.',
    'artwork.desc.12': 'Una composizione vibrante che cattura il sapore e la freschezza degli agrumi, evocando sentimenti di vitalità e ringiovanimento.',
    'artwork.desc.13': 'Concentrandosi sul potere espressivo di uno sguardo compassionevole, questo pezzo evidenzia l\'importanza dell\'empatia e della connessione umana.',
    'artwork.desc.14': 'Traendo ispirazione dall\'uccello mitologico, quest\'opera rappresenta la rinascita e la speranza, illustrando una creatura che risorge dalle proprie ceneri.',
    'artwork.desc.15': 'Quest\'opera è stata ispirata dall\'unione affascinante tra architettura, memoria e suono. Ambientata in una piazza storica italiana silenziosa di notte.',
    'artwork.desc.16': 'Due mani logore si aprono dolcemente, liberando una farfalla nell\'aria. Il guscio d\'uovo rotto simboleggia la rinascita, mentre le ali vibranti parlano di trasformazione.',
    'artwork.desc.17': 'Questo dipinto è nato da una profonda riverenza sia per l\'eredità africana che per il mondo naturale. La figura centrale si fonde con il paesaggio.',
    'artwork.desc.18': 'In questo tramonto onirico, dune ondulate si estendono verso l\'orizzonte — ma un secondo sguardo rivela i contorni morbidi del corpo di una donna che si fonde con la terra.',
    
    // Photo Gallery Titles
    'photo.title.artist': 'L\'Artista',
    'photo.title.mg_6406': 'Nel Dettaglio',
    'photo.title.mg_6414': 'Maestria Tecnica',
    'photo.title.mg_6416': 'Concentrazione',
    'photo.title.mg_6428': 'Lo Studio',
    'photo.title.mg_6432': 'Nascita di un Dipinto',
    'photo.title.mg_6446': 'Passione e Dedizione',
    'photo.title.mg_6450': 'Visione Artistica',
    'photo.title.mg_6467': 'Spazio Creativo',
    'photo.title.mg_4202': 'Arte in Corso',
    'photo.title.mg_4203': 'Espressione Artistica',
    'photo.title.img_7113': 'Strumenti del Mestiere',
    'photo.title.img_7122': 'Ambiente di Lavoro',
    
    // Photo Gallery Descriptions
    'photo.desc.artist': 'Annibale Pace nel suo studio, dove emozioni e visioni diventano arte',
    'photo.desc.mg_6406': 'La perfezione nascosta nei piccoli dettagli, ogni pennellata racconta una storia',
    'photo.desc.mg_6414': 'Il gesto artistico che unisce precisione tecnica ed espressione emotiva',
    'photo.desc.mg_6416': 'Immerso nel processo creativo, dove ogni decisione influenza l\'opera finale',
    'photo.desc.mg_6428': 'L\'atelier: un luogo di ispirazione, sperimentazione e creazione continua',
    'photo.desc.mg_6432': 'Il dialogo tra artista e tela si evolve costantemente fino al completamento',
    'photo.desc.mg_6446': 'Ore di lavoro meticoloso guidato dall\'amore per l\'arte e la bellezza',
    'photo.desc.mg_6450': 'L\'occhio che trasforma l\'ordinario in straordinario attraverso la sensibilità artistica',
    'photo.desc.mg_6467': 'Tra tele, colori e pennelli: l\'ambiente dove le idee diventano realtà',
    'photo.desc.mg_4202': 'Il processo artistico catturato nel momento della sua massima intensità',
    'photo.desc.mg_4203': 'La mano che dà forma ai pensieri, trasformando il colore in pura emozione',
    'photo.desc.img_7113': 'I materiali e gli strumenti che l\'artista padroneggia per dare vita alle sue visioni',
    'photo.desc.img_7122': 'L\'ordine creativo dell\'atelier, dove ogni oggetto ha il suo significato preciso',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.portfolio': '作品集',
    'nav.gallery': '画廊',
    'nav.about': '关于',
    'nav.contact': '联系',    // Home Page
    'home.title': '当代艺术家',
    'home.subtitle': '探索安尼巴莱·帕切的艺术世界',
    'home.hero.description': '探索安尼巴莱·帕切的官方作品集：作品、传记、展览和联系方式。来自普利亚塔兰托的油画、具象和当代艺术。',
    'home.hero.viewPortfolio': '查看作品集',
    'home.hero.aboutArtist': '关于艺术家',    'home.featured': '精选作品',
    'home.featured.description': '从艺术家作品集中精选的近期重要作品，展现其艺术视野的深度和广度。',
    'home.featured.viewAll': '查看所有作品',
    'home.followJourney': '跟随艺术之旅','home.intro.title': '关于艺术家',
    'home.intro.text': '安尼巴莱·帕切是一位当代艺术家，其作品探索视觉艺术中传统与创新的交汇点。',
    'home.intro.bio1': '安尼巴莱·帕切1963年出生于格罗塔列，他的艺术之路始于从年轻时就培养的对艺术的热情。他的正式训练始于安东内拉·米科奇老师门下，在那里他学习了艺术诠释的基础。',
    'home.intro.bio2': '他的艺术发展在保罗·塔利亚费罗大师门下继续进行，在那里他发展了超写实技法，后来又在"拉卡夏"艺术中心师从E.G.索尔费里诺大师。如今，他的作品将技术精确性与当代艺术敏感性相结合，创作出连接传统与创新的作品。',
    'home.intro.readMore': '阅读完整传记',    // Portfolio
    'portfolio.title': '作品集',
    'portfolio.filter.all': '全部',
    'portfolio.filter.technique': '技法',
    'portfolio.filter.theme': '主题',
    'portfolio.filter.year': '年份',
    'portfolio.filter.by': '筛选条件',
    'portfolio.filter.clearAll': '清除所有筛选',
    'portfolio.noResults': '未找到符合条件的作品。',
      // Artwork Detail
    'artwork.technique': '技法',
    'artwork.dimensions': '尺寸',
    'artwork.year': '年份',
    'artwork.theme': '主题',
    'artwork.backToPortfolio': '返回作品集',
    'artwork.nextArtwork': '下一件作品',
    'artwork.prevArtwork': '上一件作品',
    'artwork.inquire': '咨询此作品',
    'artwork.inquireText': '有兴趣收购此作品或了解更多信息？请联系我们获取可用性和价格详情。',
    'artwork.contactGallery': '联系画廊',
    'artwork.viewOnSaatchi': '在Saatchi Art查看',
    'artwork.notFound': '未找到作品',
    'artwork.notFoundText': '您要查找的作品不存在或已被移动。',
    'artwork.returnToPortfolio': '返回作品集',
      // About Page
    'about.title': '关于',
    'about.subtitle': '探索我艺术历程背后的故事和创作过程。',
    'about.biography': '传记',
    'about.approach': '艺术方法',
    'about.exhibitions': '展览与认可',
    'about.artist.title': '关于安尼巴莱·帕切',
    'about.artist.bio1': '安尼巴莱·帕切1963年出生于格罗塔列，他的艺术之路始于从年轻时就培养的对艺术的热情。他的正式训练始于安东内拉·米科奇老师门下，在那里他学习了艺术诠释的基础。',
    'about.artist.bio2': '他的艺术发展在保罗·塔利亚费罗大师门下继续进行，在那里他发展了超写实技法，后来又在"拉卡夏"艺术中心师从E.G.索尔费里诺大师。如今，他的作品将技术精确性与当代艺术敏感性相结合，创作出连接传统与创新的作品。',
    'about.approach.text1': '我的艺术历程由对形式、色彩和情感的深入探索所驱动。通过各种媒介和技法，我寻求创作出在智力和情感层面上都能与观众产生共鸣的作品。',
    'about.approach.text2': '每件作品都反映了我与当代艺术的持续对话，从古典传统和现代创新中汲取灵感。',
    'about.approach.text3': '我的工作室位于意大利塔兰托，是艺术实验和创意表达的实验室。',
    'about.education.title': '教育背景',
    'about.events.title': '重要事件',
    'about.exhibitions.title': '展览',
      // Contact Page
    'contact.title': '联系',
    'contact.subtitle': '与艺术家取得联系',
    'contact.info.title': '信息',
    'contact.info.studio': '工作室地址',
    'contact.info.details': '联系详情',
    'contact.info.representation': '代理',
    'contact.info.representationText': '如需购买作品或展览合作，请联系 annibalepaceart@gmail.com',
    'contact.form.title': '发送消息',
    'contact.form.name': '姓名',
    'contact.form.email': '邮箱',
    'contact.form.subject': '主题',
    'contact.form.selectSubject': '选择主题',
    'contact.form.subjects.artwork': '作品咨询',
    'contact.form.subjects.commission': '委托创作',
    'contact.form.subjects.exhibition': '展览机会',
    'contact.form.subjects.press': '媒体/新闻',
    'contact.form.subjects.other': '其他',
    'contact.form.message': '留言',
    'contact.form.send': '发送消息',
    'contact.form.sending': '发送中...',
    'contact.form.success': '消息发送成功！',
    'contact.form.error': '发送消息时出错，请重试。',
    
    // Gallery
    'gallery.title': '照片画廊',
    'gallery.subtitle': '幕后花絮和艺术过程',
      // Footer
    'footer.rights': '版权所有。',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.navigation': '导航',
    'footer.contact': '联系',
    'footer.follow': '关注我',
    'footer.about': '当代艺术家，通过各种媒介和技法探索形式、色彩和情感之间的界限。',
      // Techniques
    'technique.oil': '布面油画',
    'technique.acrylic': '丙烯画',
    'technique.watercolor': '水彩画',
    'technique.mixed': '混合媒材',
    'technique.Oil on Canvas': '布面油画',
      // Themes
    'theme.portrait': '肖像',
    'theme.landscape': '风景',
    'theme.abstract': '抽象',
    'theme.figurative': '具象',
    'theme.still-life': '静物',
    'theme.Neapolitan Culture': '那不勒斯文化',
    'theme.Mythology': '神话',
    'theme.Surrealism': '超现实主义',
    'theme.Metaphysical Art': '形而上艺术',
    'theme.Landscape': '风景',
    'theme.Portrait': '肖像',
    'theme.Still Life': '静物',
    'theme.Photorealism': '照片写实主义',
    'theme.Aviation': '航空',
    'theme.Classical Art': '古典艺术',
    'theme.Figurative': '具象',
    'theme.Portraiture': '肖像画',
    
    // Common
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.retry': '重试',
    'common.close': '关闭',
    'common.next': '下一个',
    'common.previous': '上一个',
    
    // SEO
    'seo.home.title': '安尼巴莱·帕切 - 当代艺术家',
    'seo.home.description': '安尼巴莱·帕切官方网站，意大利当代艺术家。探索作品、传记、作品集、展览和联系方式。',
    'seo.portfolio.title': '作品集 - 安尼巴莱·帕切',
    'seo.portfolio.description': '探索安尼巴莱·帕切的完整当代艺术作品集。',
    'seo.about.title': '关于 - 安尼巴莱·帕切',
    'seo.about.description': '了解安尼巴莱·帕切的艺术历程、影响和创作过程。',
    'seo.contact.title': '联系 - 安尼巴莱·帕切',
    'seo.contact.description': '与当代艺术家安尼巴莱·帕切取得联系。',
    'seo.gallery.title': '画廊 - 安尼巴莱·帕切',
    'seo.gallery.description': '展示艺术过程和幕后花絮的照片画廊。',
      // Artwork Titles
    'artwork.title.1': '快乐',
    'artwork.title.2': '宙斯之怒',
    'artwork.title.3': '向萨尔瓦多·达利致敬',
    'artwork.title.4': '回忆',
    'artwork.title.5': '酒、葡萄、海',
    'artwork.title.6': '高空激情',
    'artwork.title.7': '空灵的敬意',
    'artwork.title.8': '冥想',
    'artwork.title.9': '季节清新',
    'artwork.title.10': '战士的休息',
    'artwork.title.11': '火光低语',
    'artwork.title.12': '柑橘',
    'artwork.title.13': '关爱之眼',
    'artwork.title.14': '凤凰',
    'artwork.title.15': '星空下的共鸣',
    'artwork.title.16': '释放',
    'artwork.title.17': '草原之魂',
    'artwork.title.18': '她的沙丘',
      // Artwork Descriptions
    'artwork.desc.1': '这件艺术品是对那不勒斯丰富多彩传统的庆祝，从标志性的普尔奇内拉形象和弥漫整个城市的生动民俗中汲取灵感。',
    'artwork.desc.2': '这件艺术品证明了自然和神话对我创作历程的强大影响。灵感来自汹涌大海的动荡之美和古代诸神的永恒传说。',
    'artwork.desc.3': '这件艺术品证明了我对萨尔瓦多·达利神秘和超现实世界的迷恋。以这位伟大超现实主义大师独特的风格描绘基督。',
    'artwork.desc.4': '创作这件艺术品是对超现实和神秘的探索，受到乔治·德·基里科作品的启发。这是我首次涉足形而上艺术领域的作品之一。',
    'artwork.desc.5': '这幅画证明了我在超写实绘画方面的精湛技艺。细节如此清晰逼真，仿佛要从画布中浮现出来。',
    'artwork.desc.6': '这是我为意大利空军百年庆典创作的画作。',
    'artwork.desc.7': '这是我最内省的作品之一，也是我儿子最喜欢的作品之一。他总是告诉我，他认为这是一幅极其令人放松的画作。',
    'artwork.desc.8': '这件作品的灵感源自我灵魂深处，被米开朗基罗大卫雕像的永恒之美所点燃。',
    'artwork.desc.9': '这幅画是我超写实绘画实验的巅峰之作。水果总是一个迷人的主题。',
    'artwork.desc.10': '这幅画描绘了一位战士在战斗后寻找慰藉，象征着在生活挑战后寻求内心平静的过程。',
    'artwork.desc.11': '探索口语和未说出想法之间的细微差别，鼓励观众看透表面。',
    'artwork.desc.12': '一个充满活力的构图，捕捉了柑橘类水果的活力和新鲜感，唤起活力和复兴的感觉。',
    'artwork.desc.13': '专注于富有同情心凝视的表达力量，这件作品突出了同理心和人际联系的重要性。',
    'artwork.desc.14': '从神话鸟类中汲取灵感，这件艺术品代表重生和希望，描绘了一个从灰烬中重新崛起的生物。',
    'artwork.desc.15': '这件作品受到建筑、记忆和声音之间迷人结合的启发。设置在夜晚安静的意大利历史小镇广场。',
    'artwork.desc.16': '两只风化的手轻轻张开，将一只蝴蝶释放到空中。破裂的蛋壳象征重生，而鲜艳的翅膀诉说着转变。',
    'artwork.desc.17': '这幅画诞生于对非洲遗产和自然世界的深深敬意。中心人物与风景融为一体。',
    'artwork.desc.18': '在这个梦幻般的日落中，起伏的沙丘延伸到地平线——但第二眼便会发现女性身体与大地融合的柔美轮廓。',
    
    // Photo Gallery Titles
    'photo.title.artist': '艺术家',
    'photo.title.mg_6406': '细节之美',
    'photo.title.mg_6414': '技术精湛',
    'photo.title.mg_6416': '专注',
    'photo.title.mg_6428': '工作室',
    'photo.title.mg_6432': '画作的诞生',
    'photo.title.mg_6446': '热情与奉献',
    'photo.title.mg_6450': '艺术视野',
    'photo.title.mg_6467': '创作空间',
    'photo.title.mg_4202': '艺术进行中',
    'photo.title.mg_4203': '艺术表达',
    'photo.title.img_7113': '工艺工具',
    'photo.title.img_7122': '工作环境',
    
    // Photo Gallery Descriptions
    'photo.desc.artist': '安尼巴莱·帕切在他的工作室中，情感和愿景在这里化为艺术',
    'photo.desc.mg_6406': '隐藏在小细节中的完美，每一笔都在诉说一个故事',
    'photo.desc.mg_6414': '将技术精确性与情感表达融合的艺术手势',
    'photo.desc.mg_6416': '沉浸在创作过程中，每个决定都会影响最终作品',
    'photo.desc.mg_6428': '工作室：灵感、实验和持续创作的场所',
    'photo.desc.mg_6432': '艺术家与画布之间的对话不断演进直至完成',
    'photo.desc.mg_6446': '由对艺术和美的热爱引导的细致工作时光',
    'photo.desc.mg_6450': '通过艺术敏感性将平凡转化为非凡的眼睛',
    'photo.desc.mg_6467': '在画布、颜料和画笔之间：思想变为现实的环境',
    'photo.desc.mg_4202': '在最高强度时刻捕捉的艺术过程',
    'photo.desc.mg_4203': '赋予思想形式、将色彩转化为纯粹情感的手',
    'photo.desc.img_7113': '艺术家掌握的材料和工具，用以实现他的愿景',
    'photo.desc.img_7122': '工作室的创造性秩序，每个物品都有其精确的意义',
  }
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'it', 'zh'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    return translation;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Helper function to get translated artwork data
export const getArtworkTranslations = (artworkId: string, language: Language) => {
  const titleKey = `artwork.title.${artworkId}`;
  const descKey = `artwork.desc.${artworkId}`;
  
  return {
    title: translations[language][titleKey] || null,
    description: translations[language][descKey] || null
  };
};

// Helper function to get translated photo data
export const getPhotoTranslations = (photoId: string, language: Language) => {
  const titleKey = `photo.title.${photoId}`;
  const descKey = `photo.desc.${photoId}`;
  
  return {
    title: translations[language][titleKey] || null,
    description: translations[language][descKey] || null
  };
};