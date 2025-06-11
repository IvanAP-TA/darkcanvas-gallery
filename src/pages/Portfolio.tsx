import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { artworks } from "@/data/artworks";
import ArtworkGrid from "@/components/portfolio/ArtworkGrid";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/lib/i18n";

export default function Portfolio() {
  const { t } = useI18n();
  
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
        
        <ArtworkGrid artworks={artworks} />
      </div>
    </Layout>
  );
}
