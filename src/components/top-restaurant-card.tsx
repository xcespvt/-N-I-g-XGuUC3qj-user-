
"use client";

import type { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Bookmark, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type TopRestaurantCardProps = {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
};

export function TopRestaurantCard({ restaurant, isFavorite, onFavoriteToggle }: TopRestaurantCardProps) {
    const router = useRouter();

    const handleClick = () => {
        const page = restaurant.tags?.includes('Dine-in Special') ? `/restaurant/${restaurant.id}` : `/restaurant/${restaurant.id}/details`;
        router.push(page);
    };

  return (
    <div className="w-full min-w-0 cursor-pointer group" onClick={handleClick}>
      <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
        <div className="absolute inset-0 bg-gray-200 rounded-xl" />
        
        <div className="absolute top-2 left-2">
             <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-md bg-transparent"
                onClick={(e) => {
                    e.stopPropagation();
                    onFavoriteToggle(restaurant.id);
                }}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Bookmark className={cn("h-4 w-4 text-green-500", isFavorite ? "fill-green-500" : "fill-none")} />
            </Button>
        </div>

        <div className="absolute top-2 right-2 flex flex-col gap-2">
            <div className="flex items-center gap-1 bg-primary/90 text-white rounded-full px-2 py-0.5 text-xs font-bold backdrop-blur-sm">
                <Star className="h-3 w-3 fill-white text-white" />
                <span>{restaurant.rating.toFixed(1)}</span>
            </div>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold text-sm truncate text-primary">{restaurant.name}</h3>
        <p className="text-xs text-muted-foreground">{restaurant.cuisine.split(',')[0]} • {restaurant.deliveryTime} mins</p>
      </div>
    </div>
  );
}
