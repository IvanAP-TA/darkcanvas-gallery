import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PreloadImage from "@/components/PreloadImage";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <PreloadImage 
        src="/paintings/9.webp" 
        srcSet="/paintings/9-thumb.webp 600w, /paintings/9.webp 1200w" 
        sizes="(max-width: 600px) 100vw, 1200px" 
      />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="/paintings/9.webp"
          srcSet="/paintings/9-thumb.webp 600w, /paintings/9.webp 1200w"
          sizes="(max-width: 600px) 100vw, 1200px"
          alt="Annibale Pace Artwork"
          width={1200}
          height={800}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      
      <div 
        className={`container mx-auto px-4 relative z-20 transition-all duration-1000 transform ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-6 max-w-3xl">
          Annibale Pace – Artista Contemporaneo
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-xl font-light">
          Esplora il portfolio ufficiale di Annibale Pace: opere, biografia, mostre e contatti. Pittura ad olio, arte figurativa e contemporanea da Taranto, Puglia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/portfolio" 
            className="px-8 py-3 bg-foreground text-background font-medium text-lg transition-colors hover:bg-foreground/90"
          >
            View Portfolio
          </Link>
          <Link 
            to="/about" 
            className="px-8 py-3 border border-foreground text-foreground font-medium text-lg transition-colors hover:bg-foreground/10"
          >
            About the Artist
          </Link>
          <a 
            href="https://www.saatchiart.com/en-it/account/profile/2284565"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-3 border border-foreground text-foreground font-medium text-lg transition-colors hover:bg-foreground/10"
          >
            <img 
              src="/saatchi-art.webp" 
              alt="Saatchi Art" 
              className="h-6 w-auto"
            />
            <span>Saatchi Art</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
