import { Item } from "@/types/itemsType";
import { ItemsAction } from "./ItemsContext";
import { title } from "process";

export enum ITEM_ACTION  {
    ADD = "ADD",
    SORT_NAME_ASC = "SORT_NAME_ASC",
    SORT_NAME_DESC = "SORT_NAME_DESC",
    SORT_PRICE_ASC = "SORT_PRICE_ASC",
    SORT_PRICE_DESC = "SORT_PRICE_DESC",
  };
  
export type ItemsState = {
    items: Item[];
  };

  export const initialItemsState: ItemsState = {
    items: [],
  };

export const itemsReducer = (itemsState: ItemsState, action: ItemsAction): ItemsState => {
    switch (action.type) {
      case ITEM_ACTION.ADD:
        return { ...itemsState, items: action.payload };
      case ITEM_ACTION.SORT_NAME_ASC:

        const sortedNameAscArray =  [...itemsState.items].sort((firstItem,secondItem) => {
          if(firstItem.title < secondItem.title){
            return -1;
          }
          else if(firstItem.title > secondItem.title){
            return 1;
          }
          else{
            return 0
          }
        });
        return {...itemsState, items: sortedNameAscArray}

      case ITEM_ACTION.SORT_NAME_DESC:
        const sortedNameDescArray =  [...itemsState.items].sort((firstItem,secondItem) => {
          if(secondItem.title < firstItem.title){
            return -1;
          }
          else if(secondItem.title > firstItem.title){
            return 1;
          }
          else{
            return 0
          }
        });
        return {...itemsState, items: sortedNameDescArray}

        case ITEM_ACTION.SORT_PRICE_ASC:

          const sortredPriceAscArray = [...itemsState.items].sort((firstItem,secondItem) => secondItem.price - firstItem.price);
          return {...itemsState, items: sortredPriceAscArray}
        case ITEM_ACTION.SORT_PRICE_DESC:
          const sortredPriceDescArray = [...itemsState.items].sort((firstItem,secondItem) => firstItem.price - secondItem.price);
          return {...itemsState, items: sortredPriceDescArray}
      default:
        return itemsState;
    }
  };