import { Cart } from "@/types/cartTypes";
import { CartAction } from "./CartContext";
import { Item } from "@/types/itemsType";

export const CART_ACTION = {
    ADD_ITEM: "ADD_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
    RESET: "RESET",
  };

  export type CartState = {
    cart: Cart;
  };
  export const initalCartState: CartState = {
    cart: {
      items: [],
      totalCost: 0,
    },
  };

  
export const cartReducer = (cartState: CartState, action: CartAction): CartState => {
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