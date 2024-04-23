import Filter from "@/components/Filter/Filter";
import Header from "@/components/Header/Header";
import Products from "@/components/Products/Products";
import { Toaster } from "@/components/ui/toaster";

type HomePageProps = {};

const ProductsPage = ({}: HomePageProps) => {
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
