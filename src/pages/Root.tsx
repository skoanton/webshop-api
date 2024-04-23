import Header from "@/components/Header/Header";
import { Toaster } from "@/components/ui/toaster";
import { ItemsContext } from "@/contexts/ItemContext/ItemsContext";
import { ITEM_ACTION } from "@/contexts/ItemContext/ItemsReducer";
import { Item } from "@/types/itemsType";
import { useContext, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

type RootProps = {};

const Root = ({}: RootProps) => {
  const { itemsDispatch } = useContext(ItemsContext);
  const items = useLoaderData() as Item[];

  useEffect(() => {
    itemsDispatch({
      type: ITEM_ACTION.ADD,
      payload: items,
    });
  }, [items]);
  return (
    <>
      <Header />

      <Outlet />
      <Toaster />
    </>
  );
};

export default Root;
