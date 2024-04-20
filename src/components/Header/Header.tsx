import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Navbar from "../Navbar/Navbar";
type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  return (
    <header>
      <section className="flex justify-between">
        <NavigationMenu className="cursor-pointer">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact us
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About us
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                FAQ
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <section>
          <Button variant={"link"} className="relative">
            <ShoppingCart className="w-8 h-8" />
            <div className="absolute bottom-6 right-2 rounded bg-secondary w-4 h-4 text-center">
              1
            </div>
          </Button>
        </section>
      </section>
      <Navbar />
    </header>
  );
};

export default Header;
