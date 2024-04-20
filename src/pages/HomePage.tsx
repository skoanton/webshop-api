import Filter from "@/components/Filter/Filter";
import Header from "@/components/Header/Header";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Item } from "@/data/interfaces";
import { useFetch } from "@/hooks/useFetch";
import { FilterContext } from "@/providers/FilterProvider";
import { ITEM_ACTION, ItemContext } from "@/providers/Itemsprovider";
import { useContext, useEffect } from "react";

type HomePageProps = {};

const ProductsPage = ({}: HomePageProps) => {
  const BASE_URL = "https://api.escuelajs.co/api/v1/products";
  const { itemState, dispatch } = useContext(ItemContext);
  const { filterState } = useContext(FilterContext);
  const {
    data: fetchedData,
    isLoading,
  }: { data: Item[] | null; isLoading: boolean } = useFetch<Item[]>({
    url: BASE_URL,
  });

  useEffect(() => {
    if (fetchedData) {
      //Weird image links in api response
      const cleanedData = fetchedData.map((item) => {
        const cleanedImages = item.images.map((imageString) =>
          imageString.replace(/"/g, "").replace("[", "").replace("]", "")
        );
        return { ...item, images: cleanedImages };
      });
      dispatch({
        type: ITEM_ACTION.ADD,
        payload: cleanedData /*BYT UT OM DET INTE FUNGERAR*/,
      });
    }
  }, [fetchedData]);

  return (
    <>
      <Header />
      <main className="flex gap-2">
        <Filter />
        <div className="grid grid-cols-4 gap-4">
          {itemState.items &&
            (filterState.filters.filterActive ? (
              itemState.items
                .filter(
                  (filteredItem) =>
                    filterState.filters.categories.includes(
                      filteredItem.category.name
                    ) &&
                    filteredItem.price >=
                      filterState.filters.priceRange.minPrice &&
                    filteredItem.price <=
                      filterState.filters.priceRange.maxPrice
                )
                .map((item) => {
                  return <ProductCard key={item.id} id={item.id} big={false} />;
                })
            ) : (
              <>
                {itemState.items &&
                  itemState.items
                    .filter(
                      (filteredItem) =>
                        filteredItem.price >=
                          filterState.filters.priceRange.minPrice &&
                        filteredItem.price <=
                          filterState.filters.priceRange.maxPrice
                    )
                    .map((item) => (
                      <ProductCard key={item.id} id={item.id} big={false} />
                    ))}
              </>
            ))}
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
