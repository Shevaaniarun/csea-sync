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

    onFiltersChange({ categoryFilter: updatedCategories });
  };

  const clearAllFilters = () => {
    onFiltersChange({ categoryFilter: [] });
  };

  const hasActiveFilters = filters.categoryFilter.length > 0;

  return (
    <div className="mb-8 font-sans tracking-wide">
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-blue-950 via-cyan-950 via-gray-950 via-cyan-950 to-blue-950 rounded-xl px-4 py-3 shadow-sm border border-cyan-400/40 gap-3">
        {/* Top/Left: Icon + label */}
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <Filter className="w-5 h-5 text-cyan-300" />
          <span className="text-cyan-200 text-sm font-medium">Filters</span>
        </div>

        {/* Middle: Category badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {availableCategories.map((category) => {
            const isSelected = filters.categoryFilter.includes(category);
            return (
              <Badge
                key={category}
                variant="outline"
                className={`cursor-pointer px-3 py-1 text-sm transition-all duration-200 border rounded-md ${
                  isSelected
                    ? "bg-cyan-600/30 text-cyan-100 border-cyan-400/60 shadow-[0_0_8px_rgba(34,211,238,0.4)] hover:bg-cyan-500/40"
                    : "bg-cyan-950/30 text-cyan-300 border-cyan-800/50 hover:bg-cyan-800/40"
                }`}
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
                {isSelected && <X className="w-3 h-3 ml-1" />}
              </Badge>
            );
          })}
        </div>

        {/* Bottom/Right: Clear button */}
        <div className="flex justify-center sm:justify-end">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-200 transition-colors hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="mt-2 text-sm text-cyan-300 text-center italic">
          Showing <span className="font-medium">{filters.categoryFilter.join(", ")}</span> events
        </div>
      )}
    </div>
  );
}
