import ItemCarousel from "@/components/ItemCarousel/ItemCarousel";
import Navbar from "@/components/Navbar/Navbar";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Card, CardTitle } from "@/components/ui/card";
import { Item } from "@/data/interfaces";
import { useFetch } from "@/hooks/useFetch";
import { ACTION, ItemContext } from "@/providers/Itemsprovider";
import { useContext, useEffect } from "react";

type HomePageProps = {};

const ProductsPage = ({}: HomePageProps) => {
  const BASE_URL = "https://api.escuelajs.co/api/v1/products";
  const { state, dispatch } = useContext(ItemContext);
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
        console.log("Cleand images:", cleanedImages);
        return { ...item, images: cleanedImages };
      });
      dispatch({
        type: ACTION.ADD,
        payload: fetchedData /*BYT UT OM DET INTE FUNGERAR*/,
      });
    }
  }, [fetchedData]);

  return (
    <>
      <Navbar />
      {!isLoading && <ItemCarousel />}
      <div className="grid grid-cols-4 gap-4">
        {state.items &&
          state.items.map((item) => <ProductCard key={item.id} id={item.id} />)}
      </div>
    </>
  );
};

export default ProductsPage;
