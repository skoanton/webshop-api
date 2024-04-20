import { Category, Item } from "@/data/interfaces";
import { ItemContext } from "@/providers/Itemsprovider";
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
