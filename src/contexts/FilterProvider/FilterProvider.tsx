import React, { useReducer } from "react";
import { filterReducer } from "./FilterReducer";
import { FilterContext } from "./FilterContext";
import { Filters } from "@/types/filterTypes";

export type FilterState = {
  filters: Filters;
};

export const initialFilterState: FilterState = {
  filters: {
    categories: [],
    priceRange: {
      minPrice: 0,
      maxPrice: 999,
    },
    searchString: "",
  },
};

type FilterProviderProps = {
  children: React.ReactNode;
};

const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterState
  );
  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
