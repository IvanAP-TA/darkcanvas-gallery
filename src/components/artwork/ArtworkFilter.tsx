
import { useState } from "react";

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

export default ArtworkFilter;
