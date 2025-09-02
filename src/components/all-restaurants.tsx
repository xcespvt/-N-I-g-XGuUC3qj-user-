
"use client";

import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Heart, ListFilter, Zap } from 'lucide-react';
import type { Restaurant, Offer, Filters } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RestaurantCardList } from './restaurant-card-list';
import { PromotionCarousel } from './promotion-carousel';
import { LiveItUpCard } from './live-it-up-card';
import React from 'react';
import { HighProteinAdCard } from './high-protein-ad-card';
import { FilterSheet } from './filter-sheet';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';

type AllRestaurantsProps = {
  restaurants: Restaurant[];
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
  offers: Offer[];
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
};

type ListItem = Restaurant | { type: 'promo' } | { type: 'ad' };

export function AllRestaurants({ restaurants, favorites, onFavoriteToggle, offers, filters, onFilterChange }: AllRestaurantsProps) {
  const [items, setItems] = useState<ListItem[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [hiddenRestaurants, setHiddenRestaurants] = useLocalStorage<string[]>('hidden-restaurants', []);
  const { toast } = useToast();

  const visibleRestaurants = useMemo(() => {
    return restaurants.filter(r => !hiddenRestaurants.includes(r.id));
  }, [restaurants, hiddenRestaurants]);

  useEffect(() => {
    const newItems: ListItem[] = [...visibleRestaurants];
    
    if (offers.length > 0) {
      newItems.splice(4, 0, { type: 'promo' });
    }
    
    if (newItems.length > 15) {
      newItems.splice(15, 0, { type: 'ad' });
    }

    setItems(newItems);
  }, [visibleRestaurants, offers]);

  const handleHideRestaurant = (id: string) => {
    const restaurant = restaurants.find(r => r.id === id);
    if (!restaurant) return;

    setHiddenRestaurants(prev => [...prev, id]);

    toast({
      title: `We have hidden ${restaurant.name}`,
      description: "You can unhide it from your profile section.",
      action: (
        <Button variant="secondary" size="sm" onClick={() => handleUndoHide(id)}>
          Undo
        </Button>
      ),
    });
  };

  const handleUndoHide = (id: string) => {
    setHiddenRestaurants(prev => prev.filter(hiddenId => hiddenId !== id));
  };


  return (
    <section>
      <div className="mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Button variant="outline" className="rounded-full bg-white border-gray-300 shrink-0" onClick={() => setIsFilterSheetOpen(true)}>
                <ListFilter className="mr-2 h-4 w-4" />
                Filter
            </Button>
             <Button variant="outline" className="rounded-full bg-white border-gray-300 shrink-0">
                <svg className="mr-2" width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.63,9.81,30.1,0H20.25a2.5,2.5,0,0,0-2.5,2.5V8.38a2.5,2.5,0,0,0,2.5,2.5h8.84l9.54,9.81V11.2A1.56,1.56,0,0,0,39.63,9.81ZM26.24,8.38a2.27,2.27,0,1,1,2.27-2.27A2.27,2.27,0,0,1,26.24,8.38Z" fill="#FCE169"></path><path d="M19.75,31.62a2.5,2.5,0,0,0,2.5-2.5V20.69a2.5,2.5,0,0,0-2.5-2.5H10.9L1.37,9.38v9.42a1.56,1.56,0,0,0,1,1.39L20.25,31.62Zm-9.5-10.94a2.27,2.27,0,1,1,2.27-2.27A2.27,2.27,0,0,1,10.25,20.68Z" fill="#FCE169"></path><path d="M39.63,28.79,30.1,18.88H20.25a2.5,2.5,0,0,0-2.5,2.5v8.44a2.5,2.5,0,0,0,2.5,2.5h8.84l9.54,9.81V30.18A1.56,1.56,0,0,0,39.63,28.79ZM26.24,29.81a2.27,2.27,0,1,1,2.27-2.27A2.27,2.27,0,0,1,26.24,29.81Z" fill="#4A6CF7"></path><path d="M19.75,40a2.5,2.5,0,0,0,2.5-2.5V29.06a2.5,2.5,0,0,0-2.5-2.5H10.9L1.37,18.12v9.42a1.56,1.56,0,0,0,1,1.39L20.25,40Zm-9.5-8.68a2.27,2.27,0,1,1,2.27-2.27A2.27,2.27,0,0,1,10.25,31.32Z" fill="#4A6CF7"></path></svg>
                Offers
            </Button>
             <Button variant="outline" className="rounded-full bg-white border-gray-300 shrink-0 inline-flex items-center">
                <span className="mr-2 inline-flex items-center justify-center w-5 h-5 rounded-md bg-primary/10">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="hsl(var(--primary))"/>
                        <circle cx="6" cy="6" r="3" fill="hsl(var(--primary))"/>
                    </svg>
                </span>
                Veg
            </Button>
            <Button variant="outline" className="rounded-full bg-white border-gray-300 shrink-0 inline-flex items-center">
                <span className="mr-2 inline-flex items-center justify-center w-5 h-5 rounded-md bg-red-100">
                     <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="#FF0000"/>
                        <path d="M6 3.5L9 8.5H3L6 3.5Z" fill="#FF0000"/>
                    </svg>
                </span>
                Non-veg
            </Button>
             <Button variant="outline" className="rounded-full bg-white border-gray-300 shrink-0 inline-flex items-center">
                <span className="mr-2 inline-flex items-center justify-center w-5 h-5 rounded-md bg-orange-100">
                     <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="#A52A2A"/>
                        <path d="M6 2C4.34315 2 3 4.01472 3 6C3 7.98528 4.34315 10 6 10C7.65685 10 9 7.98528 9 6C9 4.01472 7.65685 2 6 2Z" fill="#A52A2A"/>
                    </svg>
                </span>
                Egg
            </Button>
            <Button variant="outline" className="rounded-full bg-white border-gray-300 shrink-0 inline-flex items-center">
                <span className="mr-2 inline-flex items-center justify-center w-5 h-5 rounded-md bg-red-100">
                    <Heart className="h-3 w-3 text-red-500 fill-current" />
                </span>
                Most Loved
            </Button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">{`Top ${visibleRestaurants.length} restaurants to explore`}</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => {
           if ('type' in item && item.type === 'promo') {
            return <PromotionCarousel key={`promo-carousel-${index}`} />;
          }
          if ('type' in item && item.type === 'ad') {
            return <HighProteinAdCard key={`ad-${index}`} />;
          }
          if ('id' in item) { // Type guard for Restaurant
            const restaurant = item as Restaurant;
            return (
              <RestaurantCardList
                key={`restaurant-${restaurant.id}`}
                restaurant={restaurant}
                isFavorite={favorites.includes(restaurant.id)}
                onFavoriteToggle={onFavoriteToggle}
                onHide={handleHideRestaurant}
              />
            );
          }
          return null;
        })}
        <HighProteinAdCard />
      </div>

      <FilterSheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen} filters={filters} onFilterChange={onFilterChange} />
    </section>
  );
}
