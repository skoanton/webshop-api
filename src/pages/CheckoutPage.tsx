import { CartContext } from "@/providers/CartProvider";
import { useContext } from "react";

type CheckoutPageProps = {};

const CheckoutPage = ({}: CheckoutPageProps) => {
  const { cartState } = useContext(CartContext);
  return (
    <>
      {cartState.cart.items.map((item) => {
        return <p>{item.title}</p>;
      })}
    </>
  );
};

export default CheckoutPage;
