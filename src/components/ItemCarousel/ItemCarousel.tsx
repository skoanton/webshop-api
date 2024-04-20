import { Card, CardContent, CardTitle } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Item } from "@/data/interfaces";

import { ItemContext } from "@/providers/Itemsprovider";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

type CarouselProps = {};

const ItemCarousel = ({}: CarouselProps) => {
  const { itemState } = useContext(ItemContext);
  const totalItemsToShow = 5;
  const [randomItems, setRandomItems] = useState<Item[]>([]);

  useEffect(() => {
    if (itemState.items.length > 0) {
      console.log("Inne i useeffect på carusel");
      const randomItemsToAdd: Item[] = [];
      for (let i = 0; i < totalItemsToShow; i++) {
        const randomItem =
          itemState.items[Math.floor(Math.random() * itemState.items.length)];
        randomItemsToAdd.push(randomItem);
      }
      setRandomItems(randomItemsToAdd);
    }
  }, [itemState.items]);
  console.log("Hello carousel");
  console.log("randomItems:", randomItems);
  return (
    <>
      <Card className="border-none">
        <CardTitle className="flex justify-center p-4 text-4xl border-none">
          Recommended
        </CardTitle>
      </Card>
      <section className="flex justify-center">
        <Carousel
          opts={{
            loop: true,
          }}
          className="border p-4 my-4"
        >
          <CarouselContent className="-ml-4 ">
            {randomItems.map((item) => {
              return (
                <CarouselItem
                  key={item.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <ProductCard id={item.id} big={false} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </section>
    </>
  );
};

export default ItemCarousel;
