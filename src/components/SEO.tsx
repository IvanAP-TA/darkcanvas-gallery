import { Helmet } from 'react-helmet-async';
import { useI18n } from '@/lib/i18n';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export default function SEO({ title, description, image, url }: SEOProps) {
  const { language } = useI18n();
  const siteUrl = url || 'https://www.annibalepace.com';
  const defaultImage = image || '/paintings/artist.webp';
  const fullTitle = `${title} | Annibale Pace - Contemporary Artist`;

  // Localized content based on language
  const localeMap = {
    en: 'en_US',
    it: 'it_IT', 
    zh: 'zh_CN'
  };

  const keywordsMap = {
    en: 'Annibale Pace, contemporary artist, Italian painter, contemporary art, oil paintings, art exhibitions, art gallery, Taranto, Apulia, realistic painting, figurative art',
    it: 'Annibale Pace, artista contemporaneo, pittore italiano, arte contemporanea, dipinti olio su tela, mostre d\'arte, galleria d\'arte, Taranto, Puglia, arte pugliese, pittura realistica, arte figurativa, artista pugliese',
    zh: 'Annibale Pace, 当代艺术家, 意大利画家, 当代艺术, 油画, 艺术展览, 艺术画廊, 塔兰托, 普利亚, 写实绘画, 具象艺术'
  };

  const jobTitleMap = {
    en: 'Contemporary Artist',
    it: 'Artista Contemporaneo',
    zh: '当代艺术家'
  };

  const descriptionMap = {
    en: 'Italian contemporary artist specialized in oil painting and mixed media techniques',
    it: 'Artista contemporaneo italiano specializzato in pittura ad olio e tecniche miste',
    zh: '意大利当代艺术家，专精于油画和混合媒介技法'
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="language" content={language} />
      <meta name="geo.region" content="IT-TA" />
      <meta name="geo.placename" content="Taranto" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:locale" content={localeMap[language]} />
      <meta property="og:site_name" content="Annibale Pace Art" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={defaultImage} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Annibale Pace" />
      <meta name="keywords" content={keywordsMap[language]} />
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
          "jobTitle": jobTitleMap[language],
          "description": descriptionMap[language],
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