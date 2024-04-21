import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

import { Checkbox } from "@/components/ui/checkbox";
import { Category, Filters } from "@/data/interfaces";
import { ItemContext } from "@/providers/Itemsprovider";
import { getCategories } from "@/utils/manipulateData";
import { useContext, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { FILTER_ACTION, FilterContext } from "@/providers/FilterProvider";

type FilterProps = {};

const Filter = ({}: FilterProps) => {
  const { filterState, filterDispatch } = useContext(FilterContext);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);
  const { itemState } = useContext(ItemContext);

  const categories: Category[] = getCategories(itemState.items);

  const handleChange = (checked: CheckedState, category: Category) => {
    if (checked) {
      filterDispatch({ type: FILTER_ACTION.ADD, payload: category });
    } else {
      filterDispatch({ type: FILTER_ACTION.REMOVE, payload: category });
    }
  };

  const handlePriceChange = () => {
    filterDispatch({
      type: FILTER_ACTION.UPDATE_PRICE,
      payload: { minPrice: minPrice, maxPrice: maxPrice },
    });
  };

  const handleReset = () => {};

  return (
    <>
      <Card className="min-w-96 max-h-min">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible defaultValue="category">
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                {categories.map((category) => {
                  return (
                    <div key={category.id} className="items-top flex space-x-2">
                      <Checkbox
                        id={category.id.toString()}
                        defaultChecked={filterState.filters.categories.includes(
                          category.name
                        )}
                        onCheckedChange={(checked) =>
                          handleChange(checked, category)
                        }
                      />
                      <div className="grid gap-2 leading-none">
                        <label
                          htmlFor={category.id.toString()}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible defaultValue="priceRange">
            <AccordionItem value="priceRange">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  max={999}
                  step={10}
                  minStepsBetweenThumbs={1}
                  className="p-3"
                  onValueChange={(value) => {
                    setMinPrice(value[0]);
                    setMaxPrice(value[1]);
                  }}
                />
                <section className="flex gap-2 items-center">
                  <Input className="w-24" type="text" value={`$ ${minPrice}`} />
                  <p>to</p>
                  <Input className="w-24" type="text" value={`$ ${maxPrice}`} />
                  <Button onClick={handlePriceChange}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </section>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleReset}>Reset filters</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Filter;