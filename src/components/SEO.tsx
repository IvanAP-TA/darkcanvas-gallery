import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export default function SEO({ title, description, image, url }: SEOProps) {
  const siteUrl = url || 'https://annibalepace.com';
  const defaultImage = image || '/og-image.jpg';
  const fullTitle = `${title} | Annibale Pace`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={defaultImage} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Annibale Pace" />
      <meta name="keywords" content="art, contemporary art, artist, Annibale Pace, paintings, sculptures, exhibitions" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  );
} 