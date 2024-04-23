import { Item } from "@/types/itemsType";
import { createContext } from "react";
import { CART_ACTION, CartState, initalCartState } from "./CartReducer";

type AddAndDeleteItemAction = {
  type: CART_ACTION.ADD_ITEM | CART_ACTION.DELETE_ITEM,
  payload: {
    item: Item;
    quanity: number;
  };
};

type RemoveItemAction = {
  type: CART_ACTION.REMOVE_ITEM
  payload: Item;
}


type SetDiscountAction = {
  type: typeof CART_ACTION.SET_DISCOUNT;
  payload: string;
};

type ResetAction = {
  type: typeof CART_ACTION.RESET;
};
export type CartAction = AddAndDeleteItemAction | RemoveItemAction | SetDiscountAction | ResetAction;    

export const CartContext = createContext<{
    cartState: CartState;
    cartDispatch: React.Dispatch<CartAction>;
  }>({ cartState: initalCartState, cartDispatch: () => null });