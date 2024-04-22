import { Item } from "@/types/itemsType";
import { createContext } from "react";
import { CART_ACTION, CartState, cartReducer, initalCartState } from "./CartReducer";
import { Cart } from "@/types/cartTypes";

type AddOrRemoveItemAction = {
  type: CART_ACTION.ADD_ITEM | CART_ACTION.DELETE_ITEM | CART_ACTION.REMOVE_ITEM
  payload: {
    item: Item;
    quanity: number;
  };
};

type SetDiscountAction = {
  type: typeof CART_ACTION.SET_DISCOUNT;
  payload: string;
};

type ResetAction = {
  type: typeof CART_ACTION.RESET;
};
export type CartAction = AddOrRemoveItemAction | SetDiscountAction | ResetAction;    

export const CartContext = createContext<{
    cartState: CartState;
    cartDispatch: React.Dispatch<CartAction>;
  }>({ cartState: initalCartState, cartDispatch: () => null });