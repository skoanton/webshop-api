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
export const cartReducer = (
  cartState: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CART_ACTION.ADD_ITEM:
   
      const itemIndex = cartState.cart.items.findIndex((group) =>
        group.some((item) => item.id === action.payload.item.id)
      );

      if (itemIndex !== -1) {
     
        const newItems = cartState.cart.items.map((group, index) => {
          if (index === itemIndex) {
      
            return [
              ...group,
              ...Array.from({length:1}, () => action.payload.item),
            ];
          }
          return group;
        });

        return {
          ...cartState,
          cart: {
            items: newItems,
            totalCost:
              cartState.cart.totalCost +
              action.payload.item.price * action.payload.quanity,
          },
        };
      } else {
       
        return {
          ...cartState,
          cart: {
            items: [
              ...cartState.cart.items,
              Array.from(
                { length: action.payload.quanity },
                () => action.payload.item
              ),
            ],
            totalCost:
              cartState.cart.totalCost +
              action.payload.item.price * action.payload.quanity,
          },
        };
      }

    case CART_ACTION.REMOVE_ITEM:
      console.log("Removing item from cart");
      return cartState;
    case CART_ACTION.RESET:
      return { ...cartState, cart: initalCartState.cart };

    default:
      return cartState;
  }
};
