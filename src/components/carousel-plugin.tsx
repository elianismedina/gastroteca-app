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
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem key={category.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.categoryName}
                      width={850}
                      height={550}
                      className="rounded-lg object-cover"
                    />
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
