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
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "@/contexts/CartContext/CartContext";
type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const { cartState } = useContext(CartContext);
  console.log("Updatering cart");
  return (
    <header className="mx-2">
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
          <Link to="/checkout">
            <Button variant={"link"} className="relative">
              <ShoppingCart className="w-8 h-8" />
              <div className="absolute bottom-6 right-2 rounded bg-secondary w-4 h-4 text-center">
                {cartState.cart.items.reduce(
                  (total, currentArray) => total + currentArray.length,
                  0
                )}
              </div>
            </Button>
          </Link>
        </section>
      </section>
      <Navbar />
    </header>
  );
};

export default Header;
