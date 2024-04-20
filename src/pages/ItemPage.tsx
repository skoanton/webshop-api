import Navbar from "@/components/Navbar/Navbar";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";

type ItemPageProps = {};

const ItemPage = ({}: ItemPageProps) => {
  const params = useParams<{ profileId: string }>();
  console.log(params.profileId);
  return (
    <>
      <Navbar />
      {params.profileId && <ProductCard id={params.profileId} />}
    </>
  );
};

export default ItemPage;
