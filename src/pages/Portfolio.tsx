import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { artworks } from "@/data/artworks";
import ArtworkGrid from "@/components/portfolio/ArtworkGrid";
import { Helmet } from "react-helmet-async";

export default function Portfolio() {
  return (
    <Layout>
      <SEO 
        title="Portfolio"
        description="Explore the complete collection of Annibale Pace's artworks, including paintings, sculptures, and mixed media pieces."
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
                "name": "Portfolio",
                "item": "https://www.annibalepace.com/portfolio"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-3">Portfolio</h1>
        <p className="text-muted-foreground text-lg mb-10">
          A comprehensive collection of my works, showcasing the evolution of my artistic journey.
        </p>
        
        <ArtworkGrid artworks={artworks} />
      </div>
    </Layout>
  );
}
