import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Artwork } from "@/types/artwork";
import { useI18n, getArtworkTranslations } from "@/lib/i18n";

interface FilterOption {
  label: string;
  value: string;
}

interface ArtworkFilterProps {
  options: FilterOption[];
  onFilterChange: (filter: string) => void;
  category: string;
}

const ArtworkFilter = ({ options, onFilterChange, category }: ArtworkFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { t } = useI18n();
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const getFilterTitle = () => {
    switch(category) {
      case 'Technique': return t('portfolio.filter.technique');
      case 'Year': return t('portfolio.filter.year');
      case 'Theme': return t('portfolio.filter.theme');
      default: return category;
    }
  };  return (
    <div className="mb-6 xs:mb-8">
      <h3 className="text-base xs:text-lg font-serif mb-3">{t('portfolio.filter.by')} {getFilterTitle()}</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className={`filter-button touch-manipulation min-h-[44px] px-3 xs:px-4 py-2 text-sm xs:text-base ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilterClick("all")}
        >
          {t('portfolio.filter.all')}
        </button>
        {options.map((option) => (
          <button
            key={option.value}
            className={`filter-button touch-manipulation min-h-[44px] px-3 xs:px-4 py-2 text-sm xs:text-base ${activeFilter === option.value ? "active" : ""}`}
            onClick={() => handleFilterClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

interface ArtworkGridProps {
  artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(artworks);  const [activeFilters, setActiveFilters] = useState({
    technique: "all",
    year: "all",
    theme: "all",
  });
  const { t, language } = useI18n();
  // Extract unique options for filters
  const techniqueOptions = [...new Set(artworks.map(a => a.technique))].map(technique => ({
    label: t(`technique.${technique}`) || technique,
    value: technique.toLowerCase().replace(/\s+/g, '-'),
  }));
  
  const yearOptions = [...new Set(artworks.map(a => a.year.toString()))].map(year => ({
    label: year,
    value: year,
  }));
  
  const themeOptions = [...new Set(artworks.map(a => a.theme))].map(theme => ({
    label: t(`theme.${theme}`) || theme,
    value: theme.toLowerCase().replace(/\s+/g, '-'),
  }));

  // Apply filters whenever active filters change
  useEffect(() => {
    let result = artworks;
    
    if (activeFilters.technique !== "all") {
      result = result.filter(
        (artwork) => artwork.technique.toLowerCase().replace(/\s+/g, '-') === activeFilters.technique
      );
    }
    
    if (activeFilters.year !== "all") {
      result = result.filter((artwork) => artwork.year.toString() === activeFilters.year);
    }
    
    if (activeFilters.theme !== "all") {
      result = result.filter(
        (artwork) => artwork.theme.toLowerCase().replace(/\s+/g, '-') === activeFilters.theme
      );
    }
    
    setFilteredArtworks(result);
  }, [activeFilters, artworks]);

  const handleFilterChange = (category: string, filter: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: filter,
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 mb-8 xs:mb-12">
        <div>
          <ArtworkFilter
            options={techniqueOptions}
            onFilterChange={(filter) => handleFilterChange("technique", filter)}
            category="Technique"
          />
        </div>
        <div>
          <ArtworkFilter
            options={yearOptions}
            onFilterChange={(filter) => handleFilterChange("year", filter)}
            category="Year"
          />
        </div>        <div className="sm:col-span-2 lg:col-span-1">
          <ArtworkFilter
            options={themeOptions}
            onFilterChange={(filter) => handleFilterChange("theme", filter)}
            category="Theme"
          />
        </div>
      </div>      {filteredArtworks.length === 0 ? (
        <div className="text-center py-8 xs:py-12">
          <h3 className="text-lg xs:text-xl font-serif mb-2">{t('portfolio.noResultsTitle')}</h3>
          <p className="text-muted-foreground text-sm xs:text-base">{t('portfolio.noResults')}</p>
          <button 
            className="mt-4 underline text-sm xs:text-base touch-manipulation min-h-[44px] px-4"
            onClick={() => setActiveFilters({
              technique: "all",
              year: "all",
              theme: "all",
            })}
          >
            {t('portfolio.filter.clearAll')}
          </button>
        </div>
      ) : (<div className="artwork-grid">
          {filteredArtworks.map((artwork, index) => {
            const translatedArtwork = getArtworkTranslations(artwork.id, language);
            // Prioritize first 6 images for better perceived performance
            const isPriority = index < 6;
            
            return (
              <Link 
                key={artwork.id}
                to={`/portfolio/${artwork.id}`}                className="artwork-item block animate-fade-in group touch-manipulation"
              >
                <div className="image-container h-full relative overflow-hidden rounded-md">
                  <img
                    src={artwork.imageUrl}
                    srcSet={`${artwork.imageUrl.replace('.webp', '-thumb.webp')} 400w, ${artwork.imageUrl} 800w`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={translatedArtwork.title || artwork.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading={isPriority ? "eager" : "lazy"}
                    fetchPriority={isPriority ? "high" : "auto"}
                    width={600}
                    height={800}
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 xs:p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-base xs:text-lg font-serif text-white">{translatedArtwork.title || artwork.title}</h3>
                    <p className="text-xs xs:text-sm text-white/80">{artwork.year} • {t(`technique.${artwork.technique}`) || artwork.technique}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
} 