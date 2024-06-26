import ProductCard from "@/components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";

type HomePageProps = {};

const ProductPage = ({}: HomePageProps) => {
  const params = useParams<{ profileId: string }>();
  console.log(params.profileId);
  return (
    <>
      <ProductCard id={params.profileId as string} big={true} />
    </>
  );
};

export default ProductPage;
