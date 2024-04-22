import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import React, { ChangeEvent, useContext } from "react";
import { CartContext } from "@/contexts/CartContext/CartContext";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { CART_ACTION } from "@/contexts/CartContext/CartReducer";
import { Item } from "@/types/itemsType";

type CheckoutProps = {};

const Checkout = ({}: CheckoutProps) => {
  const { cartState, cartDispatch } = useContext(CartContext);

  const handleCartChange = (e: ChangeEvent<HTMLInputElement>, item: Item[]) => {
    if (parseInt(e.currentTarget.value) <= item.length) {
      cartDispatch({
        type: CART_ACTION.REMOVE_ITEM,
        payload: { item: item[0], quanity: parseInt(e.currentTarget.value) },
      });
    } else {
      console.log("Add more");
      cartDispatch({
        type: CART_ACTION.ADD_ITEM,
        payload: { item: item[0], quanity: parseInt(e.currentTarget.value) },
      });
    }
  };

  const handleRemoveItemFromCart = (item: Item[]) => {
    cartDispatch({
      type: CART_ACTION.DELETE_ITEM,
      payload: { item: item[0], quanity: item.length },
    });
    console.log("Deleted item");
  };

  return (
    <>
      <section className="bg-secondary flex flex-col h-full">
        <section className="flex w-full justify-between">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back To Previous page
            </Button>
          </Link>
        </section>
        <section className="flex justify-between w-full gap-3">
          <section className="w-2/3 flex flex-col gap-2">
            {cartState.cart.items &&
              cartState.cart.items.map((item) => {
                return (
                  <Card key={item[0].id} className="flex flex-col">
                    <CardHeader className="ml-auto">
                      <p>{`/product/${item[0].id.toString()}`}</p>
                      <CardTitle>$ {item.length * item[0].price}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex items-center justify-between">
                      <section className="flex items-center">
                        <img
                          className="w-48 h-48"
                          src="/src/assets/shoe.png"
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
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          type="number"
                          id="quantity"
                          defaultValue={item.length}
                          onChange={(e) => {
                            handleCartChange(e, item);
                          }}
                        />
                      </CardContent>
                    </CardContent>
                    <CardFooter className="ml-auto">
                      <Button
                        onClick={() => {
                          handleRemoveItemFromCart(item);
                        }}
                      >
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
          </section>
          <section className="flex-grow">
            <Card className="p-3">
              <CardContent className="flex justify-between">
                <CardDescription>Price</CardDescription>
                <CardTitle>$ {cartState.cart.totalCost}</CardTitle>
              </CardContent>
              <CardContent className="flex justify-between">
                <CardDescription>Discount</CardDescription>
                <CardTitle>$1000</CardTitle>
              </CardContent>
              <hr className="my-2" />
              <CardContent className="flex justify-between">
                <CardDescription>Total</CardDescription>
                <CardTitle>$ {cartState.cart.totalCost}</CardTitle>
              </CardContent>
              <CardFooter>
                <Button className="mx-auto">Checkout</Button>
              </CardFooter>
            </Card>
          </section>
        </section>
      </section>
    </>
  );
};

export default Checkout;
