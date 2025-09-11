import { Badge } from "./ui/badge";
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
      <div className="flex items-center justify-between bg-muted rounded-xl px-4 py-3 h-16 shadow-sm">
        {/* Left: Icon */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Middle: Category buttons */}
        <div className="flex items-center gap-3">
          {availableCategories.map((category) => {
            const isSelected = filters.categoryFilter.includes(category);
            return (
              <Badge
                key={category}
                variant={isSelected ? "default" : "secondary"}
                className={`cursor-pointer px-3 py-1 text-sm transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-secondary/80"
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
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="mt-2 text-sm text-muted-foreground text-center">
          Showing {filters.categoryFilter.join(", ")} events
        </div>
      )}
    </div>
  );
}
