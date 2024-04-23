import Filter from "@/components/Filter/Filter";
import Products from "@/components/Products/Products";
import { ItemsContext } from "@/contexts/ItemContext/ItemsContext";
import { ITEM_ACTION } from "@/contexts/ItemContext/ItemsReducer";
import { Item } from "@/types/itemsType";
import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

type HomePageProps = {};

const ProductsPage = ({}: HomePageProps) => {
  return (
    <>
      <main className="flex gap-2 h-screen">
        <Filter />
        <Products />
      </main>
    </>
  );
};

export default ProductsPage;
