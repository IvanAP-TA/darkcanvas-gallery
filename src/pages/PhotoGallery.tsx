import Layout from "@/components/layout/Layout";
import PhotoGallery from "../components/PhotoGallery";
import { photos } from "@/data/photos";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";

const PhotoGalleryPage = () => {
  return (
    <Layout>
      <SEO 
        title="Gallery"
        description="A collection of moments from the artistic journey of Annibale Pace, capturing the essence of creation and the beauty of artistic expression."
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
                "name": "Home",
                "item": "https://www.annibalepace.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Gallery",
                "item": "https://www.annibalepace.com/gallery"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-3">Gallery</h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-3xl">
          A collection of moments from the artistic journey of Annibale Pace, capturing the essence of creation and the beauty of artistic expression.
        </p>
        
        <PhotoGallery photos={photos} />
      </div>
    </Layout>
  );
};

export default PhotoGalleryPage;