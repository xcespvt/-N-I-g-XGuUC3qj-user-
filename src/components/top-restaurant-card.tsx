
"use client";

import type { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Bookmark, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IMAGES, getRandomFoodImage } from '@/lib/image-constants';

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

    // Get appropriate image based on cuisine type
    const getRestaurantImage = (restaurant: Restaurant) => {
        const cuisine = restaurant.cuisine.toLowerCase();
        if (cuisine.includes('pizza')) return IMAGES.FOOD.PIZZA_MARGHERITA;
        if (cuisine.includes('burger')) return IMAGES.FOOD.BURGER_GOURMET;
        if (cuisine.includes('pasta') || cuisine.includes('italian')) return IMAGES.FOOD.PASTA_CARBONARA;
        if (cuisine.includes('sushi') || cuisine.includes('japanese')) return IMAGES.FOOD.SUSHI_PLATTER;
        if (cuisine.includes('mexican') || cuisine.includes('taco')) return IMAGES.FOOD.TACOS_MEXICAN;
        if (cuisine.includes('dessert') || cuisine.includes('cake')) return IMAGES.FOOD.CHOCOLATE_CAKE;
        if (cuisine.includes('coffee') || cuisine.includes('cafe')) return IMAGES.FOOD.COFFEE_LATTE_ART;
        if (cuisine.includes('smoothie') || cuisine.includes('juice')) return IMAGES.FOOD.FRESH_SMOOTHIE;
        return getRandomFoodImage(); // fallback to random food image
    };

  return (
    <div className="w-full min-w-0 cursor-pointer group" onClick={handleClick}>
      <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
        <Image
          src={getRestaurantImage(restaurant)}
          alt={restaurant.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 40vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />
        
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
