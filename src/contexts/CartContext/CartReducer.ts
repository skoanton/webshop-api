import { Cart } from "@/types/cartTypes";
import { CartAction } from "./CartContext";
import { group } from "console";
import { getIndexOfItem } from "@/utils/manipulateData";

export const CART_ACTION = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  DELETE_ITEM : "DELETE_ITEM",
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
      console.log("Starting to add items to cart");
      const itemIndex = getIndexOfItem(action.payload.item,cartState.cart.items);

      if (itemIndex !== -1) {
        const newItems = cartState.cart.items.map((group, index) => {
          //Item already exists
          if (index === itemIndex) {
            return [
              ...group,
              ...Array.from({ length: 1 }, () => action.payload.item),
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
              action.payload.item.price,
          },
        };
      }
      // Item did not exist
      else {
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
            totalCost: cartState.cart.totalCost + (action.payload.item.price * action.payload.quanity),
          },
        };
      }

    case CART_ACTION.REMOVE_ITEM:
      console.log("Removing item from cart");

      const removeItemIndex = getIndexOfItem(action.payload.item,cartState.cart.items);

      if (removeItemIndex !== -1) {
        const newGroups = cartState.cart.items.map((group, index) => {
          if (index == removeItemIndex) {
            const newGroup = [...group];
            newGroup.pop();
            return newGroup;
          }
          return group;
        });

        return {
          ...cartState,
          cart: {
            items: newGroups,
            totalCost: cartState.cart.totalCost - action.payload.item.price,
          },
        };
      }
      return cartState;

      case CART_ACTION.DELETE_ITEM: 
        
      const deleteIndexValue = getIndexOfItem(action.payload.item,cartState.cart.items);

      if(deleteIndexValue !== -1){

        const newGroup = cartState.cart.items.map((group,index) => {
          if(index === deleteIndexValue){
            return group.filter(item => item.id !== action.payload.item.id);
          }
          return group;
        });
        //remove empty array
        const finalGroups = newGroup.filter(group => group.length > 0);
        console.log("New group:",finalGroups);

       return {
          ...cartState,
          cart: {
            items: finalGroups,
            totalCost: cartState.cart.totalCost - (action.payload.item.price * action.payload.quanity)
          }
        }

    
      }

      return cartState;



    case CART_ACTION.RESET:
      return { ...cartState, cart: initalCartState.cart };

    default:
      return cartState;
  }
};
