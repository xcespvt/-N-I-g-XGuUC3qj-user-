
"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "25% OFF",
    subtitle: "Weekend special deal",
    image: "https://storage.googleapis.com/builder-floor-prod-assets/Image_20240822_075306_695.png",
    bgColor: "bg-green-100/50",
    buttonColor: "bg-white text-black",
    textColor: "text-black",
  },
  {
    title: "Flat ₹125 OFF",
    subtitle: "On your favorite pizza",
    image: "https://storage.googleapis.com/builder-floor-prod-assets/Image_20240822_075306_845.png",
    bgColor: "bg-blue-100/50",
    buttonColor: "bg-white text-black",
    textColor: "text-black",
  },
  {
    title: "Buy 1 Get 1",
    subtitle: "On refreshing drinks",
    image: "https://storage.googleapis.com/builder-floor-prod-assets/Image_20240822_075306_964.png",
    bgColor: "bg-orange-100/50",
    buttonColor: "bg-white text-black",
    textColor: "text-black",
  },
];

type CarouselApi = UseEmblaCarouselType[1];

export function PromoBannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="w-full relative px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 pl-4"
            >
              <div
                className={cn(
                  "relative w-full h-[120px] rounded-2xl overflow-hidden p-4 flex flex-col justify-center items-start",
                  slide.bgColor
                )}
              >
                <div className={cn("z-10", slide.textColor)}>
                  <h3 className="text-2xl font-bold">{slide.title}</h3>
                  <p className="text-sm">{slide.subtitle}</p>
                  <Button
                    size="sm"
                    className={cn("mt-2 rounded-full h-8 px-5 font-bold", slide.buttonColor)}
                  >
                    Order now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all duration-300",
              selectedIndex === index ? "w-4 bg-primary" : "bg-gray-400"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
