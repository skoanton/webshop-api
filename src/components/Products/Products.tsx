import Filter from "@/components/Filter/Filter";
import Header from "@/components/Header/Header";
import ProductCard from "@/components/ProductCard/ProductCard";

import { useFetch } from "@/hooks/useFetch";

import { useContext, useEffect } from "react";
import NoProductsFound from "./NoProductsFound";
import { ItemsContext } from "@/contexts/ItemContext/ItemsContext";
import { FilterContext } from "@/contexts/FilterProvider/FilterContext";
import { Item } from "@/types/itemsType";
import { ITEM_ACTION } from "@/contexts/ItemContext/ItemsReducer";

type ProductsProps = {};

const Products = ({}: ProductsProps) => {
  const BASE_URL = "https://api.escuelajs.co/api/v1/products";
  const { itemsState, itemsDispatch } = useContext(ItemsContext);
  const { filterState } = useContext(FilterContext);
  const fetchedData: Item[] | null = useFetch<Item[]>({
    url: BASE_URL,
  });
  console.log("Updateing component");
  useEffect(() => {
    if (fetchedData) {
      //Weird image links in api response
      const cleanedData = fetchedData.map((item) => {
        const cleanedImages = item.images.map((imageString) =>
          imageString.replace(/"/g, "").replace("[", "").replace("]", "")
        );
        return { ...item, images: cleanedImages };
      });
      itemsDispatch({
        type: ITEM_ACTION.ADD,
        payload:
          fetchedData /*BYT UT OM DET INTE FUNGERAR cleanedData | fetchedData*/,
      });
    }
  }, [fetchedData]);

  console.log("Current Search Word: ", filterState.filters.searchString);

  const filteredByCategories = (items: Item[]): Item[] => {
    let test = items.filter((item) => {
      if (filterState.filters.categories.length === 0) {
        return true; // returns all items
      } else {
        return filterState.filters.categories.includes(item.category.name);
      }
    });
    console.log("Filtered by Category: ", test);
    return test;
  };

  const filterByPrice = (item: Item[]): Item[] => {
    const test = item.filter((item) => {
      return (
        item.price >= filterState.filters.priceRange.minPrice &&
        item.price <= filterState.filters.priceRange.maxPrice
      );
    });

    console.log("Filtered by price: ", test);
    return test;
  };

  const filterBySearchString = (item: Item[]): Item[] => {
    const filteredItems = item.filter((filteredItem) => {
      if (filterState.filters.searchString.length === 0) {
        return true;
      } else {
        return filteredItem.title
          .toLowerCase()
          .includes(filterState.filters.searchString.toLowerCase());
      }
    });

    console.log("Filtered by String: ", filteredItems);
    return filteredItems;
  };

  const filterItems = (items: Item[]): Item[] => {
    let filteredItems = filterBySearchString(items);
    filteredItems = filteredByCategories(filteredItems);
    filteredItems = filterByPrice(filteredItems);

    console.log("Final:", filteredItems);
    return filteredItems;
  };

  return (
    <>
      {itemsState.items && filterItems(itemsState.items).length > 0 ? (
        <div className="grid grid-cols-4 gap-4 w-full">
          {filterItems(itemsState.items).map((item) => {
            return <ProductCard key={item.id} id={item.id} big={false} />;
          })}
        </div>
      ) : (
        <div className="w-full">
          <NoProductsFound />
        </div>
      )}
    </>
  );
};

export default Products;
