import { FilterAction} from "./FilterContext";
import { FilterState, initialFilterState } from "./FilterProvider";

export enum FILTER_ACTION  {
    ADD= "ADD",
    REMOVE= "REMOVE",
    UPDATE_PRICE= "UPDATE_PRICE",
    SET_SEARCH_STRING= "SET_SEARCH_STRING",
    RESET= "RESET",
  };
  

export const filterReducer = (
    filterState: FilterState,
    action: FilterAction
  ): FilterState => {
    switch (action.type) {
      case FILTER_ACTION.ADD:
       
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
        
  
      case FILTER_ACTION.REMOVE:
          const updatedFilter = filterState.filters.categories.filter(
            (categoryName) => categoryName != action.payload.name
          );
          return {
            ...filterState,
            filters: {
              ...filterState.filters,
              categories: updatedFilter,
            },
       
        }
  
      case FILTER_ACTION.UPDATE_PRICE:

          return {
            ...filterState,
            filters: {
              ...filterState.filters,
              priceRange: {
                minPrice: action.payload.minPrice,
                maxPrice: action.payload.maxPrice,
              },
            },
        
        } 
      case FILTER_ACTION.SET_SEARCH_STRING:
      
          return {
            ...filterState,
            filters: {
              ...filterState.filters,
              searchString: action.payload,
            },
          };
        
      case FILTER_ACTION.RESET:
        return { ...filterState, filters: initialFilterState.filters };
      default:
        return filterState;
    }
  };