
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
                    src={restaurant.image}
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
