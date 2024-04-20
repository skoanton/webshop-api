import { Category, Filters } from "@/data/interfaces";
import React, { createContext, useReducer } from "react";

export const FILTER_ACTION = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  UPDATEPRICE: "UPDATEPRICE",
};

type Action =
  | { type: typeof FILTER_ACTION.ADD; payload: Category }
  | { type: typeof FILTER_ACTION.REMOVE; payload: Category }
  | { type: typeof FILTER_ACTION.UPDATEPRICE; payload: number };

type FilterState = {
  filters: Filters;
};

const filterReducer = (
  filterState: FilterState,
  action: Action
): FilterState => {
  switch (action.type) {
    case FILTER_ACTION.ADD:
      if (typeof action.payload != "number") {
        return {
          ...filterState,
          filters: {
            ...filterState.filters,
            categories: [
              ...filterState.filters.categories,
              action.payload.name,
            ],
          },
        };
      } else {
        return filterState;
      }

    case FILTER_ACTION.REMOVE:
      if (typeof action.payload != "number") {
        const updatedFilter = filterState.filters.categories.filter(
          (categoryName) => categoryName != action.payload.name
        );
        if (updatedFilter.length === 0) {
          return {
            ...filterState,
            filters: {
              ...filterState.filters,
              categories: updatedFilter,
            },
          };
        } else {
          return {
            ...filterState,
            filters: {
              ...filterState.filters,
              categories: updatedFilter,
            },
          };
        }
      } else {
        return filterState;
      }

    case FILTER_ACTION.UPDATEPRICE:
      // Update price in filter state
      return filterState;
    default:
      return filterState;
  }
};

const initialFilterState: FilterState = {
  filters: {
    categories: [],
    priceRange: {
      minPrice: 0,
      maxPrice: 999,
    },
    filterActive: true,
  },
};

type FilterProviderProps = {
  children: React.ReactNode;
};

const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);
  return (
    <FilterContext.Provider value={{ filterState, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

export const FilterContext = createContext<{
  filterState: FilterState;
  dispatch: React.Dispatch<Action>;
}>({ filterState: initialFilterState, dispatch: () => null });
