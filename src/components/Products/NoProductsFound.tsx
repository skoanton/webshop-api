import { FilterContext } from "@/contexts/FilterProvider/FilterContext";
import { Button } from "../ui/button";
import { useContext } from "react";
import { FILTER_ACTION } from "@/contexts/FilterProvider/FilterReducer";

type NoProductsFoundProps = {};

const NoProductsFound = ({}: NoProductsFoundProps) => {
  const { filterDispatch } = useContext(FilterContext);
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full bg-secondary">
        <p className="text-3xl">No Items found</p>
        <Button
          onClick={() => filterDispatch({ type: FILTER_ACTION.RESET })}
          variant="link"
        >
          Reset Filters
        </Button>
      </div>
    </>
  );
};

export default NoProductsFound;
