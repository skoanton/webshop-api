import { Item } from "@/data/interfaces";
import React, { createContext, useReducer } from "react";

export const ITEM_ACTION = {
  ADD: "ADD",
};

type Action = {
  type: string;
  payload: Item[];
};

type ItemState = {
  items: Item[];
};

const initialItemState: ItemState = {
  items: [],
};

const reducer = (itemState: ItemState, action: Action): ItemState => {
  switch (action.type) {
    case ITEM_ACTION.ADD:
      return { ...itemState, items: action.payload };
    default:
      return itemState;
  }
};

type ItemsproviderProps = {
  children: React.ReactNode;
};

const Itemsprovider = ({ children }: ItemsproviderProps) => {
  const [itemState, itemDispatch] = useReducer(reducer, initialItemState);
  return (
    <ItemContext.Provider value={{ itemState, itemDispatch }}>
      {children}
    </ItemContext.Provider>
  );
};

export default Itemsprovider;

export const ItemContext = createContext<{
  itemState: ItemState;
  itemDispatch: React.Dispatch<Action>;
}>({ itemState: initialItemState, itemDispatch: () => null });
