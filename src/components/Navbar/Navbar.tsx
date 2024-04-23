import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useContext, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Search, Text } from "lucide-react";
import { FilterContext } from "@/contexts/FilterProvider/FilterContext";
import { FILTER_ACTION } from "@/contexts/FilterProvider/FilterReducer";
import { ItemsContext } from "@/contexts/ItemContext/ItemsContext";
import { ITEM_ACTION } from "@/contexts/ItemContext/ItemsReducer";
import { Link, useLocation } from "react-router-dom";
import { getCategories } from "@/utils/manipulateData";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";

type NavbarProps = {};

const Navbar = ({}: NavbarProps) => {
  const { filterDispatch } = useContext(FilterContext);
  const [searchString, setSearchString] = useState("");
  const { itemsDispatch } = useContext(ItemsContext);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { itemsState } = useContext(ItemsContext);
  const handleSearch = () => {
    console.log("searching");
    filterDispatch({
      type: FILTER_ACTION.SET_SEARCH_STRING,
      payload: searchString,
    });
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  };

  const sort = (sortType: string) => {
    switch (sortType) {
      case "priceDesc":
        itemsDispatch({ type: ITEM_ACTION.SORT_PRICE_DESC });
        break;
      case "priceAsc":
        itemsDispatch({ type: ITEM_ACTION.SORT_PRICE_ASC });
        break;
      case "nameAsc":
        itemsDispatch({ type: ITEM_ACTION.SORT_NAME_ASC });
        break;
      case "nameDesc":
        itemsDispatch({ type: ITEM_ACTION.SORT_NAME_DESC });
        break;

      default:
        break;
    }
  };

  return (
    <section className="mb-4 flex flex-col gap-2">
      <section className="flex h-fit">
        <img className="w-52" src="/src/assets/logo.png" alt="Logo" />
        <section className="flex gap-3 mx-auto">
          {location.pathname === "/" ? (
            <section className="flex gap-3">
              <Input
                className="w-80"
                ref={inputSearchRef}
                type="text"
                placeholder="What are you looking for?"
                onChange={(e) => setSearchString(e.currentTarget.value)}
              />
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </section>
          ) : (
            getCategories(itemsState.items).map((category) => {
              return (
                <section key={category.id} className="flex justify-between">
                  <NavigationMenu className="cursor-pointer">
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {category.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </section>
              );
            })
          )}
        </section>
        <Select onValueChange={(e) => sort(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priceDesc">Price (low to high)</SelectItem>
            <SelectItem value="priceAsc">Price (high to low)</SelectItem>
            <SelectItem value="nameAsc">Name (A to Z)</SelectItem>
            <SelectItem value="nameDesc">Name (Z to A)</SelectItem>
          </SelectContent>
        </Select>
      </section>
    </section>
  );
};

export default Navbar;
