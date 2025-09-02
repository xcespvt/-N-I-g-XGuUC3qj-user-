
"use client";

import Image from 'next/image';
import type { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';

type DineInSectionCardProps = {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onClick: () => void;
};

export function DineInSectionCard({ restaurant, isFavorite, onFavoriteToggle, onClick }: DineInSectionCardProps) {
  const router = useRouter();

  const handleClick = () => {
    onClick();
    router.push(`/restaurant/${restaurant.id}`);
  };

  return (
    <div 
        className="w-full min-w-0 bg-white rounded-2xl shadow-sm overflow-hidden border transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer" 
        onClick={handleClick}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          data-ai-hint="restaurant interior elegant"
        />
        <div className="absolute top-2 left-2">
            <Badge className="bg-primary text-white border-none font-bold">GIRF Special</Badge>
        </div>
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-black/30 hover:bg-black/50 text-white rounded-full"
            onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(restaurant.id);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Heart className={cn("h-4 w-4", isFavorite && "text-red-500 fill-current")} />
        </Button>
      </div>
      <div className="p-3 text-gray-800">
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{restaurant.name}</h3>
            <div className="flex items-center gap-1 bg-primary text-white px-2 py-0.5 rounded-md text-sm font-bold">
                <Star className="h-3 w-3 fill-white" />
                <span>{restaurant.rating.toFixed(1)}</span>
            </div>
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
            <p>{restaurant.location}, {restaurant.distance} km</p>
        </div>
        <p className="text-sm text-muted-foreground">{restaurant.cuisine} • ₹{restaurant.priceForTwo} for two</p>
        <div className="border-t border-dashed -mx-3 mt-3 px-3 pt-2">
             {restaurant.promotion && (
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    {/* Custom icon can be used here */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.4 11.6L12.4 2.6C12.0739 2.27419 11.6353 2.06311 11.166 2.0036C10.6966 1.94409 10.2243 2.04018 9.8 2.28L2.2 6.88C1.78927 7.11213 1.45899 7.47649 1.26129 7.92341C1.06359 8.37033 1.00949 8.87528 1.106 9.36L2.626 16.96C2.79331 17.7813 3.28477 18.5147 3.986 19.014L4 19L9.4 21.8C9.82429 22.0402 10.3034 22.1402 10.782 22.08L18.382 21.06C18.8475 20.992 19.2848 20.7811 19.618 20.46L21.4 18.68C22.28 17.8 22.28 16.2 21.4 15.4L15.8 9.8L21.4 4.2C22.28 3.4 22.28 1.8 21.4 1L11.8 10.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{restaurant.promotion}</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
