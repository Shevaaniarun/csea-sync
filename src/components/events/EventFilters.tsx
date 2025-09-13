import { Badge } from "../ui/badge";
import { Filter, X } from "lucide-react";

export interface FilterOptions {
  categoryFilter: string[];
}

interface EventFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const availableCategories = ["Tech", "Non-Tech", "Workshop"];

export function EventFilters({ filters, onFiltersChange }: EventFiltersProps) {
  const handleCategoryToggle = (category: string) => {
    const updatedCategories = filters.categoryFilter.includes(category)
      ? filters.categoryFilter.filter((c) => c !== category)
      : [...filters.categoryFilter, category];

    onFiltersChange({
      categoryFilter: updatedCategories,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categoryFilter: [],
    });
  };

  const hasActiveFilters = filters.categoryFilter.length > 0;

  return (
    <div className="mb-8">
      {/* Filter bar */}
      <div className="flex items-center justify-between bg-cyan-900/20 rounded-xl px-4 py-3 h-16 shadow-sm border border-cyan-400/30">
        {/* Left: Icon */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-cyan-300" />
        </div>

        {/* Middle: Category buttons */}
        <div className="flex items-center gap-3">
          {availableCategories.map((category) => {
            const isSelected = filters.categoryFilter.includes(category);
            return (
              <Badge
                key={category}
                variant={isSelected ? "default" : "secondary"}
                className={`cursor-pointer px-3 py-1 text-sm transition-colors border ${
                  isSelected
                    ? "bg-cyan-500/30 text-cyan-200 border-cyan-400/50 hover:bg-cyan-500/40"
                    : "bg-cyan-900/30 text-cyan-300 border-cyan-600/40 hover:bg-cyan-800/40"
                }`}
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
                {isSelected && <X className="w-3 h-3 ml-1" />}
              </Badge>
            );
          })}
        </div>

        {/* Right: Clear button */}
        <div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="mt-2 text-sm text-cyan-400 text-center">
          Showing {filters.categoryFilter.join(", ")} events
        </div>
      )}
    </div>
  );
}
