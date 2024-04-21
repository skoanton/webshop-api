import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft, Search, Text } from "lucide-react";
import { FILTER_ACTION, FilterContext } from "@/providers/FilterProvider";

type NavbarProps = {};

const Navbar = ({}: NavbarProps) => {
  const { filterDispatch } = useContext(FilterContext);
  const [searchString, setSearchString] = useState("");
  console.log(searchString);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    console.log("searching");
    filterDispatch({
      type: FILTER_ACTION.SET_SEARCH_STRING,
      payload: searchString,
    });
    if (inputSearchRef.current) {
      inputSearchRef.current.value = "";
      inputSearchRef.current.focus();
    }
  };
  return (
    <section className="mb-4 flex flex-col gap-2">
      <section className="flex justify-between h-fit">
        <img className="w-52" src="/src/assets/logo.png" alt="Logo" />
        <section className="flex gap-3">
          <section className="flex gap-3">
            <Input
              ref={inputSearchRef}
              type="text"
              placeholder="What are you looking for?"
              onChange={(e) => setSearchString(e.currentTarget.value)}
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </section>
        </section>
      </section>
      <section className="flex justify-between">
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back To Previous page
          </Button>
        </Link>
        <Select>
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
