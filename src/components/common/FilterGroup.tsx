// FilterGroup.tsx
import React from "react";

interface SelectFilter {
  name: string;
  placeholder: string;
  options: { label: string; value: string }[];
}

interface FilterGroupProps {
  filters: Record<string, any>;
  onChange: (updated: Record<string, any>) => void;
  selects: SelectFilter[];
  extraFilters?: React.ReactNode; // for custom filters like <DateSelect />
  searchNode: React.ReactNode; // for search input
}

export const FilterGroup = ({
  filters,
  onChange,
  selects,
  extraFilters,
  searchNode,
}: FilterGroupProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-y-4 mt-5 w-full">
      <div className="flex flex-wrap gap-x-5 gap-y-3 items-center">
        {selects.length &&
          selects.map((filter) => (
            <div
              key={filter.name}
              className="flex flex-col gap-y-1 pr-3 rounded-lg border border-primaryBorder bg-white outline-none"
            >
              <select
                name={filter.name}
                value={filters[filter.name] ?? ""}
                onChange={handleChange}
                className="p-2.5 work-sans text-sm outline-none"
              >
                <option value="">{filter.placeholder}</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        {extraFilters}
      </div>

      {searchNode}
    </div>
  );
};
