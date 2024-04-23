import Checkout from "@/components/Checkout/Checkout";
import Header from "@/components/Header/Header";
import { Toaster } from "@/components/ui/toaster";

type CheckoutPageProps = {};

const CheckoutPage = ({}: CheckoutPageProps) => {
  return (
    <>
      <Header />
      <main className="h-screen bg-secondary px-2">
        <Checkout />
        <Toaster />
      </main>
    </>
  );
};

export default CheckoutPage;
