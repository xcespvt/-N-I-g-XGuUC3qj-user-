
"use client";

import React from 'react';
import type { Restaurant } from "@/lib/types";
import { HighProteinAdCard } from "./high-protein-ad-card";
import { ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { RestaurantCardList } from './restaurant-card-list';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { PromoBannerCarousel } from './promo-banner-carousel';
import { CuisineCategories } from './cuisine-categories';
import { useRouter } from 'next/navigation';
import { TheatreCarousel } from './theatre-carousel';
import { TaglineBanner } from './tagline-banner';

const Section = ({ title, children, restaurants }: { title: string; children: (restaurant: Restaurant) => React.ReactNode; restaurants: Restaurant[] }) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <Carousel opts={{ align: "start", dragFree: true }}>
            <CarouselContent className="-ml-2">
                {restaurants.map(r => (
                    <CarouselItem key={r.id} className="pl-2 basis-1/5 sm:basis-1/6 md:basis-1/6">
                        {children(r)}
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    </div>
);

const BrandCard = ({ restaurant }: { restaurant: Restaurant }) => {
    const router = useRouter();
    
    // Get appropriate brand image based on restaurant name
    const getRestaurantBrandImage = (restaurant: Restaurant) => {
        return getBrandImage(restaurant.name);
    };
    
    return (
        <button 
            onClick={() => router.push(`/restaurant/${restaurant.id}`)}
            className="w-full h-24 relative overflow-hidden rounded-xl group transition-transform duration-300 hover:scale-105"
        >
            <Image
                src={getRestaurantBrandImage(restaurant)}
                alt={restaurant.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 20vw, (max-width: 768px) 16vw, 14vw"
            />
        </button>
    )
};


type DineInPageProps = {
  restaurants: Restaurant[];
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
};

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
  // Show the 6 main brand restaurants specifically
  const brandRestaurantIds = ['1', '2', '3', '4', '5', '6']; // KFC, Dominos, McDonalds, Burger King, Starbucks, Wendys
  const featuredBrands = restaurants.filter(r => brandRestaurantIds.includes(r.id) && !hiddenRestaurants.includes(r.id));
  const movieTheatreRestaurants = restaurants.filter(r => r.tags?.includes('Movie Theatre'));


  return (
    <section className="space-y-8">
       
        <PromoBannerCarousel />
       
        <CuisineCategories />

        <TaglineBanner />
        
        <OfferSection />

        <div>
          <h2 className="text-2xl font-bold mb-4">Dine-in at the Movies</h2>
          <TheatreCarousel restaurants={movieTheatreRestaurants} />
        </div>
       
       <Section title="Featured Brands" restaurants={featuredBrands}>
            {(restaurant: Restaurant) => <BrandCard restaurant={restaurant} />}
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
