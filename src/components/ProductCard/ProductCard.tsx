import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Item } from "@/data/interfaces";
import { useContext } from "react";
import { ItemContext } from "@/providers/Itemsprovider";
import { Button } from "../ui/button";

type ProductCardProps = {
  id: number | string;
  size?: "small" | "medium" | "big";
};

const ProductCard = ({ id, size }: ProductCardProps) => {
  const { state } = useContext(ItemContext);
  const currentItem: Item | undefined = state.items.find(
    (item) => item.id === id
  );
  console.log(currentItem);
  const getSizeClass = (): string => {
    switch (size) {
      case "small":
        return "w-32 max-h-32";
      case "big":
        return "w-96 max-h-80";
      default:
        return "w-64 max-h-58";
    }
  };

  return (
    <>
      {currentItem && (
        <Card
          key={id}
          className={`flex flex-col justify-between ${getSizeClass()}`}
        >
          <CardHeader>
            <CardTitle>{currentItem.title}</CardTitle>
            <CardDescription>{currentItem.category.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={"src/assets/shoe.png"} alt="Product image" />
          </CardContent>
          <CardFooter className="flex-row justify-between">
            <p>
              Price: <span className="font-bold">${currentItem.price}</span>
            </p>
            <Link to={`/products/${currentItem.id.toString()}`}>
              <Button>Add to cart</Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ProductCard;
