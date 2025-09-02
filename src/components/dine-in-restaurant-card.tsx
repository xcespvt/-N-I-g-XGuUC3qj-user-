
"use client";

import Image from 'next/image';
import type { Restaurant } from '@/lib/types';
import { Heart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

type DineInRestaurantCardProps = {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
};

export function DineInRestaurantCard({ restaurant, isFavorite, onFavoriteToggle }: DineInRestaurantCardProps) {
  const router = useRouter();
  
  const handleCardClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      router.push(`/restaurant/${restaurant.id}`);
  }

  return (
    <div 
        className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group"
        onClick={handleCardClick}
    >
        <div className="relative h-36">
            <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint="restaurant interior"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-2 left-3 right-3 text-white">
                <h3 className="font-bold text-lg leading-tight truncate">{restaurant.name}</h3>
                <div className="flex justify-between items-center text-xs">
                     <p className="truncate max-w-[70%]">{restaurant.cuisine.split(',')[0]}</p>
                     <div className="flex items-center gap-1 bg-primary px-1.5 py-0.5 rounded-md font-bold">
                        <Star className="h-3 w-3 fill-white" />
                        <span>{restaurant.rating.toFixed(1)}</span>
                    </div>
                </div>
             </div>
        </div>
        <div className="p-3">
             <p className="text-sm text-muted-foreground">{restaurant.location} • ₹{restaurant.priceForTwo} for two</p>
             {restaurant.promotion ? (
                <div className="border-t border-dashed -mx-3 mt-2 px-3 pt-2">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                        {/* Custom icon can be used here */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current"><path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span>{restaurant.promotion}</span>
                    </div>
                </div>
            ) : <div className="h-5" />}
        </div>
    </div>
  );
}
