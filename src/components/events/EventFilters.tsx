import { Badge } from "../ui/badge";
import { Filter, X } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface FilterOptions {
  categoryFilter: string[];
}

interface EventFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const availableCategories = ["Tech", "Non-Tech", "Workshop"];

export function EventFilters({ filters, onFiltersChange }: EventFiltersProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
    <motion.div
      ref={ref}
      initial={{ 
        clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 0)",
        opacity: 0,
        y: 30
      }}
      animate={isInView ? { 
        clipPath: "polygon(0 0, 0 100%, 50% 100%, 50% 0, 50% 0, 50% 100%, 100% 100%, 100% 0)",
        opacity: 1,
        y: 0
      } : {}}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="mb-8 font-sans tracking-wide"
    >
      {/* Filter bar with ends → middle reveal - ALTERNATIVE APPROACH */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
                   bg-gradient-to-r from-blue-950 via-cyan-950 via-gray-950 via-cyan-950 to-blue-950 
                   rounded-xl px-4 py-3 shadow-sm border border-cyan-400/40 gap-3"
      >
        {/* Top/Left: Icon + label */}
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <Filter className="w-5 h-5 text-cyan-300" />
          <span className="text-cyan-200 text-sm font-medium">Filters</span>
        </div>

        {/* Middle: Category badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {availableCategories.map((category, index) => {
            const isSelected = filters.categoryFilter.includes(category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Badge
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
              </motion.div>
            );
          })}
        </div>

        {/* Bottom/Right: Clear button */}
        <div className="flex justify-center sm:justify-end">
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-200 transition-colors hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
            >
              <X className="w-3 h-3" />
              Clear all
            </motion.button>
          )}
        </div>
      </div>

      {/* Active filters summary */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-2 text-sm text-cyan-300 text-center italic"
        >
          Showing{" "}
          <span className="font-medium">
            {filters.categoryFilter.join(", ")}
          </span>{" "}
          events
        </motion.div>
      )}
    </motion.div>
  );
}