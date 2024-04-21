import { Category, Filters } from "@/data/interfaces";
import React, { createContext, useReducer } from "react";

export const FILTER_ACTION = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  UPDATE_PRICE: "UPDATE_PRICE",
  SET_SEARCH_STRING: "SET_SEARCH_STRING",
  RESET: "RESET",
};

type Action = {
  type: string;
};

type AddFilterAction = Action & {
  payload: Category;
};
type RemoveFilterAction = Action & {
  payload: Category;
};

type UpdatePriceAction = Action & {
  payload: {
    minPrice: number;
    maxPrice: number;
  };
};

type SearchStringAction = Action & {
  payload: string;
};

// Typeguard

const isAddFilterAction = (action: Action): action is AddFilterAction => {
  return action.type === FILTER_ACTION.ADD;
};
const isRemoveFilterAction = (action: Action): action is RemoveFilterAction => {
  return action.type === FILTER_ACTION.REMOVE;
};
const isUpdatePriceAction = (action: Action): action is UpdatePriceAction => {
  return action.type === FILTER_ACTION.UPDATE_PRICE;
};
const isSearchStringAction = (action: Action): action is SearchStringAction => {
  return action.type === FILTER_ACTION.SET_SEARCH_STRING;
};

type FilterState = {
  filters: Filters;
};

const filterReducer = (
  filterState: FilterState,
  action: Action
): FilterState => {
  switch (action.type) {
    case FILTER_ACTION.ADD:
      if (isAddFilterAction(action)) {
        return {
          ...filterState,
          filters: {
            ...filterState.filters,
            categories: [
              ...filterState.filters.categories,
              action.payload.name,
            ],
            filterActive: true,
          },
        };
      } else {
        return filterState;
      }

    case FILTER_ACTION.REMOVE:
      if (isRemoveFilterAction(action)) {
        const updatedFilter = filterState.filters.categories.filter(
          (categoryName) => categoryName != action.payload.name
        );
        return {
          ...filterState,
          filters: {
            ...filterState.filters,
            categories: updatedFilter,
            filterActive: updatedFilter.length > 0,
          },
        };
      } else {
        return filterState;
      }

    case FILTER_ACTION.UPDATE_PRICE:
      if (isUpdatePriceAction(action)) {
        return {
          ...filterState,
          filters: {
            ...filterState.filters,
            priceRange: {
              minPrice: action.payload.minPrice,
              maxPrice: action.payload.maxPrice,
            },
          },
        };
      } else {
        return filterState;
      }
    case FILTER_ACTION.SET_SEARCH_STRING:
      if (isSearchStringAction(action)) {
        return {
          ...filterState,
          filters: {
            ...filterState.filters,
            searchString: action.payload,
            filterActive: action.payload.length > 0,
          },
        };
      } else {
        return filterState;
      }
    case FILTER_ACTION.RESET:
      return { ...filterState, filters: initialFilterState.filters };
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
    filterActive: false,
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

export const FilterContext = createContext<{
  filterState: FilterState;
  filterDispatch: React.Dispatch<
    | Action
    | AddFilterAction
    | RemoveFilterAction
    | UpdatePriceAction
    | SearchStringAction
  >;
}>({ filterState: initialFilterState, filterDispatch: () => null });
