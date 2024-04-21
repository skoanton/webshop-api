import React, { useReducer } from "react";
import { initialItemsState, itemsReducer } from "./ItemsReducer";
import { ItemsContext } from "./ItemsContext";

type ItemsProviderProps = {
  children: React.ReactNode;
};

const ItemsProvider = ({ children }: ItemsProviderProps) => {
  const [itemsState, itemsDispatch] = useReducer(
    itemsReducer,
    initialItemsState
  );
  return (
    <ItemsContext.Provider value={{ itemsState, itemsDispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
