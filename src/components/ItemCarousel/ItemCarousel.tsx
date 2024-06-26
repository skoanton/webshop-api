import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "@/contexts/ItemContext/ItemsContext";

type CarouselProps = {
  images: string[];
};

const ItemCarousel = ({ images }: CarouselProps) => {
  const { itemsState } = useContext(ItemsContext);
  const totalItemsToShow = 5;

  const imagesInCarousel = images.slice(1);

  return (
    <>
      <section className="ml-10">
        <Carousel
          opts={{
            loop: true,
          }}
          className="border"
        >
          <CarouselContent>
            {imagesInCarousel.map((image, index) => {
              return (
                <CarouselItem key={index} className="border pl-1 basis-1/3">
                  <img src={image} alt="Product image" />
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
