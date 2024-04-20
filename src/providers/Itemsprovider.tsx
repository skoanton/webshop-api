import { Item } from "@/data/interfaces";
import React, { createContext, useReducer } from "react";

export const ACTION = {
  ADD: "ADD",
};

type Action = {
  type: string;
  payload: Item[];
};

type State = {
  items: Item[];
};

const initialState: State = {
  items: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION.ADD:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

type ItemsproviderProps = {
  children: React.ReactNode;
};

const Itemsprovider = ({ children }: ItemsproviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ItemContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
};

export default Itemsprovider;

export const ItemContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });
