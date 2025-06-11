import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export default function SEO({ title, description, image, url }: SEOProps) {
  const siteUrl = url || 'https://www.annibalepace.com';
  const defaultImage = image || '/paintings/artist.webp';
  const fullTitle = `${title} | Annibale Pace - Artista Contemporaneo`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="language" content="it" />
      <meta name="geo.region" content="IT-TA" />
      <meta name="geo.placename" content="Taranto" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content="Annibale Pace Arte" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={defaultImage} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Annibale Pace" />
      <meta name="keywords" content="Annibale Pace, artista contemporaneo, pittore italiano, arte contemporanea, dipinti olio su tela, mostre d'arte, galleria d'arte, Taranto, Puglia, arte pugliese, pittura realistica, arte figurativa, artista pugliese" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={siteUrl} />

      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://www.annibalepace.com/#person",
          "name": "Annibale Pace",
          "url": "https://www.annibalepace.com",
          "sameAs": [
            "https://www.facebook.com/annibale.pace",
            "https://www.instagram.com/annibalepaceart/",
            "https://www.saatchiart.com/en-it/account/profile/2284565",
            "https://www.etsy.com/shop/AnnibaleArtworks"
          ],
          "jobTitle": "Artista Contemporaneo",
          "description": "Artista contemporaneo italiano specializzato in pittura ad olio e tecniche miste",
          "image": "https://www.annibalepace.com/paintings/artist.webp",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Taranto",
            "addressRegion": "TA",
            "addressCountry": "IT"
          }
        })}
      </script>
    </Helmet>
  );
}