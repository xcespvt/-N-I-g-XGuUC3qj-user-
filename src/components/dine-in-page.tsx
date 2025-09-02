
"use client";

import React from 'react';
import type { Restaurant } from "@/lib/types";
import { HighProteinAdCard } from "./high-protein-ad-card";
import { BookingBanner } from './booking-banner';
import { ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { DineInSectionCard } from './dine-in-section-card';
import { RestaurantCardList } from './restaurant-card-list';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';

type DineInPageProps = {
  restaurants: Restaurant[];
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
};

const Section = ({ title, children, restaurants }: { title: string; children: React.ReactNode; restaurants: Restaurant[] }) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <Carousel opts={{ align: "start", dragFree: true }}>
            <CarouselContent className="-ml-2">
                {restaurants.map(r => (
                    <CarouselItem key={r.id} className="pl-2 basis-4/5 sm:basis-1/2 md:basis-1/3">
                        {children(r)}
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    </div>
);


export function DineInPage({ restaurants, favorites, onFavoriteToggle }: DineInPageProps) {
  const [hiddenRestaurants, setHiddenRestaurants] = useLocalStorage<string[]>('hidden-restaurants', []);
  const [, setOrderType] = useLocalStorage<'delivery' | 'dine-in' | 'booking'>('order-type', 'delivery');
  const { toast } = useToast();

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
  
  const handleRestaurantClick = (restaurant: Restaurant) => {
    setOrderType('dine-in');
  }

  const allDineInRestaurants = restaurants.filter(r => r.tags?.includes('Dine-in Special') && !hiddenRestaurants.includes(r.id));
  const bestInBiryani = restaurants.filter(r => r.cuisine.includes('Biryani') && !hiddenRestaurants.includes(r.id)).slice(0, 5);
  const featuredBrands = restaurants.filter(r => r.rating > 4.5 && !hiddenRestaurants.includes(r.id)).slice(0, 5);


  return (
    <section className="space-y-8">
       
       <div>
        <BookingBanner />
       </div>

       <Section title="Dine-in Near You" restaurants={allDineInRestaurants.slice(0, 5)}>
            {(restaurant: Restaurant) => (
                 <DineInSectionCard 
                    restaurant={restaurant} 
                    isFavorite={favorites.includes(restaurant.id)}
                    onFavoriteToggle={onFavoriteToggle}
                    onClick={() => handleRestaurantClick(restaurant)}
                />
            )}
       </Section>

       <Section title="Best in Biryani" restaurants={bestInBiryani}>
            {(restaurant: Restaurant) => (
                 <DineInSectionCard 
                    restaurant={restaurant} 
                    isFavorite={favorites.includes(restaurant.id)}
                    onFavoriteToggle={onFavoriteToggle}
                    onClick={() => handleRestaurantClick(restaurant)}
                />
            )}
       </Section>
       
       <Section title="Featured Brands" restaurants={featuredBrands}>
            {(restaurant: Restaurant) => (
                 <DineInSectionCard 
                    restaurant={restaurant} 
                    isFavorite={favorites.includes(restaurant.id)}
                    onFavoriteToggle={onFavoriteToggle}
                    onClick={() => handleRestaurantClick(restaurant)}
                />
            )}
       </Section>
       
       <div className="space-y-4">
            <h2 className="text-2xl font-bold">All Dine-in Restaurants</h2>
            <div className="grid grid-cols-1 gap-4">
                {allDineInRestaurants.map(restaurant => (
                    <RestaurantCardList
                        key={restaurant.id}
                        restaurant={restaurant}
                        isFavorite={favorites.includes(restaurant.id)}
                        onFavoriteToggle={onFavoriteToggle}
                        onHide={handleHideRestaurant}
                        onClick={() => handleRestaurantClick(restaurant)}
                    />
                ))}
            </div>
       </div>

      <div className="space-y-4">
        <HighProteinAdCard />
      </div>
    </section>
  );
}
