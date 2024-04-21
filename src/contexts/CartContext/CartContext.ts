import { Item } from "@/types/itemsType";
import { createContext } from "react";
import { CartState, initalCartState } from "./CartReducer";

export type CartAction = {
    type: string;
    payload: {
      item: Item;
      quanity: number;
    };
  };

export const CartContext = createContext<{
    cartState: CartState;
    cartDispatch: React.Dispatch<CartAction>;
  }>({ cartState: initalCartState, cartDispatch: () => null });