
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
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { TaglineBanner } from './tagline-banner';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import { OfferSection } from './offer-section';
import Image from 'next/image';
import { IMAGES, getRandomFoodImage, getBrandImage } from '@/lib/image-constants';

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
  const [showHomemadeLocked, setShowHomemadeLocked] = useState(false);
  const [filters, setFilters] = useLocalStorage<Filters>('restaurant-filters', {
    cuisine: 'all',
    price: 'all',
    rating: 0,
    deliveryTime: 120,
    distance: 14,
    dietary: [],
  });
  const [hiddenRestaurants] = useLocalStorage<string[]>('hidden-restaurants', []);


  useEffect(() => {
    // This effect runs only on the client.
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeScreen');
    if (isFirstLogin && hasSeenWelcome) {
      setShowLocationDialog(true);
      setIsFirstLogin(false); // Reset the flag
    }
  }, [isFirstLogin, setIsFirstLogin]);
  
  const handleTabChange = (tab: string) => {
    if (tab === 'Homemade') {
      setShowHomemadeLocked(true);
      setTimeout(() => setShowHomemadeLocked(false), 2000);
    } else {
      setActiveTab(tab);
      if (tab === 'Dine-in') {
        setOrderType('dine-in');
      } else {
        setOrderType('delivery');
      }
    }
  };

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

  const featuredBrands = useMemo(() => {
    // Show the 6 main brand restaurants specifically
    const brandRestaurantIds = ['1', '2', '3', '4', '5', '6']; // KFC, Dominos, McDonalds, Burger King, Starbucks, Wendys
    return restaurants.filter(r => brandRestaurantIds.includes(r.id) && !hiddenRestaurants.includes(r.id));
  }, [restaurants, hiddenRestaurants]);


  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
       <AppHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        address={address}
        subAddress={subAddress}
        setAddress={setAddress}
        onAiSearchClick={() => router.push('/ai-search')}
        showPromoBanner={activeTab !== 'Dine-in' && activeTab !== 'Reorder'}
      />
      <main className={cn("flex-1 pb-20 transition-all duration-300", showHomemadeLocked && "blur-sm pointer-events-none")}>
        <div className="px-4">
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
              <TaglineBanner />
              <div className="mt-8">
                <OfferSection />
              </div>
              <div className="mt-8">
                <Section title="Featured Brands" restaurants={featuredBrands}>
                    {(restaurant: Restaurant) => <BrandCard restaurant={restaurant} />}
                </Section>
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
      {showHomemadeLocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-black/70 text-white p-6 rounded-2xl flex flex-col items-center gap-4 animate-in fade-in-0 zoom-in-95">
                <Lock className="h-10 w-10" />
                <p className="font-bold text-lg">This section is currently locked</p>
            </div>
        </div>
      )}
      <footer className="bg-white py-6 mt-8">
        <div className="container mx-auto text-center text-muted-foreground px-4">
          <p>&copy; 2024 Foodie Find. All rights reserved.</p>
        </div>
      </footer>
      <BottomNavBar activeItem={activeTab} setActiveItem={handleTabChange} />
      <LocationPermissionDialog open={showLocationDialog} onOpenChange={setShowLocationDialog} />
    </div>
  );
}
