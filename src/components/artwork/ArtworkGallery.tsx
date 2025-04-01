
import { useState, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";
import ArtworkFilter from "./ArtworkFilter";
import { Artwork } from "@/types/artwork";

interface ArtworkGalleryProps {
  artworks: Artwork[];
}

const ArtworkGallery = ({ artworks }: ArtworkGalleryProps) => {
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(artworks);
  const [activeFilters, setActiveFilters] = useState({
    technique: "all",
    year: "all",
    theme: "all",
  });

  // Extract unique options for filters
  const techniqueOptions = [...new Set(artworks.map(a => a.technique))].map(technique => ({
    label: technique,
    value: technique.toLowerCase().replace(/\s+/g, '-'),
  }));
  
  const yearOptions = [...new Set(artworks.map(a => a.year.toString()))].map(year => ({
    label: year,
    value: year,
  }));
  
  const themeOptions = [...new Set(artworks.map(a => a.theme))].map(theme => ({
    label: theme,
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
        </div>
        <div>
          <ArtworkFilter
            options={themeOptions}
            onFilterChange={(filter) => handleFilterChange("theme", filter)}
            category="Theme"
          />
        </div>
      </div>

      {filteredArtworks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No artworks match your selected filters.</p>
          <button 
            className="mt-4 underline"
            onClick={() => setActiveFilters({
              technique: "all",
              year: "all",
              theme: "all",
            })}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="artwork-grid">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtworkGallery;
