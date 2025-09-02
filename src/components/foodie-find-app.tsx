
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Restaurant, Filters } from '@/lib/types';
import { restaurants as initialRestaurants } from '@/lib/mock-data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AppHeader } from '@/components/app-header';
import { CuisineCategories } from '@/components/cuisine-categories';
import { BottomNavBar } from '@/components/bottom-nav-bar';
import { TopRestaurants } from './top-restaurants';
import { AllRestaurants } from './all-restaurants';
import { offers } from '@/lib/mock-data';
import { AllHomemade } from './all-homemade';
import { ReorderPage } from './reorder-page';
import { DineInPage } from './dine-in-page';
import { useRouter } from 'next/navigation';
import { LocationPermissionDialog } from './location-permission-dialog';

export default function FoodieFindApp() {
  const [activeTab, setActiveTab] = useState('Food');
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useLocalStorage<string>('user-address', 'Mumbai Central');
  const [subAddress, setSubAddress] = useLocalStorage<string>('user-sub-address', 'Mumbai, Maharashtra, India');
  const [restaurants] = useState<Restaurant[]>(initialRestaurants);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorite-restaurants', []);
  const [, setOrderType] = useLocalStorage<'delivery' | 'dine-in' | 'booking'>('order-type', 'delivery');
  const router = useRouter();
  const [isFirstLogin, setIsFirstLogin] = useLocalStorage('is-first-login', false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [filters, setFilters] = useLocalStorage<Filters>('restaurant-filters', {
    cuisine: 'all',
    price: 'all',
    rating: 0,
    deliveryTime: 120,
    distance: 14,
    dietary: [],
  });


  useEffect(() => {
    // This effect runs only on the client.
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeScreen');
    if (isFirstLogin && hasSeenWelcome) {
      setShowLocationDialog(true);
      setIsFirstLogin(false); // Reset the flag
    }
  }, [isFirstLogin, setIsFirstLogin]);
  
  useEffect(() => {
    // Set order type based on the active tab
    if (activeTab === 'Dine-in') {
      setOrderType('dine-in');
    } else {
      setOrderType('delivery');
    }
  }, [activeTab, setOrderType]);

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      const passesCuisine = filters.cuisine === 'all' || r.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase());
      const passesPrice = filters.price === 'all' || (
        (filters.price === 'cheap' && r.priceForTwo <= 500) ||
        (filters.price === 'moderate' && r.priceForTwo > 500 && r.priceForTwo <= 1000) ||
        (filters.price === 'expensive' && r.priceForTwo > 1000)
      );
      const passesRating = r.rating >= filters.rating;
      const passesDeliveryTime = r.deliveryTime <= filters.deliveryTime;
      const passesDistance = r.distance <= filters.distance;

      const passesDietary = filters.dietary.length === 0 || filters.dietary.every(diet => {
        if (diet === 'veg' && r.tags?.includes('Pure Veg')) return true;
        if (diet === 'non-veg' && !r.tags?.includes('Pure Veg')) return true; // simplified logic
        if (diet === 'egg' && r.tags?.includes('Serves Egg')) return true;
        return false;
      });

      return passesCuisine && passesPrice && passesRating && passesDeliveryTime && passesDistance && passesDietary;
    });
  }, [restaurants, filters]);

  const topRatedRestaurants = useMemo(() => {
    return [...filteredRestaurants].sort((a, b) => b.rating - a.rating).slice(0, 10);
  }, [filteredRestaurants]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <AppHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        address={address}
        subAddress={subAddress}
        setAddress={setAddress}
        onAiSearchClick={() => router.push('/ai-search')}
      />
      <main className="flex-1 pb-20">
        <div className="px-4 py-6">
          {activeTab === 'Food' && (
            <>
              <CuisineCategories />
              <div className="mt-8">
                <TopRestaurants 
                  restaurants={topRatedRestaurants} 
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </div>
              <div className="mt-8">
                <AllRestaurants 
                  restaurants={filteredRestaurants} 
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                  offers={offers}
                  filters={filters}
                  onFilterChange={setFilters}
                />
              </div>
            </>
          )}
          {activeTab === 'Homemade' && (
            <>
               <CuisineCategories />
               <div className="mt-8">
                <TopRestaurants 
                  restaurants={topRatedRestaurants.filter(r => r.tags?.includes('Homemade'))} 
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </div>
              <div className="mt-8">
                <AllHomemade 
                  restaurants={filteredRestaurants} 
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                  offers={offers}
                  filters={filters}
                  onFilterChange={setFilters}
                />
              </div>
            </>
          )}
           {activeTab === 'Dine-in' && (
            <DineInPage 
              restaurants={filteredRestaurants}
              favorites={favorites}
              onFavoriteToggle={handleFavoriteToggle}
            />
          )}
          {activeTab === 'Reorder' && (
            <ReorderPage restaurants={restaurants} />
          )}
        </div>
      </main>
      <footer className="bg-muted py-6 mt-8">
        <div className="container mx-auto text-center text-muted-foreground px-4">
          <p>&copy; 2024 Foodie Find. All rights reserved.</p>
        </div>
      </footer>
      <BottomNavBar activeItem={activeTab} setActiveItem={setActiveTab} />
      <LocationPermissionDialog open={showLocationDialog} onOpenChange={setShowLocationDialog} />
    </div>
  );
}
