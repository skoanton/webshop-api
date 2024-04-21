import { Cart, Item } from "@/data/interfaces";
import React, { createContext, useContext, useReducer } from "react";

export const CART_ACTION = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  RESET: "RESET",
};

type Action = {
  type: string;
  payload: {
    item: Item;
    quanity: number;
  };
};
type CartProviderProps = {
  children: React.ReactNode;
};

type CartState = {
  cart: Cart;
};

const initalCartState: CartState = {
  cart: {
    items: [],
    totalCost: 0,
  },
};

const cartReducer = (cartState: CartState, action: Action): CartState => {
  switch (action.type) {
    case CART_ACTION.ADD_ITEM:
      const itemsToAdd: Item[] = [];
      for (let i = 0; i < action.payload.quanity; i++) {
        itemsToAdd.push(action.payload.item);
      }

      return {
        ...cartState,
        cart: {
          items: [...cartState.cart.items, ...itemsToAdd],
          totalCost:
            cartState.cart.totalCost +
            action.payload.item.price * action.payload.quanity,
        },
      };

    case CART_ACTION.RESET:
      return { ...cartState, cart: initalCartState.cart };

    default:
      return cartState;
  }
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initalCartState);
  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const CartContext = createContext<{
  cartState: CartState;
  cartDispatch: React.Dispatch<Action>;
}>({ cartState: initalCartState, cartDispatch: () => null });
