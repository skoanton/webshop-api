import Filter from "@/components/Filter/Filter";
import Products from "@/components/Products/Products";

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
