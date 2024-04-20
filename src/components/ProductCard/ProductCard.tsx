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
import { Item } from "@/data/interfaces";
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "@/providers/Itemsprovider";
import { Button } from "../ui/button";
import { ShoppingBasket } from "lucide-react";
import { Input } from "../ui/input";

type ProductCardProps = {
  id: number | string;
  big: boolean;
};

const ProductCard = ({ id, big }: ProductCardProps) => {
  const { itemState } = useContext(ItemContext);
  const [currentCost, setCurrentCost] = useState(0);
  const currentItem: Item | undefined = itemState.items.find(
    (item) => item.id.toString() === id.toString()
  );

  if (big) {
    useEffect(() => {
      console.log("inside useEffect");
      if (currentItem) {
        setCurrentCost(currentItem.price);
      }
    }, [currentItem]);
  }

  return (
    <>
      {currentItem &&
        (!big ? (
          <Link to={`product/${currentItem.id.toString()}`} className="h-min">
            <Card key={id} className={`flex flex-col justify-between`}>
              <CardContent className="bg-secondary">
                <img
                  className="w-32 h-32 mx-auto"
                  src={"/src/assets/shoe.png"}
                  alt="Product image"
                />
              </CardContent>
              <CardHeader>
                <CardTitle>{currentItem.title}</CardTitle>
                <CardDescription>{currentItem.category.name}</CardDescription>
              </CardHeader>
              <CardFooter className="flex-row justify-between">
                <p className="font-bold text-xl text-secondary-foreground">
                  ${currentItem.price}
                </p>
                <Button>
                  <ShoppingBasket className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ) : (
          <section className="flex gap-2 h-full p-4 bg-secondary">
            <section className="w-1/3 h-full">
              <img src={"/src/assets/shoe.png"} alt="Product page" />
            </section>
            <section className="w-1/3 h-full">
              <Card className="h-2/4 flex flex-col justify-between">
                <CardHeader>
                  <CardDescription>{currentItem.category.name}</CardDescription>
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
                    <Button variant="secondary">
                      <ShoppingBasket className="w-4 h-4 mr-2" /> Add to
                      favorites
                    </Button>
                  </section>
                </CardFooter>
              </Card>
            </section>
            <section className="w-1/3">
              <Card className=" h-2/4">
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <section className="flex gap-2">
                    <Input type="text" id="discount" placeholder="Discount" />
                    <Button>Apply</Button>
                  </section>

                  <section>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      type="number"
                      id="quantity"
                      defaultValue={1}
                      onChange={(e) => {
                        setCurrentCost(
                          currentItem.price * parseInt(e.target.value)
                        );
                      }}
                    />
                  </section>
                  <section className="flex justify-between">
                    <CardDescription>Price</CardDescription>
                    <p className="font-bold text-secondary-foreground">
                      $ {currentItem.price}
                    </p>
                  </section>
                  <hr className="my-2" />
                  <section className="flex justify-between">
                    <CardDescription>Total Ammount</CardDescription>
                    <p className="font-bold text-secondary-foreground">
                      $ {currentCost}
                    </p>
                  </section>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button>
                    <ShoppingBasket className="w-4 h-4 mr-2" /> Add to cart
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </section>
        ))}
    </>
  );
};

export default ProductCard;
