import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type EmptyCheckoutProps = {};

const EmptyCheckout = ({}: EmptyCheckoutProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-secondary">
      <p className="text-3xl">No Items in cart</p>
      <Link to="/">
        <Button variant="link">Return to home page</Button>
      </Link>
    </div>
  );
};

export default EmptyCheckout;
