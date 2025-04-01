import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="/paintings/9.jpg"
          alt="Annibale Pace Artwork"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div 
        className={`container mx-auto px-4 relative z-20 transition-all duration-1000 transform ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-6 max-w-3xl">
          Exploring the boundaries of form and emotion
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-xl font-light">
          Contemporary artist Annibale Pace creates works that challenge perceptions and evoke deep emotional responses.
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
