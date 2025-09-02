
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Restaurant } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { FeaturedWeekCard } from "./featured-week-card";

type FeaturedWeekCarouselProps = {
  restaurants: Restaurant[];
};

export function FeaturedWeekCarousel({ restaurants }: FeaturedWeekCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Featured This Week</h2>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="-ml-4">
          {restaurants.map((restaurant) => (
            <CarouselItem key={restaurant.id} className="pl-4 basis-4/5 md:basis-1/3">
              <FeaturedWeekCard restaurant={restaurant} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`h-2 w-2 rounded-full ${current === i + 1 ? 'bg-primary' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
        <div className="ml-2 bg-gray-800 text-white text-xs font-semibold rounded-full px-2.5 py-1">
          {current}/{count}
        </div>
      </div>
    </div>
  );
}
