import { FilterAction, isAddFilterAction, isRemoveFilterAction, isSearchStringAction, isUpdatePriceAction } from "./FilterContext";
import { FilterState, initialFilterState } from "./FilterProvider";

export const FILTER_ACTION = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    UPDATE_PRICE: "UPDATE_PRICE",
    SET_SEARCH_STRING: "SET_SEARCH_STRING",
    RESET: "RESET",
  };
  

export const filterReducer = (
    filterState: FilterState,
    action: FilterAction
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