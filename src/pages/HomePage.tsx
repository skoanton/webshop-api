import Filter from "@/components/Filter/Filter";
import Header from "@/components/Header/Header";
import Products from "@/components/Products/Products";
import { Item } from "@/data/interfaces";
import { useFetch } from "@/hooks/useFetch";
import { FilterContext } from "@/providers/FilterProvider";
import { ITEM_ACTION, ItemContext } from "@/providers/Itemsprovider";
import { useContext, useEffect } from "react";

type HomePageProps = {};

const ProductsPage = ({}: HomePageProps) => {
  return (
    <>
      <Header />
      <main className="flex gap-2">
        <Filter />
        <Products />
      </main>
    </>
  );
};

export default ProductsPage;
