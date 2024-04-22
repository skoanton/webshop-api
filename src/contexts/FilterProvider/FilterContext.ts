import { createContext } from "react";
import { FILTER_ACTION } from "./FilterReducer";
import { FilterState, initialFilterState } from "./FilterProvider";
import { Category } from "@/types/itemsType";

export type FilterAction =
  | { type: FILTER_ACTION.ADD | FILTER_ACTION.REMOVE; payload: Category }
  | {
      type: FILTER_ACTION.REMOVE;
      payload: Category;
    }
  | {
      type: FILTER_ACTION.UPDATE_PRICE;
      payload: {
        minPrice: number;
        maxPrice: number;
      };
    }
  | {
      type: FILTER_ACTION.SET_SEARCH_STRING;
      payload: string;
    }
  | {
      type: FILTER_ACTION.RESET;
    };

export const FilterContext = createContext<{
  filterState: FilterState;
  filterDispatch: React.Dispatch<FilterAction>;
}>({ filterState: initialFilterState, filterDispatch: () => null });
