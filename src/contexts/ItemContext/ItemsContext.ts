import { createContext } from "react";
import {ItemsState, initialItemsState } from "./ItemsReducer";
import { Item } from "@/types/itemsType";

export type ItemsAction = {
  type: string;
  payload: Item[];
};
export const ItemsContext = createContext<{
    itemsState: ItemsState;
    itemDispatch: React.Dispatch<ItemsAction>;
  }>({ itemsState: initialItemsState, itemDispatch: () => null });
  