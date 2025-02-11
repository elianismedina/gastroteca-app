"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import { getCategories } from "@/actions/actions";

export function CarouselPlugin() {
  const [categories, setCategories] = React.useState<
    { id: string; imageUrl: string; categoryName: string }[]
  >([]);

  React.useEffect(() => {
    getCategories().then(setCategories); // Fetch categories on mount
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem key={category.id}>
            <div className="relative w-full">
              <Card className="w-full">
                <CardContent className="relative flex items-center justify-center w-full">
                  {category.imageUrl ? (
                    <>
                      <Image
                        src={category.imageUrl}
                        alt={category.categoryName}
                        width={850}
                        height={550}
                        className="object-cover w-full"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-black bg-opacity-50">
                        {category.categoryName}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-semibold">No Image</span>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
