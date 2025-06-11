import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import Hero from "@/components/home/Hero";
import FeaturedArtworks from "@/components/home/FeaturedArtworks";
import ArtistIntro from "@/components/home/ArtistIntro";
import { artworks } from "@/data/artworks";
import { Helmet } from "react-helmet-async";

export default function Index() {
  return (
    <Layout>
      <SEO 
        title="Annibale Pace - Artista Contemporaneo"
        description="Sito ufficiale di Annibale Pace, artista contemporaneo italiano. Scopri opere, biografia, portfolio, mostre e contatti. Pittura ad olio, arte figurativa e contemporanea da Taranto, Puglia."
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
        <h1 className="sr-only">Annibale Pace - Artista Contemporaneo</h1>
        <Hero />
        <FeaturedArtworks artworks={artworks} />
        <ArtistIntro />
      </main>
    </Layout>
  );
}
