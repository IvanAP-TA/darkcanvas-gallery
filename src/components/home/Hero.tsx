import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import SocialLinksComponent from "@/components/ui/SocialLinks";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Critical LCP image with highest priority */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="/paintings/9.webp"
          srcSet="/paintings/9-thumb.webp 600w, /paintings/9.webp 1200w"
          sizes="100vw"
          alt="Annibale Pace Contemporary Artwork - Hero Image"
          width={1200}
          height={800}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onLoad={() => {
            // Mark LCP element as loaded for performance tracking
            if (typeof window !== 'undefined' && window.performance) {
              window.performance.mark('hero-image-loaded');
            }
          }}
        />
      </div>
      
      <div 
        className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 transition-all duration-1000 transform ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Mobile-optimized heading */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-4 sm:mb-6 max-w-3xl leading-tight">
          Annibale Pace
        </h1>        
        
        {/* Mobile-optimized description */}
        <p className="text-lg xs:text-xl sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-xl font-light leading-relaxed">
          {t('home.hero.description')}
        </p>
          {/* Mobile-optimized button layout */}
        <div className="flex flex-col xs:flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg sm:max-w-none">
          <Link 
            to="/portfolio" 
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 bg-foreground text-background font-medium text-base sm:text-lg transition-colors hover:bg-foreground/90 text-center touch-manipulation min-h-[48px] flex items-center justify-center"
          >
            {t('home.hero.viewPortfolio')}
          </Link>
          <Link 
            to="/about" 
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 border border-foreground text-foreground font-medium text-base sm:text-lg transition-colors hover:bg-foreground/10 text-center touch-manipulation min-h-[48px] flex items-center justify-center"
          >
            {t('home.hero.aboutArtist')}
          </Link>
          <a 
            href="https://www.saatchiart.com/en-it/account/profile/2284565"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3 border border-foreground text-foreground font-medium text-base sm:text-lg transition-colors hover:bg-foreground/10 touch-manipulation min-h-[48px]"
          >
            <img 
              src="/saatchi-art.webp" 
              alt="Saatchi Art Logo" 
              width={20}
              height={20}
              className="h-5 sm:h-6 w-auto flex-shrink-0"
              loading="lazy"
            />
            <span className="truncate">Saatchi Art</span>
          </a>
        </div>        {/* Social Follow Section - Prominent but elegant */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-foreground/20 max-w-2xl">
          <p className="text-sm sm:text-base text-foreground/80 mb-4 font-medium tracking-wider">
            {t('home.followJourney').toUpperCase()}
          </p>
          <SocialLinksComponent 
            variant="hero" 
            className="flex flex-wrap gap-4 sm:gap-6"
            iconSize="lg"
            showLabels={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
