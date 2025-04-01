
import { useState } from "react";
import { Link } from "react-router-dom";
import { Artwork } from "@/types/artwork";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/portfolio/${artwork.id}`}
      className="artwork-item block animate-fade-in"
    >
      <div className="image-container h-full">
        <div className={`absolute inset-0 bg-muted ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></div>
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
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
