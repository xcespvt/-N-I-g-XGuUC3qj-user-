
"use client";

import Image from 'next/image';
import type { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Heart, Star, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

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
        className="w-full min-w-0 bg-white rounded-2xl overflow-hidden border transition-transform duration-300 hover:-translate-y-1 cursor-pointer" 
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
        <div className="absolute bottom-2 left-3 right-3 text-white">
            {restaurant.promotion && (
                <p className="text-xs font-bold text-amber-300 mb-1">{restaurant.promotion}</p>
            )}
            <h3 className="font-bold text-xl">{restaurant.name}</h3>
            <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 bg-primary px-1.5 py-0.5 rounded-md text-xs font-bold">
                    <Star className="h-3 w-3 fill-white" />
                    <span>{restaurant.rating.toFixed(1)}</span>
                </div>
                <p className="text-xs">{restaurant.location}, {restaurant.distance} km</p>
            </div>
        </div>
      </div>
      <div className="p-3 text-gray-800">
        <p className="text-sm text-muted-foreground">{restaurant.cuisine} • ₹{restaurant.priceForTwo} for two</p>
        <div className="border-t border-dashed -mx-3 mt-3 px-3 pt-2">
             {restaurant.extraOffer && (
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <Ticket className="h-4 w-4" />
                    <span>{restaurant.extraOffer}</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
