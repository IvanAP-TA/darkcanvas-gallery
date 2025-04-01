import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArtworkCard from "../artwork/ArtworkCard";
import { Artwork } from "@/types/artwork";

interface FeaturedArtworksProps {
  artworks: Artwork[];
}

const FeaturedArtworks = ({ artworks }: FeaturedArtworksProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById("featured-section");
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Get only the first 3 artworks for the featured section
  const featuredArtworks = artworks.slice(0, 3);

  return (
    <section 
      id="featured-section"
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <div 
          className={`transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-2">Featured Works</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            A selection of recent and significant works from the artist's portfolio that showcase the depth and breadth of his artistic vision.
          </p>
        </div>
        
        <div 
          className={`artwork-grid transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {featuredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
        
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Link 
            to="/portfolio" 
            className="inline-block px-8 py-3 border border-foreground text-foreground font-medium text-lg transition-colors hover:bg-foreground/10"
          >
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtworks;
