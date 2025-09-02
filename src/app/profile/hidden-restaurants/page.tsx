
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { restaurants as allRestaurants } from '@/lib/mock-data';
import Image from 'next/image';

export default function HiddenRestaurantsPage() {
  const router = useRouter();
  const [hiddenRestaurants, setHiddenRestaurants] = useLocalStorage<string[]>('hidden-restaurants', []);

  const hiddenRestaurantDetails = allRestaurants.filter(r => hiddenRestaurants.includes(r.id));

  const handleUnhide = (id: string) => {
    setHiddenRestaurants(prev => prev.filter(hiddenId => hiddenId !== id));
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Hidden Restaurants</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {hiddenRestaurantDetails.length > 0 ? (
          <div className="space-y-4">
            {hiddenRestaurantDetails.map((restaurant, index) => (
              <div 
                key={restaurant.id} 
                className="bg-white rounded-2xl p-4 shadow-sm animate-slide-up-and-fade transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                      data-ai-hint="restaurant food"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{restaurant.name}</h3>
                      <p className="text-sm text-muted-foreground">{restaurant.location}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-primary text-primary font-bold"
                    onClick={() => handleUnhide(restaurant.id)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Unhide
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground animate-slide-up-and-fade">
             <div className="inline-block bg-primary/10 p-4 rounded-full">
                <EyeOff className="h-12 w-12 text-primary/80" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-foreground">No Hidden Restaurants</h2>
            <p className="mt-2">You can hide restaurants from the 3-dot menu on any restaurant card.</p>
            <Button className="mt-6" onClick={() => router.push('/')}>Back to Home</Button>
          </div>
        )}
      </main>
    </div>
  );
}
