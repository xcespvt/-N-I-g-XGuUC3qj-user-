
"use client";

import Image from 'next/image';
import type { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Bookmark, Heart, Star } from 'lucide-react';
import { Badge } from './ui/badge';

type RestaurantCardProps = {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
};

export function RestaurantCard({ restaurant, isFavorite, onFavoriteToggle }: RestaurantCardProps) {
  return (
    <div className="w-full min-w-0 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl rounded-2xl">
      <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="w-full h-full object-cover"
          data-ai-hint="restaurant food"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 text-white font-bold flex items-center gap-1 border-none px-2.5 py-1">
                <Star className="h-3 w-3 fill-white" />
                {restaurant.rating.toFixed(1)}
            </Badge>
        </div>
        
        <div className="absolute top-3 right-3 flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white bg-black/30 hover:bg-black/50 hover:text-white rounded-full"
                onClick={() => onFavoriteToggle(restaurant.id)}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white bg-black/30 hover:bg-black/50 hover:text-white rounded-full"
                aria-label="Bookmark"
            >
                <Bookmark className="h-5 w-5" />
            </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            {restaurant.promotion && (
                <p className="text-sm font-bold mb-1 text-primary-foreground/80">{restaurant.promotion}</p>
            )}
            <h3 className="font-bold text-xl truncate">{restaurant.name}</h3>
            <p className="text-sm text-white/90">{restaurant.location} • {restaurant.distance} km</p>
        </div>
      </div>
    </div>
  );
}
