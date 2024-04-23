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
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext/CartContext";

import { Input } from "../ui/input";
import { CART_ACTION } from "@/contexts/CartContext/CartReducer";

import { discountCodes } from "@/data/discounts";
import CheckoutProduct from "./CheckoutProduct";
import EmptyCheckout from "./EmptyCheckout";

type CheckoutProps = {};

const Checkout = ({}: CheckoutProps) => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const [userInputDiscountCode, setUserInputDiscountCode] = useState("");
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
            {cartState.cart.items.length > 0 ? (
              cartState.cart.items.map((item) => {
                return <CheckoutProduct key={item[0].id} item={item} />;
              })
            ) : (
              <EmptyCheckout />
            )}
          </section>
          <section className="flex-grow">
            <Card className="p-3">
              <CardHeader>
                <CardTitle className="text-xl">Coupun code</CardTitle>
                <section className="flex gap-2">
                  <Input
                    className="w-3/4"
                    type="text"
                    id="discount"
                    placeholder={`Discount code (${discountCodes[0].code})`}
                    onChange={(e) =>
                      setUserInputDiscountCode(e.currentTarget.value)
                    }
                  />
                  <Button
                    onClick={() =>
                      cartDispatch({
                        type: CART_ACTION.SET_DISCOUNT,
                        payload: userInputDiscountCode,
                      })
                    }
                    variant="destructive"
                    className="flex-grow"
                  >
                    Apply
                  </Button>
                </section>
              </CardHeader>

              <CardContent className="flex justify-between">
                <CardDescription>Discount</CardDescription>
                <CardTitle> $ {cartState.cart.discount}</CardTitle>
              </CardContent>
              <hr className="my-2" />
              <CardContent className="flex justify-between">
                <CardDescription>Total</CardDescription>
                {cartState.cart.totalCost - cartState.cart.discount > 0 ? (
                  <CardTitle>$ {cartState.cart.totalCost}</CardTitle>
                ) : (
                  <CardTitle>$ 0</CardTitle>
                )}
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
