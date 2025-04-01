import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Artwork } from "@/types/artwork";

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

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-serif mb-3">Filter by {category}</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className={`filter-button ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilterClick("all")}
        >
          All
        </button>
        {options.map((option) => (
          <button
            key={option.value}
            className={`filter-button ${activeFilter === option.value ? "active" : ""}`}
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
            <Link 
              key={artwork.id}
              to={`/portfolio/${artwork.id}`}
              className="artwork-item block animate-fade-in"
            >
              <div className="image-container h-full">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-lg font-serif text-white">{artwork.title}</h3>
                  <p className="text-sm text-white/80">{artwork.year} • {artwork.technique}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 