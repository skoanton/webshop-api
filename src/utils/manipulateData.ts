import { CartContext } from "@/contexts/CartContext/CartContext";
import { useCart } from "@/hooks/useCart";
import { Category, Item } from "@/types/itemsType";
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

export const getIndexOfItem = (item:Item,items:Item[][]): number => {
  
  return items.findIndex((group) =>
    group.some((items) => items.id === item.id)
  );
}