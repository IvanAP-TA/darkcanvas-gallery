import { useState } from "react";
import { Link } from "react-router-dom";
import { Artwork } from "@/types/artwork";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determina se questa card è la prima (LCP) per ottimizzare il caricamento
  // (puoi passare una prop isLCP se vuoi maggiore controllo)
  // Per ora, fetchPriority alto solo se id === "1"
  const isLCP = artwork.id === "1";

  return (
    <Link 
      to={`/portfolio/${artwork.id}`}
      className="artwork-item block animate-fade-in"
    >
      <div className="image-container h-full">
        <div className={`absolute inset-0 bg-muted ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></div>
        <img
          src={artwork.imageUrl}
          srcSet={`${artwork.imageUrl.replace('.webp', '-thumb.webp')} 400w, ${artwork.imageUrl} 800w`}
          sizes="(max-width: 600px) 100vw, 400px, 800px"
          alt={artwork.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading={isLCP ? "eager" : "lazy"}
          fetchPriority={isLCP ? "high" : undefined}
          width={600}
          height={800}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-lg font-serif text-white">{artwork.title}</h3>
          <p className="text-sm text-white/80">{artwork.year} • {artwork.technique}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;
