
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import type { Offer } from "@/lib/types";
import { offers } from "@/lib/mock-data";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PromotionCard } from "./promotion-card";

export function PromotionCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {offers.map((offer, index) => (
          <CarouselItem key={index}>
            <PromotionCard offer={offer} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
