import Checkout from "@/components/Checkout/Checkout";
import Header from "@/components/Header/Header";

type CheckoutPageProps = {};

const CheckoutPage = ({}: CheckoutPageProps) => {
  return (
    <>
      <Header />
      <main className="h-screen bg-secondary px-2">
        <Checkout />
      </main>
    </>
  );
};

export default CheckoutPage;
