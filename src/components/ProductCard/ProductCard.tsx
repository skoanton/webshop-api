import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@/components/ui/label";

import { ChangeEvent, useContext, useEffect, useState } from "react";

import { Button } from "../ui/button";
import { ArrowLeft, Heart, ShoppingBasket } from "lucide-react";
import { Input } from "../ui/input";

import ItemCarousel from "../ItemCarousel/ItemCarousel";
import { ItemsContext } from "@/contexts/ItemContext/ItemsContext";
import { CartContext } from "@/contexts/CartContext/CartContext";
import { Item } from "@/types/itemsType";
import { CART_ACTION } from "@/contexts/CartContext/CartReducer";
import { useToast } from "../ui/use-toast";
type ProductCardProps = {
  id: number | string;
  big: boolean;
};

const ProductCard = ({ id, big }: ProductCardProps) => {
  const { itemsState } = useContext(ItemsContext);
  const { cartDispatch } = useContext(CartContext);
  const [currentCost, setCurrentCost] = useState<number>(0);
  const [quanity, setQuanity] = useState(1);
  const { toast } = useToast();

  const currentItem: Item | undefined = itemsState.items.find(
    (item) => item.id.toString() === id.toString()
  );

  if (big) {
    useEffect(() => {
      if (currentItem) {
        setCurrentCost(currentItem.price * quanity);
      }
    }, [currentItem, quanity]);
  }

  const handleAddToCart = (item: Item, quanity: number) => {
    cartDispatch({
      type: CART_ACTION.ADD_ITEM,
      payload: { item: item, quanity: quanity },
    });

    toast({
      title: "Item added",
      description: `${item.title} added to shopping cart`,
      duration: 1000,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuanity(Number(e.currentTarget.value));
  };
  const decrement = () => setQuanity((prev) => Math.max(1, prev - 1));
  const increment = () => setQuanity((prev) => prev + 1);

  return (
    <>
      {currentItem &&
        (!big ? (
          <Card key={id} className={`flex flex-col justify-between h-96`}>
            <Link to={`product/${currentItem.id.toString()}`}>
              <CardContent className="bg-secondary">
                <img
                  className="w-32 h-32 mx-auto"
                  src={"/src/assets/shoe.png"}
                  alt="Product image"
                />
              </CardContent>
            </Link>
            <Link to={`product/${currentItem.id.toString()}`}>
              <CardHeader>
                <CardTitle>{currentItem.title}</CardTitle>
                <CardDescription>{currentItem.category.name}</CardDescription>
              </CardHeader>
            </Link>
            <CardFooter className="flex-row justify-between mt-auto">
              <p className="font-bold text-xl text-secondary-foreground">
                ${currentItem.price}
              </p>
              <Button
                onClick={() => {
                  handleAddToCart(currentItem, 1);
                }}
              >
                <ShoppingBasket className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <section className=" p-4 bg-secondary flex flex-col h-full">
            <section className="flex justify-between">
              <Link to="/">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back To Previous page
                </Button>
              </Link>
            </section>

            <section className="flex gap-2 h-full">
              <section className="w-1/3 h-full">
                <img
                  className="w-3/4 mx-auto"
                  src={"/src/assets/shoe.png"}
                  alt="Product page"
                />
                <ItemCarousel
                  images={[
                    "/src/assets/shoe.png",
                    "/src/assets/shoe.png",
                    "/src/assets/shoe.png",
                    "/src/assets/shoe.png",
                    "/src/assets/shoe.png",
                    "/src/assets/shoe.png",
                    "/src/assets/shoe.png",
                    "/src/assets/shoe.png",
                    "/src/assets/shoe.png",
                  ]}
                />
              </section>
              <section className="w-1/3 h-full">
                <Card className="flex flex-col justify-between">
                  <CardHeader>
                    <CardDescription>
                      {currentItem.category.name}
                    </CardDescription>
                    <CardTitle>{currentItem.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p>{currentItem.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <section className="flex flex-col">
                      <p>Price</p>
                      <p className="font-bold text-secondary-foreground text-xl">
                        $ {currentItem.price}
                      </p>
                    </section>
                    <section>
                      <Button disabled variant="ghost">
                        <Heart className="w-4 h-4 mr-2" /> Add to favorites
                        (WIP)
                      </Button>
                    </section>
                  </CardFooter>
                </Card>
              </section>
              <section className="w-1/3 h-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <section>
                      <Label htmlFor="quantity">Quantity</Label>
                      <section className="flex gap-2">
                        <Input
                          className="w-2/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          type="number"
                          value={quanity}
                          id="quantity"
                          onChange={(e) => {
                            handleChange(e);
                            setCurrentCost(
                              currentItem.price * Number(e.currentTarget.value)
                            );
                          }}
                        />
                        <section className="flex gap-2">
                          <Button onClick={decrement} variant="secondary">
                            -
                          </Button>
                          <Button onClick={increment} variant="secondary">
                            +
                          </Button>
                        </section>
                      </section>
                    </section>
                    <section className="flex justify-between">
                      <CardDescription className="underline">
                        Price
                      </CardDescription>
                      <p className="font-bold text-secondary-foreground">
                        $ {currentItem.price}
                      </p>
                    </section>
                    <hr />
                    <section className="flex justify-between">
                      <CardDescription className="underline">
                        Total
                      </CardDescription>
                      <p className="font-bold text-secondary-foreground">
                        $ {currentCost}
                      </p>
                    </section>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button
                      onClick={() => {
                        handleAddToCart(currentItem, quanity);
                      }}
                    >
                      <ShoppingBasket className="w-4 h-4 mr-2" /> Add to cart
                    </Button>
                  </CardFooter>
                </Card>
              </section>
            </section>
          </section>
        ))}
    </>
  );
};

export default ProductCard;
