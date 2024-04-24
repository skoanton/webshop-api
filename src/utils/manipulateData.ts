
import { Category, Item } from "@/types/itemsType";

export const getCategories = (items:Item[]): Category[] => {
    
  const categories: Category[] = [];
  items.map((item) => {
    if (!categories.some((category) => category === item.category)) {
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