import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import Hero from "@/components/home/Hero";
import FeaturedArtworks from "@/components/home/FeaturedArtworks";
import ArtistIntro from "@/components/home/ArtistIntro";
import { artworks } from "@/data/artworks";

export default function Index() {
  return (
    <Layout>
      <SEO 
        title="Home"
        description="Annibale Pace - Contemporary artist exploring the boundaries between form, color, and emotion through various media and techniques."
        image="/hero-image.jpg"
      />
      
      <Hero />
      <FeaturedArtworks artworks={artworks} />
      <ArtistIntro />
    </Layout>
  );
}
