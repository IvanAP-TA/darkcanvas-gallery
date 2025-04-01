import Layout from "@/components/layout/Layout";
import PhotoGallery from "../components/PhotoGallery";
import { photos } from "@/data/photos";
import SEO from "@/components/SEO";

const PhotoGalleryPage = () => {
  return (
    <Layout>
      <SEO 
        title="Gallery"
        description="A collection of moments from the artistic journey of Annibale Pace, capturing the essence of creation and the beauty of artistic expression."
        image="/studio/1.jpg"
      />
      
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