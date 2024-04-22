import { Category, Item } from "@/data/interfaces";
import { ItemContext } from "@/providers/Itemsprovider";
import { Cart } from "@/types/cartTypes";
import { useContext } from "react";



export const getCategories = (items:Item[]): Category[] => {
    
  const categories: Category[] = [];
  items.map((item) => {
    if (!categories.some((category) => category.id === item.category.id)) {
      categories.push(item.category);
    }
  });

  return categories;
};

/* export const getCartItems = (cartItems:Cart[]): Item[] => {
  const cartItems: Cart[] = [];
  cartItems.map((item) => {
    if (!cartItems.some((cartItem) => cartItem. === items.id)) {
      cartItems.push(item.category);
    }
  });

  return items;
} */
