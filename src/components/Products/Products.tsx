import Filter from "@/components/Filter/Filter";
import Header from "@/components/Header/Header";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Item } from "@/data/interfaces";
import { useFetch } from "@/hooks/useFetch";
import { FilterContext } from "@/providers/FilterProvider";
import { ITEM_ACTION, ItemContext } from "@/providers/Itemsprovider";
import { useContext, useEffect } from "react";

type ProductsProps = {};

const Products = ({}: ProductsProps) => {
  const BASE_URL = "https://api.escuelajs.co/api/v1/products";
  const { itemState, itemDispatch } = useContext(ItemContext);
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
      itemDispatch({
        type: ITEM_ACTION.ADD,
        payload:
          fetchedData /*BYT UT OM DET INTE FUNGERAR cleanedData | fetchedData*/,
      });
    }
  }, [fetchedData]);

  const filterItems = (items: Item[], onlyPrice: boolean): Item[] => {
    if (onlyPrice) {
      const filteredItems: Item[] = items.filter(
        (filteredItem) =>
          filteredItem.price >= filterState.filters.priceRange.minPrice &&
          filteredItem.price <= filterState.filters.priceRange.maxPrice
      );
      return filteredItems;
    } else {
      const filteredItems: Item[] = items.filter(
        (filteredItem) =>
          (filterState.filters.categories.includes(
            filteredItem.category.name
          ) &&
            filteredItem.price >= filterState.filters.priceRange.minPrice &&
            filteredItem.price <= filterState.filters.priceRange.maxPrice) ||
          filteredItem.title
            .toLowerCase()
            .includes(filterState.filters.searchString.toLowerCase())
      );
      return filteredItems;
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {itemState.items &&
          (filterState.filters.filterActive ? (
            filterItems(itemState.items, false).map((item) => {
              return <ProductCard key={item.id} id={item.id} big={false} />;
            })
          ) : (
            <>
              {itemState.items &&
                filterItems(itemState.items, true).map((item) => (
                  <ProductCard key={item.id} id={item.id} big={false} />
                ))}
            </>
          ))}
      </div>
    </>
  );
};

export default Products;
