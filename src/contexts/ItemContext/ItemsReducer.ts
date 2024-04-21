import { Item } from "@/types/itemsType";
import { ItemsAction } from "./ItemsContext";

export const ITEM_ACTION = {
    ADD: "ADD",
  };
  
export type ItemsState = {
    items: Item[];
  };

  export const initialItemsState: ItemsState = {
    items: [],
  };

export const itemsReducer = (itemsState: ItemsState, action: ItemsAction): ItemsState => {
    switch (action.type) {
      case ITEM_ACTION.ADD:
        return { ...itemsState, items: action.payload };
      default:
        return itemsState;
    }
  };