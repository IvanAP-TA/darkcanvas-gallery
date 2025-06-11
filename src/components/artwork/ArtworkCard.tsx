import { useState } from "react";
import { Link } from "react-router-dom";
import { Artwork } from "@/types/artwork";
import { useI18n, getArtworkTranslations } from "@/lib/i18n";
import OptimizedImage from "@/components/OptimizedImage";

interface ArtworkCardProps {
  artwork: Artwork;
  priority?: boolean;
}

const ArtworkCard = ({ artwork, priority = false }: ArtworkCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t, language } = useI18n();
  
  // Get translated artwork content
  const translatedArtwork = getArtworkTranslations(artwork.id, language);

  return (
    <Link 
      to={`/portfolio/${artwork.id}`}
      className="artwork-item block animate-fade-in group"
    >
      <div className="image-container h-full relative overflow-hidden">
        <OptimizedImage
          src={artwork.imageUrl}
          srcSet={`${artwork.imageUrl.replace('.webp', '-thumb.webp')} 400w, ${artwork.imageUrl} 800w`}
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={translatedArtwork.title || artwork.title}
          width={600}
          height={800}
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          priority={priority}
          onLoad={() => setImageLoaded(true)}
          placeholder="/placeholder.svg"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-lg font-serif text-white">{translatedArtwork.title || artwork.title}</h3>
          <p className="text-sm text-white/80">{artwork.year} • {t(`technique.${artwork.technique}`) || artwork.technique}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;
