import { Cart } from "@/types/cartTypes";
import { getIndexOfItem } from "@/utils/manipulateData";
import { CartAction } from "./CartContext";
import { discountCodes } from "@/data/discounts";

export enum CART_ACTION  {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM= "REMOVE_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  SET_DISCOUNT= "SET_DISCOUNT",
  RESET = "RESET",
};

export type CartState = {
  cart: Cart;
};
export const initalCartState: CartState = {
  cart: {
    items: [],
    totalCost: 0,
    discount: 0,
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
                  ...Array.from({ length:action.payload.quanity }, () => action.payload.item),
                ];
              }
              return group;
            });
         
          return {
            ...cartState,
            cart: {
              items: newItems,
              totalCost:
                (cartState.cart.totalCost +
                action.payload.item.price) - cartState.cart.discount,
                discount :cartState.cart.discount
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
              discount: cartState.cart.discount
            },
          };
        }  
    case CART_ACTION.REMOVE_ITEM:
      console.log("Removing item from cart");
      const removeItemIndex = getIndexOfItem(action.payload,cartState.cart.items);

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
            totalCost: (cartState.cart.totalCost - action.payload.price) - cartState.cart.discount,
            discount: cartState.cart.discount
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

       return {
          ...cartState,
          cart: {
            items: finalGroups,
            totalCost: (cartState.cart.totalCost - (action.payload.item.price * action.payload.quanity) - cartState.cart.discount),
            discount: cartState.cart.discount
          }
        }
    
      }
      return cartState;
    case CART_ACTION.RESET:
      return { ...cartState, cart: initalCartState.cart };

    case CART_ACTION.SET_DISCOUNT: 

      const newDiscountCode = discountCodes.find((disc) => disc.code === action.payload);
      
      if(newDiscountCode){
        console.log("applying discount code");
        return {
          ...cartState, cart:{
            items: cartState.cart.items,
            totalCost: cartState.cart.totalCost - newDiscountCode.discount,
            discount: newDiscountCode.discount
          }
        }
      }
      else{
        return cartState;
      }

      
    default:
      return cartState;
  }
};
