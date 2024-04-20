import { ItemContext } from "@/providers/Itemsprovider";
import { useContext } from "react";
import ProductCard from "../ProductCard/ProductCard";

type ProductsProps = {};

const Products = ({}: ProductsProps) => {
  const { state } = useContext(ItemContext);
  /*   console.log(JSON.parse(state.items[0].images[0])); */
  return (
    <section className="flex flex-wrap gap-4 w-full mt-4">
      {state.items && state.items.map((item) => <ProductCard id={item.id} />)}
    </section>
  );
};

export default Products;
