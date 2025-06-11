import Layout from "@/components/layout/Layout";
import PhotoGallery from "../components/PhotoGallery";
import { photos } from "@/data/photos";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/lib/i18n";

const PhotoGalleryPage = () => {
  const { t } = useI18n();
  
  return (
    <Layout>
      <SEO 
        title={t('seo.gallery.title')}
        description={t('seo.gallery.description')}
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
                "name": t('nav.gallery'),
                "item": "https://www.annibalepace.com/gallery"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-3">{t('gallery.title')}</h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-3xl">
          {t('gallery.subtitle')}
        </p>
        
        <PhotoGallery photos={photos} />
      </div>
    </Layout>
  );
};

export default PhotoGalleryPage;