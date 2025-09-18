
"use client";

import Image from 'next/image';
import type { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Heart, MoreVertical, Star, Trophy, EyeOff, Share2, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocalStorage } from '@/hooks/use-local-storage';
import { IMAGES, getRandomFoodImage } from '@/lib/image-constants';

type RestaurantCardListProps = {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onHide: (id: string) => void;
  onClick?: () => void;
};

export function RestaurantCardList({ restaurant, isFavorite, onFavoriteToggle, onHide, onClick }: RestaurantCardListProps) {
  const isBestInNorthIndian = restaurant.tags?.includes('Best In North Indian');
  const router = useRouter();
  const [, setOrderType] = useLocalStorage<'delivery' | 'dine-in' | 'booking'>('order-type', 'delivery');

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
    if (cuisine.includes('north indian') || cuisine.includes('mughlai')) return IMAGES.FOOD.BURGER_GOURMET; // Using burger as placeholder for Indian food
    return getRandomFoodImage(); // fallback to random food image
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    const page = restaurant.tags?.includes('Dine-in Special') ? `/restaurant/${restaurant.id}` : `/restaurant/${restaurant.id}/details`;
    router.push(page);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, you'd use the Web Share API or copy a link
    alert(`Sharing ${restaurant.name}`);
  }

  const handleHide = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHide(restaurant.id);
  }

  return (
    <div className="flex flex-col bg-white p-3 rounded-2xl border cursor-pointer transition-transform duration-300 hover:-translate-y-1" onClick={handleClick}>
        <div className="flex gap-4">
            <div className="relative w-28 h-28 flex-shrink-0">
                <Image
                    src={getRestaurantImage(restaurant)}
                    alt={restaurant.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-xl"
                    data-ai-hint="restaurant food"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-7 w-7 bg-white/80 hover:bg-white text-gray-700 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteToggle(restaurant.id);
                    }}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
                </Button>
            </div>
            <div className="flex-grow flex flex-col justify-center">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg leading-tight">{restaurant.name}</h3>
                        <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-primary fill-primary" />
                            <span className="font-bold text-primary">{restaurant.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground">({restaurant.reviews} ratings)</span>
                        </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground shrink-0 rounded-full" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem onClick={handleHide}>
                          <EyeOff className="mr-2 h-4 w-4" />
                          <span>Hide Restaurant</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleShare}>
                          <Share2 className="mr-2 h-4 w-4" />
                          <span>Share Restaurant</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                <p className="text-sm text-muted-foreground">{restaurant.location} • {restaurant.distance} km</p>
            </div>
        </div>
        {isBestInNorthIndian && (
            <div className="mt-3 bg-primary text-white rounded-xl p-2 flex items-center justify-center transition-transform duration-300 hover:-translate-y-1">
                <Trophy className="h-5 w-5 mr-2 shrink-0 text-yellow-300" />
                <p className="text-xs font-semibold">Best in North Indian cuisines</p>
            </div>
        )}
        {restaurant.promotion && (
            <div className="border-t border-dashed mt-3 pt-2">
                <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                    <Ticket className="h-4 w-4" />
                    <span>{restaurant.promotion}</span>
                </div>
            </div>
      )}
    </div>
  );
}
