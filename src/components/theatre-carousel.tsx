
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from 'next/image';
import useEmblaCarousel, { type EmblaCarouselType } from 'embla-carousel-react';
import { Star, PlayCircle, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import type { Restaurant } from "@/lib/types";

type TheatreCarouselProps = {
    restaurants: Restaurant[];
}

export function TheatreCarousel({ restaurants }: TheatreCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const router = useRouter();

  const updateDots = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    updateDots(emblaApi);
    emblaApi.on("select", updateDots);
    emblaApi.on("reInit", updateDots);
  }, [emblaApi, updateDots]);
  
  const currentExperience = restaurants[selectedIndex];

  const handleCardClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };
  
  if (!restaurants || restaurants.length === 0) {
    return <p>No movie theatre dining options available at the moment.</p>;
  }

  return (
    <div className="w-full space-y-4">
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4" style={{ backfaceVisibility: 'hidden' }}>
                {restaurants.map((experience, index) => (
                    <div key={index} className="flex-[0_0_80%] min-w-0 pl-4">
                         <div 
                            className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
                            onClick={() => handleCardClick(experience.id)}
                        >
                            <Image
                                src={experience.image}
                                alt={experience.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                data-ai-hint="cinema food experience"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            <Button variant="ghost" size="icon" className="absolute top-3 left-3 h-9 w-9 bg-black/30 hover:bg-black/50 text-white rounded-lg">
                                <Bookmark className="h-5 w-5" />
                            </Button>
                            
                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-600 text-white rounded-full px-2 py-1 text-xs font-bold">
                                <Star className="h-4 w-4 fill-white" />
                                <span>{experience.rating}</span>
                            </div>
                            
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Button variant="ghost" size="icon" className="h-16 w-16 bg-white/30 hover:bg-white/50 text-white rounded-full backdrop-blur-sm">
                                    <PlayCircle className="h-10 w-10 fill-white" />
                                </Button>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <h3 className="text-3xl font-bold">{experience.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h4 className="text-xl font-bold">{currentExperience.name}</h4>
            <p className="text-muted-foreground">{currentExperience.location}</p>
        </div>
        
        <div className="flex justify-center gap-1.5">
            {scrollSnaps.map((_, index) => (
            <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                'h-1.5 w-1.5 rounded-full transition-all duration-300',
                index === selectedIndex ? 'w-4 bg-primary' : 'bg-gray-300'
                )}
                aria-label={`Go to slide ${index + 1}`}
            />
            ))}
      </div>

    </div>
  );
}
