
"use client";

import Image from 'next/image';
import { Ticket } from 'lucide-react';
import type { Restaurant } from '@/lib/types';

type FeaturedWeekCardProps = {
  restaurant: Restaurant;
};

export function FeaturedWeekCard({ restaurant }: FeaturedWeekCardProps) {
  return (
    <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
      <Image
        src={restaurant.image}
        alt={restaurant.name}
        fill
        className="object-cover"
        data-ai-hint="restaurant interior"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-2xl truncate">{restaurant.name}</h3>
          <p className="text-sm text-white/90 mt-1">
            {restaurant.location} &bull; {restaurant.cuisine.split(',')[0]}
          </p>
          {restaurant.promotion && (
            <div className="flex items-center gap-2 mt-2 text-orange-300">
              <Ticket className="h-4 w-4" />
              <span className="font-semibold text-sm">{restaurant.promotion}</span>
            </div>
          )}
      </div>
    </div>
  );
}
