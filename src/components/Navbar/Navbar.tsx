import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Input } from "@/components/ui/input";

import { Category } from "@/data/interfaces";
import { ItemContext } from "@/providers/Itemsprovider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Search, Text } from "lucide-react";
import { getCategories } from "@/utils/manipulateData";

type NavbarProps = {};

const Navbar = ({}: NavbarProps) => {
  const { itemState } = useContext(ItemContext);
  const categories: Category[] = getCategories(itemState.items);

  return (
    <section className="mb-4 flex flex-col gap-2">
      <section className="flex justify-between h-fit  px-5">
        <img className="w-52" src="/src/assets/logo.png" alt="Logo" />
        <section className="flex gap-3">
          <Menubar className="border-none">
            <MenubarMenu>
              <Link to={"/"}>
                <MenubarTrigger>
                  <Text />
                  Categories
                </MenubarTrigger>
              </Link>
              <MenubarContent>
                {categories &&
                  categories.map((category) => {
                    return (
                      <MenubarItem key={category.id}>
                        {category.name}
                      </MenubarItem>
                    );
                  })}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <section className="flex gap-3">
            <Input type="text" placeholder="What are you looking for?" />
            <Button>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </section>
        </section>
      </section>
      <section>
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back To Previous page
          </Button>
        </Link>
      </section>
    </section>
  );
};

export default Navbar;
