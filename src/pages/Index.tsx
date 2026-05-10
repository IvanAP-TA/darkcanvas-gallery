import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import Hero from "@/components/home/Hero";
import FeaturedArtworks from "@/components/home/FeaturedArtworks";
import ArtistIntro from "@/components/home/ArtistIntro";
import { fetchArtworks, fallbackArtworks } from "@/data/artworks";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { Artwork } from "@/types/artwork";

export default function Index() {
  const { t } = useI18n();
  const [artworks, setArtworks] = useState<Artwork[]>(fallbackArtworks);

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
      }
    };

    loadArtworks();
  }, []);
  
  return (
    <Layout>
      <SEO 
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        image="/paintings/9.webp"
        url="https://www.annibalepace.com/"
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
                "name": "Home",
                "item": "https://www.annibalepace.com/"
              }
            ]
          })}
        </script>
      </Helmet>
      <main>
        <h1 className="sr-only">{t('seo.home.title')}</h1>
        <Hero />
        <FeaturedArtworks artworks={artworks} />
        <ArtistIntro />
      </main>
    </Layout>
  );
}
