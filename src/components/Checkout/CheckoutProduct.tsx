import { Item } from "@/types/itemsType";

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { CartContext } from "@/contexts/CartContext/CartContext";
import { CART_ACTION } from "@/contexts/CartContext/CartReducer";
import { useContext, useState } from "react";
import { Label } from "@radix-ui/react-label";

type CheckoutProductProps = {
  item: Item[];
};

const CheckoutProduct = ({ item }: CheckoutProductProps) => {
  const { cartDispatch } = useContext(CartContext);
  const [quanity, setQuanity] = useState(item.length);

  const handleCartChange = (action: string) => {
    if (action === "decrement") {
      if (item.length - 1 <= 0) {
        return;
      }
      cartDispatch({ type: CART_ACTION.REMOVE_ITEM, payload: item[0] });
    } else {
      cartDispatch({
        type: CART_ACTION.ADD_ITEM,
        payload: { item: item[0], quanity: 1 },
      });
    }
  };
  const handleRemoveItemFromCart = () => {
    cartDispatch({
      type: CART_ACTION.DELETE_ITEM,
      payload: { item: item[0], quanity: item.length },
    });
  };

  return (
    <>
      <Card key={item[0].id} className="flex flex-col">
        <CardHeader className="ml-auto">
          <CardTitle>$ {item.length * item[0].price}</CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <section className="flex items-center">
            <img
              className="w-48 h-48"
              src={item[0].image}
              alt="Product Picture"
            />
            <CardContent>
              <Link to={`/product/${item[0].id.toString()}`}>
                <Button className="p-0 text-xl" variant="link">
                  {item[0].title}
                </Button>
              </Link>
              <CardDescription className="w-2/4">
                {item[0].description.slice(0, 90)}...
              </CardDescription>
            </CardContent>
          </section>

          <CardContent>
            <section>
              <Label htmlFor="quantity">Quantity</Label>
              <section className="flex gap-2">
                <Input
                  className="w-2/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  type="number"
                  value={quanity}
                  readOnly
                  id="quantity"
                />
                <section className="flex gap-2">
                  <Button
                    onClick={() => {
                      handleCartChange("decrement");
                      setQuanity(Math.max(1, item.length - 1));
                    }}
                    variant="secondary"
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => {
                      handleCartChange("increment");
                      setQuanity(item.length + 1);
                    }}
                    variant="secondary"
                  >
                    +
                  </Button>
                </section>
              </section>
            </section>
          </CardContent>
        </CardContent>
        <CardFooter className="ml-auto">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Remove</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to remove this item?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove
                  <span className="font-bold text-underline">
                    {` ${item[0].title} `}
                  </span>
                  from your shoppingcart
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemoveItemFromCart}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default CheckoutProduct;
