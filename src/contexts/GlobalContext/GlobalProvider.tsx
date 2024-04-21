import React from "react";
import Itemsprovider from "../ItemContext/ItemsProvider";
import FilterProvider from "../FilterProvider/FilterProvider";
import CartProvider from "../CartContext/CartProvider";

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
