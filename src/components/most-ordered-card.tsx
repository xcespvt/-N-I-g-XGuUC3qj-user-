
"use client";

import Image from 'next/image';
import type { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Heart, Star, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type MostOrderedCardProps = {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
};

export function MostOrderedCard({ restaurant, isFavorite, onFavoriteToggle }: MostOrderedCardProps) {
  const router = useRouter();

  const handleClick = () => {
    const page = restaurant.tags?.includes('Dine-in Special') ? `/restaurant/${restaurant.id}` : `/restaurant/${restaurant.id}/details`;
    router.push(page);
  };

  return (
    <div className="w-full min-w-0 bg-white rounded-2xl shadow-sm overflow-hidden border transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer" onClick={handleClick}>
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          data-ai-hint="restaurant food"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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
        <h3 className="font-bold text-base truncate">{restaurant.name}</h3>
        <div className="flex items-center gap-1 text-sm mt-0.5">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="font-semibold">{restaurant.rating.toFixed(1)}</span>
            <span className="text-gray-500">• {restaurant.deliveryTime}-{restaurant.deliveryTime + 5} mins</span>
        </div>
        <p className="text-sm text-gray-500 truncate mt-0.5">{restaurant.cuisine}</p>
      </div>
      {restaurant.promotion && (
        <div className="border-t border-dashed -mx-3 mt-1 px-3 py-2">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                <Ticket className="h-4 w-4" />
                <span>{restaurant.promotion}</span>
            </div>
        </div>
      )}
    </div>
  );
}
