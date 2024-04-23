import { createContext } from "react";
import {ITEM_ACTION, ItemsState, initialItemsState } from "./ItemsReducer";
import { Item } from "@/types/itemsType";

export type ItemsAction = 
  | {

    type: typeof ITEM_ACTION.ADD;
    payload: Item[];
  } | 
    {
      type: typeof ITEM_ACTION.SORT_NAME_ASC | ITEM_ACTION.SORT_NAME_DESC | ITEM_ACTION.SORT_PRICE_ASC | ITEM_ACTION.SORT_PRICE_DESC,
    }

export const ItemsContext = createContext<{
    itemsState: ItemsState;
    itemsDispatch: React.Dispatch<ItemsAction>;
  }>({ itemsState: initialItemsState, itemsDispatch: () => null });
  