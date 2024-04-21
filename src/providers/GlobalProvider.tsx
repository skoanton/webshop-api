import React from "react";
import Itemsprovider from "./Itemsprovider";
import FilterProvider from "./FilterProvider";
import CartProvider from "./CartProvider";
import { CircleHelpIcon } from "lucide-react";

type GlobalProviderProps = {
  children: React.ReactNode;
};

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <>
      <Itemsprovider>
        <FilterProvider>
          <CartProvider>{children}</CartProvider>
        </FilterProvider>
      </Itemsprovider>
    </>
  );
};

export default GlobalProvider;
