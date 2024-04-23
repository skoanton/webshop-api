import Filter from "@/components/Filter/Filter";
import Header from "@/components/Header/Header";
import Products from "@/components/Products/Products";
import { Toaster } from "@/components/ui/toaster";
import { ItemsContext } from "@/contexts/ItemContext/ItemsContext";
import { ITEM_ACTION } from "@/contexts/ItemContext/ItemsReducer";
import { Item } from "@/types/itemsType";
import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

type HomePageProps = {};

const ProductsPage = ({}: HomePageProps) => {
  const { itemsDispatch } = useContext(ItemsContext);
  const items = useLoaderData() as Item[];

  useEffect(() => {
    itemsDispatch({
      type: ITEM_ACTION.ADD,
      payload: items,
    });
  }, [items]);

  return (
    <>
      <Header />
      <main className="flex gap-2 h-screen">
        <Filter />
        <Products />
        <Toaster />
      </main>
    </>
  );
};

export default ProductsPage;
