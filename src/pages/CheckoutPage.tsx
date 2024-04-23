import Checkout from "@/components/Checkout/Checkout";
import { Toaster } from "@/components/ui/toaster";

type CheckoutPageProps = {};

const CheckoutPage = ({}: CheckoutPageProps) => {
  return (
    <>
      <main className="h-screen bg-secondary px-2">
        <Checkout />
        <Toaster />
      </main>
    </>
  );
};

export default CheckoutPage;
