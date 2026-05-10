import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { fetchArtworks, fallbackArtworks } from "@/data/artworks";
import ArtworkGrid from "@/components/portfolio/ArtworkGrid";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { Artwork } from "@/types/artwork";

export default function Portfolio() {
  const { t } = useI18n();
  const [artworks, setArtworks] = useState<Artwork[]>(fallbackArtworks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const data = await fetchArtworks();
        if (data.length > 0) {
          setArtworks(data);
        } else {
          setArtworks(fallbackArtworks);
        }
      } catch (error) {
        console.error("Error loading artworks:", error);
        setArtworks(fallbackArtworks);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);
  
  return (
    <Layout>
      <SEO 
        title={t('seo.portfolio.title')}
        description={t('seo.portfolio.description')}
        image="/paintings/9.webp"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": t('nav.home'),
                "item": "https://www.annibalepace.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": t('nav.portfolio'),
                "item": "https://www.annibalepace.com/portfolio"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-3">{t('portfolio.title')}</h1>
        <p className="text-muted-foreground text-lg mb-10">
          {t('seo.portfolio.description')}
        </p>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
          </div>
        ) : (
          <ArtworkGrid artworks={artworks} />
        )}
      </div>
    </Layout>
  );
}
