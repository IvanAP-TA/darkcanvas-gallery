import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import LazyImage from "@/components/LazyImage";
import { artworks } from "@/data/artworks";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function ArtworkDetail() {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === id);

  if (!artwork) {
    return (
      <Layout>
        <SEO 
          title="Artwork Not Found"
          description="The artwork you're looking for doesn't exist or has been moved."
        />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-serif mb-6">Artwork Not Found</h1>
          <p className="mb-8">The artwork you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium transition-colors hover:bg-foreground/90"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Portfolio
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={artwork.title}
        description={`${artwork.title} - ${artwork.description}`}
        image={artwork.imageUrl}
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
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": artwork.title,
                "item": `https://www.annibalepace.com/portfolio/${artwork.id}`
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VisualArtwork",
            "name": artwork.title,
            "creator": {
              "@type": "Person",
              "@id": "https://www.annibalepace.com/#person",
              "name": "Annibale Pace"
            },
            "description": artwork.description,
            "image": `https://www.annibalepace.com${artwork.imageUrl}`,
            "dateCreated": artwork.year,
            "artMedium": artwork.technique,
            "width": {
              "@type": "Distance",
              "name": artwork.dimensions.split(" x ")[0]
            },
            "height": {
              "@type": "Distance",
              "name": artwork.dimensions.split(" x ")[1]
            },
            "artworkSurface": "Canvas",
            "genre": artwork.theme,
            "url": `https://www.annibalepace.com/portfolio/${artwork.id}`,
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "url": artwork.saatchiUrl || "https://www.annibalepace.com/contact"
            }
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <Link 
          to="/portfolio" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <LazyImage
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl font-serif">{artwork.title}</h1>
              <p className="text-muted-foreground">{artwork.description}</p>
              
              <div className="space-y-4">
                <p>
                  <span className="font-medium">Year:</span> {artwork.year}
                </p>
                <p>
                  <span className="font-medium">Technique:</span> {artwork.technique}
                </p>
                <p>
                  <span className="font-medium">Theme:</span> {artwork.theme}
                </p>
                <p>
                  <span className="font-medium">Dimensions:</span> {artwork.dimensions}
                </p>
              </div>
              
              <div className="mt-auto">
                <h3 className="text-lg font-serif mb-3">Inquire about this artwork</h3>
                <p className="text-muted-foreground mb-4">
                  Interested in acquiring this piece or learning more about it? Contact us for availability and pricing details.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/contact" 
                    className="inline-block px-6 py-3 bg-foreground text-background font-medium transition-colors hover:bg-foreground/90"
                  >
                    Contact Gallery
                  </Link>
                  {artwork.saatchiUrl && (
                    <a
                      href={artwork.saatchiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-white text-white hover:bg-white/10 transition-colors"
                    >
                      <img 
                        src="/saatchi-art.webp"
                        alt="Saatchi Art Logo"
                        className="h-7 w-auto my-auto"
                      />
                      <span className="opacity-90 text-base">View on Saatchi Art</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
