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
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext/CartContext";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

type CheckoutProps = {};

const Checkout = ({}: CheckoutProps) => {
  const { cartState } = useContext(CartContext);
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
        <section className="flex justify-between w-full  gap-3">
          <section className="w-2/3">
            <Card className="flex flex-col">
              <CardHeader className="ml-auto">
                <CardTitle>$1000</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <section className="flex items-center">
                  <img
                    className="w-48 h-48"
                    src="/src/assets/shoe.png"
                    alt="Product Picture"
                  />
                  <CardContent>
                    <Button className="p-0 text-xl" variant="link">
                      Title of product
                    </Button>
                    <CardDescription>
                      Lorem ipsum dolor sit amet, consectetur adipisicing...
                    </CardDescription>
                  </CardContent>
                </section>

                <CardContent>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input type="number" id="quantity" defaultValue={1} />
                </CardContent>
              </CardContent>
            </Card>
          </section>
          <section className="flex-grow">
            <Card className="p-3">
              <CardContent className="flex justify-between">
                <CardDescription>Price</CardDescription>
                <CardTitle>$1000</CardTitle>
              </CardContent>
              <CardContent className="flex justify-between">
                <CardDescription>Discount</CardDescription>
                <CardTitle>$1000</CardTitle>
              </CardContent>
              <hr className="my-2" />
              <CardContent className="flex justify-between">
                <CardDescription>Total</CardDescription>
                <CardTitle>$1000</CardTitle>
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
