import { createContext } from "react";
import { FILTER_ACTION } from "./FilterReducer";
import { FilterState, initialFilterState } from "./FilterProvider";
import { Category } from "@/types/itemsType";

export type FilterAction = {
    type: string;
  };
  
  type AddFilterAction = FilterAction & {
    payload: Category;
  };
  type RemoveFilterAction = FilterAction & {
    payload: Category;
  };
  
  type UpdatePriceAction = FilterAction & {
    payload: {
      minPrice: number;
      maxPrice: number;
    };
  };
  
  type SearchStringAction = FilterAction & {
    payload: string;
  };
  
  // Typeguard
  
  export const isAddFilterAction = (action: FilterAction): action is AddFilterAction => {
    return action.type === FILTER_ACTION.ADD;
  };
  export const isRemoveFilterAction = (action: FilterAction): action is RemoveFilterAction => {
    return action.type === FILTER_ACTION.REMOVE;
  };
  export const isUpdatePriceAction = (action: FilterAction): action is UpdatePriceAction => {
    return action.type === FILTER_ACTION.UPDATE_PRICE;
  };
  export const isSearchStringAction = (action: FilterAction): action is SearchStringAction => {
    return action.type === FILTER_ACTION.SET_SEARCH_STRING;
  };


export const FilterContext = createContext<{
    filterState: FilterState;
    filterDispatch: React.Dispatch<
      | FilterAction
      | AddFilterAction
      | RemoveFilterAction
      | UpdatePriceAction
      | SearchStringAction
    >;
  }>({ filterState: initialFilterState, filterDispatch: () => null });